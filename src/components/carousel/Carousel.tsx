import * as React from "react";
import CarouselStyled from "./Carousel.styled";
import { CarouselItem } from "../carouselItem/CarouselItem";
import {
    CarouselConfig,
    CarouselItemConfig,
    CarouselDisplayConfig,
    CarouselStyleConfig,
    CarouselRowConfig,
    NavControlCustomConfig,
    CarouselRowLabelConfig
} from "../../config/CarouselConfig";
import { INavActionHandler, NAV_DIRECTION } from "../../navcontrols/common/INavActionHandler";
import { INavItemActionHandler, IMouseNavItemActionHandler, 
    ITouchNavItemActionHandler } from "../../navcontrols/common/INavItemActionHandler";
import { NavController } from "../../navcontrols/common/NavController";
import {
    KeyboardNavController,
    DEVICE_NAV_KEYCODES_DEFAULT,
} from "../../navcontrols/keyboard/KeyboardNavController";
import { PointerNavController } from "../../navcontrols/pointer/PointerNavController";
import { TouchNavController } from "../../navcontrols/touch/TouchNavController";
import { CarouselUtils, NavDirectionResult } from "../../utils/CarouselUtils";
import { CarouselRowLabel } from "../carouselRowLabel/CarouselRowLabel";

export type ItemState = {
    config: CarouselItemConfig;
    loadSrc: boolean;
    xOffset: number;
    yOffset: number;
};

export type OverrunDirectionDisplay = {
    xOffset: number;
    yOffset: number;
    direction: NAV_DIRECTION;
}

interface CarouselState {
    activeDisplayRow: number;
    activeDisplayColumn: number;
    itemStates: Array<ItemState>;
    overrunDirectionDisplayState: Array<OverrunDirectionDisplay>;
}

export type CarouselProps = {
    config: CarouselConfig;
};

export class Carousel
    extends React.Component<CarouselProps, CarouselState>
    implements INavActionHandler {
    private displayConfig: CarouselDisplayConfig;
    private enable2dNav: boolean;
    private styleConfig: CarouselStyleConfig;
    private navControllers: Array<NavController>;
    private itemMouseNavActionHandlers: Array<IMouseNavItemActionHandler>;
    private itemTouchNavActionHandlers: Array<ITouchNavItemActionHandler>;

    constructor(props: CarouselProps) {
        super(props);
        this.enable2dNav = props.config.navControls.enable2dNav;
        this.displayConfig = props.config.displayConfig;
        this.styleConfig = props.config.styleConfig;
        this.navControllers = [];
        this.itemMouseNavActionHandlers = [];
        this.itemTouchNavActionHandlers = [];

        this.initialiseNavControls(this.props);

        this.state = {
            activeDisplayColumn: props.config.displayConfig.initialDisplayColumn,
            activeDisplayRow: props.config.displayConfig.initialDisplayRow,
            itemStates: this.initialiseItemStates(props),
            overrunDirectionDisplayState: []
        };
        if (props.config.navControls.customNavControllers) {
            props.config.navControls.customNavControllers
                .filter((acceptor: NavControlCustomConfig) => acceptor.enabled)
                .forEach((acceptor: NavControlCustomConfig) => {
                    acceptor.acceptorCb(this);
            })
        }
    }

    private initialiseItemStates(props: CarouselProps): Array<ItemState> {
        let itemStates: Array<ItemState> = [];
        props.config.rows.forEach((row: CarouselRowConfig, rowIndex: number) => {
            itemStates = itemStates.concat(
                row.items.map((item: CarouselItemConfig, itemIndex: number) => {
                    return {
                        config: item,
                        xOffset: row.initialColumn - itemIndex,
                        yOffset: rowIndex,
                        loadSrc: this.props.config.displayConfig.enableLazyLoading ? (
                                    CarouselUtils.isItemInView(rowIndex, row.initialColumn - itemIndex, props.config.displayConfig) ||
                                    CarouselUtils.isItemInOverrun(rowIndex, row.initialColumn - itemIndex, props.config.displayConfig).result)
                                :
                                 true // load all if lazy loading is off
                                 
                    };
                })
            );
        });
        return itemStates;
    }

    handleNavControlDirectionAction(direction: NAV_DIRECTION, offset: number): void {
        this.performNavControlAction(this.state.activeDisplayRow, this.state.activeDisplayColumn, direction, offset);
    }

    handleNavControlEnterCurrentSelectionAction(): void {
        this.handleItemAction(this.state.activeDisplayRow, this.state.activeDisplayColumn);
    }

    handleNavControlEnterSelectionAction(row: number, column: number): void {
        this.handleItemAction(row, column);
    }

    handleNavControlSelect(row: number, column: number): void {
        this.selectItemAt(row, column);
    }

    handleNavControlDeselect(): void {
        // TODO: Infer deselection based on dedicated flag rather than unreal values
        this.setState({ activeDisplayColumn: -1, activeDisplayRow: -1 });
    }

    handleNavControlOverrunDirectionAction(row: number, column: number): boolean {
        const itemInOverrun: NavDirectionResult = CarouselUtils.isItemInOverrun(row, column, this.displayConfig);
        if (itemInOverrun.result && itemInOverrun.direction !== undefined) {
            this.performNavControlAction(row, column, itemInOverrun.direction, 1);
            return true;
        }
        return false;
    }

    handleShowOverrunDirectionLabel(row: number, column: number): void {
        const itemInOverrun: NavDirectionResult = CarouselUtils.isItemInOverrun(row, column, this.displayConfig);
        if (itemInOverrun.result && itemInOverrun.direction !== undefined) {
            this.setState({overrunDirectionDisplayState: this.state.overrunDirectionDisplayState.concat([{yOffset: row, xOffset: column, direction: itemInOverrun.direction}])})
        }            
    }

    clearShowOverrunDirectionLabel(row: number, column: number): void {
        this.setState({overrunDirectionDisplayState: this.state.overrunDirectionDisplayState.filter((overrunDirDisplay: OverrunDirectionDisplay) => {
            return overrunDirDisplay.yOffset != row || overrunDirDisplay.xOffset != column
        })});
    }


    private performNavControlAction(row: number, column: number, direction: NAV_DIRECTION, offset: number): void {
        switch (direction) {
            case NAV_DIRECTION.LEFT:
                this.handleNavLeft(row, this.state.activeDisplayColumn, offset);
                break;
            case NAV_DIRECTION.RIGHT:
                this.handleNavRight(row, this.state.activeDisplayColumn, offset);
                break;
            case NAV_DIRECTION.UP:
                this.handleNavUp(this.state.activeDisplayRow, column, offset);
                break;
            case NAV_DIRECTION.DOWN:
                this.handleNavDown(this.state.activeDisplayRow, column, offset);
                break;
            default:
                throw new Error("Unsupported NAV_DIRECTION action: " + direction.toString());
        }
    }

    private handleItemAction(row: number, column: number): void {
        if (row !== this.state.activeDisplayRow || column !== this.state.activeDisplayColumn) {
            throw new Error("Unexpected action for non-selected item, this is not yet supported");
        }
        const activeItems: Array<ItemState> = this.state.itemStates.filter(
            (itemState: ItemState) => {
                return (
                    itemState.xOffset === this.state.activeDisplayColumn &&
                    itemState.yOffset === this.state.activeDisplayRow
                );
            }
        );
        if (activeItems.length === 1) {
            // TODO: Abstract action per item, only one supported now is redirect
            window.location.href = activeItems[0].config.url;
        } else if (activeItems.length > 1) {
            throw new Error(
                "Unexpected multiple active items found for: [" +
                    this.state.activeDisplayRow.toString() +
                    this.state.activeDisplayColumn.toString() +
                    "] in itemStates"
            );
        }
    }

    private handleNavDown(row: number, column: number, offset: number) {
        // TODO: Support offset > 1
        if (offset !== 1) {
            throw new Error("Nav offsets other than 1 are not yet supported");
        }
        const nofItemsInColumn = CarouselUtils.getItemsBelowRowInColumn(
            this.state.itemStates,
            column,
            row
        );
        if (nofItemsInColumn === 0) {
            return;
        } else if (
            this.enable2dNav &&
            this.displayConfig.rowEnd - row < nofItemsInColumn
        ) {
            this.moveColumn(column, -1);
        } else {
            this.setState({ activeDisplayRow: row + 1 });
            this.scrollSelected();
        }
    }

    private handleNavUp(row: number, column: number, offset: number) {
        // TODO: Support offset > 1
        if (offset !== 1) {
            throw new Error("Nav offsets other than 1 are not yet supported");
        }
        const nofItemsInColumn = CarouselUtils.getItemsAboveRowInColumn(
            this.state.itemStates,
            column,
            row
        );
        if (nofItemsInColumn === 0) {
            return;
        } else if (
            this.enable2dNav &&
            nofItemsInColumn > row - this.displayConfig.rowStart
        ) {
            this.moveColumn(column, 1);
        } else {
            this.setState({ activeDisplayRow: row - 1 });
            this.scrollSelected();
        }
    }

    private handleNavLeft(row: number, column: number, offset: number) {
        // TODO: Support offset > 1
        if (offset !== 1) {
            throw new Error("Nav offsets other than 1 are not yet supported");
        }
        const nofItemsInRow = CarouselUtils.getItemsBeforeColumnInRow(
            this.state.itemStates,
            column,
            row
        );
        if (nofItemsInRow === 0) {
            return;
        } else if (
            nofItemsInRow > column - this.displayConfig.columnStart
        ) {
            this.moveRow(row, 1);
        } else {
            this.setState({ activeDisplayColumn: column - 1 });
            this.scrollSelected();
        }
    }

    private handleNavRight(row: number, column: number, offset: number) {
        // TODO: Support offset > 1
        if (offset !== 1) {
            throw new Error("Nav offsets other than 1 are not yet supported");
        }
        const nofItemsInRow = CarouselUtils.getItemsAfterColumnInRow(
            this.state.itemStates,
            column,
            row
        );
        if (nofItemsInRow === 0) {
            return;
        } else if (this.displayConfig.columnEnd - column < nofItemsInRow) {
            this.moveRow(row, -1);
        } else {
            this.setState({ activeDisplayColumn: column + 1 });
            this.scrollSelected();
        }
    }

    private initialiseNavControls(props: CarouselProps): void {
        if (props.config.navControls.keyboard.enabled) {
            this.navControllers.push(
                new KeyboardNavController(
                    props.config.navControls.keyboard.keyMapping
                        ? props.config.navControls.keyboard.keyMapping
                        : DEVICE_NAV_KEYCODES_DEFAULT,
                    this
                )
            );
        }
        if (props.config.navControls.touch.enabled) {
            const touchNavController: TouchNavController = new TouchNavController(this,
                props.config.navControls.touch.eventBindElementId,
                props.config.navControls.touch.scrollLock);
            this.navControllers.push(touchNavController);
            this.itemTouchNavActionHandlers.push(touchNavController);
        }
        if (props.config.navControls.pointer.enabled) {
            const pointerNavController: PointerNavController = new PointerNavController(
                this,
                props.config.navControls.pointer.eventBindElementId,
                props.config.navControls.pointer.scrollLock
            );
            this.navControllers.push(pointerNavController);
            this.itemMouseNavActionHandlers.push(pointerNavController);
        }
    }

    private selectItemAt(row: number, column: number): void {
        if (CarouselUtils.isItemInView(row, column, this.displayConfig)) {
            this.setState({ activeDisplayColumn: column, activeDisplayRow: row });
            this.scrollSelected();
        }
    }

    private scrollSelected() {
        // Refs are not well suppored in type strong typed styled components
        // Alternative is to use a forward ref or a query selection as is done below
        if (this.props.config.navControls.autoScroll) {
            const carouselEl: any = (this.props.config.navControls.eventBindElementId) ? 
                        document.getElementById(this.props.config.navControls.eventBindElementId):
                        document;
            const selectedItemDiv = carouselEl !== null ? carouselEl.querySelector(".selected > .item") : undefined;
            if (selectedItemDiv) {
                selectedItemDiv.scrollIntoView({
                    block: this.props.config.navControls.autoScrollAlignment,
                    inline: this.props.config.navControls.autoScrollAlignment,
                    behavior: "smooth",
                });
            }          
        }
    }

    private moveColumn(column: number, offset: number) {
        const itemStates: Array<ItemState> = this.state.itemStates;
        CarouselUtils.getItemIndicesInColumn(itemStates, column).forEach(
            (i: number) => (itemStates[i].yOffset += offset)
        );
        this.updateItemStates(itemStates);
    }

    private moveRow(row: number, offset: number) {
        const itemStates: Array<ItemState> = this.state.itemStates;
        CarouselUtils.getItemIndicesInRow(itemStates, row).forEach(
            (i: number) => (itemStates[i].xOffset += offset)
        );
        this.updateItemStates(itemStates);
    }

    private updateItemStates(newItemStates: Array<ItemState>): void {
        if (this.props.config.displayConfig.enableLazyLoading) {
            // Default accepted relative offset is 1 (used if not configured)
            const acceptedRelativeOffset: number = this.props.config.displayConfig.lazyLoadingRelativeOffset ?
                this.props.config.displayConfig.lazyLoadingRelativeOffset : 1;
            newItemStates.forEach((newItemState: ItemState) => {
                // Once loaded, keep state
                newItemState.loadSrc = newItemState.loadSrc ? newItemState.loadSrc :
                    CarouselUtils.isItemInView(newItemState.yOffset, 
                        newItemState.xOffset, this.props.config.displayConfig) ||
                    CarouselUtils.isItemInOverrun(newItemState.yOffset, newItemState.xOffset, 
                        this.props.config.displayConfig).result ||
                    CarouselUtils.isItemInRange(this.state.activeDisplayRow, 
                        this.state.activeDisplayColumn, newItemState.yOffset, newItemState.xOffset,
                        acceptedRelativeOffset, acceptedRelativeOffset);
            });    
        }
        this.setState({ itemStates: newItemStates });
    }

    componentDidMount() {
        this.navControllers.forEach((navController: NavController) => navController.init());
        this.itemMouseNavActionHandlers.forEach((navController: INavItemActionHandler) =>
            navController.init()
        );
        this.itemTouchNavActionHandlers.forEach((navController: INavItemActionHandler) =>
            navController.init()
        );
        // for each item in view: set loadSrc: true
    }

    render() {

        return (
            <CarouselStyled style={this.styleConfig} display={this.displayConfig}>
                <div className="grid">
                    {this.state.itemStates.map((itemState: ItemState, index: number) => {
                        return (
                            <CarouselItem
                                key={index.toString()}
                                style={this.styleConfig.itemStyleConfig}
                                rowLabelStyleConfig={this.styleConfig.rowLabelStyleConfig}
                                mouseNavActionHandlers={this.itemMouseNavActionHandlers}
                                touchNavActionHandlers={this.itemTouchNavActionHandlers}
                                xNavOffset={itemState.xOffset}
                                yNavOffset={itemState.yOffset}
                                inView={CarouselUtils.isItemInView(
                                    itemState.yOffset,
                                    itemState.xOffset,
                                    this.displayConfig
                                )}
                                loadSrc={itemState.loadSrc}
                                inOverrun={
                                    CarouselUtils.isItemInOverrun(itemState.yOffset, itemState.xOffset, this.displayConfig)
                                        .result
                                }
                                overrunDirection={CarouselUtils.getOverrunDirectionDisplay(itemState, this.state.overrunDirectionDisplayState)}
                                selected={CarouselUtils.isItemSelected(
                                    itemState,
                                    this.state.activeDisplayRow,
                                    this.state.activeDisplayColumn
                                )}
                                config={itemState.config}
                            />
                        );
                    })}
                    <div id="grid-inner" className="grid-inner">
                        {this.props.config.styleConfig.rowLabelStyleConfig && 
                            this.props.config.rows.map((row: CarouselRowConfig, index: number) => {
                                return <CarouselRowLabel
                                    label={row.label}
                                    yNavOffset={index}
                                    style={this.props.config.styleConfig.rowLabelStyleConfig as CarouselRowLabelConfig}
                                    itemStyleConfig={this.props.config.styleConfig.itemStyleConfig}
                                />
                        })
                        }
                    </div>
                </div>
            </CarouselStyled>
        );
    }
}

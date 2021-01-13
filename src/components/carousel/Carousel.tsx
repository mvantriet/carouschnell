import * as React from "react";
import CarouselStyled from "./Carousel.styled";
import { CarouselItem } from "../carouselItem/CarouselItem";
import {CarouselConfig, CarouselItemConfig, CarouselDisplayConfig, 
    CarouselStyleConfig, CarouselRowConfig} from "../../config/CarouselConfig";
import {INavActionHandler, NAV_DIRECTION} from '../../navcontrols/common/INavActionHandler';
import {INavItemActionHandler} from '../../navcontrols/common/INavItemActionHandler';
import { NavController } from "../../navcontrols/common/NavController";
import {KeyboardNavController, DEVICE_NAV_KEYCODES_DEFAULT} from '../../navcontrols/keyboard/KeyboardNavController';
import {PointerNavController} from '../../navcontrols/pointer/PointerNavController';
import {TouchNavController} from '../../navcontrols/touch/TouchNavController';
import {CarouselUtils} from '../../utils/CarouselUtils';

export type ItemState = {
    config: CarouselItemConfig,
    xOffset: number;
    yOffset: number;
};

interface CarouselState {
    activeDisplayRow: number;
    activeDisplayColumn: number;
    itemStates: Array<ItemState>;
}

export type CarouselProps = {
    config: CarouselConfig;
};

export class Carousel extends React.Component<CarouselProps, CarouselState> implements INavActionHandler {

    private displayConfig: CarouselDisplayConfig;
    private enable2dNav: boolean;
    private styleConfig: CarouselStyleConfig;
    private navControllers: Array<NavController>;
    private itemNavActionHandlers: Array<INavItemActionHandler>;

    constructor(props: CarouselProps) {
        super(props);
        this.enable2dNav = props.config.navControls.enable2dNav;
        this.displayConfig = props.config.displayConfig;
        this.styleConfig = props.config.styleConfig;
        this.navControllers = [];
        this.itemNavActionHandlers = [];
        
        this.initialiseNavControls(this.props);

        this.state = {
            activeDisplayColumn: props.config.displayConfig.initialDisplayColumn,
            activeDisplayRow: props.config.displayConfig.initialDisplayRow,
            itemStates: this.initialiseItemStates(props),
        };
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
                    };
                })
            );
        });
        return itemStates;
    }

    handleNavControlDirectionAction(direction:NAV_DIRECTION, offset:number): void {
        switch(direction) {
            case NAV_DIRECTION.LEFT:
              this.handleNavLeft(offset);
              break;
            case NAV_DIRECTION.RIGHT:
              this.handleNavRight(offset);
              break;
            case NAV_DIRECTION.UP:
              this.handleNavUp(offset);
              break;
            case NAV_DIRECTION.DOWN:
              this.handleNavDown(offset);
              break;
            default:
              throw new Error('Unsupported NAV_DIRECTION action: ' + direction.toString());
        }
    }
    
    handleNavControlEnterCurrentSelectionAction(): void {
        this.handleItemAction(this.state.activeDisplayRow, this.state.activeDisplayColumn);
    }

    handleNavControlEnterSelectionAction(row:number, column: number): void {
        this.handleItemAction(row, column);
    }

    handleNavControlSelect(row:number, column: number): void {
        this.selectItemAt(row, column);
    }

    handleNavControlDeselect(): void {
        // TODO: Infer deselection based on dedicated flag rather than unreal values
        this.setState({activeDisplayColumn: -1, activeDisplayRow: -1});
    }

    private handleItemAction(row:number, column: number): void {
        if (row !== this.state.activeDisplayRow || column !== this.state.activeDisplayColumn) {
          throw new Error("Unexpected action for non-selected item, this is not yet supported");
        }
        const activeItems:Array<ItemState> = this.state.itemStates.filter((itemState:ItemState) => {
          return itemState.xOffset === this.state.activeDisplayColumn && itemState.yOffset === this.state.activeDisplayRow;
        })
        if (activeItems.length === 1) {
          // TODO: Abstract action per item, only one supported now is redirect
          window.location.href = activeItems[0].config.url;
        } else if (activeItems.length > 1) {
          throw new Error('Unexpected multiple active items found for: [' + 
            this.state.activeDisplayRow.toString() + 
            this.state.activeDisplayColumn.toString() + 
            '] in itemStates');
        }
    } 

    private handleNavDown(offset:number) {
        // TODO: Support offset > 1
        if (offset !== 1) {
          throw new Error('Nav offsets other than 1 are not yet supported')
        }
        const nofItemsInColumn = CarouselUtils.getItemsBelowRowInColumn(this.state.itemStates, 
            this.state.activeDisplayColumn, this.state.activeDisplayRow);
        if (nofItemsInColumn === 0) {
          return;
        }else if (this.enable2dNav && (this.displayConfig.rowEnd - this.state.activeDisplayRow < nofItemsInColumn)) {
          this.moveCurrentColumn(-1);
        } else {
          this.setState({activeDisplayRow: this.state.activeDisplayRow+1});
          this.scrollSelected();
        }
    }
    
    private handleNavUp(offset:number) {
        // TODO: Support offset > 1
        if (offset !== 1) {
          throw new Error('Nav offsets other than 1 are not yet supported')
        }
        const nofItemsInColumn = CarouselUtils.getItemsAboveRowInColumn(this.state.itemStates, 
            this.state.activeDisplayColumn, this.state.activeDisplayRow);
        if (nofItemsInColumn === 0) {
          return;
        } else if (this.enable2dNav && (nofItemsInColumn > this.state.activeDisplayRow - this.displayConfig.rowStart)) {
          this.moveCurrentColumn(1);
        } else {
          this.setState({activeDisplayRow: this.state.activeDisplayRow-1});
          this.scrollSelected();
        }
    }

    private handleNavLeft(offset: number) {
        // TODO: Support offset > 1
        if (offset !== 1) {
          throw new Error('Nav offsets other than 1 are not yet supported')
        }
        const nofItemsInRow = CarouselUtils.getItemsBeforeColumnInRow(this.state.itemStates, 
            this.state.activeDisplayColumn, this.state.activeDisplayRow);
        if (nofItemsInRow === 0) {
          return;
        } else if (nofItemsInRow > this.state.activeDisplayColumn - this.displayConfig.columnStart) {
          this.moveCurrentRow(1);
        } else {
          this.setState({activeDisplayColumn: this.state.activeDisplayColumn-1});
          this.scrollSelected();
        }
      }

    private handleNavRight(offset:number): void {
    }

    private initialiseNavControls(props: CarouselProps): void {
        if (props.config.navControls.keyboard.enabled) {
          this.navControllers.push(new KeyboardNavController(props.config.navControls.keyboard.keyMapping ? 
            props.config.navControls.keyboard.keyMapping : DEVICE_NAV_KEYCODES_DEFAULT, this));
        }
        if (props.config.navControls.touch.enabled) {
            this.navControllers.push(new TouchNavController(this, props.config.navControls.touch.eventBindElementId));
        }      
        if (props.config.navControls.pointer.enabled) {
            const pointerNavController:PointerNavController = new PointerNavController(this, props.config.navControls.pointer.eventBindElementId);
            this.navControllers.push(pointerNavController);
            this.itemNavActionHandlers.push(pointerNavController);
        }      
    }

    private selectItemAt(row:number, column:number): void {
        if (CarouselUtils.isItemInView(row, column, this.displayConfig)) {
          this.setState({activeDisplayColumn: column, activeDisplayRow: row});
          this.scrollSelected();
        }
    }
    
    private scrollSelected() {
        // Refs are not well suppored in type strong typed styled components
        // Alternative is to use a forward ref or a query selection as is done below
        const selectedItemDiv = document.querySelector('.selected > .item');
        if(selectedItemDiv) {
          selectedItemDiv.scrollIntoView({ block: "center", inline: 'center', behavior: 'smooth' })
        }
    }
    
    private moveCurrentColumn(offset: number) {
        const itemStates:Array<ItemState> = this.state.itemStates;
        CarouselUtils.getItemIndicesInColumn(itemStates, this.state.activeDisplayColumn)
          .forEach((i:number) => itemStates[i].yOffset += offset);
        this.setState({itemStates: itemStates})
    }

    private moveCurrentRow(offset: number) {
        const itemStates:Array<ItemState> = this.state.itemStates;
        CarouselUtils.getItemIndicesInRow(itemStates, this.state.activeDisplayRow)
          .forEach((i:number) => itemStates[i].xOffset += offset);
        this.setState({itemStates: itemStates})
    }    
    
    componentDidMount() {
        this.navControllers.forEach((navController:NavController) => navController.init());
        this.itemNavActionHandlers.forEach((navController:INavItemActionHandler) => navController.init());    
    }

    render() {
    return <CarouselStyled
                style={this.styleConfig}
                display={this.displayConfig}
            >
            <div className="grid">
            {
                    this.state.itemStates.map((itemState:ItemState, index:number) => {
                    return <CarouselItem key={index.toString()}
                        style={this.styleConfig.itemStyleConfig}
                        navActionHandlers={this.itemNavActionHandlers}
                        xNavOffset={itemState.xOffset} 
                        yNavOffset={itemState.yOffset}
                        inView={CarouselUtils.isItemInView(itemState.yOffset, itemState.xOffset, this.displayConfig)}
                        inOverrun={CarouselUtils.isItemInOverrun(itemState, this.displayConfig).result}
                        selected={CarouselUtils.isItemSelected(itemState, this.state.activeDisplayRow, this.state.activeDisplayColumn)} 
                        config={itemState.config} />
                    })
                }
            <div id="grid-inner" className="grid-inner"/>
            </div>
        </CarouselStyled>
    }
}

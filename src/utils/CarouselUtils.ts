import {ItemState} from '../components/carousel/Carousel';
import {CarouselDisplayConfig} from "../config/CarouselConfig";
import {NAV_DIRECTION} from "../navcontrols/common/INavActionHandler";

export type NavDirectionResult = {
    result: boolean,
    direction?: NAV_DIRECTION
}

export class CarouselUtils {

    /**
     * 
     * @param item 
     * @param activeRow 
     * @param activeColumn 
     */
    static isItemSelected(item:ItemState, activeRow:number, activeColumn:number): boolean {
        return item.xOffset === activeColumn && item.yOffset === activeRow;
    }

    /**
     * 
     * @param items 
     * @param column 
     * @param row 
     */
    static getItemsBelowRowInColumn(items:Array<ItemState>, column:number, row:number): number {
        return items
            .filter((itemState:ItemState):boolean => itemState.xOffset === column && itemState.yOffset > row).length;
    }

    /**
     * 
     * @param items 
     * @param column 
     * @param row 
     */
    static getItemsAboveRowInColumn(items:Array<ItemState>, column:number, row:number): number {
        return items
            .filter((itemState:ItemState):boolean => itemState.xOffset === column && itemState.yOffset < row).length;
    }

    /**
     * 
     * @param items 
     * @param column 
     * @param row 
     */
    static getItemsBeforeColumnInRow(items:Array<ItemState>, column:number, row:number): number {
        return items
            .filter((itemState:ItemState):boolean => itemState.yOffset === row && itemState.xOffset < column).length;
    }

    /**
     * 
     * @param items 
     * @param column 
     * @param row 
     */
    static getItemsAfterColumnInRow(items:Array<ItemState>, column:number, row:number): number {
        return items
            .filter((itemState:ItemState):boolean => itemState.yOffset === row && itemState.xOffset > column).length;
    }

    /**
     * 
     * @param items 
     * @param row 
     */
    static getItemIndicesInRow(items:Array<ItemState>, row:number): Array<number> {
        return items.map((itemState:ItemState,i:number):number => itemState.yOffset === row ? i : -1)
            .filter((i:number) => i > -1);
    }


    /**
     * 
     * @param items 
     * @param column 
     */
    static getItemIndicesInColumn(items:Array<ItemState>, column:number): Array<number> {
        return items.map((itemState:ItemState,i:number):number => itemState.xOffset === column ? i : -1)
            .filter((i:number) => i > -1)
    }

    /**
     * 
     * @param item 
     * @param displayConfig 
     */
    static isItemInView(row: number, column: number, displayConfig: CarouselDisplayConfig): boolean {
        return row >= displayConfig.rowStart && 
               row <= displayConfig.rowEnd &&
               column >= displayConfig.columnStart &&
               column <= displayConfig.columnEnd;
    }

    /**
     * 
     * @param item 
     * @param displayConfig 
     */
    static isItemInOverrun(item:ItemState, displayConfig: CarouselDisplayConfig): NavDirectionResult {
        if (item.yOffset < displayConfig.rowStart &&
            item.yOffset >= displayConfig.rowStart - displayConfig.rowOverrun &&
            item.xOffset >= displayConfig.columnStart && 
            item.xOffset <= displayConfig.columnEnd) {
                return {result: true, direction: NAV_DIRECTION.UP};
        } else if (item.yOffset > displayConfig.rowEnd &&
            item.yOffset <= displayConfig.rowEnd + displayConfig.rowOverrun &&
            item.xOffset >= displayConfig.columnStart && 
            item.xOffset <= displayConfig.columnEnd) {
                return {result: true, direction: NAV_DIRECTION.DOWN};
        } else if (item.xOffset < displayConfig.columnStart &&
            item.xOffset >= displayConfig.columnStart - displayConfig.columnOverrun &&
            item.yOffset >= displayConfig.rowStart && 
            item.yOffset <= displayConfig.rowEnd) {
                return {result: true, direction: NAV_DIRECTION.LEFT};
        } else if (item.xOffset > displayConfig.columnEnd &&
            item.xOffset <= displayConfig.columnEnd + displayConfig.columnOverrun &&
            item.yOffset >= displayConfig.rowStart && 
            item.yOffset <= displayConfig.rowEnd) {
                return {result: true, direction: NAV_DIRECTION.RIGHT};
        } else {
                return {result: false};
        }
    }

    /**
     * 
     * @param items 
     * @param selectedItem 
     */
    static getNeighbourDirections(items:Array<ItemState>, selectedItem:ItemState): Array<NAV_DIRECTION> {
        const out: Array<NAV_DIRECTION> = [];
        if (items.filter((item) => item.yOffset === selectedItem.yOffset && 
                                   item.xOffset < selectedItem.xOffset).length > 0) {
            out.push(NAV_DIRECTION.LEFT);
        }
        if (items.filter((item) => item.yOffset === selectedItem.yOffset && 
                                   item.xOffset > selectedItem.xOffset).length > 0) {
            out.push(NAV_DIRECTION.RIGHT);
        }
        if (items.filter((item) => item.xOffset === selectedItem.xOffset && 
                                   item.yOffset > selectedItem.yOffset).length > 0) {
            out.push(NAV_DIRECTION.DOWN);
        }
        if (items.filter((item) => item.xOffset === selectedItem.xOffset && 
                                   item.yOffset < selectedItem.yOffset).length > 0) {
            out.push(NAV_DIRECTION.UP);
        }
        return out;
    }
}
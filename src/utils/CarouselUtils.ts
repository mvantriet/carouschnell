import { ItemState, OverrunDirectionDisplay } from "../components/carousel/Carousel";
import { CarouselDisplayConfig } from "../config/CarouselConfig";
import { NAV_DIRECTION } from "../navcontrols/common/INavActionHandler";

export type NavDirectionResult = {
    result: boolean;
    direction: NAV_DIRECTION;
};

export class CarouselUtils {
    /**
     *
     * @param item
     * @param activeRow
     * @param activeColumn
     */
    static isItemSelected(item: ItemState, activeRow: number, activeColumn: number): boolean {
        return item.xOffset === activeColumn && item.yOffset === activeRow;
    }

    /**
     *
     * @param items
     * @param column
     * @param row
     */
    static getItemsBelowRowInColumn(items: Array<ItemState>, column: number, row: number): number {
        return items.filter(
            (itemState: ItemState): boolean =>
                itemState.xOffset === column && itemState.yOffset > row
        ).length;
    }

    /**
     *
     * @param items
     * @param column
     * @param row
     */
    static getItemsAboveRowInColumn(items: Array<ItemState>, column: number, row: number): number {
        return items.filter(
            (itemState: ItemState): boolean =>
                itemState.xOffset === column && itemState.yOffset < row
        ).length;
    }

    /**
     *
     * @param items
     * @param column
     * @param row
     */
    static getItemsBeforeColumnInRow(items: Array<ItemState>, column: number, row: number): number {
        return items.filter(
            (itemState: ItemState): boolean =>
                itemState.yOffset === row && itemState.xOffset < column
        ).length;
    }

    /**
     *
     * @param items
     * @param column
     * @param row
     */
    static getItemsAfterColumnInRow(items: Array<ItemState>, column: number, row: number): number {
        return items.filter(
            (itemState: ItemState): boolean =>
                itemState.yOffset === row && itemState.xOffset > column
        ).length;
    }

    /**
     *
     * @param items
     * @param row
     */
    static getItemIndicesInRow(items: Array<ItemState>, row: number): Array<number> {
        return items
            .map((itemState: ItemState, i: number): number => (itemState.yOffset === row ? i : -1))
            .filter((i: number) => i > -1);
    }

    /**
     *
     * @param items
     * @param column
     */
    static getItemIndicesInColumn(items: Array<ItemState>, column: number): Array<number> {
        return items
            .map((itemState: ItemState, i: number): number =>
                itemState.xOffset === column ? i : -1
            )
            .filter((i: number) => i > -1);
    }

    static isItemInRange(
        row: number,
        column: number,
        targetRow: number,
        targetColumn: number,
        maxRowOffset: number,
        maxColumnOffset: number
    ): boolean {
        return Math.abs(row - targetRow) <= maxRowOffset &&
            Math.abs(column - targetColumn) <= maxColumnOffset;
    }

    /**
     *
     * @param row
     * @param column
     * @param displayConfig
     */
    static isItemInView(
        row: number,
        column: number,
        displayConfig: CarouselDisplayConfig
    ): boolean {
        return (
            row >= displayConfig.rowStart &&
            row <= displayConfig.rowEnd &&
            column >= displayConfig.columnStart &&
            column <= displayConfig.columnEnd
        );
    }

    /**
     *
     * @param item
     * @param displayConfig
     */
    static isItemInOverrun(
        row: number,
        column: number,
        displayConfig: CarouselDisplayConfig
    ): NavDirectionResult {
        if (
            row < displayConfig.rowStart &&
            row >= displayConfig.rowStart - displayConfig.rowOverrun &&
            column >= displayConfig.columnStart &&
            column <= displayConfig.columnEnd
        ) {
            return { result: true, direction: NAV_DIRECTION.UP };
        } else if (
            row > displayConfig.rowEnd &&
            row <= displayConfig.rowEnd + displayConfig.rowOverrun &&
            column >= displayConfig.columnStart &&
            column <= displayConfig.columnEnd
        ) {
            return { result: true, direction: NAV_DIRECTION.DOWN };
        } else if (
            column < displayConfig.columnStart &&
            column >= displayConfig.columnStart - displayConfig.columnOverrun &&
            row >= displayConfig.rowStart &&
            row <= displayConfig.rowEnd
        ) {
            return { result: true, direction: NAV_DIRECTION.LEFT };
        } else if (
            column > displayConfig.columnEnd &&
            column <= displayConfig.columnEnd + displayConfig.columnOverrun &&
            row >= displayConfig.rowStart &&
            row <= displayConfig.rowEnd
        ) {
            return { result: true, direction: NAV_DIRECTION.RIGHT };
        } else {
            return { result: false, direction: NAV_DIRECTION.NA };
        }
    }

    /**
     *
     * @param item
     * @param dirDisplays
     */
    static getOverrunDirectionDisplay(
        item: ItemState,
        dirDisplays: Array<OverrunDirectionDisplay>
    ): NavDirectionResult {
        const matches: Array<OverrunDirectionDisplay> = dirDisplays.filter(
            (dirDisplay: OverrunDirectionDisplay) => {
                return dirDisplay.xOffset === item.xOffset && dirDisplay.yOffset === item.yOffset;
            }
        );
        return matches.length === 1
            ? { result: true, direction: matches[0].direction }
            : { result: false, direction: NAV_DIRECTION.NA };
    }

    /**
     *
     * @param items
     * @param selectedItem
     */
    static getNeighbourDirections(
        items: Array<ItemState>,
        selectedItem: ItemState
    ): Array<NAV_DIRECTION> {
        const out: Array<NAV_DIRECTION> = [];
        if (
            items.filter(
                (item) =>
                    item.yOffset === selectedItem.yOffset && item.xOffset < selectedItem.xOffset
            ).length > 0
        ) {
            out.push(NAV_DIRECTION.LEFT);
        }
        if (
            items.filter(
                (item) =>
                    item.yOffset === selectedItem.yOffset && item.xOffset > selectedItem.xOffset
            ).length > 0
        ) {
            out.push(NAV_DIRECTION.RIGHT);
        }
        if (
            items.filter(
                (item) =>
                    item.xOffset === selectedItem.xOffset && item.yOffset > selectedItem.yOffset
            ).length > 0
        ) {
            out.push(NAV_DIRECTION.DOWN);
        }
        if (
            items.filter(
                (item) =>
                    item.xOffset === selectedItem.xOffset && item.yOffset < selectedItem.yOffset
            ).length > 0
        ) {
            out.push(NAV_DIRECTION.UP);
        }
        return out;
    }
}

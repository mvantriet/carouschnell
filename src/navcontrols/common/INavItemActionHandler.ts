import { MouseEvent } from "react";

export interface INavItemActionHandler {
    init(): void;
    handleItemHoverEnter(event: MouseEvent, row: number, column: number): void;
    handleItemHoverExit(event: MouseEvent, row: number, column: number): void;
    handleItemHover(event: MouseEvent, row: number, column: number): void;
    handleItemOnClick(event: MouseEvent, row: number, column: number): void;
}

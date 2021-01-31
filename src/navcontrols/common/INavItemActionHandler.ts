import { MouseEvent, TouchEvent } from "react";

export interface INavItemActionHandler {
    init(): void;
}

export interface IMouseNavItemActionHandler extends INavItemActionHandler {
    handleItemHoverEnter(event: MouseEvent, row: number, column: number): void;
    handleItemHoverExit(event: MouseEvent, row: number, column: number): void;
    handleItemHover(event: MouseEvent, row: number, column: number): void;
    handleItemOnClick(event: MouseEvent, row: number, column: number): void;
}

export interface ITouchNavItemActionHandler extends INavItemActionHandler {
    handleItemOnTouchStart(event: TouchEvent, row: number, column: number): void;
    handleItemOnTouchMove(event: TouchEvent, row: number, column: number): void;
    handleItemOnTouchEnd(event: TouchEvent, row: number, column: number): void;
}

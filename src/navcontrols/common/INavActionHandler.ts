export enum NAV_DIRECTION {
    LEFT,
    RIGHT,
    UP,
    DOWN,
    NA,
}

export interface INavActionHandler {
    handleNavControlDirectionAction(direction: NAV_DIRECTION, offset: number): void;
    handleNavControlEnterCurrentSelectionAction(): void;
    handleNavControlEnterSelectionAction(row: number, column: number): void;
    handleNavControlOverrunDirectionAction(row: number, column: number): boolean;
    handleShowOverrunDirectionLabel(row: number, column: number): void;
    clearShowOverrunDirectionLabel(row: number, column: number): void;
    handleNavControlSelect(row: number, column: number): void;
    handleNavControlDeselect(): void;
}

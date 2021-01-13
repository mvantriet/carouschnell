import {MouseEvent} from "react";
import {NavController} from "../common/NavController";
import {NAV_DIRECTION} from "../common/INavActionHandler";
import {INavActionHandler} from "../common/INavActionHandler";
import {INavItemActionHandler} from "../common/INavItemActionHandler";
import {debounce} from "lodash";
const bsl = require('body-scroll-lock');

class PointerRecord {
    public x:number;
    public y:number;
    public initialised: boolean;

    constructor() {
        this.x = -1;
        this.y = -1;
        this.initialised = false;
    }

    set(x: number, y:number): void {
        this.x = x;
        this.y = y;
        this.initialised = true;
    }

    equalTo(other:PointerRecord): boolean {
        return this.x === other.x && this.y === other.y;
    }
}

export class PointerNavController extends NavController implements INavItemActionHandler {

    private lastMouseMove:PointerRecord;
    private lastSelectTriggeredMouseMove:PointerRecord;
    private mouseEventsRegistered:boolean;
    private wheelMinDeltaY:number = 80;
    private wheelMinDeltaX:number = this.wheelMinDeltaY;
    private eventBindElementId: string;

    constructor(handler: INavActionHandler, eventBindElementId: string) {
        super(handler);
        this.lastMouseMove = new PointerRecord();
        this.lastSelectTriggeredMouseMove = new PointerRecord();
        this.mouseEventsRegistered = false;
        this.eventBindElementId = eventBindElementId;
        /* TODO: Design and implement mouse click navigation, e.g:
            Click left: move left
            Double click left: enter
            Click right: move right */
    }

    init() {
        const innerGridElem:HTMLElement | null = document.getElementById(this.eventBindElementId);
        if (innerGridElem && !this.mouseEventsRegistered) {
            innerGridElem.addEventListener("mousemove", this._handleMouseMoveEvent.bind(this));
            document.addEventListener("wheel", debounce((evt) => this._handleWheel(evt), 150, {maxWait: 250}));
            this.mouseEventsRegistered = true;
        }
        bsl.disableBodyScroll(document.getElementById(this.eventBindElementId));
    }

    handleItemHoverEnter(_event:MouseEvent, row:number, column:number): void {
        // Prevent the situation where nav controls get mixed up due to
        // grid change or scroll events without pointer moves involved
        if (!this.lastMouseMove.equalTo(this.lastSelectTriggeredMouseMove)) {
                this.handler.handleNavControlSelect(row, column);
                this.lastSelectTriggeredMouseMove.x = this.lastMouseMove.x;
                this.lastSelectTriggeredMouseMove.y = this.lastMouseMove.y;    
        }
    }

    handleItemHoverExit(_event:MouseEvent, _row:number, _column:number): void {}

    handleItemHover(event: any, _row: number, _column: number): void {
        this._handleMouseMoveEvent(event);
    }
    
    handleItemOnClick(event:MouseEvent, row:number, column:number): void {
        console.log('item onclick: ', event);
        this.handler.handleNavControlEnterSelectionAction(row, column);
    }

    private _handleMouseMoveEvent(evt:any): void {
        const event:MouseEvent = evt as MouseEvent;
        this.lastMouseMove.set(event.screenX, event.screenY);
    }

    private _handleWheel(event:MouseWheelEvent): void {
        if ( Math.abs( event.deltaX ) > Math.abs( event.deltaY ) ) {
            if ( event.deltaX > this.wheelMinDeltaX ) {
                this.handler.handleNavControlDirectionAction(NAV_DIRECTION.RIGHT, 1);
            } else if (event.deltaX < -1*this.wheelMinDeltaX) {
                this.handler.handleNavControlDirectionAction(NAV_DIRECTION.LEFT, 1);
            }
        } else {
            if ( event.deltaY > this.wheelMinDeltaY ) {
                this.handler.handleNavControlDirectionAction(NAV_DIRECTION.DOWN, 1);
            } else if (event.deltaY < -1*this.wheelMinDeltaY) {
                this.handler.handleNavControlDirectionAction(NAV_DIRECTION.UP, 1);
            }
        }
    }
};
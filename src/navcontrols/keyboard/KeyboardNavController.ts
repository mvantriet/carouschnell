import {NavController} from "../common/NavController";
import {DEVICE_NAV_KEYCODES} from '../../config/CarouselConfig'
import {INavActionHandler} from "../common/INavActionHandler";
import {NAV_DIRECTION} from "../common/INavActionHandler";

export const DEVICE_NAV_KEYCODES_DEFAULT:DEVICE_NAV_KEYCODES = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13
}

interface IHash {
    [key: number] : NodeJS.Timeout;
}

export class KeyboardNavController extends NavController {

    private deviceKeyMapping: DEVICE_NAV_KEYCODES;
    private keysDown:IHash = {};
    private keyDownMaxWait: number = 300;
    private keyEventsRegistered: boolean;

    constructor(deviceKeyMapping: DEVICE_NAV_KEYCODES, handler: INavActionHandler) {
        super(handler);
        this.deviceKeyMapping = deviceKeyMapping;
        this.keyEventsRegistered = false;
    }

    init() {
        if (!this.keyEventsRegistered) {
            document.addEventListener("keydown", this.handleKeyDownEvent.bind(this));
            document.addEventListener("keyup", this.handleKeyUpEvent.bind(this));                
            this.keyEventsRegistered = true;
        }
    }

    private handleKeyDownEvent(evt:KeyboardEvent): void {
        evt.preventDefault();
        if (this.keysDown[evt.keyCode] === undefined) {
            this.keysDown[evt.keyCode] = setInterval(() => {
                this.processKeyPress(evt.keyCode)
            }, this.keyDownMaxWait);
        }
    }

    private handleKeyUpEvent(evt:KeyboardEvent): void {
        evt.preventDefault();
        if (this.keysDown[evt.keyCode]) {
            clearInterval(this.keysDown[evt.keyCode]);
            delete this.keysDown[evt.keyCode];
            this.processKeyPress(evt.keyCode)
        }
    }

    private processKeyPress(keyCode: number) {
        switch(keyCode) {
            case this.deviceKeyMapping.RIGHT:
                this.handler.handleNavControlDirectionAction(NAV_DIRECTION.RIGHT, 1);
                break;
            case this.deviceKeyMapping.LEFT:
                this.handler.handleNavControlDirectionAction(NAV_DIRECTION.LEFT, 1);
                break;
            case this.deviceKeyMapping.UP:
                this.handler.handleNavControlDirectionAction(NAV_DIRECTION.UP, 1);
                break;
            case this.deviceKeyMapping.DOWN:
                this.handler.handleNavControlDirectionAction(NAV_DIRECTION.DOWN, 1);
                break;
            case this.deviceKeyMapping.ENTER:
                this.handler.handleNavControlEnterCurrentSelectionAction();
                break;                    
            default:
                break;
        }
    }
}
import { NavController } from "../common/NavController";
import { DEVICE_NAV_KEYCODES } from "../../config/CarouselConfig";
import { INavActionHandler } from "../common/INavActionHandler";
import { NAV_DIRECTION } from "../common/INavActionHandler";

export const DEVICE_NAV_KEYCODES_DEFAULT: DEVICE_NAV_KEYCODES = {
    LEFT: [37],
    UP: [38],
    RIGHT: [39],
    DOWN: [40],
    ENTER: [13],
};

interface IHash {
    [key: number]: NodeJS.Timeout;
}

export class KeyboardNavController extends NavController {
    private deviceKeyMapping: DEVICE_NAV_KEYCODES;
    private keysDown: IHash = {};
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

    private handleKeyDownEvent(evt: KeyboardEvent): void {
        evt.preventDefault();
        if (this.keysDown[evt.keyCode] === undefined) {
            this.keysDown[evt.keyCode] = setInterval(() => {
                this.processKeyPress(evt.keyCode);
            }, this.keyDownMaxWait);
        }
    }

    private handleKeyUpEvent(evt: KeyboardEvent): void {
        evt.preventDefault();
        if (this.keysDown[evt.keyCode]) {
            clearInterval(this.keysDown[evt.keyCode]);
            delete this.keysDown[evt.keyCode];
            this.processKeyPress(evt.keyCode);
        }
    }

    private matchesKey(deviceKeyCode: Array<number>, keyCodeIn: number): boolean {
        return deviceKeyCode.includes(keyCodeIn);
    }

    private processKeyPress(keyCode: number) {
        if (this.matchesKey(this.deviceKeyMapping.RIGHT, keyCode)) {
            this.handler.handleNavControlDirectionAction(NAV_DIRECTION.RIGHT, 1);
        } else if (this.matchesKey(this.deviceKeyMapping.LEFT, keyCode)) {
            this.handler.handleNavControlDirectionAction(NAV_DIRECTION.LEFT, 1);
        } else if (this.matchesKey(this.deviceKeyMapping.UP, keyCode)) {
            this.handler.handleNavControlDirectionAction(NAV_DIRECTION.UP, 1);
        } else if (this.matchesKey(this.deviceKeyMapping.DOWN, keyCode)) {
            this.handler.handleNavControlDirectionAction(NAV_DIRECTION.DOWN, 1);
        } else if (this.matchesKey(this.deviceKeyMapping.ENTER, keyCode)) {
            this.handler.handleNavControlEnterCurrentSelectionAction();
        } else {
            // TODO: Design feedback interface to allow lib-user level component to trigger a UI element informing the app-user
            // she is pressing the wrong keys
        }
    }
}

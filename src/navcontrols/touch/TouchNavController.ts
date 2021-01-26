import { NavController } from "../common/NavController";
import { INavActionHandler } from "../common/INavActionHandler";
import { NAV_DIRECTION } from "../common/INavActionHandler";
const bsl = require("body-scroll-lock");

export class TouchNavController extends NavController {
    private xDown: number;
    private yDown: number;
    private waitForStart: boolean;
    private touchEventsRegistered: boolean;
    private swipeInTouchSequence: boolean;
    private nofTouchSequencesWithoutSwipe: number;
    private lastTouchEndTimestamp: number;
    private eventBindElementId: string;
    private scrollLock: boolean;

    constructor(handler: INavActionHandler, eventBindElementId: string, scrollLock: boolean) {
        super(handler);
        this.xDown = 0;
        this.yDown = 0;
        this.lastTouchEndTimestamp = 0;
        this.nofTouchSequencesWithoutSwipe = 0;
        this.waitForStart = true;
        this.swipeInTouchSequence = false;
        this.touchEventsRegistered = false;
        this.eventBindElementId = eventBindElementId;
        this.scrollLock = scrollLock;
    }

    init() {
        if (!this.touchEventsRegistered) {
            this.registerTouchEvents();
            this.touchEventsRegistered = true;
        }
        if (this.scrollLock) {
            bsl.disableBodyScroll(document.getElementById(this.eventBindElementId));
        }
    }

    private registerTouchEvents(): void {
        document.addEventListener("touchstart", (evt: TouchEvent) => {
            evt.preventDefault();
            evt.stopPropagation();
            this.xDown = evt.touches[0].clientX;
            this.yDown = evt.touches[0].clientY;
            this.waitForStart = false;
            this.swipeInTouchSequence = false;
        });
        document.addEventListener("touchmove", (evt: TouchEvent) => {
            evt.preventDefault();
            evt.stopPropagation();
            this.processSwipe(
                this.xDown,
                this.yDown,
                evt.touches[0].clientX,
                evt.touches[0].clientY
            );
            this.swipeInTouchSequence = true;
        });
        document.addEventListener("touchend", (evt: TouchEvent) => {
            evt.preventDefault();
            evt.stopPropagation();
            this.waitForStart = true;
            // Touch end without swipe
            if (!this.swipeInTouchSequence) {
                this.nofTouchSequencesWithoutSwipe++;
            } else {
                this.nofTouchSequencesWithoutSwipe = 0;
            }
            if (this.nofTouchSequencesWithoutSwipe > 1) {
                const timeDiff = new Date().getTime() - this.lastTouchEndTimestamp;
                if (timeDiff < 800) {
                    this.handler.handleNavControlEnterCurrentSelectionAction();
                }
            }
            this.lastTouchEndTimestamp = new Date().getTime();
        });
    }

    private processSwipe(xStart: number, yStart: number, xMove: number, yMove: number): void {
        if (this.waitForStart) {
            return;
        }
        const xDiff: number = xStart - xMove;
        const yDiff: number = yStart - yMove;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                this.handler.handleNavControlDirectionAction(NAV_DIRECTION.RIGHT, 1);
            } else {
                this.handler.handleNavControlDirectionAction(NAV_DIRECTION.LEFT, 1);
            }
        } else {
            if (yDiff > 0) {
                this.handler.handleNavControlDirectionAction(NAV_DIRECTION.DOWN, 1);
            } else {
                this.handler.handleNavControlDirectionAction(NAV_DIRECTION.UP, 1);
            }
        }
        this.waitForStart = true;
    }
}

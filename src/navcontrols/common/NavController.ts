import {INavActionHandler} from "./INavActionHandler";

export abstract class NavController {

    protected handler: INavActionHandler;

    constructor(handler: INavActionHandler) {
        this.handler = handler;
    }

    abstract init(): void;

}
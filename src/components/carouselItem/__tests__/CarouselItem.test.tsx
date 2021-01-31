import ReactDOM from "react-dom";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CarouselItem } from "../CarouselItem";
import { CarouselItemConfig } from "../../../config/CarouselConfig";
import { darkStyle } from "../../../styles/defaultStyles";
import { IMouseNavItemActionHandler } from "../../../navcontrols/common/INavItemActionHandler";
import { mock } from "jest-mock-extended";
import { ReactElement } from "react";
import { itemInView, getSelectedItem } from "../../../../test/testUtils";
import { NAV_DIRECTION } from "../../../navcontrols/common/INavActionHandler";

let container: HTMLDivElement;

beforeEach(() => {
    container = document.createElement("div");
    container.setAttribute("id", "root");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
});

function createCarouselItem(
    inView: boolean,
    inOverrun: boolean,
    isSelected: boolean,
    caption: string,
    navActionHandler?: IMouseNavItemActionHandler
): ReactElement {
    const itemConfig: CarouselItemConfig = {
        thumbnail: "",
        caption: caption,
        url: "",
    };

    return (
        <CarouselItem
            style={darkStyle.itemStyleConfig}
            mouseNavActionHandlers={navActionHandler ? [navActionHandler] : []}
            touchNavActionHandlers={[]}
            xNavOffset={0}
            yNavOffset={0}
            inView={inView}
            inOverrun={inOverrun}
            overrunDirection={{result: false, direction: NAV_DIRECTION.NA}}
            selected={isSelected}
            config={itemConfig}
        />
    );
}

test("test in view", async () => {
    ReactDOM.render(
        createCarouselItem(true, false, false, "1"),
        container
    );
    expect(itemInView("1")).toEqual(true);
    expect(getSelectedItem(container)).toEqual("");
});

test("test out view", async () => {
    ReactDOM.render(
        createCarouselItem(false, false, false, "1"),
        container
    );
    expect(itemInView("1")).toEqual(false);
    expect(getSelectedItem(container)).toEqual("");
});

test("test selected", async () => {
    ReactDOM.render(
        createCarouselItem(true, false, true, "1"),
        container
    );
    expect(itemInView("1")).toEqual(true);
    expect(getSelectedItem(container)).toEqual("1");
});

test("test in overrun", async () => {
    ReactDOM.render(
        createCarouselItem(false, true, false, "1"),
        container
    );
    expect(itemInView("1")).toEqual(true);
    expect(getSelectedItem(container)).toEqual("");
});

test("test click nav action", async () => {
    const navActionHandler = mock<IMouseNavItemActionHandler>();
    ReactDOM.render(createCarouselItem(true, false, true, "1", navActionHandler), container);
    expect(itemInView("1")).toEqual(true);
    const el: HTMLElement | null = screen.getByRole("img", { name: "1" }).closest(".item");
    if (el !== null) {
        fireEvent(
            el,
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            })
        );
        expect(navActionHandler.handleItemOnClick).toHaveBeenCalled();
    }
});

test("test hover nav actions", async () => {
    const navActionHandler = mock<IMouseNavItemActionHandler>();
    ReactDOM.render(createCarouselItem(true, false, true, "1", navActionHandler), container);
    expect(itemInView("1")).toEqual(true);
    const el: HTMLElement | null = screen.getByRole("img", { name: "1" }).closest(".item");
    if (el !== null) {
        fireEvent.mouseEnter(el);
        fireEvent.mouseLeave(el);
        fireEvent.mouseMove(el);
        expect(navActionHandler.handleItemHoverEnter).toHaveBeenCalled();
        expect(navActionHandler.handleItemHoverExit).toHaveBeenCalled();
        expect(navActionHandler.handleItemHover).toHaveBeenCalled();
    }
});

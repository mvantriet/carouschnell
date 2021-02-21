import React from "react";
import "./App.css";
import * as carouschnell from "../../../../src/index";

function App() {

    const thumbWidth: number = 400;
    const thumbHeight: number = 300;

    const config: any = {
        rows: [
            {
                initialColumn: 15,
                label: "Row1",
                items: Array.from(Array(30).keys()).map((i: number) => {
                    return {
                        caption: i.toString(),
                        thumbnail: _randomthumbnail(thumbWidth, thumbHeight, i.toString()),
                        url: "",
                    };
                })
            }
        ],
        displayConfig: {
            rowStart: 0,
            rowEnd: 0,
            rowOverrun: 0,
            columnStart: 0,
            columnEnd: 0,
            columnOverrun: 1,
            initialDisplayRow: 0,
            initialDisplayColumn: 0,
            enableLazyLoading: true,
            lazyLoadingRelativeOffset: 2
        },
        navControls: {
            enable2dNav: true,
            autoScroll: true,
            keyboard: {
                enabled: true,
                keyMapping: carouschnell.DEVICE_NAV_KEYCODES_DEFAULT,
            },
            pointer: {
                enabled: true,
                eventBindElementId: "carousel",
                scrollLock: true,
            },
            touch: {
                enabled: true,
                eventBindElementId: "carousel",
                scrollLock: true,
            },
        },
        styleConfig: carouschnell.defaultStyles.lightStyle,
    };

    return (
        <div className="App">
            <h1>Welcome!</h1>
            <p>Navigation controls: LRUD | WASD | Mouse | Swipe Up, Down, Left and Right</p>
            <div className="content" id="carousel">
                <carouschnell.Carousel config={config} />
            </div>
        </div>
    );
}

function _randomthumbnail(width: number, height: number, label: string): string {
    return `https://dummyimage.com/${width}x${height}/ffffff?text=${label}`;
}

export default App;

import React from "react";
import "./App.css";
import * as carouschnell from "../../../../src/index";

function App() {

    const thumbWidth: number = 400;
    const thumbHeight: number = 300;

    const config: any = {
        rows: [
            {
                initialColumn: 2,
                label: "Row1",
                items: [
                    {
                        caption: "4",
                        thumbnail: _getthumbnail(thumbWidth, thumbHeight),
                        url: "",
                    },
                    {
                        caption: "3",
                        thumbnail: _getthumbnail(thumbWidth, thumbHeight),
                        url: "",
                    },
                    {
                        caption: "2",
                        thumbnail: _getthumbnail(thumbWidth, thumbHeight),
                        url: "",
                    },
                    {
                        caption: "1",
                        thumbnail: _getthumbnail(thumbWidth, thumbHeight),
                        url: "",
                    },
                ],
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
        },
        navControls: {
            enable2dNav: true,
            autoScroll: true,
            keyboard: {
                enabled: false,
                keyMapping: carouschnell.DEVICE_NAV_KEYCODES_DEFAULT,
            },
            pointer: {
                enabled: false,
                eventBindElementId: "carousel",
                scrollLock: true,
            },
            touch: {
                enabled: false,
                eventBindElementId: "carousel",
                scrollLock: true,
            },
            customNavControllers: [{
                enabled: true,
                acceptorCb: (carousel:any) => {
                    // Slide left and right randomly every 1 seconds
                    setInterval(() => {
                        const direction = Math.floor(Math.random() * 2) === 0 ? carouschnell.NAV_DIRECTION.LEFT : carouschnell.NAV_DIRECTION.RIGHT
                        carousel.handleNavControlDirectionAction(direction,1);
                    }, 1000);
                }
            }]
        },
        styleConfig: carouschnell.defaultStyles.lightStyle,
    };

    return (
        <div className="App">
            <h1>Welcome!</h1>
            <p>Custom NavController example - switching slide every second randomly left or right</p>
            <p>Navigation controls: LRUD | WASD | Mouse | Swipe Up, Down, Left and Right</p>
            <div className="content" id="carousel">
                <carouschnell.Carousel config={config} />
            </div>
        </div>
    );
}

function _getthumbnail(width: number, height: number): string {
    return `http://placekitten.com/g/${width}/${height}`;
}

export default App;

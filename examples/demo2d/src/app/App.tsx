import React from "react";
import "./App.css";
import * as carouschnell from "../../../../src/index";

function App() {
    const [itemWidth, itemHeight] = _getMaxItemDimensions();

    const config: any = {
        rows: [
            {
                initialColumn: 3,
                label: "Row1",
                items: _genItems(1,4, itemWidth, itemHeight)
            },
            {
                initialColumn: 4,
                label: "Row2",
                items: _genItems(5,10, itemWidth, itemHeight)
            },
            {
                initialColumn: 4,
                label: "Row3",
                items: _genItems(11,16, itemWidth, itemHeight)
            },
            {
                initialColumn: 3,
                label: "Row4",
                items: _genItems(17,20, itemWidth, itemHeight)
            },
            {
                initialColumn: 3,
                label: "Row5",
                items: _genItems(21,24, itemWidth, itemHeight)
            },
        ],
        displayConfig: {
            rowStart: 1,
            rowEnd: 2,
            rowOverrun: 1,
            columnStart: 0,
            columnEnd: 3,
            columnOverrun: 1,
            initialDisplayRow: 1,
            initialDisplayColumn: 0,
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
        styleConfig: carouschnell.defaultStyles.darkStyle,
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

function _getMaxItemDimensions(): Array<number> {
    const defaultWidth = 200;
    const defaultHeight = 150;
    // use largest config
    let maxWidth = 0;
    let maxHeight = 0;
    const itemStyles = carouschnell.defaultStyles.darkStyle.itemStyleConfig.mediaTypes;
    Object.keys(itemStyles).forEach((mediaTypeKey: string) => {
        const mediaType: number = Number(mediaTypeKey);
        if (itemStyles[mediaType].itemSize.size.x > maxWidth) {
            maxWidth = itemStyles[mediaType].itemSize.size.x;
        }
        if (itemStyles[mediaType].itemSize.size.y > maxHeight) {
            maxHeight = itemStyles[mediaType].itemSize.size.y;
        }
    });
    maxWidth = maxWidth !== 0 ? maxWidth : defaultWidth;
    maxHeight = maxHeight !== 0 ? maxHeight : defaultHeight;

    return [maxWidth, maxHeight];
}

function _genItems(start: number, end: number, itemWidth: number, itemHeight: number): Array<any> {
    return Array.from(Array((end+1) - start).keys()).map((n: number) => n + start).reverse().map((i: number) => {
        return {
            caption: i.toString(),
            thumbnail: _randomthumbnail(itemWidth, itemHeight, i.toString()),
            url: "",
        };
    })
}

function _randomthumbnail(width: number, height: number, label: string): string {
    return `https://dummyimage.com/${width}x${height}/ffffff?text=${label}`;
}

export default App;

import React from "react";
import "./App.css";
import * as carouschnell from "../../../src/index";

function App() {
    const [itemWidth, itemHeight] = _getMaxItemDimensions();

    const config: any = {
        rows: [
            {
                initialColumn: 3,
                label: "Row1",
                items: [
                    { caption: "4", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "3", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "2", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "1", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                ],
            },
            {
                initialColumn: 4,
                label: "Row2",
                items: [
                    { caption: "11", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "10", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "9", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "8", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "7", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "6", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                ],
            },
            {
                initialColumn: 4,
                label: "Row3",
                items: [
                    { caption: "17", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "16", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "15", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "14", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "13", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "12", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                ],
            },
            {
                initialColumn: 3,
                label: "Row4",
                items: [
                    { caption: "21", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "20", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "19", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "18", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                ],
            },
            {
                initialColumn: 3,
                label: "Row5",
                items: [
                    { caption: "25", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "24", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "23", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                    { caption: "22", thumbnail: _randomthumbnail(itemWidth, itemHeight), url: "" },
                ],
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
            keyboard: {
                enabled: true,
                keyMapping: carouschnell.DEVICE_NAV_KEYCODES_DEFAULT,
            },
            pointer: {
                enabled: true,
                eventBindElementId: "carousel",
            },
            touch: {
                enabled: true,
                eventBindElementId: "root",
            },
        },
        styleConfig: carouschnell.defaultStyles.darkStyle,
    };

    return (
        <div className="App">
            <h1>Welcome!</h1>
            <p>Navigation controls: LRUD | WASD | Mouse | Swipe Up and Down</p>
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

function _randomthumbnail(width: number, height: number): string {
    return `https://picsum.photos/${width}/${height}?image=${Math.floor(
        Math.random() * 40
    ).toString()}`;
}

export default App;

import React from "react";
import "./App.css";
import * as carouschnell from "../../../../src/index";

function App() {
    const itemWidth = carouschnell.defaultStyles.mediaLibStyle.itemStyleConfig.mediaTypes[carouschnell.CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.size.x;
    const itemHeight = carouschnell.defaultStyles.mediaLibStyle.itemStyleConfig.mediaTypes[carouschnell.CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.size.y;

    const config: any = {
        rows: [
            {
                initialColumn: 9,
                label: "\u2023 Formula 1 Races",
                items: _genItems(1,10, itemWidth, itemHeight, 'f1gp')
            },
            {
                initialColumn: 9,
                label: "\u2023 NFL Matches",
                items: _genItems(20,30, itemWidth, itemHeight, 'nfl')
            },
            {
                initialColumn: 9,
                label: "\u2023 MotoGP",
                items: _genItems(60,70, itemWidth, itemHeight, 'motogp')
            },
            {
                initialColumn: 9,
                label: "\u2023 NHL Matches",
                items: _genItems(40,50, itemWidth, itemHeight, 'nhl')
            },
        ],
        displayConfig: {
            rowStart: 0,
            rowEnd: 3,
            rowOverrun: 0,
            columnStart: 0,
            columnEnd: 6,
            columnOverrun: 0,
            initialDisplayRow: 0,
            initialDisplayColumn: 0,
        },
        navControls: {
            enable2dNav: false,
            autoScroll: true,
            autoScrollAlignment: "end",
            eventBindElementId: "carousel",
            keyboard: {
                enabled: true,
                keyMapping: carouschnell.DEVICE_NAV_KEYCODES_DEFAULT
            },
            pointer: {
                enabled: true,
                scrollLock: true,
                eventBindElementId: "root" // bind to the root
            },
            touch: {
                enabled: true,
                scrollLock: true,
                eventBindElementId: "root" // bind to the root
            },
        },
        styleConfig: carouschnell.defaultStyles.mediaLibStyle,
    };

    const promoConfig: any = {
        rows: [
            {
                initialColumn: 0,
                label: "",
                items: [{
                    caption: "test123",
                    thumbnail: "https://res.cloudinary.com/demo/image/fetch/c_crop,h_400,w_1150/https://live.staticflickr.com/3013/5863697273_e941998e2f_h.jpg",
                    url: "",
                    innerHtml: `<table style="margin-left: 60px">
                    <tr>
                        <td>Welcome!</td>
                    </tr>
                    <tr>
                        <td style="color:yellow;">\u2603</td>
                    </tr>
                </table>`
                }]
            }
        ],
        displayConfig: {
            rowStart: 0,
            rowEnd: 0,
            rowOverrun: 0,
            columnStart: 0,
            columnEnd: 0,
            columnOverrun: 0,
            initialDisplayRow: 0,
            initialDisplayColumn: 0,
        },
        navControls: {
            enable2dNav: false,
            autoScroll: false,
            autoScrollAlignment: "start",
            eventBindElementId: "carouselPromo",
            keyboard: {
                enabled: false,
                keyMapping: carouschnell.DEVICE_NAV_KEYCODES_DEFAULT,
            },
            pointer: {
                enabled: false,
                scrollLock: true,
                eventBindElementId: "root"
            },
            touch: {
                enabled: false,
                scrollLock: true,
                eventBindElementId: "root"
            },
            customNavControllers: [{
                enabled: true,
                acceptorCb: (carousel:any) => {
                    // Slide promo carousel left and right randomly every 1 seconds
                    setInterval(() => {
                        const direction = Math.floor(Math.random() * 2) === 0 ? carouschnell.NAV_DIRECTION.LEFT : carouschnell.NAV_DIRECTION.RIGHT
                        carousel.handleNavControlDirectionAction(direction,1);
                    }, 1000);
                }
            }]
        },
        styleConfig: getPromoConfig(),
    };

    return (
        <div className="App">
            <div className="header" id="carouselPromos">
                <carouschnell.Carousel config={promoConfig} />
            </div>
            <div className="content" id="carousel">
                <carouschnell.Carousel config={config} />
            </div>
        </div>
    );
}


function _genItems(start: number, end: number, itemWidth: number, itemHeight: number, category: string): Array<any> {
    return Array.from(Array((end+1) - start).keys()).map((n: number) => n + start).reverse().map((i: number) => {
        return {
            caption: i.toString(),
            innerHtml: `<table>
                            <tr>
                                <td>Some Content</td>
                            </tr>
                            <tr>
                                <td style="font-size: 10pt; color:yellow;"> \u2605\u2605\u2605\u2605</td>
                            </tr>
                        </table>`,
            thumbnail: _randomthumbnail(itemWidth, itemHeight, i.toString(), category),
            url: "",
        };
    })
}

function _randomthumbnail(width: number, height: number, label: string, category: string): string {
    return `https://loremflickr.com/${width}/${height}/${category}?rnd=${label}`;
}

function getPromoConfig() {
    const defaultStyleMediaTypes = [];
    defaultStyleMediaTypes[carouschnell.CAROUSEL_STYLE_MEDIA_TYPE.SMALL] = {
        borderSizeActive: 0,
        borderRadiusSizeActive: 0,
        borderSizeOverrun: 0,
        borderRadiusSizeOverrun: 0,
        overrunExtraPaddingX: 0,
        overrunExtraPaddingY: 0,
        activeExtraPaddingX: 0,
        activeExtraPaddingTop: 0,
        activeExtraPaddingBottom: 0,
    };
    defaultStyleMediaTypes[carouschnell.CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP] = defaultStyleMediaTypes[carouschnell.CAROUSEL_STYLE_MEDIA_TYPE.SMALL];
    defaultStyleMediaTypes[carouschnell.CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN] = defaultStyleMediaTypes[carouschnell.CAROUSEL_STYLE_MEDIA_TYPE.SMALL];

const mediaLibStyleItemMediaTypes = [];
mediaLibStyleItemMediaTypes[carouschnell.CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN] = {
    itemSelectionFontSize: 0,
    itemBorderSize: 0,
    itemSelectedBorderSize: 0,
    borderRadius: 5,
    itemSize: {
        size: {
            x: 1150,
            y: 400,
        },
        margin: {
            x: 0,
            y: 0,
        },
    },
    itemSizeOverrun: {
        size: {
            x: 0,
            y: 0,
        },
        margin: {
            x: 0,
            y: 0,
        },
    },
    selectionStyleConfig: {
        relativeHeight: 50, 
        bottomRadiusSize: 5,
        fontSize: 40,
        topBorderShadowSize: 10,
    },
    overrunDirectionDisplay: {
        size: 8
    }
};
mediaLibStyleItemMediaTypes[carouschnell.CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP] = mediaLibStyleItemMediaTypes[carouschnell.CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN]
mediaLibStyleItemMediaTypes[carouschnell.CAROUSEL_STYLE_MEDIA_TYPE.SMALL] = {
    itemSelectionFontSize: 0,
    itemBorderSize: 0,
    itemSelectedBorderSize: 0,
    borderRadius: 5,
    itemSize: {
        size: {
            x: 575,
            y: 200,
        },
        margin: {
            x: 0,
            y: 0,
        },
    },
    itemSizeOverrun: {
        size: {
            x: 0,
            y: 0,
        },
        margin: {
            x: 0,
            y: 0,
        },
    },
    selectionStyleConfig: {
        relativeHeight: 70, 
        bottomRadiusSize: 5,
        fontSize: 20,
        topBorderShadowSize: 10,
    },
    overrunDirectionDisplay: {
        size: 8
    }
};

    return {
    itemStyleConfig: {
        theme: {
            itemBorderColor: "#3b4351",
            itemBackgroundColor: "transparent",
            itemSelectedBorderColor: "white",
            itemBorderShadowColor: "#3b4351",
            itemSelectionFontColor: "white",
            itemSelectionOpacity: 90,
            itemSelectionBackgroundColor: "transparent",
            itemSelectionForegroundColor: "white",
            itemInOverrunOpacity: 60,
            initialOpacityOverrunDirectionDisplay: 0.7,
            overrunDirectionDisplayColor: "3b4351"
        },
        mediaTypes: mediaLibStyleItemMediaTypes,
    },
    theme: {
        backgroundColorActive: "#212020",
        borderColorActive: "#212020",
        backgroundColorOverrun: "#212020",
        borderColorOverrun: "#212020",
        fontFamily: "'PT Sans', sans-serif",
        fontWeight: 300,
    },
    mediaTypes: defaultStyleMediaTypes,
    };
}

export default App;

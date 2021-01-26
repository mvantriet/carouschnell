import {
    CarouselStyleConfig,
    CarouselItemStyleConfigMediaTypes,
    CarouselStyleConfigMediaTypes,
    CarouselStyleConfigItemSize,
    CAROUSEL_STYLE_MEDIA_TYPE,
} from "../config/CarouselConfig";

/**
 * Dark style
 */

const defaultItemSizeSmall: CarouselStyleConfigItemSize = {
    size: {
        x: 100,
        y: 75,
    },
    margin: {
        x: 10,
        y: 10,
    },
};

const defaultItemSizeDesktop: CarouselStyleConfigItemSize = {
    size: {
        x: 200,
        y: 150,
    },
    margin: {
        x: 20,
        y: 20,
    },
};

const defaultItemSizeBigscreen: CarouselStyleConfigItemSize = {
    size: {
        x: 200,
        y: 150,
    },
    margin: {
        x: 20,
        y: 20,
    },
};

const defaultStyleMediaTypes: CarouselStyleConfigMediaTypes = [];
defaultStyleMediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL] = {
    borderSizeActive: 1,
    borderRadiusSizeActive: 25,
    borderSizeOverrun: 0,
    borderRadiusSizeOverrun: 0,
    overrunExtraPaddingX: 10,
    overrunExtraPaddingY: 5,
    activeExtraPaddingX: 15,
    activeExtraPaddingTop: 20,
    activeExtraPaddingBottom: 25,
};

defaultStyleMediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP] = {
    borderSizeActive: 1,
    borderRadiusSizeActive: 25,
    borderSizeOverrun: 0,
    borderRadiusSizeOverrun: 0,
    overrunExtraPaddingX: 10,
    overrunExtraPaddingY: 5,
    activeExtraPaddingX: 10,
    activeExtraPaddingTop: 20,
    activeExtraPaddingBottom: 5,
};

defaultStyleMediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN] = {
    borderSizeActive: 1,
    borderRadiusSizeActive: 25,
    borderSizeOverrun: 0,
    borderRadiusSizeOverrun: 0,
    overrunExtraPaddingX: 10,
    overrunExtraPaddingY: 5,
    activeExtraPaddingX: 10,
    activeExtraPaddingTop: 20,
    activeExtraPaddingBottom: 25,
};

const defaultStyleItemMediaTypes: CarouselItemStyleConfigMediaTypes = [];
defaultStyleItemMediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL] = {
    itemSelectionFontSize: 14,
    itemBorderSize: 1,
    itemSelectedBorderSize: 4,
    borderRadius: 15,
    itemSize: defaultItemSizeSmall,
    itemSizeOverrun: {
        size: {
            x: defaultItemSizeSmall.size.x - 32,
            y: defaultItemSizeSmall.size.y - 24,
        },
        margin: {
            x: defaultItemSizeSmall.margin.x,
            y: defaultItemSizeSmall.margin.y,
        },
    },
    selectionStyleConfig: {
        bottomRadiusSize: 20,
        fontSize: 10,
        topBorderShadowSize: 20,
    },
    overrunDirectionDisplay: {
        size: 17
    }
};
defaultStyleItemMediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN] = {
    itemSelectionFontSize: 14,
    itemBorderSize: 2,
    itemSelectedBorderSize: 6,
    borderRadius: 25,
    itemSize: defaultItemSizeBigscreen,
    itemSizeOverrun: {
        size: {
            x: defaultItemSizeBigscreen.size.x - 64,
            y: defaultItemSizeBigscreen.size.y - 48,
        },
        margin: {
            x: defaultItemSizeBigscreen.margin.x,
            y: defaultItemSizeBigscreen.margin.y,
        },
    },
    selectionStyleConfig: {
        bottomRadiusSize: 20,
        fontSize: 16,
        topBorderShadowSize: 20,
    },
    overrunDirectionDisplay: {
        size: 35
    }
};
defaultStyleItemMediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP] = {
    itemSelectionFontSize: 14,
    itemBorderSize: 2,
    itemSelectedBorderSize: 6,
    borderRadius: 25,
    itemSize: defaultItemSizeDesktop,
    itemSizeOverrun: {
        size: {
            x: defaultItemSizeDesktop.size.x - 32,
            y: defaultItemSizeDesktop.size.y - 24,
        },
        margin: {
            x: defaultItemSizeDesktop.margin.x,
            y: defaultItemSizeDesktop.margin.y,
        },
    },
    selectionStyleConfig: {
        bottomRadiusSize: 20,
        fontSize: 16,
        topBorderShadowSize: 20,
    },
    overrunDirectionDisplay: {
        size: 35
    }
};

/**
 * Dark style
 */
export const darkStyle: CarouselStyleConfig = {
    itemStyleConfig: {
        theme: {
            itemBorderColor: "white",
            itemBackgroundColor: "transparent",
            itemSelectedBorderColor: "green",
            itemBorderShadowColor: "black",
            itemSelectionFontColor: "white",
            itemSelectionBackgroundColor: "black",
            itemSelectionForegroundColor: "white",
            itemInOverrunOpacity: 60,
            initialOpacityOverrunDirectionDisplay: 0.7
        },
        mediaTypes: defaultStyleItemMediaTypes,
    },
    theme: {
        backgroundColorActive: "black",
        borderColorActive: "green",
        backgroundColorOverrun: "black",
        borderColorOverrun: "green",
        fontFamily: "muli, sans-serif",
        fontWeight: 300,
    },
    mediaTypes: defaultStyleMediaTypes,
};

/**
 * TODO: Light style
 */

export const defaultStyles = {
    darkStyle: darkStyle,
    // Add new default styles here
};

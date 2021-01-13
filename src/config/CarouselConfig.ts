export type CarouselItemConfig = {
    thumbnail: string;
    caption: string;
    url: string;
};

export type CarouselRowConfig = {
    label: string;
    initialColumn: number;
    items: Array<CarouselItemConfig>;
};

export type CarouselDisplayConfig = {
    rowStart: number;
    rowEnd: number;
    rowOverrun: number;
    columnStart: number;
    columnEnd: number;
    columnOverrun: number;
    initialDisplayRow: number;
    initialDisplayColumn: number;
};

export type DEVICE_NAV_KEYCODES = {
    UP: number;
    DOWN: number;
    LEFT: number;
    RIGHT: number;
    ENTER: number;
};

export type NavControlKeyBoardConfig = {
    enabled: boolean;
    keyMapping?: DEVICE_NAV_KEYCODES;
};

export type NavControlPointerConfig = {
    enabled: boolean;
    eventBindElementId: string;
};

export type NavControlTouchConfig = {
    enabled: boolean;
    eventBindElementId: string;
};

export type NavControlsConfig = {
    enable2dNav: boolean;
    keyboard: NavControlKeyBoardConfig;
    pointer: NavControlPointerConfig;
    touch: NavControlTouchConfig;
};

export type CarouselItemStyleConfigItemSize = {
    x: number;
    y: number;
};

export type CarouselStyleConfigItemSize = {
    size: CarouselItemStyleConfigItemSize;
    margin: CarouselItemStyleConfigItemSize;
};

export type CarouselStyleConfigTheme = {
    backgroundColorActive: string;
    borderColorActive: string;
    backgroundColorOverrun: string;
    borderColorOverrun: string;
    fontFamily: string;
    fontWeight: number;
};

export type CarouselItemStyleConfigTheme = {
    itemBorderColor: string;
    itemBackgroundColor: string;
    itemSelectedBorderColor: string;
    itemBorderShadowColor: string;
    itemSelectionFontColor: string;
    itemSelectionBackgroundColor: string;
    itemSelectionForegroundColor: string;
    itemInOverrunOpacity: number; // percentage
};

export type CarouselStyleConfigMediaType = {
    borderSizeActive: number; // pxs
    borderRadiusSizeActive: number; // pxs
    borderSizeOverrun: number; // pxs
    borderRadiusSizeOverrun: number; // pxs
    overrunExtraPaddingX: number; // pxs
    overrunExtraPaddingY: number; // pxs
    activeExtraPaddingX: number; // pxs
    activeExtraPaddingTop: number; // pxs
    activeExtraPaddingBottom: number; // pxs
};

export type CarouselItemStyleConfigMediaType = {
    itemSize: CarouselStyleConfigItemSize;
    itemSizeOverrun: CarouselStyleConfigItemSize;
    itemSelectionFontSize: number; // pts
    itemBorderSize: number; // pxs
    itemSelectedBorderSize: number; // pxs
    borderRadius: number; // pxs
    selectionStyleConfig: CarouselItemSelectionOverlayMediaTypeConfig;
};

export type CarouselItemStyleConfigMediaTypes = {
    [mediaType: number]: CarouselItemStyleConfigMediaType;
};

export type CarouselStyleConfigMediaTypes = {
    [mediaType: number]: CarouselStyleConfigMediaType;
};

export enum CAROUSEL_STYLE_MEDIA_TYPE {
    SMALL = 0,
    DESKTOP = 1,
    BIGSCREEN = 2,
}

export type CarouselItemSelectionOverlayMediaTypeConfig = {
    bottomRadiusSize: number;
    fontSize: number;
    topBorderShadowSize: number;
};

export type CarouselItemStyleConfig = {
    theme: CarouselItemStyleConfigTheme;
    mediaTypes: CarouselItemStyleConfigMediaTypes;
};

export type CarouselStyleConfig = {
    theme: CarouselStyleConfigTheme;
    mediaTypes: CarouselStyleConfigMediaTypes;
    itemStyleConfig: CarouselItemStyleConfig;
};

export type CarouselConfig = {
    rows: Array<CarouselRowConfig>;
    displayConfig: CarouselDisplayConfig;
    navControls: NavControlsConfig;
    styleConfig: CarouselStyleConfig;
};
import {
    CarouselItemStyleConfig,
    CarouselDisplayConfig,
    CAROUSEL_STYLE_MEDIA_TYPE,
    CarouselRowLabelConfig,
} from "../config/CarouselConfig";

export class StyleUtils {
    static calcXSpace(
        itemStyleConfig: CarouselItemStyleConfig,
        displayConfig: CarouselDisplayConfig,
        mediaType: CAROUSEL_STYLE_MEDIA_TYPE
    ): number {
        return (
            this.calcActiveXSpace(itemStyleConfig, displayConfig, mediaType) +
            this.calcOverrunXSpace(itemStyleConfig, displayConfig, mediaType)
        );
    }

    static calcYSpace(
        itemStyleConfig: CarouselItemStyleConfig,
        rowLabelStyleConfig: CarouselRowLabelConfig | undefined,
        displayConfig: CarouselDisplayConfig,
        mediaType: CAROUSEL_STYLE_MEDIA_TYPE
    ): number {
        return (
            this.calcActiveYSpace(itemStyleConfig, rowLabelStyleConfig, displayConfig, mediaType) +
            this.calcOverrunYSpace(itemStyleConfig, displayConfig, mediaType) * 2
        );
    }

    static calcOverrunXSpace(
        itemStyleConfig: CarouselItemStyleConfig,
        displayConfig: CarouselDisplayConfig,
        mediaType: CAROUSEL_STYLE_MEDIA_TYPE
    ): number {
        return (
            (itemStyleConfig.mediaTypes[mediaType].itemSize.size.x +
                itemStyleConfig.mediaTypes[mediaType].itemSize.margin.x) *
            displayConfig.columnOverrun
        );
    }

    static calcOverrunYSpace(
        itemStyleConfig: CarouselItemStyleConfig,
        displayConfig: CarouselDisplayConfig,
        mediaType: CAROUSEL_STYLE_MEDIA_TYPE
    ): number {
        return (
            (itemStyleConfig.mediaTypes[mediaType].itemSize.size.y +
                itemStyleConfig.mediaTypes[mediaType].itemSize.margin.y) *
            displayConfig.rowOverrun
        );
    }

    static calcActiveXSpace(
        itemStyleConfig: CarouselItemStyleConfig,
        displayConfig: CarouselDisplayConfig,
        mediaType: CAROUSEL_STYLE_MEDIA_TYPE
    ): number {
        return (
            (itemStyleConfig.mediaTypes[mediaType].itemSize.size.x +
                itemStyleConfig.mediaTypes[mediaType].itemSize.margin.x) *
            (1 + displayConfig.columnEnd - displayConfig.columnStart)
        );
    }

    static calcActiveYSpace(
        itemStyleConfig: CarouselItemStyleConfig,
        rowLabelStyleConfig: CarouselRowLabelConfig | undefined,
        displayConfig: CarouselDisplayConfig,
        mediaType: CAROUSEL_STYLE_MEDIA_TYPE
    ): number {
        return (
            (itemStyleConfig.mediaTypes[mediaType].itemSize.size.y +
                itemStyleConfig.mediaTypes[mediaType].itemSize.margin.y + this.calcRowLabelYSpace(rowLabelStyleConfig, mediaType)) *
            (displayConfig.rowEnd - (displayConfig.rowStart - 1))
        );
    }

    static calcRowLabelYSpace(rowLabelStyleConfig: CarouselRowLabelConfig | undefined, mediaType: CAROUSEL_STYLE_MEDIA_TYPE): number {
        return (rowLabelStyleConfig ? rowLabelStyleConfig.mediaTypes[mediaType].fontSize + rowLabelStyleConfig.mediaTypes[mediaType].paddingBottom +
            rowLabelStyleConfig.mediaTypes[mediaType].paddingTop : 0);
    }

    static calcItemYSpace(itemStyleConfig: CarouselItemStyleConfig, mediaType: CAROUSEL_STYLE_MEDIA_TYPE): number {
        return itemStyleConfig.mediaTypes[mediaType].itemSize.size.y + itemStyleConfig.mediaTypes[mediaType].itemSize.margin.y;
    }
}

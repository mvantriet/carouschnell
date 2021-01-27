import * as styled from "styled-components";
import { CarouselItemStyleConfig, CAROUSEL_STYLE_MEDIA_TYPE } from "../../config/CarouselConfig";
import { NAV_DIRECTION } from "../../navcontrols/common/INavActionHandler";

export type CarouselItemStyledProps = {
    selected: boolean;
    inView: boolean;
    inOverrun: boolean;
    xNavOffset: number;
    yNavOffset: number;
    thumbnailUrl: string;
    style: CarouselItemStyleConfig;
};

export type CarouselItemSelectedOverlayStyledProps = {
    // TODO: Split into separate config
    style: CarouselItemStyleConfig;
};

export type CarouselItemOverrunOverlayStyledProps = {
    // TODO: Split into separate config
    style: CarouselItemStyleConfig;
    direction: NAV_DIRECTION
}

export const CarouselItemStyled = styled.default.div<CarouselItemStyledProps>`
    display: ${(props) => (props.inView || props.inOverrun ? "inline-block" : "none")};
    .item {
        overflow-wrap: break-word;
        word-wrap: break-word;
        hyphens: auto;
        background-size: cover;
        background-position: center; 
        background-repeat: no-repeat;
        box-shadow: 0px 1vh 2vh #000;      
        text-align: center;
        position: absolute;
        height: ${(props) =>
            props.inOverrun
                ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSizeOverrun.size.y
                : props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.size.y}px;
        width: ${(props) =>
            props.inOverrun
                ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSizeOverrun.size.x
                : props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.size.x}px;
        margin-top: ${(props) =>
            props.inOverrun
                ? Math.floor(
                      (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.size.y -
                          props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSizeOverrun
                              .size.y) /
                          2
                  )
                : 0}px;
        margin-left: ${(props) =>
            props.inOverrun
                ? Math.floor(
                      (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.size.x -
                          props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSizeOverrun
                              .size.x) /
                          2
                  )
                : 0}px;

        background-color: ${(props) => props.style.theme.itemBackgroundColor};
        border-radius: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].borderRadius}px;
        border: ${(props) =>
            props.selected
                ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSelectedBorderSize
                : props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL]
                      .itemBorderSize}px solid ${(props) =>
    props.style.theme.itemSelectedBorderColor};
        transition-duration: 200ms;
        transform: translate(${(props) =>
            (
                props.xNavOffset *
                (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.size.x +
                    props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.margin.x)
            ).toString()}px,
            ${(props) =>
                (
                    props.yNavOffset *
                    (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.size.y +
                        props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.margin.y)
                ).toString()}px);
        opacity: ${(props) => (props.inOverrun ? props.style.theme.itemInOverrunOpacity : 100)}%;
        img {
            width: ${(props) =>
                props.inOverrun
                    ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSizeOverrun.size.x
                    : props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.size.x}px;
            height: ${(props) =>
                props.inOverrun
                    ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSizeOverrun.size.y
                    : props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.size.y}px;
            border-radius: ${(props) =>
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].borderRadius}px;
        }

        @media (min-width: 1024px) {
            height: ${(props) =>
                props.inOverrun
                    ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSizeOverrun.size
                          .y
                    : props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.size.y}px;
            width: ${(props) =>
                props.inOverrun
                    ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSizeOverrun.size
                          .x
                    : props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.size.x}px;
            margin-top: ${(props) =>
                props.inOverrun
                    ? Math.floor(
                          (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.size
                              .y -
                              props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP]
                                  .itemSizeOverrun.size.y) /
                              2
                      )
                    : 0}px;
            margin-left: ${(props) =>
                props.inOverrun
                    ? Math.floor(
                          (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.size
                              .x -
                              props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP]
                                  .itemSizeOverrun.size.x) /
                              2
                      )
                    : 0}px;

            border: ${(props) =>
                props.selected
                    ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP]
                          .itemSelectedBorderSize
                    : props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP]
                          .itemBorderSize}px solid ${(props) =>
    props.style.theme.itemSelectedBorderColor};
            border-radius: ${(props) =>
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].borderRadius}px;
            transform: translate(${(props) =>
                (
                    props.xNavOffset *
                    (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.size.x +
                        props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.margin.x)
                ).toString()}px,
                ${(props) =>
                    (
                        props.yNavOffset *
                        (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.size.y +
                            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize
                                .margin.y)
                    ).toString()}px); 
            img {
                width: ${(props) =>
                    props.inOverrun
                        ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSizeOverrun
                              .size.x
                        : props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.size
                              .x}px;
                height: ${(props) =>
                    props.inOverrun
                        ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSizeOverrun
                              .size.y
                        : props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.size
                              .y}px;
                border-radius: ${(props) =>
                    props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].borderRadius}px;
            }
        }

        @media (min-width: 1366px) {
            height: ${(props) =>
                props.inOverrun
                    ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSizeOverrun
                          .size.y
                    : props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.size
                          .y}px;
            width: ${(props) =>
                props.inOverrun
                    ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSizeOverrun
                          .size.x
                    : props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.size
                          .x}px;
            margin-top: ${(props) =>
                props.inOverrun
                    ? Math.floor(
                          (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.size
                              .y -
                              props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN]
                                  .itemSizeOverrun.size.y) /
                              2
                      )
                    : 0}px;
            margin-left: ${(props) =>
                props.inOverrun
                    ? Math.floor(
                          (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.size
                              .x -
                              props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN]
                                  .itemSizeOverrun.size.x) /
                              2
                      )
                    : 0}px;
            border: ${(props) =>
                props.selected
                    ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN]
                          .itemSelectedBorderSize
                    : props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN]
                          .itemBorderSize}px solid ${(props) =>
    props.style.theme.itemSelectedBorderColor};
            border-radius: ${(props) =>
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].borderRadius}px;
            transform: translate(${(props) =>
                (
                    props.xNavOffset *
                    (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.size.x +
                        props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.margin
                            .x)
                ).toString()}px,
                ${(props) =>
                    (
                        props.yNavOffset *
                        (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.size
                            .y +
                            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize
                                .margin.y)
                    ).toString()}px);
            img {
                width: ${(props) =>
                    props.inOverrun
                        ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN]
                              .itemSizeOverrun.size.x
                        : props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.size
                              .x}px;
                height: ${(props) =>
                    props.inOverrun
                        ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN]
                              .itemSizeOverrun.size.y
                        : props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.size
                              .y}px;
                border-radius: ${(props) =>
                    props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].borderRadius}px;
            }
        }

        .item-enter {
            opacity: 0;
        }
        .item-enter-active {
            opacity: 1;
            transition: opacity 200ms;
        }
        .item-exit {
            opacity: 1;
        }
        .item-exit-active {
            opacity: 0;
            transition: opacity 200ms;
        }
    }
`;

export const CarouselItemSelectedOverlayStyled = styled.default
    .div<CarouselItemSelectedOverlayStyledProps>`
    width: 100%;
    height: ${(props) => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].selectionStyleConfig
        .relativeHeight}%;
    position: absolute;
    box-shadow: 0px 0px 20px 5px ${(props) =>
        props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].selectionStyleConfig
            .topBorderShadowSize}px; 
    top: ${(props) => 100 - props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].selectionStyleConfig
        .relativeHeight}%;
    left: 0;
    color: ${(props) => props.style.theme.itemSelectionFontColor};
    background-color: ${(props) => props.style.theme.itemSelectionBackgroundColor};
    border-bottom-left-radius: ${(props) =>
        props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].selectionStyleConfig
            .bottomRadiusSize}px;
    border-bottom-right-radius: ${(props) =>
        props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].selectionStyleConfig
            .bottomRadiusSize}px;
    font-size: ${(props) =>
        props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].selectionStyleConfig.fontSize}px;

    @media (min-width: 1024px) {
        height: ${(props) => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].selectionStyleConfig
            .relativeHeight}%;
        top: ${(props) => 100 - props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].selectionStyleConfig
            .relativeHeight}%;
        box-shadow: 0px 0px 20px 5px ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].selectionStyleConfig
                .topBorderShadowSize}px; 
        border-bottom-left-radius: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].selectionStyleConfig
                .bottomRadiusSize}px;
        border-bottom-right-radius: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].selectionStyleConfig
                .bottomRadiusSize}px;
        font-size: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].selectionStyleConfig
                .fontSize}px;
    }

    @media (min-width: 1366px) {
        height: ${(props) => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].selectionStyleConfig
            .relativeHeight}%;
        top: ${(props) => 100 - props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].selectionStyleConfig
            .relativeHeight}%;
        box-shadow: 0px 0px 20px 5px ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].selectionStyleConfig
                .topBorderShadowSize}px; 
        border-bottom-left-radius: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].selectionStyleConfig
                .bottomRadiusSize}px;
        border-bottom-right-radius: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].selectionStyleConfig
                .bottomRadiusSize}px;
        font-size: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].selectionStyleConfig
                .fontSize}px;
    }

    span {
        position: relative;
        top: 20%;
        -webkit-transform: translateY(-20%);
        -ms-transform: translateY(-20%);
        transform: translateY(-20%);
    }
`;

function getOverrunDirectionDisplayAngle(direction: NAV_DIRECTION): number {
    switch(direction) {
        case NAV_DIRECTION.UP:
            return -45;
        case NAV_DIRECTION.DOWN:
            return 135;
        case NAV_DIRECTION.LEFT:
            return 225;
        case NAV_DIRECTION.RIGHT:
            return 45;
        default:
            return 0;
    }
}

function getInitialXRatio(direction: NAV_DIRECTION): number {
    switch(direction) {
        case NAV_DIRECTION.UP:
            return -50;
        case NAV_DIRECTION.DOWN:
            return -50;
        case NAV_DIRECTION.LEFT:
            return -100;
        case NAV_DIRECTION.RIGHT:
            return 0;
        default:
            return 0;
    }
}

function getInitialYRatio(direction: NAV_DIRECTION): number {
    switch(direction) {
        case NAV_DIRECTION.UP:
            return -100;
        case NAV_DIRECTION.DOWN:
            return 0;
        case NAV_DIRECTION.LEFT:
            return -50;
        case NAV_DIRECTION.RIGHT:
            return -50;
        default:
            return 0;
    }
}

function getEnterDoneXRatio(direction: NAV_DIRECTION): number {
    switch(direction) {
        case NAV_DIRECTION.UP:
            return -50;
        case NAV_DIRECTION.DOWN:
            return -50;
        case NAV_DIRECTION.LEFT:
            return 0;
        case NAV_DIRECTION.RIGHT:
            return -100;
        default:
            return 0;
    }
}

function getEnterDoneYRatio(direction: NAV_DIRECTION): number {
    switch(direction) {
        case NAV_DIRECTION.UP:
            return 0;
        case NAV_DIRECTION.DOWN:
            return -100;
        case NAV_DIRECTION.LEFT:
            return -50;
        case NAV_DIRECTION.RIGHT:
            return -50;
        default:
            return 0;
    }
}



export const CarouselItemOverrunOverlayStyled = styled.default.div<CarouselItemOverrunOverlayStyledProps>
    `
    display: block;
    position: absolute;
    border-style: solid;
    color: green;
    border-width: 0px 0px ${(props) =>
        props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].overrunDirectionDisplay
            .size}px ${(props) =>
        props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].overrunDirectionDisplay
            .size}px;
    height: ${(props) =>
        props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].overrunDirectionDisplay
            .size}px;
    width: ${(props) =>
        props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].overrunDirectionDisplay
            .size}px;
    top: 50%;
    left: 50%;
    transform: translate(${(props) => getInitialXRatio(props.direction)}%, ${(props) => getInitialYRatio(props.direction)}%) rotate(${(props) => getOverrunDirectionDisplayAngle(props.direction)}deg);
    transition-duration: 300ms;

    @media (min-width: 1024px) {
        border-width: 0px 0px ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].overrunDirectionDisplay
                .size}px ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].overrunDirectionDisplay
                .size}px;
        height: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].overrunDirectionDisplay
                .size}px;
        width: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].overrunDirectionDisplay
                .size}px;
    }

    @media (min-width: 1366px) {
        border-width: 0px 0px ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].overrunDirectionDisplay
                .size}px ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].overrunDirectionDisplay
                .size}px;
        height: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].overrunDirectionDisplay
                .size}px;
        width: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].overrunDirectionDisplay
                .size}px;
    }

    &.overrundir-enter {
        opacity: ${(props) =>
            props.theme.initialOpacityOverrunDirectionDisplay};
    }
    
    &.overrundir-enter-done {
        opacity: 0;
        transform: translate(${(props) => getEnterDoneXRatio(props.direction)}%, ${(props) => getEnterDoneYRatio(props.direction)}%) rotate(${(props) => getOverrunDirectionDisplayAngle(props.direction)}deg);
    }        
    &.overrundir-exit {
        display: none;
    }
`;

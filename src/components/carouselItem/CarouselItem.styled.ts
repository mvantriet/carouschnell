import * as styled from "styled-components";
import {CarouselItemStyleConfig, CAROUSEL_STYLE_MEDIA_TYPE} from '../../config/CarouselConfig';

export type CarouselItemStyledProps = {
    selected:boolean,
    inView: boolean,
    inOverrun: boolean,
    xNavOffset:number,
    yNavOffset: number,
    thumbnailUrl: string,
    style: CarouselItemStyleConfig
};

export type CarouselItemSelectedOverlayStyledProps = {
    // TODO: Split into separate config
    style: CarouselItemStyleConfig
};

export const CarouselItemStyled = styled.default.div<CarouselItemStyledProps>`
    display: ${props => props.inView || props.inOverrun ? 'inline-block' : 'none'};
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
        height: ${props => props.inOverrun ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSizeOverrun.size.y : 
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.size.y}px;
        width: ${props => props.inOverrun ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSizeOverrun.size.x : 
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.size.x}px;
        background-color: ${props => props.style.theme.itemBackgroundColor};
        border-radius: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].borderRadius}px;
        border: ${props => props.selected ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSelectedBorderSize : 
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemBorderSize}px solid ${props => props.style.theme.itemSelectedBorderColor};
        transition-duration: 200ms;
        transform: translate(${props => (props.xNavOffset * 
            (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.size.x + 
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.margin.x)).toString()}px,
            ${props => (props.yNavOffset * 
            (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.size.y +
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.margin.y)).toString()}px);
        opacity: ${props => props.inOverrun ? props.style.theme.itemInOverrunOpacity : 100}%;
        img {
            width: ${props => props.inOverrun ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSizeOverrun.size.x : 
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.size.x}px;
            height: ${props => props.inOverrun ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSizeOverrun.size.y : 
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].itemSize.size.y}px;
            border-radius: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].borderRadius}px;
        }

        @media (min-width: 1024px) {
            height: ${props => props.inOverrun ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSizeOverrun.size.y : 
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.size.y}px;
            width: ${props => props.inOverrun ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSizeOverrun.size.x : 
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.size.x}px;
            border: ${props => props.selected ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSelectedBorderSize : 
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemBorderSize}px solid ${props => props.style.theme.itemSelectedBorderColor};
            border-radius: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].borderRadius}px;
            transform: translate(${props => (props.xNavOffset * 
                (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.size.x + 
                 props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.margin.x)).toString()}px,
                ${props => (props.yNavOffset * 
                (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.size.y +
                 props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.margin.y)).toString()}px); 
            img {
                width: ${props => props.inOverrun ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSizeOverrun.size.x : 
                    props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.size.x}px;
                height: ${props => props.inOverrun ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSizeOverrun.size.y : 
                    props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].itemSize.size.y}px;
                border-radius: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].borderRadius}px;
            }
        }

        @media (min-width: 1366px) {
            height: ${props => props.inOverrun ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSizeOverrun.size.y : 
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.size.y}px;
            width: ${props => props.inOverrun ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSizeOverrun.size.x : 
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.size.x}px;
            border: ${props => props.selected ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSelectedBorderSize : 
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemBorderSize}px solid ${props => props.style.theme.itemSelectedBorderColor};
            border-radius: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].borderRadius}px;
            transform: translate(${props => (props.xNavOffset * 
                (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.size.x + 
                 props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.margin.x)).toString()}px,
                ${props => (props.yNavOffset * 
                (props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.size.y +
                 props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.margin.y)).toString()}px);
            img {
                width: ${props => props.inOverrun ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSizeOverrun.size.x : 
                    props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.size.x}px;
                height: ${props => props.inOverrun ? props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSizeOverrun.size.y : 
                    props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].itemSize.size.y}px;
                border-radius: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].borderRadius}px;
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
    height: 20%;
    position: absolute;
    box-shadow: 0px 0px 20px 5px ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].selectionStyleConfig.topBorderShadowSize}px; 
    top: 80%;
    left: 0;
    color: ${props => props.style.theme.itemSelectionFontColor};
    background-color: ${props => props.style.theme.itemSelectionBackgroundColor};
    border-bottom-left-radius: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].selectionStyleConfig.bottomRadiusSize}px;
    border-bottom-right-radius: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].selectionStyleConfig.bottomRadiusSize}px;
    font-size: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].selectionStyleConfig.fontSize}px;

    @media (min-width: 1024px) {
        box-shadow: 0px 0px 20px 5px ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].selectionStyleConfig.topBorderShadowSize}px; 
        border-bottom-left-radius: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].selectionStyleConfig.bottomRadiusSize}px;
        border-bottom-right-radius: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].selectionStyleConfig.bottomRadiusSize}px;
        font-size: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].selectionStyleConfig.fontSize}px;
    }
`;

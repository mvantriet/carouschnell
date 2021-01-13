import * as styled from "styled-components";
import {CarouselItemStyleConfig, CAROUSEL_STYLE_MEDIA_TYPE} from '../../config/CarouselConfig';

export type CarouselItemStyledProps = {};

export type CarouselItemSelectedOverlayStyledProps = {
    selected:boolean,
    inView: boolean,
    inOverrun: boolean,
    xNavOffset:number,
    yNavOffset: number,
    thumbnailUrl: string,
    style: CarouselItemStyleConfig
};

export type GridItemSelectedOverlayStyledProps = {
    // TODO: Split into separate config
    style: CarouselItemStyleConfig
}

export const CarouselItemStyled = styled.default.div<CarouselItemStyledProps>`
`;

export const CarouselItemSelectedOverlayStyled = styled.default
    .div<CarouselItemSelectedOverlayStyledProps>`
    width: 100%;
    height: 20%;
    position: absolute;
`;

import * as styled from "styled-components";

export type CarouselItemStyledProps = {};

export type CarouselItemSelectedOverlayStyledProps = {};

export const CarouselItemStyled = styled.default.div<CarouselItemStyledProps>`
`;

export const CarouselItemSelectedOverlayStyled = styled.default
    .div<CarouselItemSelectedOverlayStyledProps>`
    width: 100%;
    height: 20%;
    position: absolute;
`;

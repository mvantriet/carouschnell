import * as styled from "styled-components";
import {
    CAROUSEL_STYLE_MEDIA_TYPE,
    CarouselRowLabelConfig,
    CarouselItemStyleConfig,
} from "../../config/CarouselConfig";
import { StyleUtils } from "../../utils/StyleUtils";
export type CarouselRowLabelStyledProps = {
    yNavOffset: number;
    style: CarouselRowLabelConfig;
    itemStyleConfig: CarouselItemStyleConfig;
};

export const CarouselRowLabelStyled = styled.default.div<CarouselRowLabelStyledProps>`
    display: "inline-block";
    color: ${(props) => props.style.theme.fontColor};
    height: 0px;
    font-size: ${(props) => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].fontSize}pt;
    margin-top: ${(props) => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].paddingTop}px;
    transform: translate(
        ${(props) => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].paddingLeft}px,
        ${(props) =>
            props.yNavOffset *
                (StyleUtils.calcItemYSpace(props.itemStyleConfig, CAROUSEL_STYLE_MEDIA_TYPE.SMALL) +
                    StyleUtils.calcRowLabelYSpace(props.style, CAROUSEL_STYLE_MEDIA_TYPE.SMALL)) -
            props.yNavOffset *
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].paddingTop}px);

    @media (min-width: 1024px) {
        font-size: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].fontSize}pt;
        margin-top: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].paddingTop}px;
        transform: translate(
            ${(props) => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].paddingLeft}px,
            ${(props) =>
                props.yNavOffset *
                    (StyleUtils.calcItemYSpace(
                        props.itemStyleConfig,
                        CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP
                    ) +
                        StyleUtils.calcRowLabelYSpace(
                            props.style,
                            CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP
                        )) -
                props.yNavOffset *
                    props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].paddingTop}px);
    }
    
    @media (min-width: 1366px) {
        font-size: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].fontSize}pt;
        margin-top: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].paddingTop}px;
        transform: translate(
            ${(props) => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].paddingLeft}px,
            ${(props) =>
                props.yNavOffset *
                    (StyleUtils.calcItemYSpace(
                        props.itemStyleConfig,
                        CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN
                    ) +
                        StyleUtils.calcRowLabelYSpace(
                            props.style,
                            CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN
                        )) -
                props.yNavOffset *
                    props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].paddingTop}px);
    }

`;

/**
    display: "inline-block";
    color: ${props => props.style.theme.fontColor}
    font-family: ${props => props.style.theme.fontFamily}
    height: 0px;
    font-size: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].fontSize}pt;
    margin-top: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].paddingTop}px;
    transform: translate(
        ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].paddingLeft}px,
        ${(props) =>
            (props.yNavOffset * 250 - (props.yNavOffset * props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].paddingTop))}px);

 */

/**
 display: "inline-block";
    color: yellow;
    font-size: 35pt;
    margin-top: 15px;
    height: 0px;
    transform: translate(20px,
        ${(props) =>
            (props.yNavOffset * 250 - (props.yNavOffset * 15))}px);
    
 */

/*        ${(props) =>
            ((223) * props.yNavOffset).toString()}px);
*/
//yNavOffset * (250 - yNavOffset * (fontSize*1.4))

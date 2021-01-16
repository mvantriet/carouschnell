import * as styled from "styled-components";
import {
    CarouselStyleConfig,
    CarouselDisplayConfig,
    CAROUSEL_STYLE_MEDIA_TYPE,
} from "../../config/CarouselConfig";
import { StyleUtils } from "../../utils/StyleUtils";

export type CarouselStyledProps = {
    style: CarouselStyleConfig;
    display: CarouselDisplayConfig;
};

const CarouselStyled = styled.default.div<CarouselStyledProps>`
    text-align: left;
    font-family: ${(props) => props.style.theme.fontFamily};
    font-style: normal;
    font-weight: ${(props) => props.style.theme.fontWeight};  
    background-color: ${(props) => props.style.theme.backgroundColorOverrun};
    padding-top: ${(props) =>
        props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].overrunExtraPaddingY}px;
    padding-bottom: ${(props) =>
        props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].overrunExtraPaddingY}px;
    padding-left: ${(props) =>
        StyleUtils.calcOverrunXSpace(
            props.style.itemStyleConfig,
            props.display,
            CAROUSEL_STYLE_MEDIA_TYPE.SMALL
        ) + props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].overrunExtraPaddingX}px;
    width: ${(props) =>
        StyleUtils.calcXSpace(
            props.style.itemStyleConfig,
            props.display,
            CAROUSEL_STYLE_MEDIA_TYPE.SMALL
        )}px;
    height: ${(props) =>
        StyleUtils.calcYSpace(
            props.style.itemStyleConfig,
            props.display,
            CAROUSEL_STYLE_MEDIA_TYPE.SMALL
        )}px;
    border-radius: ${(props) =>
        props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].borderRadiusSizeOverrun}px;
    border: ${(props) =>
        props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].borderSizeOverrun}px solid ${(
    props
) => props.style.theme.borderColorOverrun};

    @media (min-width: 1024px) {
        padding-left: ${(props) =>
            StyleUtils.calcOverrunXSpace(
                props.style.itemStyleConfig,
                props.display,
                CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP
            ) + props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].overrunExtraPaddingX}px;
        width: ${(props) =>
            StyleUtils.calcXSpace(
                props.style.itemStyleConfig,
                props.display,
                CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP
            )}px;
        height: ${(props) =>
            StyleUtils.calcYSpace(
                props.style.itemStyleConfig,
                props.display,
                CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP
            )}px;
        border-radius: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].borderRadiusSizeOverrun}px;
        border: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].borderSizeOverrun}px solid ${(
    props
) => props.style.theme.borderColorOverrun};
    }

    @media (min-width: 1366px) {
        padding-left: ${(props) =>
            StyleUtils.calcOverrunXSpace(
                props.style.itemStyleConfig,
                props.display,
                CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN
            ) + props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].overrunExtraPaddingY}px;
        width: ${(props) =>
            StyleUtils.calcXSpace(
                props.style.itemStyleConfig,
                props.display,
                CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN
            )}px;
        height: ${(props) =>
            StyleUtils.calcYSpace(
                props.style.itemStyleConfig,
                props.display,
                CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN
            )}px;    
        border-radius: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].borderRadiusSizeOverrun}px;
        border: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN]
                .borderSizeOverrun}px solid ${(props) => props.style.theme.borderColorOverrun};
    }

    .grid-inner {
        background-color: ${(props) => props.style.theme.backgroundColorActive};
        border-radius: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].borderRadiusSizeActive}px;
        border: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].borderSizeActive}px solid ${(
    props
) => props.style.theme.borderColorActive};
        margin-top: ${(props) =>
            StyleUtils.calcOverrunYSpace(
                props.style.itemStyleConfig,
                props.display,
                CAROUSEL_STYLE_MEDIA_TYPE.SMALL
            ) - props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].activeExtraPaddingTop}px;
        margin-left: ${(props) =>
            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].activeExtraPaddingX * -1}px;
        width: ${(props) =>
            StyleUtils.calcActiveXSpace(
                props.style.itemStyleConfig,
                props.display,
                CAROUSEL_STYLE_MEDIA_TYPE.SMALL
            ) + props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].activeExtraPaddingX}px;
        height: ${(props) =>
            StyleUtils.calcActiveYSpace(
                props.style.itemStyleConfig,
                props.display,
                CAROUSEL_STYLE_MEDIA_TYPE.SMALL
            ) + props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].activeExtraPaddingBottom}px;

        @media (min-width: 1024px) {
            margin-top: ${(props) =>
                StyleUtils.calcOverrunYSpace(
                    props.style.itemStyleConfig,
                    props.display,
                    CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP
                ) -
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP]
                    .activeExtraPaddingTop}px;  
            width: ${(props) =>
                StyleUtils.calcActiveXSpace(
                    props.style.itemStyleConfig,
                    props.display,
                    CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP
                ) +
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP].activeExtraPaddingX}px;
            height: ${(props) =>
                StyleUtils.calcActiveYSpace(
                    props.style.itemStyleConfig,
                    props.display,
                    CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP
                ) +
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.DESKTOP]
                    .activeExtraPaddingBottom}px;
        }
        
        @media (min-width: 1366px) {
            margin-top: ${(props) =>
                StyleUtils.calcOverrunYSpace(
                    props.style.itemStyleConfig,
                    props.display,
                    CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN
                ) -
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN]
                    .activeExtraPaddingTop}px;  
            width: ${(props) =>
                StyleUtils.calcActiveXSpace(
                    props.style.itemStyleConfig,
                    props.display,
                    CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN
                ) +
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN].activeExtraPaddingX}px;
            height: ${(props) =>
                StyleUtils.calcActiveYSpace(
                    props.style.itemStyleConfig,
                    props.display,
                    CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN
                ) +
                props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.BIGSCREEN]
                    .activeExtraPaddingBottom}px;
        }
    }
`;
export default CarouselStyled;

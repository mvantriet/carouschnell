import * as styled from "styled-components";
import {CarouselStyleConfig, CarouselDisplayConfig, 
    CAROUSEL_STYLE_MEDIA_TYPE} from '../../config/CarouselConfig';
import {StyleUtils} from '../../utils/StyleUtils';

export type CarouselStyledProps = {
    style: CarouselStyleConfig,
    display: CarouselDisplayConfig
};

const CarouselStyled = styled.default.div<CarouselStyledProps>`
    text-align: left;
    font-family: ${props => props.style.theme.fontFamily};
    font-style: normal;
    font-weight: ${props => props.style.theme.fontWeight};  
    background-color: ${props => props.style.theme.backgroundColorOverrun};
    padding-top: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].overrunExtraPaddingY}px;
    padding-bottom: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].overrunExtraPaddingY}px;
    padding-left: ${props => StyleUtils.calcOverrunXSpace(props.style.itemStyleConfig, props.display, CAROUSEL_STYLE_MEDIA_TYPE.SMALL) + 
                            props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].overrunExtraPaddingX}px;
    width: ${props => StyleUtils.calcXSpace(props.style.itemStyleConfig, props.display, CAROUSEL_STYLE_MEDIA_TYPE.SMALL)}px;
    height: ${props => StyleUtils.calcYSpace(props.style.itemStyleConfig, props.display, CAROUSEL_STYLE_MEDIA_TYPE.SMALL)}px;
    border-radius: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].borderRadiusSizeOverrun}px;
    border: ${props => props.style.mediaTypes[CAROUSEL_STYLE_MEDIA_TYPE.SMALL].borderSizeOverrun}px solid ${props => props.style.theme.borderColorOverrun};
`;
export default CarouselStyled;

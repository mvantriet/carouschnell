import * as React from "react";
import {CSSTransition} from 'react-transition-group';
import { CarouselItemStyled, CarouselItemSelectedOverlayStyled } from "./CarouselItem.styled";
import { CarouselItemConfig, CarouselItemStyleConfig} from "../../config/CarouselConfig";
export type CarouselItemProps = {
    config: CarouselItemConfig;
    selected: boolean,
    inView: boolean,
    inOverrun: boolean,
    xNavOffset: number,
    yNavOffset: number,
    style: CarouselItemStyleConfig
};

export const CarouselItem: React.FunctionComponent<CarouselItemProps> = (props: CarouselItemProps) => {

    return <CarouselItemStyled 
    className={props.selected ? "selected" : ""} 
    inView={props.inView} 
    inOverrun={props.inOverrun} 
    thumbnailUrl={props.config.thumbnail} 
    selected={props.selected} 
    xNavOffset={props.xNavOffset} 
    yNavOffset={props.yNavOffset}
    style={props.style}>
  <CSSTransition 
    in={false} 
    timeout={0} 
    className="item">
        <div
        className="item">
          <img src={props.config.thumbnail} alt={props.config.caption}></img>
          {props.selected && <CarouselItemSelectedOverlayStyled style={props.style}><span>{props.config.caption}</span></CarouselItemSelectedOverlayStyled>}
        </div>
  </CSSTransition>
</CarouselItemStyled>
};

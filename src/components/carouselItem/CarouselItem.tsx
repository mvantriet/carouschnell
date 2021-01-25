import * as React from "react";
import { CSSTransition } from "react-transition-group";
import { CarouselItemStyled, CarouselItemSelectedOverlayStyled, CarouselItemOverrunOverlayStyled } from "./CarouselItem.styled";
import { CarouselItemConfig, CarouselItemStyleConfig } from "../../config/CarouselConfig";
import { INavItemActionHandler } from "../../navcontrols/common/INavItemActionHandler";
import { NavDirectionResult } from "../../utils/CarouselUtils";

export type CarouselItemProps = {
    config: CarouselItemConfig;
    selected: boolean;
    inView: boolean;
    inOverrun: boolean;
    overrunDirection: NavDirectionResult;
    xNavOffset: number;
    yNavOffset: number;
    navActionHandlers: Array<INavItemActionHandler>;
    style: CarouselItemStyleConfig;
};

export const CarouselItem: React.FunctionComponent<CarouselItemProps> = (
    props: CarouselItemProps
) => {
    if (props.inOverrun && props.overrunDirection.result) {

        console.log(props.yNavOffset, props.xNavOffset, props.overrunDirection)
    }

    return (
        <CarouselItemStyled
            className={props.selected ? "selected" : ""}
            inView={props.inView}
            inOverrun={props.inOverrun}
            thumbnailUrl={props.config.thumbnail}
            selected={props.selected}
            xNavOffset={props.xNavOffset}
            yNavOffset={props.yNavOffset}
            style={props.style}
        >
            <CSSTransition in={false} timeout={0} className="item">
                {props.navActionHandlers.length > 0 ? (
                    <div
                        onMouseEnter={(event: any) =>
                            props.navActionHandlers.forEach((handler: INavItemActionHandler) =>
                                handler.handleItemHoverEnter(
                                    event,
                                    props.yNavOffset,
                                    props.xNavOffset
                                )
                            )
                        }
                        onMouseLeave={(event: any) =>
                            props.navActionHandlers.forEach((handler: INavItemActionHandler) =>
                                handler.handleItemHoverExit(
                                    event,
                                    props.yNavOffset,
                                    props.xNavOffset
                                )
                            )
                        }
                        onMouseMove={(event: any) =>
                            props.navActionHandlers.forEach((handler: INavItemActionHandler) =>
                                handler.handleItemHover(event, props.yNavOffset, props.xNavOffset)
                            )
                        }
                        onClick={(event: any) =>
                            props.navActionHandlers.forEach((handler: INavItemActionHandler) =>
                                handler.handleItemOnClick(event, props.yNavOffset, props.xNavOffset)
                            )
                        }
                        className="item"
                    >
                        <img src={props.config.thumbnail} alt={props.config.caption}></img>
                        {props.selected && (
                            <CarouselItemSelectedOverlayStyled style={props.style}>
                                <span>{props.config.caption}</span>
                            </CarouselItemSelectedOverlayStyled>
                        )}
                            <CSSTransition 
                                in={props.inOverrun && props.overrunDirection.result} 
                                timeout={300} 
                                classNames="overrundir"
                                unmountOnExit>
                                {() => <CarouselItemOverrunOverlayStyled style={props.style} direction={props.overrunDirection.direction}/>}
                            </CSSTransition>
                            
                        
                    </div>
                ) : (
                    <div className="item">
                        <img src={props.config.thumbnail} alt={props.config.caption}></img>
                        {props.selected && (
                            <CarouselItemSelectedOverlayStyled style={props.style}>
                                <span>{props.config.caption}</span>
                            </CarouselItemSelectedOverlayStyled>
                        )}
                        <CSSTransition 
                            in={props.inOverrun && props.overrunDirection.result} 
                            timeout={300} 
                            classNames="overrundir"
                            unmountOnExit>
                            {() => <CarouselItemOverrunOverlayStyled style={props.style} direction={props.overrunDirection.direction}/>}
                        </CSSTransition>
                    </div>
                )}
            </CSSTransition>
        </CarouselItemStyled>
    );
};

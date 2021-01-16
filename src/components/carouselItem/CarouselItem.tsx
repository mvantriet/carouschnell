import * as React from "react";
import { CSSTransition } from "react-transition-group";
import { CarouselItemStyled, CarouselItemSelectedOverlayStyled } from "./CarouselItem.styled";
import { CarouselItemConfig, CarouselItemStyleConfig } from "../../config/CarouselConfig";
import { INavItemActionHandler } from "../../navcontrols/common/INavItemActionHandler";

export type CarouselItemProps = {
    config: CarouselItemConfig;
    selected: boolean;
    inView: boolean;
    inOverrun: boolean;
    xNavOffset: number;
    yNavOffset: number;
    navActionHandlers: Array<INavItemActionHandler>;
    style: CarouselItemStyleConfig;
};

export const CarouselItem: React.FunctionComponent<CarouselItemProps> = (
    props: CarouselItemProps
) => {
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
                    </div>
                ) : (
                    <div className="item">
                        <img src={props.config.thumbnail} alt={props.config.caption}></img>
                        {props.selected && (
                            <CarouselItemSelectedOverlayStyled style={props.style}>
                                <span>{props.config.caption}</span>
                            </CarouselItemSelectedOverlayStyled>
                        )}
                    </div>
                )}
            </CSSTransition>
        </CarouselItemStyled>
    );
};

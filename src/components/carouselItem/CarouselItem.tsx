import * as React from "react";
import { CSSTransition } from "react-transition-group";
import parseHtml from 'html-react-parser';
import {
    CarouselItemStyled,
    CarouselItemSelectedOverlayStyled,
    CarouselItemOverrunOverlayStyled,
} from "./CarouselItem.styled";
import { CarouselItemConfig, 
    CarouselItemStyleConfig, 
    CarouselRowLabelConfig
} from "../../config/CarouselConfig";
import {
    IMouseNavItemActionHandler,
    ITouchNavItemActionHandler,
} from "../../navcontrols/common/INavItemActionHandler";
import { NavDirectionResult } from "../../utils/CarouselUtils";

export type CarouselItemProps = {
    config: CarouselItemConfig;
    selected: boolean;
    inView: boolean;
    inOverrun: boolean;
    overrunDirection: NavDirectionResult;
    xNavOffset: number;
    yNavOffset: number;
    loadSrc: boolean;
    mouseNavActionHandlers: Array<IMouseNavItemActionHandler>;
    touchNavActionHandlers: Array<ITouchNavItemActionHandler>;
    style: CarouselItemStyleConfig;
    rowLabelStyleConfig: CarouselRowLabelConfig | undefined;
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
            rowLabelStyleConfig={props.rowLabelStyleConfig}
        >
            <CSSTransition in={false} timeout={0} className="item">
                <div
                    onMouseEnter={(event: any) =>
                        props.mouseNavActionHandlers.forEach(
                            (handler: IMouseNavItemActionHandler) =>
                                handler.handleItemHoverEnter(
                                    event,
                                    props.yNavOffset,
                                    props.xNavOffset
                                )
                        )
                    }
                    onMouseLeave={(event: any) =>
                        props.mouseNavActionHandlers.forEach(
                            (handler: IMouseNavItemActionHandler) =>
                                handler.handleItemHoverExit(
                                    event,
                                    props.yNavOffset,
                                    props.xNavOffset
                                )
                        )
                    }
                    onMouseMove={(event: any) =>
                        props.mouseNavActionHandlers.forEach(
                            (handler: IMouseNavItemActionHandler) =>
                                handler.handleItemHover(event, props.yNavOffset, props.xNavOffset)
                        )
                    }
                    onTouchStart={(event: any) =>
                        props.touchNavActionHandlers.forEach(
                            (handler: ITouchNavItemActionHandler) =>
                                handler.handleItemOnTouchStart(
                                    event,
                                    props.yNavOffset,
                                    props.xNavOffset
                                )
                        )
                    }
                    onTouchMove={(event: any) =>
                        props.touchNavActionHandlers.forEach(
                            (handler: ITouchNavItemActionHandler) =>
                                handler.handleItemOnTouchMove(
                                    event,
                                    props.yNavOffset,
                                    props.xNavOffset
                                )
                        )
                    }
                    onTouchEnd={(event: any) =>
                        props.touchNavActionHandlers.forEach(
                            (handler: ITouchNavItemActionHandler) =>
                                handler.handleItemOnTouchEnd(
                                    event,
                                    props.yNavOffset,
                                    props.xNavOffset
                                )
                        )
                    }
                    onClick={(event: any) =>
                        props.mouseNavActionHandlers.forEach(
                            (handler: IMouseNavItemActionHandler) =>
                                handler.handleItemOnClick(event, props.yNavOffset, props.xNavOffset)
                        )
                    }
                    className="item"
                >
                    {props.loadSrc ? (
                        <img src={props.config.thumbnail} alt={props.config.caption}></img>
                    ) : (
                        <img alt={props.config.caption}></img>
                    )}
                    {props.selected && (
                        <CarouselItemSelectedOverlayStyled style={props.style} hasInnerHtml={props.config.innerHtml !== undefined}>
                            {props.config.innerHtml ?
                                <span>{parseHtml(props.config.innerHtml)}</span> :
                                <span>{props.config.caption}</span>
                            }
                        </CarouselItemSelectedOverlayStyled>
                    )}
                    <CSSTransition
                        in={props.inOverrun && props.overrunDirection.result}
                        timeout={300}
                        classNames="overrundir"
                        unmountOnExit
                    >
                        {() => (
                            <CarouselItemOverrunOverlayStyled
                                style={props.style}
                                direction={props.overrunDirection.direction}
                            />
                        )}
                    </CSSTransition>
                </div>
            </CSSTransition>
        </CarouselItemStyled>
    );
};

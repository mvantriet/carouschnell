import * as React from "react";
import { CarouselItemStyled, CarouselItemSelectedOverlayStyled } from "./CarouselItem.styled";
import { CarouselItemConfig } from "../../config/CarouselConfig";
export type CarouselItemProps = {
    config: CarouselItemConfig;
};

export const CarouselItem: React.FunctionComponent<CarouselItemProps> = (
    props: CarouselItemProps
) => {
    return <CarouselItemStyled />;
};

import * as React from "react";
import {
    CarouselRowLabelStyled
} from "./CarouselRowLabel.styled";
import { CarouselRowLabelConfig, CarouselItemStyleConfig } from "../../config/CarouselConfig";

export type CarouselRowLabelProps = {
    label: string;
    yNavOffset: number;
    style: CarouselRowLabelConfig;
    itemStyleConfig: CarouselItemStyleConfig;
};

export const CarouselRowLabel: React.FunctionComponent<CarouselRowLabelProps> = (
    props: CarouselRowLabelProps
) => {
    return (
        <CarouselRowLabelStyled
            yNavOffset={props.yNavOffset}
            style={props.style}
            itemStyleConfig={props.itemStyleConfig}
        >
            {props.label}
        </CarouselRowLabelStyled>
    );
};

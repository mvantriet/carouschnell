import * as React from "react";
import CarouselStyled from "./Carousel.styled";
import { CarouselItem } from "../carouselItem/CarouselItem";
import { CarouselConfig } from "../../config/CarouselConfig";

export type ItemState = {
    xOffset: number;
    yOffset: number;
};

interface CarouselState {
    activeDisplayRow: number;
    activeDisplayColumn: number;
    itemStates: Array<ItemState>;
}

export type CarouselProps = {
    config: CarouselConfig;
};

export class Grid extends React.Component<CarouselProps, CarouselState> {
    constructor(props: CarouselProps) {
        super(props);

        this.state = {
            activeDisplayColumn: props.config.displayConfig.initialDisplayColumn,
            activeDisplayRow: props.config.displayConfig.initialDisplayRow,
            itemStates: this.initialiseItemStates(props),
        };
    }

    private initialiseItemStates(props: CarouselProps): Array<ItemState> {
        let itemStates: Array<ItemState> = [];
        props.config.rows.forEach((row, rowIndex) => {
            itemStates = itemStates.concat(
                row.items.map((item, itemIndex) => {
                    return {
                        config: item,
                        xOffset: row.initialColumn - itemIndex,
                        yOffset: rowIndex,
                    };
                })
            );
        });
        return itemStates;
    }

    componentDidMount() {}

    render() {
        return <CarouselStyled />;
    }
}

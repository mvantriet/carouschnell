import * as React from "react";
import CarouselStyled from "./Carousel.styled";
import { CarouselItem } from "../carouselItem/CarouselItem";
import {CarouselConfig, CarouselItemConfig, CarouselDisplayConfig, 
    CarouselStyleConfig, CarouselRowConfig} from "../../config/CarouselConfig";
import {GridUtils} from '../../utils/GridUtils';

export type ItemState = {
    config: CarouselItemConfig,
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

    private displayConfig: CarouselDisplayConfig;
    private enable2dNav: boolean;
    private styleConfig: CarouselStyleConfig;
  

    constructor(props: CarouselProps) {
        super(props);
        this.enable2dNav = props.config.navControls.enable2dNav;
        this.displayConfig = props.config.displayConfig;
        this.styleConfig = props.config.styleConfig;
    
        this.state = {
            activeDisplayColumn: props.config.displayConfig.initialDisplayColumn,
            activeDisplayRow: props.config.displayConfig.initialDisplayRow,
            itemStates: this.initialiseItemStates(props),
        };
    }

    private initialiseItemStates(props: CarouselProps): Array<ItemState> {
        let itemStates: Array<ItemState> = [];
        props.config.rows.forEach((row: CarouselRowConfig, rowIndex: number) => {
            itemStates = itemStates.concat(
                row.items.map((item: CarouselItemConfig, itemIndex: number) => {
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
    return <CarouselStyled
        style={this.styleConfig}
        display={this.displayConfig}
      >
      <div className="grid">
      {
            this.state.itemStates.map((itemState:ItemState, index:number) => {
              return <CarouselItem key={index.toString()}
                style={this.styleConfig.itemStyleConfig}
                xNavOffset={itemState.xOffset} 
                yNavOffset={itemState.yOffset}
                inView={GridUtils.isItemInView(itemState.yOffset, itemState.xOffset, this.displayConfig)}
                inOverrun={GridUtils.isItemInOverrun(itemState, this.displayConfig).result}
                selected={GridUtils.isItemSelected(itemState, this.state.activeDisplayRow, this.state.activeDisplayColumn)} 
                config={itemState.config} />
            })
          }
      <div id="grid-inner" className="grid-inner"/>
    </div>
  </CarouselStyled>
    }
}

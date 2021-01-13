import * as React from "react";
import CarouselStyled from "./Carousel.styled";
import { CarouselItem } from "../carouselItem/CarouselItem";
import {CarouselConfig, CarouselItemConfig, CarouselDisplayConfig, 
    CarouselStyleConfig, CarouselRowConfig} from "../../config/CarouselConfig";
import {INavActionHandler, NAV_DIRECTION} from '../../navcontrols/common/INavActionHandler';
import {CarouselUtils} from '../../utils/CarouselUtils';

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

export class Carousel extends React.Component<CarouselProps, CarouselState> implements INavActionHandler {

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

    handleNavControlDirectionAction(direction:NAV_DIRECTION, offset:number): void {
        switch(direction) {
          case NAV_DIRECTION.LEFT:
            break;
          case NAV_DIRECTION.RIGHT:
            break;
          case NAV_DIRECTION.UP:
            break;
          case NAV_DIRECTION.DOWN:
            break;
          default:
            throw new Error('Unsupported NAV_DIRECTION action: ' + direction.toString());
        }
      }
    
      handleNavControlEnterCurrentSelectionAction(): void {
      }
    
      handleNavControlEnterSelectionAction(row:number, column: number): void {
      }
    
      handleNavControlSelect(row:number, column: number): void {
      }
    
      handleNavControlDeselect(): void {
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
                inView={CarouselUtils.isItemInView(itemState.yOffset, itemState.xOffset, this.displayConfig)}
                inOverrun={CarouselUtils.isItemInOverrun(itemState, this.displayConfig).result}
                selected={CarouselUtils.isItemSelected(itemState, this.state.activeDisplayRow, this.state.activeDisplayColumn)} 
                config={itemState.config} />
            })
          }
      <div id="grid-inner" className="grid-inner"/>
    </div>
  </CarouselStyled>
    }
}

import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import {Carousel} from '../Carousel';
import {CarouselConfig} from '../../../config/CarouselConfig';
import {DEVICE_NAV_KEYCODES_DEFAULT} from '../../../navcontrols/keyboard/KeyboardNavController';
import {darkStyle} from '../../../styles/defaultStyles';
import {itemInView, getSelectedItem} from '../../../../test/testUtils';

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement('div');
  container.setAttribute("id", "root");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
});

function getSelected(): string {
    return getSelectedItem(container);
}

const carouselTestConfig:CarouselConfig = {
    rows: [
      { initialColumn: 3, label: "Row1", items: [
        {caption: "4", thumbnail: "", url: ""},
        {caption: "3", thumbnail: "", url: ""},
        {caption: "2", thumbnail: "", url: ""},
        {caption: "1", thumbnail: "", url: ""}
      ] },
      { initialColumn: 4, label: "Row2", items: [
        {caption: "11", thumbnail: "", url: ""},
        {caption: "10", thumbnail: "", url: ""},
        {caption: "9", thumbnail: "", url: ""},
        {caption: "8", thumbnail: "", url: ""},
        {caption: "7", thumbnail: "", url: ""},
        {caption: "6", thumbnail: "", url: ""}
      ] },
      { initialColumn: 4, label: "Row3", items: [
        {caption: "17", thumbnail: "", url: ""},
        {caption: "16", thumbnail: "", url: ""},
        {caption: "15", thumbnail: "", url: ""},
        {caption: "14", thumbnail: "", url: ""},
        {caption: "13", thumbnail: "", url: ""},
        {caption: "12", thumbnail: "", url: ""}
      ] },
      { initialColumn: 3, label: "Row4", items: [
        {caption: "21", thumbnail: "", url: ""},
        {caption: "20", thumbnail: "", url: ""},
        {caption: "19", thumbnail: "", url: ""},
        {caption: "18", thumbnail: "", url: ""}
      ] },
      { initialColumn: 3, label: "Row5", items: [
        {caption: "25", thumbnail: "", url: ""},
        {caption: "24", thumbnail: "", url: ""},
        {caption: "23", thumbnail: "", url: ""},
        {caption: "22", thumbnail: "", url: ""}
      ] }

    ],
    displayConfig: {
      rowStart: 1,
      rowEnd: 2,
      rowOverrun: 1,
      columnStart: 0,
      columnEnd: 3,
      columnOverrun: 1,
      initialDisplayRow: 1,
      initialDisplayColumn: 0
    },
    navControls: {
      enable2dNav: true,
      keyboard: {
        enabled: true,
        keyMapping: DEVICE_NAV_KEYCODES_DEFAULT
      },
      pointer: {
        enabled: false,
        eventBindElementId: ""
      },
      touch: {
        enabled: false,
        eventBindElementId: ""
      }
    },
    styleConfig: darkStyle
  } 

test('initial setting', async () => {
  ReactDOM.render(<Carousel config={carouselTestConfig}/>, container);
  expect(itemInView('1')).toBe(true);
  expect(getSelected()).toEqual('7');
});
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import {Carousel} from '../Carousel';
import {CarouselConfig} from '../../../config/CarouselConfig';
import {DEVICE_NAV_KEYCODES_DEFAULT} from '../../../navcontrols/keyboard/KeyboardNavController';
import {darkStyle} from '../../../styles/defaultStyles';
import {itemInView, getSelectedItem, keyPress} from '../../../../test/testUtils';

let container: HTMLDivElement;
let scrollIntoViewMock = jest.fn();

beforeEach(() => {
  container = document.createElement('div');
  container.setAttribute("id", "root");
  document.body.appendChild(container);
  scrollIntoViewMock = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
});

afterEach(() => {
  document.body.removeChild(container);
});

function getSelected(): string {
    return getSelectedItem(container);
}

function navUp(): void {
    keyPress(container, DEVICE_NAV_KEYCODES_DEFAULT.UP);
}

function navDown(): void {
    keyPress(container, DEVICE_NAV_KEYCODES_DEFAULT.DOWN);
}

function navLeft(): void {
    keyPress(container, DEVICE_NAV_KEYCODES_DEFAULT.LEFT);
}

function navRight(): void {
    keyPress(container, DEVICE_NAV_KEYCODES_DEFAULT.RIGHT);
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

test('nav left', async () => {
    ReactDOM.render(<Carousel config={carouselTestConfig}/>, container);
    expect(getSelected()).toEqual('7');
    navLeft();
    expect(getSelected()).toEqual('6');
    expect(scrollIntoViewMock).toBeCalledTimes(0);
});

test('nav right', async () => {
    ReactDOM.render(<Carousel config={carouselTestConfig}/>, container);
    expect(getSelected()).toEqual('7');
    navRight();
    expect(getSelected()).toEqual('8');
    expect(scrollIntoViewMock).toBeCalledTimes(0);
});

test('nav row limit left', async () => {
    ReactDOM.render(<Carousel config={carouselTestConfig}/>, container);
    expect(getSelected()).toEqual('7');
    navLeft();
    expect(getSelected()).toEqual('6');
    // End of row
    navLeft();
    expect(getSelected()).toEqual('6');
    expect(scrollIntoViewMock).toBeCalledTimes(0);
});

test('nav row limit right', async () => {
    ReactDOM.render(<Carousel config={carouselTestConfig}/>, container);
    expect(getSelected()).toEqual('7');
    ['8','9','10','11','11'].forEach((expectedItemCaption: string) => {
        navRight();
        expect(getSelected()).toEqual(expectedItemCaption);
    })
    expect(scrollIntoViewMock).toBeCalled();
});

test('nav up', async () => {
    ReactDOM.render(<Carousel config={carouselTestConfig}/>, container);
    expect(getSelected()).toEqual('7');
    navUp();
    expect(getSelected()).toEqual('1');
    expect(scrollIntoViewMock).toBeCalledTimes(0);
});

test('nav down', async () => {
    ReactDOM.render(<Carousel config={carouselTestConfig}/>, container);
    expect(getSelected()).toEqual('7');
    navDown();
    expect(getSelected()).toEqual('13');
    expect(scrollIntoViewMock).toBeCalledTimes(0);
});
# carouschnell

Responsive and Configurable Typescript based React component to make carousels schnell (=quickly in German)

![](doc/img/1dnav.gif)

## Motivation

I was in need of a component that could serve kind of like a navigable homescreen for a personal project, figured to generalise some bits here and there and release it to the wild.

# Installation

```bash
npm install carouschnell
```

# Usage

The carouschnell package exports a Carousel React component together with default styles which the developer can use. An example of an instantiation of this component can be found below.

```javascript
// App.js
import React from "react";
import "./App.css";
const carouschnell = require("carouschnell");

function App() {
    const config = {
        rows: [
            {
                initialColumn: 3,
                label: "Row1",
                items: [
                    { caption: "1", thumbnail: "http://placekitten.com/g/200/150", url: "" },
                    { caption: "2", thumbnail: "http://placekitten.com/g/200/150", url: "" },
                    { caption: "3", thumbnail: "http://placekitten.com/g/200/150", url: "" },
                    { caption: "4", thumbnail: "http://placekitten.com/g/200/150", url: "" },
                    { caption: "5", thumbnail: "http://placekitten.com/g/200/150", url: "" },
                ],
            },
            {
                initialColumn: 3,
                label: "Row2",
                items: [
                    { caption: "6", thumbnail: "http://placekitten.com/g/200/150", url: "" },
                    { caption: "7", thumbnail: "http://placekitten.com/g/200/150", url: "" },
                    { caption: "8", thumbnail: "http://placekitten.com/g/200/150", url: "" },
                    { caption: "9", thumbnail: "http://placekitten.com/g/200/150", url: "" },
                    { caption: "10", thumbnail: "http://placekitten.com/g/200/150", url: "" },
                ],
            },
        ],
        displayConfig: {
            rowStart: 0,
            rowEnd: 1,
            rowOverrun: 0,
            columnStart: 0,
            columnEnd: 2,
            columnOverrun: 1,
            initialDisplayRow: 0,
            initialDisplayColumn: 0,
        },
        navControls: {
            enable2dNav: true,
            keyboard: {
                enabled: true,
                keyMapping: carouschnell.DEVICE_NAV_KEYCODES_DEFAULT,
            },
            pointer: {
                enabled: true,
                eventBindElementId: "carousel",
            },
            touch: {
                enabled: true,
                eventBindElementId: "root",
            },
        },
        styleConfig: carouschnell.defaultStyles.darkStyle,
    };

    return (
        <div className="App">
            <h1>Welcome!</h1>
            <p>Navigation controls: LRUD | WASD | Mouse | Swipe Up and Down</p>
            <div className="content" id="carousel">
                <carouschnell.Carousel config={config} />
            </div>
        </div>
    );
}
export default App;
```

## CarouselConfig

The Carousel component can be instantiated by passing a config object that conforms to the CarouselConfig type. The CarouselConfig defines:

1. The items that must be displayed
2. The way to to display the items (how many rows/columns)
3. The amount of item overrun in rows/columns
4. Navigation control configuration (e.g. keyboard keys to respond to, pointer support etc)
5. The style of the Carousel (colors, sizes etc)
6. Abstract item actions all the way up to the config, enabling the user to specify what should happen when an item is hit. Could consider an optional callback. At the moment only a redirect is supported.

Carouschnell offers a versatile and customisable Carousel component. In order to create an instance of the Carousel component that satisfies your needs it is important to fully understand the CarouselConfig. Below you can find some details of the individual properties of the CarouselConfig. The CarouselConfig is a POJO configuring, JS users of this lib have to be aware to ensure no mandatory properties are missing. TS users can use the CarouselConfig type definition to ensure a valid instance of the config is passed to the Carousel component when rendering.

### Active/Overrun

### 2D Nav

### Style

# Examples

An example of an instantiation of carouschnell can be found in the example directory of this repo. You can run the example by cloning this repo and calling:

```bash
npm install
npm run start:example
```

This will use react-app-rewired to wire the example with the carouschnell source code that is checked out locally on your machine. As such, changes you make locally will be automatically reflected in the example.

In the subsections below you can find some examples of configurations showing what behaviour can be configured with carouschnell.

## 1D nav

## 2D nav

# Device support

## Responsive

Carouschell responsiveness is based on three breakpoints: small (767), desktop (1024) and large (1366). Using the JS-CSS config definitions of the CarouselConfig you can define the item and border sizes that are applicable for a particular breakpoint.

![](doc/img/responsive.gif)

# TODOs

1. Add more default styles that are ready to be used.
2. Optionally visualize the label as assigned for a row in the component config on top of the row.
3. Fix bug where active border is shifted when the rowStart and rowOverrun violate eachother.
4. Publish @types package to support strong-typed instantiation of Carousels in TS.
5. Lazy loading for thumbnails (define offset parameters when to load also in config)

# Contributing

All contributions to this project are welcome and I hope you'd like to get involved. Any contributions you make are greatly appreciated.

1. Clone this Project
2. Create a Feature Branch (git checkout -b my-new-feature)
3. Commit your Changes (git commit -m 'My contribution')
    1. Prettier will format the code files
    2. Husky will force all tests to pass before the commit is accepted
4. Push to the Branch (git push)
5. Open a Pull Request

import "@testing-library/jest-dom/extend-expect";

let container: HTMLDivElement;

beforeEach(() => {
    container = document.createElement("div");
    container.setAttribute("id", "root");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
});

test("test in view", async () => {
    // TODO
});
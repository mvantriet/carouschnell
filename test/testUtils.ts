import {screen, fireEvent} from '@testing-library/react';

export function itemInView(name: string): boolean {
    try {
      screen.getByRole('img', {name: name});
      return true;
    } catch(err){
      return false;
    }
}

export function getSelectedItem(container: HTMLElement): string {
    const selected = container.querySelector('.selected > .item > img');
    if (selected) {
        const alt = selected.getAttribute('alt');
        if (alt) {
            return alt;
        }
        return "";
    }
    return "";
}

export function keyPress(container: HTMLElement, keyCode: number) {
  fireEvent.keyDown(container, { keyCode: keyCode })
  fireEvent.keyUp(container, { keyCode: keyCode })
}
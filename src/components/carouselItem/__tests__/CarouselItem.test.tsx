import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import {CarouselItem} from '../CarouselItem';
import {CarouselItemConfig} from '../../../config/CarouselConfig';
import {darkStyle} from '../../../styles/defaultStyles';
import {INavItemActionHandler} from "../../../navcontrols/common/INavItemActionHandler";
import {mock} from 'jest-mock-extended';
import {ReactElement} from 'react';

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement('div');
  container.setAttribute("id", "root");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
});

function createCarouselItem(navActionHandler: INavItemActionHandler, inView: boolean, 
    inOverrun: boolean, isSelected: boolean, caption: string): ReactElement {
  const itemConfig:CarouselItemConfig = {
    thumbnail: "",
    caption: caption,
    url: ""
  };
  return <CarouselItem
          style={darkStyle.itemStyleConfig}
          navActionHandlers={[navActionHandler]}
          xNavOffset={0} 
          yNavOffset={0}
          inView={inView}
          inOverrun={inOverrun}
          selected={isSelected} 
          config={itemConfig} />;
}

test('test in view', async () => {
    ReactDOM.render(createCarouselItem(mock<INavItemActionHandler>(), 
      true, false, false, '1'), container);
    // TODO: 
});


/**
 * Created by paulcedrick on 7/17/17.
 */

import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import CoolTheme from 'theme/coolTheme';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { UGCardHeaderFolder } from '../index';
import stylesheet from '../style';

const mockStyles = mockStylesheet('UGCardHeaderFolder', stylesheet, CoolTheme);
describe('UGCardHeaderFolder component', () => {
  afterAll(() => {
    if (global.gc) {
      global.gc();
    }
  });
  it('should render something', () => {
    const wrapper = shallow(<UGCardHeaderFolder classes={mockStyles} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render imageList being passed to the component (1)', () => {
    const images = [
      { url: 'http://qweqwe.com' },
      { url: 'http://qweqwe.com' },
      { url: 'http://qweqwe.com' },
    ];
    const wrapper = shallow(
      <UGCardHeaderFolder
        tourCount={3}
        subfolderCount={3}
        classes={mockStyles}
        imageList={images}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render imageList being passed to the component (2)', () => {
    const images = [{}, {}, {}];
    const wrapper = shallow(
      <UGCardHeaderFolder
        tourCount={3}
        subfolderCount={3}
        classes={mockStyles}
        imageList={images}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render imageList being passed to the component (3)', () => {
    const images = [{}, {}, {}];
    const wrapper = shallow(
      <UGCardHeaderFolder
        tourCount={3}
        subfolderCount={3}
        classes={mockStyles}
        imageList={images}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should only render 3 images even if the imageList passed is beyond 3', () => {
    const images = [
      { url: 'http://qweqwe.com' },
      { url: 'http://qweqwe.com' },
      { url: 'http://qweqwe.com' },
      { url: 'http://qweqwe.com' },
      { url: 'http://qweqwe.com' },
      { url: 'http://qweqwe.com' },
      { url: 'http://qweqwe.com' },
      { url: 'http://qweqwe.com' },
    ];
    const wrapper = shallow(
      <UGCardHeaderFolder classes={mockStyles} imageList={images} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

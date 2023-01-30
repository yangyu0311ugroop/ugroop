import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { CardContent } from '../index'; // eslint-disable-line

describe('<CardContent />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
    resaga: {
      setValue: jest.fn(),
    },
    content: "There is always hope even if it seems there's none.",
    location: 'At the cross of Jesus Christ',
  };

  beforeEach(() => {
    rendered = shallow(<CardContent {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(CardContent).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render something if there is no content', () => {
    rendered.setProps({
      content: undefined,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render without content if content and location is empty string', () => {
    rendered.setProps({ content: '', location: '' });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  describe('openDayView', () => {
    it('should call setValue', () => {
      instance.openDayView();
      expect(props.resaga.setValue).toHaveBeenCalled();
    });
  });
  describe('renderWithoutContent', () => {
    it('should render correctly', () => {
      expect(toJSON(instance.renderWithoutContent())).toMatchSnapshot();
    });
  });
});

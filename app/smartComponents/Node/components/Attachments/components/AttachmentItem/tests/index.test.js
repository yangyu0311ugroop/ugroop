import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { AttachmentItem } from '../index';

describe('<AttachmentItem />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    children: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<AttachmentItem {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AttachmentItem).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      rendered.setProps({
        compact: true,
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

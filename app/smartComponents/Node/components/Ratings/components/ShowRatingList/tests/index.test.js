import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ShowRatingList } from '../index';

describe('<ShowRatingList />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<ShowRatingList {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ShowRatingList).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleCloseDialog', () => {
    it('should set dialogOpen to false', () => {
      instance.handleCloseDialog();

      expect(rendered.state().dialogOpen).toBe(false);
    });
  });

  describe('handleOpenDialog', () => {
    it('should set dialogOpen to true', () => {
      instance.handleOpenDialog();

      expect(rendered.state().dialogOpen).toBe(true);
    });
  });

  describe('render()', () => {
    it('should render correctly simplify', () => {
      rendered.setProps({ simplify: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { AddRating } from 'smartComponents/Node/components/Ratings/components/AddRating/index';

describe('<AddRating />', () => {
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
    rendered = shallow(<AddRating {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AddRating).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleOpenDialog', () => {
    it('should set dialogOpen state to true', () => {
      instance.handleOpenDialog();

      expect(rendered.state().dialogOpen).toBe(true);
    });
  });

  describe('handleCloseDialog', () => {
    it('should set dialogOpen state to false', () => {
      instance.handleCloseDialog();

      expect(rendered.state().dialogOpen).toBe(false);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

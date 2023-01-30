import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ReactionSummary } from '../index';

describe('<ReactionSummary />', () => {
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
    rendered = shallow(<ReactionSummary {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ReactionSummary).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClick', () => {
    it('should change openList state to true', () => {
      instance.handleClick();

      expect(rendered.state().openList).toBe(true);
    });
  });

  describe('handleClose', () => {
    it('should change openList state to false', () => {
      instance.handleClose();

      expect(rendered.state().openList).toBe(false);
    });
  });

  describe('renderCountText', () => {
    it('should return only the count if user has not reacted yet', () => {
      const snapshot = shallow(
        <div>{instance.renderCountText(false)(3, false)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should return the count of user include logged in user if user had reacted and reaction count is not 0', () => {
      const snapshot = shallow(
        <div>{instance.renderCountText(false)(3, true)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should return you like this if only the user logged in liked the photo', () => {
      const snapshot = shallow(
        <div>{instance.renderCountText(false)(1, true)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly if reactions is > 0', () => {
      rendered.setProps({
        reactions: [{ id: 1 }, { id: 2 }],
      });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly if reactions is < 1', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

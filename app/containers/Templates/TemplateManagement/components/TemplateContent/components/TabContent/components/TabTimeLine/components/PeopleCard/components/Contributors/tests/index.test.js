import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ability } from 'apis/components/Ability/ability';
import { Contributors } from '../index';

describe('<Contributors />', () => {
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
    rendered = shallow(<Contributors {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Contributors).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderSeeMore', () => {
    it('should match snapshot', () => {
      const innerProps = {
        handlePeopleRedirect: jest.fn(() => jest.fn()),
      };
      ability.can = jest.fn(() => true);

      const snapshot = shallow(
        <div>{instance.renderSeeMore()(innerProps)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot when no people', () => {
      const innerProps = {
        handlePeopleRedirect: jest.fn(() => jest.fn()),
      };
      rendered.setProps({ people: [1] });
      ability.can = jest.fn(() => true);

      const snapshot = shallow(
        <div>{instance.renderSeeMore()(innerProps)}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

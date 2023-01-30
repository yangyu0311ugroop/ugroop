import { shallow } from 'enzyme';
import { ability } from 'apis/components/Ability/ability';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Booking } from '../index';

describe('<Booking />', () => {
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
    rendered = shallow(<Booking {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Booking).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderPart', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderPart('div')}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTitle', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderTitle()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDefault', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot if ability.can', () => {
      instance.renderPart = jest.fn(() => '');
      ability.can = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.renderDefault);
    });
  });

  describe('renderField', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderField()}</div>);

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

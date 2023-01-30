import { OPTION } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Checkgroup } from '../index';

describe('<Checkgroup />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 44999,
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Checkgroup {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Checkgroup).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderBody()', () => {
    it('should renderBody correctly', () => {
      rendered.setProps({ renderBody: jest.fn() });
      LOGIC_HELPERS.ifFunction = jest.fn(() => 'ifFunction');

      expect(instance.renderBody()).toBe('ifFunction');

      expect(LOGIC_HELPERS.ifFunction).toBeCalled();
      expect(LOGIC_HELPERS.ifFunction.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderOption()', () => {
    it('should renderOption correctly', () => {
      rendered.setProps({ content: 'some content' });
      instance.renderBody = jest.fn(() => 'renderBody');

      const snapshot = shallow(<div>{instance.renderOption()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTableRow', () => {
    it('should render table row correctly', () => {
      const snapshot = shallow(<div>{instance.renderTableRow()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderCheckOption', () => {
    it('should render table row correctly', () => {
      rendered.setProps({
        onChange: jest.fn(),
        selectedChecklists: [{ id: 1 }],
      });
      const snapshot = shallow(<div>{instance.renderCheckOption()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should renderOption', () => {
      rendered.setProps({ variant: OPTION });
      instance.renderOption = jest.fn(() => 'renderOption');

      expect(instance.render()).toBe('renderOption');
    });

    it('should renderBody', () => {
      instance.renderBody = jest.fn(() => 'renderBody');

      expect(instance.render()).toBe('renderBody');
    });
  });
});

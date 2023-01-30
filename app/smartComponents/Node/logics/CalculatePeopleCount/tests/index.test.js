import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { CalculatePeopleCount } from '../index';

describe('<CalculatePeopleCount />', () => {
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
    rendered = shallow(<CalculatePeopleCount {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(CalculatePeopleCount).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount', () => {
    it('should initialize the people count', () => {
      instance.componentDidMount();

      expect(resaga.setValue).toBeCalled();
    });
  });

  describe('componentDidUpdate', () => {
    it('should call setValue if total changes', () => {
      rendered.setProps({ mergedUserEmails: [1, 2] });

      expect(resaga.setValue).toBeCalledWith({
        calculatedPeopleCount: 2,
      });
    });

    it('should not call setValue if no changes in total happened', () => {
      rendered.setProps({ mergedUserEmails: [] });

      expect(resaga.setValue).not.toBeCalled();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

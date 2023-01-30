import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TemplateTab } from '../index';

describe('<TemplateTab />', () => {
  let rendered;
  let instance;

  const resaga = {
    analyse: jest.fn(),
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<TemplateTab {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TemplateTab).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillReceiveProps', () => {
    it('should call resaga analyse', () => {
      instance.componentWillReceiveProps({});
      expect(resaga.analyse).toBeCalled();
      expect(resaga.analyse.mock.calls).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

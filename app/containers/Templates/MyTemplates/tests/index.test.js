import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { MyTemplatePage } from '../index';

describe('<MyTemplatePage />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    location: {},
    history: {},
    orgId: 2,
    rootNodeId: 1,
  };

  beforeEach(() => {
    rendered = shallow(<MyTemplatePage {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(MyTemplatePage).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render NodeExplorer', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

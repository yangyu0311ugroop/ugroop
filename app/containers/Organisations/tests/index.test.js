import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Organisations } from '../index';

describe('<Organisations />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    location: { state: { denyAccess: false } },
  };

  beforeEach(() => {
    rendered = shallow(<Organisations {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Organisations).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.hasOrgAccess = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

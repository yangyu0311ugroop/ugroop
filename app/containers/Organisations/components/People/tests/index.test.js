import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { People } from '../index';

describe('<People />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    organisationIdFromURL: 2233,
  };

  beforeEach(() => {
    rendered = shallow(<People {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(People).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

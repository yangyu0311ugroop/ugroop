import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PersonContainer } from '../container';

describe('<PersonContainer />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const match = {
    params: {
      id: 1,
    },
  };

  const props = {
    classes: {},
    resaga,
    match,
    userId: 1,
  };

  beforeEach(() => {
    LOGIC_HELPERS.ifElse = jest.fn(() => 1);
    rendered = shallow(<PersonContainer {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(PersonContainer).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(LOGIC_HELPERS.ifElse.mock.calls).toMatchSnapshot();
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

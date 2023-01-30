import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PERSON_TAB_ITEM_KEYS } from 'containers/Profile/constants';
import { Content } from '../index';

jest.mock('react', () => {
  const mockReact = jest.requireActual('react');
  mockReact.lazy = jest.fn(cb => {
    cb();
    return 'LazyLoadedComponent';
  });
  return mockReact;
});

describe('<Content />', () => {
  let rendered;
  let instance;

  const location = {
    search: '',
  };

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    userId: 1,
    location,
  };

  beforeEach(() => {
    rendered = shallow(<Content {...props} />, { suspenseFallback: false });
    instance = rendered.instance();
    jest.clearAllMocks();
  });
  afterEach(() => {});

  it('should exists', () => {
    expect(Content).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const keys = Object.keys(PERSON_TAB_ITEM_KEYS);
      keys.forEach(key => {
        rendered.setProps({
          location: {
            search: `?tab=${PERSON_TAB_ITEM_KEYS[key]}`,
          },
        });
        const snapshot = shallow(<div>{instance.render()}</div>, {
          suspenseFallback: true,
        });

        expect(toJSON(snapshot)).toMatchSnapshot();
      });
    });
  });
});

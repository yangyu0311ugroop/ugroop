import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PERSON_TAB_ITEM_KEYS } from 'containers/Profile/constants';
import { Content } from '../index';

describe('<Content />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const location = {
    search: '',
  };

  const props = {
    classes: {},
    resaga,
    userId: 1,
    id: 1,
    location,
  };

  beforeEach(() => {
    rendered = shallow(<Content {...props} />);
    instance = rendered.instance();
  });

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
        const snapshot = shallow(<div>{instance.render()}</div>);

        expect(toJSON(snapshot)).toMatchSnapshot();
      });
    });
  });
});

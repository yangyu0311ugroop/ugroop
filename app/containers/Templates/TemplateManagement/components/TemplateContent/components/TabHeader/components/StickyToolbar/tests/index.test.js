import { shallow } from 'enzyme';
import React from 'react';
import { scroller } from 'react-scroll';
import { StickyToolbar } from '../index';

describe('<StickyToolbar />', () => {
  let rendered;
  let instance;
  const resaga = {
    setValue: jest.fn(),
  };
  const location = {
    search: '?tab=1',
    pathname: '/admin/stuff',
  };
  const history = {
    replace: jest.fn(),
    push: jest.fn(),
  };
  const props = {
    classes: {},
    id: 0,
    tourTitle: 'test',
    resaga,
    location,
    history,
  };
  beforeEach(() => {
    rendered = shallow(<StickyToolbar {...props} />);
    instance = rendered.instance();
  });

  afterEach(() => jest.clearAllMocks());

  it('should exists', () => {
    expect(StickyToolbar).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('onScrollClick()', () => {
    it('should call scroller.scrollTo', () => {
      scroller.scrollTo = jest.fn();

      instance.onScrollClick();

      expect(scroller.scrollTo).toBeCalled();
    });
  });
});

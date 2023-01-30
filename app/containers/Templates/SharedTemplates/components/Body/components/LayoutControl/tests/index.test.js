import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { DEFAULT_VIEW_TOUR_INDEX } from 'containers/Templates/constants';
import { LayoutControl } from '../index';

describe('<LayoutControl />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    history: {
      replace: jest.fn(),
    },
    search: '',
    pathname: '/sample',
    location: {
      pathname: '/sample',
    },
  };

  beforeEach(() => {
    rendered = shallow(<LayoutControl {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(LayoutControl).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('onInitReduxView', () => {
    it('should set value of redux value if view redux value is null and query param view exist', () => {
      instance.onInitReduxView({ view: 'card' });
      expect(resaga.setValue).toBeCalledWith({ view: 'card' });
    });
    it('should update value of query param if query param view did not exist and view redux value exist', () => {
      rendered.setProps({
        view: 'list',
      });
      instance.onInitReduxView({});
      expect(props.history.replace).toBeCalledWith(
        `${props.pathname}?view=list`,
      );
    });
    it('should update redux value if query param view eist and view redux value exist', () => {
      rendered.setProps({
        view: 'card',
      });
      instance.onInitReduxView({ view: 'list' });
      expect(resaga.setValue).toBeCalledWith({
        view: 'list',
      });
    });
    it('should update redux value and query param if both do not exist with the default value', () => {
      instance.onInitReduxView({});
      expect(resaga.setValue).toBeCalledWith({
        view: DEFAULT_VIEW_TOUR_INDEX,
      });
      expect(props.history.replace).toBeCalledWith(
        `${props.pathname}?view=${DEFAULT_VIEW_TOUR_INDEX}`,
      );
    });
  });

  describe('onLayoutChange', () => {
    it('should set view param based on the passed value', () => {
      instance.onLayoutChange('card');
      expect(props.history.replace).toBeCalledWith(
        `${props.pathname}?view=card`,
      );
      expect(resaga.setValue).toBeCalledWith({ view: 'card' });
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

import { DEFAULT_SELECTDAY_INDEX } from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/config';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { List } from 'immutable';
/**
 * Created by quando on 3/9/17.
 */
import React from 'react';
import RenderDay from '../components/RenderDay';
import { TimeLineContent } from '../index';

jest.mock('modernizr', () => 'mock');

describe('TimeLineContent/tests/index.test.js', () => {
  const id = 2;
  const ids = [1, 2];
  const tab = { parentNodeId: 1 };
  const parentData = { hi: 'ho' };

  const resagaMock = {
    analyse: jest.fn(),
    dispatch: jest.fn(),
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
    getValue: jest.fn(() => List()),
    isLoading: jest.fn(),
  };
  const props = {
    id,
    tab,
    classes: {},
    resaga: resagaMock,
  };
  let rendered;
  let instance;

  const dayData = {};

  beforeEach(() => {
    global.setTimeout = jest.fn(cb => cb());
    rendered = shallow(
      <TimeLineContent dayIds={ids} dayData={dayData} {...props} />,
    );
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());

  describe('<TimeLineContent />', () => {
    it('should exists', () => {
      expect(TimeLineContent).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render error without exploding', () => {
      rendered.setState({ error: 'Error' });
      expect(rendered.length).toBe(1);
    });
    it('should render without exploding with selectDayId unset', () => {
      rendered = shallow(
        <TimeLineContent
          {...props}
          dayIds={ids}
          dayData={dayData}
          parentData={parentData}
          selectDayId={1}
        />,
      );
      expect(rendered.length).toBe(1);
    });
  });

  describe('<TimeLineContent /> props', () => {
    it('RenderDay', () => {
      expect(rendered.find(RenderDay).length).toBe(ids.length);
    });
    it('no day data', () => {
      rendered = shallow(
        <TimeLineContent
          parentData={parentData}
          dayData={dayData}
          {...props}
        />,
      );
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('<TimeLineContent /> methods: ', () => {
    describe('onCreate() ', () => {
      it('should call proper data', () => {
        instance.onCreate();
        expect(resagaMock.dispatchTo).toBeCalled();
      });
    });
  });
  describe('onSuccessUpdate() ', () => {
    it('should call proper data', () => {
      const data = { payload: { id: 1 } };
      instance.onSuccessUpdate(data);
      expect(resagaMock.dispatchTo).toBeCalled();
    });
  });

  describe('render()', () => {
    it('should render LoadingText', () => {
      rendered.setProps({ dayIds: [], fetching: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render DEFAULT_SELECTDAY_INDEX', () => {
      rendered.setProps({
        dayIds: [1],
        editable: true,
        selectDayId: DEFAULT_SELECTDAY_INDEX,
      });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render editable', () => {
      rendered.setProps({ dayIds: [], editable: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

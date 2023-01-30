/**
 * Created by quando on 1/7/17.
 */
import React from 'react';
import moment from 'utils/helpers/moment';
import { shallow } from 'enzyme';
import {
  CREATE_PHOTO,
  NODE_API,
  UPDATE_PHOTO,
  UPDATE_NODE,
} from 'apis/constants';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DAY } from 'utils/modelConstants';

import { Day } from '../index';
import DayContainer from '../components/dayContainer';

describe('components/Nodes/Day', () => {
  let instance;
  let rendered;
  const dispatchToMock = jest.fn();
  const resaga = {
    dispatchTo: dispatchToMock,
    setValue: jest.fn(),
  };
  const index = 111;
  const dayContent = 'daycontent';
  const title = 'This is title';
  const children = 'Hello';
  const onDelete = jest.fn();
  const renderedNone = shallow(
    <Day classes={{}} dayId={index} resaga={resaga} index={index} title={title}>
      {children}
    </Day>,
  );
  beforeEach(() => {
    rendered = shallow(
      <Day
        classes={{}}
        dayId={index}
        index={index}
        title={title}
        onDelete={onDelete}
        resaga={resaga}
        content={dayContent}
        description="description"
      >
        {children}
      </Day>,
    );
    instance = rendered.instance();
    moment.getStartDate = jest.fn(() => ({ add: jest.fn() }));
    moment.formatDate = jest.fn();
    DayContainer.displayName = 'DayContainer';
  });
  afterEach(() => jest.clearAllMocks());

  describe('<Day />', () => {
    it('should exists', () => {
      expect(Day).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(renderedNone.length).toBe(1);
      expect(rendered.length).toBe(1);
    });
    it('should render with highlight', () => {
      rendered.setProps({ selected: true });
    });
    it('componentDidMount', () => {
      rendered.setProps({ dayId: 1, discussionDrawerNodeId: 1 });
      instance.onScroll = jest.fn();
      instance.componentDidMount();
      expect(instance.onScroll).toBeCalledWith(1);
    });
  });

  describe('componentDidMount()', () => {
    it('should componentDidMount', () => {
      rendered.setProps({ editable: false });
      rendered.setState({ editMode: true });
      instance.toggleEdit = jest.fn();

      instance.componentDidMount();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.toggleEdit);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should componentWillReceiveProps', () => {
      rendered.setProps({ editable: true, selected: true });
      rendered.setState({ editMode: true });
      instance.toggleEdit = jest.fn();

      instance.componentWillReceiveProps({
        editable: false,
        selected: false,
        editing: true,
      });

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.toggleEdit);
      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });

    it('should componentWillReceiveProps', () => {
      rendered.setProps({ selected: false });

      instance.componentWillReceiveProps({
        selected: true,
      });

      expect(rendered.state().showBorder).toBe(true);
    });
  });

  describe('componentWillUnmount()', () => {
    it('should call clearTimeout', () => {
      global.clearTimeout = jest.fn();

      instance.componentWillUnmount();

      expect(global.clearTimeout).toBeCalled();
    });
  });

  describe('handleHideBorder()', () => {
    it('should handleHideBorder()', () => {
      instance.handleHideBorder();

      expect(rendered.state().showBorder).toBe(false);
    });
  });

  describe('<Day /> props', () => {
    it('should receive props - none', () => {
      const props = renderedNone.instance().props;
      expect(props.index).toBe(index);
      expect(props.title).toBe(title);
      expect(props.children).toBe(children);
    });
  });

  describe('<Day /> UI Actions', () => {
    it('onTitleChange', () => {
      const component = renderedNone.instance();
      component.onTitleChange('content');
      expect(component.title).toBe('content');
    });
    it('onRichContentChange', () => {
      const component = renderedNone.instance();
      component.onRichContentChange('content');
      expect(component.templateDescription).toBe('content');
    });
  });

  describe('<Day /> Request Callback', () => {
    it('dayUpdateSuccess', () => {
      NODE_API_HELPERS.getTreeAndTimes = jest.fn(() => 'getTreeAndTimes');

      const component = rendered.instance();
      component.photo = 'abcd';
      component.state.editMode = true;
      component.dayUpdateSuccess();
      expect(component.state.editMode).toBe(true);
      expect(component.state.editMode).toBe(true);

      expect(NODE_API_HELPERS.getTreeAndTimes).toBeCalled();
      expect(NODE_API_HELPERS.getTreeAndTimes.mock.calls).toMatchSnapshot();
    });
    it('dayUpdateSuccess do nothing if it has photo', () => {
      const component = rendered.instance();
      const dayProp = component.props.day;
      component.photo = null;
      rendered.setProps({ day: { id: index, customData: {} } });
      component.state.editMode = true;
      component.dayUpdateSuccess();
      expect(component.state.editMode).toBe(false);
      rendered.setProps({ day: dayProp });
    });
    it('imageUpdateSuccess', () => {
      const component = renderedNone.instance();
      component.state.editMode = true;
      component.imageUpdateSuccess();
      expect(component.state.editMode).toBe(false);
    });
  });

  describe('<Day /> Func pass to Children as props', () => {
    it('dispatchDayUpdate', () => {
      const component = rendered.instance();
      const mockedCbSuccess = instance.dayUpdateSuccess;
      const mockedCbError = instance.handleDayUpdateError;
      component.photo = null;
      // component.dayUpdateSuccess = mockedCb;
      component.state.editMode = true;
      component.dispatchDayUpdate({ id: 1 });
      expect(dispatchToMock).toHaveBeenCalledWith(NODE_API, UPDATE_NODE, {
        payload: {
          node: {
            id: 1,
          },
          nodeId: 111,
        },
        onSuccess: mockedCbSuccess,
        onError: mockedCbError,
      });
    });
    it('dispatchImageUpdate', () => {
      const component = rendered.instance();
      const mockedCb = jest.fn();
      component.imageUpdateSuccess = mockedCb;
      component.dispatchImageUpdate({ id: 1 }, CREATE_PHOTO);
      expect(dispatchToMock).toHaveBeenCalledWith(NODE_API, CREATE_PHOTO, {
        payload: { id: 1 },
        onSuccess: mockedCb,
      });
    });
    it('toggleEdit > true', () => {
      const component = renderedNone.instance();
      component.state.editMode = false;
      component.toggleEdit();
      expect(component.state.editMode).toBe(true);
    });
    it('toggleEdit > false', () => {
      renderedNone.setProps({ hasContent: true });
      const component = renderedNone.instance();
      component.state.editMode = true;
      component.toggleEdit();
      expect(component.state.editMode).toBe(false);
    });
    it('toggleEdit > handle delete should be called when no content and is new', () => {
      renderedNone.setProps({ hasContent: false, isNew: true });
      const component = renderedNone.instance();
      component.handleDelete = jest.fn();
      component.state.editMode = true;
      component.toggleEdit();
      expect(component.handleDelete).toBeCalled();
    });
  });

  describe('handleUpdate', () => {
    let metaInfo;
    beforeAll(() => {
      metaInfo = {
        x: 1,
        y: 1,
        width: 1.1,
        height: 1.1,
        scale: 2.0,
      };
    });
    it('should call dispatchDayUpdate with Correct data', () => {
      const description = 'content';
      const mockedDispatch = jest.fn();
      const mockedDispatchImageUpdate = jest.fn();
      const component = renderedNone.instance();
      component.photo = { url: 'content', metaInfo };
      component.templateDescription = 'content';
      component.dispatchDayUpdate = mockedDispatch;
      component.dispatchImageUpdate = mockedDispatchImageUpdate;
      component.handleUpdate({});
      expect(mockedDispatch).toHaveBeenCalledWith({
        id: index,
        content: 'content',
        customData: { description },
        type: 'day',
      });
    });
    it('should call dispatchImageUpdate with Correct data 2', () => {
      const description = 'abcd';
      const mockedDispatch = jest.fn();
      const mockedDispatchImageUpdate = jest.fn();
      const component = renderedNone.instance();
      component.photo = { url: 'content', metaInfo };
      component.dispatchDayUpdate = mockedDispatch;
      component.dispatchImageUpdate = mockedDispatchImageUpdate;
      component.description = description;
      component.handleUpdate({});
      expect(mockedDispatchImageUpdate).toHaveBeenCalledWith(
        {
          content: 'content',
          fileName: undefined,
          id: index,
          metaInfo,
          otherData: {
            description: 'content',
            location: undefined,
            locationExtra: {},
          },
        },
        CREATE_PHOTO,
      );
    });
    it('should not call if photo is empty', () => {
      const description = 'abcd';
      const mockedDispatch = jest.fn();
      const mockedDispatchImageUpdate = jest.fn();
      const component = renderedNone.instance();
      component.photo = null;
      component.dispatchDayUpdate = mockedDispatch;
      component.dispatchImageUpdate = mockedDispatchImageUpdate;
      component.description = description;
      component.handleUpdate({});
      expect(mockedDispatchImageUpdate).not.toHaveBeenCalled();
    });
    it('should call dispatchImageUpdate with Correct data 4', () => {
      const description = 'abcd';
      const mockedDispatch = jest.fn();
      const mockedDispatchImageUpdate = jest.fn();
      const component = rendered.instance();
      rendered.setProps({
        dayPhotoId: 1,
        placeId: '123abc',
        icon: 'some icon',
        timeZoneId: 'timeZoneId',
      });
      component.photo = { url: 'content', metaInfo };
      component.dispatchDayUpdate = mockedDispatch;
      component.dispatchImageUpdate = mockedDispatchImageUpdate;
      component.description = description;
      component.handleUpdate({});
      expect(mockedDispatchImageUpdate).toHaveBeenCalledWith(
        {
          content: 'content',
          fileName: undefined,
          id: index,
          metaInfo,
          otherData: {
            description: 'abcd',
            location: undefined,
            locationExtra: {
              icon: 'some icon',
              placeId: '123abc',
              timeZoneId: 'timeZoneId',
            },
          },
        },
        CREATE_PHOTO,
      );
    });
    it('should call dispatchImageUpdate if fk is not equal to -1', () => {
      const description = 'abcd';
      const mockedDispatch = jest.fn();
      const mockedDispatchImageUpdate = jest.fn();
      const component = rendered.instance();
      rendered.setProps({
        fk: 123,
        dayPhotoId: 1,
        placeId: '123abc',
        icon: 'some icon',
      });
      component.photo = { url: 'content', metaInfo };
      component.dispatchDayUpdate = mockedDispatch;
      component.dispatchImageUpdate = mockedDispatchImageUpdate;
      component.description = description;
      component.handleUpdate({});
      expect(mockedDispatchImageUpdate).toHaveBeenCalledWith(
        {
          content: 'content',
          fileName: undefined,
          fk: 123,
          id: index,
          metaInfo,
          oldPhoto: 1,
          oldMetaInfo: {
            height: 0,
            isNew: false,
            rotate: 0,
            scale: 0,
            width: 0,
            x: 0,
            y: 0,
          },
          otherData: {
            description: 'abcd',
            location: undefined,
            locationExtra: {
              icon: 'some icon',
              placeId: '123abc',
              timeZoneId: null,
            },
          },
        },
        UPDATE_PHOTO,
      );
    });
  });

  describe('componentWillMount', () => {
    it('should setTitle', () => {
      instance.componentWillMount();
      expect(instance.title).toBe(dayContent);
    });
    it('should set description', () => {
      instance.componentWillMount();
      expect(instance.description).toBe('description');
    });
  });

  describe('handleDelete', () => {
    it('shall call deleting', () => {
      const e = { preventDefault: jest.fn() };
      instance.handleDelete(e);
      expect(resaga.dispatchTo).toBeCalled();
    });
  });
  describe('render', () => {
    it('render highlight component', () => {
      const wrapper = shallow(
        <Day
          classes={{}}
          dayId={index}
          index={index}
          title={title}
          selected
          checklists={[1]}
          showChecklists
        >
          {children}
        </Day>,
      );
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
    it('render if it is first day component', () => {
      const wrapper = shallow(
        <Day classes={{}} dayId={1} index={1} title={title} selected>
          {children}
        </Day>,
      );
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
    it('render if has content', () => {
      const wrapper = shallow(
        <Day
          classes={{}}
          dayId={1}
          index={0}
          title={title}
          selected
          hasContent
          addNewSectionRequested
        >
          {children}
        </Day>,
      );
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
    it('do not render section title if there is no section placeholder, and no new section is requested', () => {
      const wrapper = shallow(
        <Day
          classes={{}}
          dayId={1}
          index={0}
          title={title}
          selected
          hasContent
          hasSections={false}
          addNewSectionRequested={false}
          layout={DAY}
          checklists={[1]}
        >
          {children}
        </Day>,
      );
      expect(wrapper.find('withStyles(H5)').exists()).toBe(false);
    });
  });
  describe('on dispatchSelectRow', () => {
    it('DispatchTo should be called with on dispatchSelectRow', () => {
      rendered.setProps({ selected: false });

      instance.dispatchSelectRow(111);
      expect(resaga.setValue).toBeCalledWith({ selectDayId: 111 });
    });
  });
  describe('onUrlChange()', () => {
    it('should onUrlChange', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.onUrlChange('val'));
    });
  });
  describe('on Click Hightlight', () => {
    it('shall call dispatchSelectRow', () => {
      rendered.setProps({ selected: false });

      instance.dispatchSelectRow = jest.fn();
      instance.onClickDay();
      expect(instance.dispatchSelectRow).toBeCalledWith(111);
    });
    it('shall not be called dispatchSelectRow', () => {
      rendered.setProps({ selected: true });

      instance.dispatchSelectRow = jest.fn();
      instance.onClickDay();
      expect(instance.dispatchSelectRow).not.toBeCalledWith(111);
    });
  });

  describe('handleDayUpdateError', () => {
    it('should toggle editMode state and call handleErrorGeneric', () => {
      rendered.setState({
        editMode: true,
      });
      instance.handleDayUpdateError({});
      expect(rendered.state().editMode).toBe(false);
    });
  });

  describe('componentWillReceiveProps', () => {
    it('should change the inner editMode state based on the value of the willBeEdited props if it changes', () => {
      instance.componentWillReceiveProps({ willBeEdited: true });
      expect(rendered.state().editMode).toBe(true);
    });
    it('should not change the inner editMode state based on the value of the willBeEdited props', () => {
      rendered.setState({
        editMode: true,
      });

      instance.componentWillReceiveProps({ willBeEdited: false });
      expect(rendered.state().editMode).toBe(true);
    });
  });
});

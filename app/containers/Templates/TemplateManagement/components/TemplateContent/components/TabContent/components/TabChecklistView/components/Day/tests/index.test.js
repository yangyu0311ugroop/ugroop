/**
 * Created by quando on 1/7/17.
 */
import React from 'react';
import moment from 'utils/helpers/moment';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DAY } from 'utils/modelConstants';

import { Day } from '../index';

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

  describe('onScroll', () => {
    it('should setTitle', () => {
      instance.onScroll();
    });
  });
  describe('iconToggle', () => {
    it('should return do nothing', () => {
      instance.iconToggle();
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

  describe('componentWillReceiveProps', () => {
    it('should not change the inner editMode state based on the value of the willBeEdited props', () => {
      rendered.setState({
        editMode: true,
      });

      instance.componentWillReceiveProps({ willBeEdited: false });
      expect(rendered.state().editMode).toBe(true);
    });
  });
});

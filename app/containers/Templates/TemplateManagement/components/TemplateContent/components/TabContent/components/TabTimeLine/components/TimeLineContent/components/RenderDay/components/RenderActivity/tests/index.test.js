/**
 * Created by quando on 1/7/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import { ActivityWrapper } from '../index';

describe('ActivityForm', () => {
  const changeActivityMode = jest.fn();
  const nodeImageUpdateInsert = jest.fn();
  const activityUpdate = jest.fn();
  const photo = { photoUrl: { downloadURL: 'url' } };
  let rendered;
  const dispatchToMock = jest.fn();
  const resaga = {
    dispatchTo: dispatchToMock,
    setValue: jest.fn(),
  };
  beforeEach(() => {
    rendered = shallow(
      <ActivityWrapper
        index={1}
        photo={photo}
        dayId={1}
        dayIndex={1}
        activityFunc={{
          changeActivityMode,
          nodeImageUpdateInsert,
          activityUpdate,
        }}
        activityId={2}
        crud={{ delete: jest.fn() }}
        classes={{}}
        resaga={resaga}
      />,
    );
  });
  afterEach(() => {});

  it('should exists', () => expect(ActivityWrapper).toBeDefined());
  it('should render without exploding', () => expect(rendered.length).toBe(1));
  it('resetForm', () => {
    const component = rendered.instance();
    const event = { preventDefault: jest.fn() };
    component.resetForm(event);
    expect(rendered.state().editMode).toEqual(false);
  });
  it('toggleEditMode', () => {
    const component = rendered.instance();
    component.setState({
      editMode: false,
    });
    const event = { preventDefault: jest.fn() };
    component.toggleEditMode(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.state.editMode).toBe(true);
  });
  it('handleRequestClose', () => {
    const component = rendered.instance();
    component.state.open = true;
    component.handleRequestClose();
    expect(component.state.open).toBe(false);
  });
  it('handleRequestClose shall do nothing', () => {
    const component = rendered.instance();
    component.state.open = false;
    component.handleRequestClose();
    expect(component.state.open).toBe(false);
  });
  it('shall call dispatchSelectRow', () => {
    rendered.setProps({ selected: false });
    const instance = rendered.instance();
    instance.dispatchSelectRow = jest.fn();
    instance.onClickSection();
    expect(instance.dispatchSelectRow).toBeCalledWith(2);
  });
  it('shall not be called dispatchSelectRow', () => {
    rendered.setProps({ selected: true });
    const instance = rendered.instance();
    instance.dispatchSelectRow = jest.fn();
    instance.onClickSection();
    expect(instance.dispatchSelectRow).not.toBeCalledWith(111);
  });
  it('DispatchTo should be called with on dispatchSelectRow', () => {
    rendered.setProps({ selected: false });
    const instance = rendered.instance();
    instance.dispatchSelectRow(111);
    expect(resaga.setValue).toBeCalledWith({
      selectedActivityId: 111,
    });
  });
  it('should render activities if array is not empty', () => {
    const instance = rendered.instance();
    rendered.setProps({
      activityIds: [1, 2, 3],
      activityId: 1,
    });
    instance.render();
  });
});

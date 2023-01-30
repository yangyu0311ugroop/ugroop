import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';

import { DayToolBar } from '../dayToolBar';
import { dayToolBarStyle } from '../style';

jest.useFakeTimers();

describe('DayToolBar component', () => {
  const resaga = { dispatchTo: jest.fn(), setValue: jest.fn() };
  const day = { id: 1, content: 'abcd' };
  let render;
  let renderEditMode;
  let renderHasContent;
  let inst;
  const toggleEdit = jest.fn();
  const deleteFn = jest.fn();
  const update = jest.fn();
  const toolFunc = { toggleEdit, delete: deleteFn, update };

  Date.now = jest.fn(() => 'now');

  // TODO: this setup is quite big, need refactor @Yang
  beforeEach(() => {
    global.clearTimeout = jest.fn();
    render = shallow(
      <DayToolBar
        index={0}
        dayId={day.id}
        classes={{}}
        resaga={resaga}
        toolBarFunc={toolFunc}
      />,
    );
    renderEditMode = shallow(
      <DayToolBar
        index={0}
        dayId={day.id}
        classes={{}}
        resaga={resaga}
        toolBarFunc={toolFunc}
        hasChanged
        editor
      />,
    );
    renderHasContent = shallow(
      <DayToolBar
        index={0}
        dayId={day.id}
        classes={{}}
        resaga={resaga}
        toolBarFunc={toolFunc}
        hasContent
      />,
    );
    inst = render.instance();
  });
  afterEach(() => jest.clearAllMocks());
  it('toggleEdit', () => {
    const mockedfn = jest.fn();
    const event = { preventDefault: mockedfn };
    inst.toggleEdit(event);
    expect(mockedfn).toHaveBeenCalled();
    expect(toggleEdit).toHaveBeenCalled();
  });

  it('check style', () => {
    const output = dayToolBarStyle({ colors: { offwhite: 'white' } });
    expect(output.bg.background).toBe('white');
  });
  describe('editmode', () => {
    it('shall have two buttons', () => {
      expect(toJSON(renderEditMode)).toMatchSnapshot();
    });
    it('shall have one button', () => {
      renderEditMode.setProps({ hasChanged: false });
      expect(toJSON(renderEditMode)).toMatchSnapshot();
    });
  });
  describe('hasContent', () => {
    it('shall have full buttons', () => {
      expect(toJSON(renderHasContent)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render delete mode', () => {
      render.setState({ deleting: true });
      expect(toJSON(render)).toMatchSnapshot();
    });
  });
});

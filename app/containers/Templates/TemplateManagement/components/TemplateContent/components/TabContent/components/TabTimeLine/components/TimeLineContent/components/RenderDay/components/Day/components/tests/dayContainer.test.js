import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DayContainer } from '../dayContainer';

describe('DayContainer component', () => {
  const parentData = {};
  let render;
  let instance;
  const toolBarFuncMocked = { update: jest.fn(), toggleEdit: jest.fn() };
  beforeEach(() => {
    render = shallow(
      <DayContainer
        dayId={1}
        dayIndex={0}
        classes={{}}
        parentData={parentData}
        toolBarFunc={toolBarFuncMocked}
      />,
    );
    instance = render.instance();
  });
  afterEach(() => jest.clearAllMocks());

  describe('isExpanded()', () => {
    it('should return false', () => {
      expect(instance.isExpanded()).toBe(false);
    });
  });

  describe('expansionIcon()', () => {
    it('should return false', () => {
      instance.expansionIcon();
    });
  });

  describe('toggleExpanded', () => {
    it('should toggle the open state of the component', () => {
      instance.toggleExpanded();
      expect(instance.state.open).toBe(true);
    });
  });

  describe('renderOpenChecklist', () => {
    it('set open state to true', () => {
      instance.setState({ open: true });
      instance.renderOpenChecklist();
    });
  });

  describe('renderBody()', () => {
    it('should renderBody', () => {
      instance.canExecute = jest.fn(() => true);
      render.setProps({ checklistLength: [1] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderBody);
    });
  });

  describe('canExecute()', () => {
    it('should canExecute', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.canExecute);
    });
  });

  describe('render()', () => {
    it('still render form', () => {
      instance.renderBody = jest.fn(() => 'renderBody');
      render.setProps({ editorMode: true });

      expect(toJSON(shallow(instance.render()))).toMatchSnapshot();
    });

    it('still render no form', () => {
      instance.renderBody = jest.fn(() => 'renderBody');
      render.setProps({ editorMode: false });

      expect(toJSON(shallow(instance.render()))).toMatchSnapshot();
    });
  });

  describe('DayContainer methods', () => {
    describe('handleValidSubmit() ', () => {
      it('should call toolbarFunc update', () => {
        render.setState({ hasChanged: true });

        instance.handleValidSubmit();
        expect(toolBarFuncMocked.update).toBeCalled();
      });

      it('should not do anything', () => {
        render.setState({ hasChanged: false });

        instance.handleValidSubmit();
      });
    });
  });
});

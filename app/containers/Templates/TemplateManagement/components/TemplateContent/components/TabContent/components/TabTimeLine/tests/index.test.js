import { ability } from 'apis/components/Ability/ability';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import toJSON from 'enzyme-to-json';
import { TabTimeLine } from '../index';

jest.mock('modernizr', () => 'mock');
jest.useFakeTimers();
const mockedFn = jest.fn();
const resagaMock = {
  analyse: jest.fn(),
  dispatch: jest.fn(),
  setValue: jest.fn(),
  getValue: jest.fn(),
  isLoading: jest.fn(),
};
const renderedComponent = shallow(
  <TabTimeLine
    classes={{}}
    id={1}
    tab={{ id: 1 }}
    dayIds={[1]}
    dispatchSnackBarStatus={mockedFn}
    crud={{ retrieve: mockedFn }}
    resaga={resagaMock}
  />,
);

describe('TabTimeLine component', () => {
  describe('isExpanded()', () => {
    it('should return false', () => {
      const instance = renderedComponent.instance();
      expect(instance.isExpanded()).toBe(false);
    });
  });

  describe('expansionIcon()', () => {
    it('should return false', () => {
      const instance = renderedComponent.instance();
      const snapshot = shallow(<div>{instance.expansionIcon()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('toggleExpanded', () => {
    it('should toggle the open state of the component', () => {
      const instance = renderedComponent.instance();
      instance.toggleExpanded();
      expect(instance.state.open).toBe(true);
    });
  });

  describe('renderOpenChecklist', () => {
    it('set open state to true', () => {
      const instance = renderedComponent.instance();
      instance.setState({ open: true });
      instance.renderOpenChecklist();
    });
  });

  describe('canEdit()', () => {
    it('should return null', () => {
      const instance = renderedComponent.instance();
      jest.runAllTimers();

      renderedComponent.setProps({ editable: true });
      ability.can = jest.fn(() => true);

      expect(instance.canEdit()).toBe(true);
    });
  });

  describe('renderDescription()', () => {
    it('should renderDescription', () => {
      const instance = renderedComponent.instance();

      TEST_HELPERS.expectMatchSnapshot(instance.renderDescription, [
        { content: 'content' },
      ]);
    });
  });

  it('should render something', () => {
    ability.can = jest.fn(() => true);
    renderedComponent.setProps({
      checklists: [1],
    });
    const instance = renderedComponent.instance();
    expect(instance.render()).toBeDefined();
  });
  it('should render something if not isPublic', () => {
    const instance = renderedComponent.instance();
    renderedComponent.setProps({
      isPublic: true,
    });
    expect(instance.render()).toBeDefined();
  });
  it('shall have props passed in', () => {
    const instance = renderedComponent.instance();
    expect(instance.props.dispatchSnackBarStatus).toBe(mockedFn);
    expect(instance.props.crud).toEqual({ retrieve: mockedFn });
  });
});

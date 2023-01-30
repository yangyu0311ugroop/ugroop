import { ability } from 'apis/components/Ability/ability';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TabChecklistView } from '../index';

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
  <TabChecklistView
    classes={{}}
    id={1}
    tab={{ id: 1 }}
    dayIds={[1]}
    dispatchSnackBarStatus={mockedFn}
    crud={{ retrieve: mockedFn }}
    resaga={resagaMock}
  />,
);

describe('TabchecklistView component', () => {
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
    const instance = renderedComponent.instance();
    expect(instance.render()).toBeDefined();
  });
  it('should render something if not isPublic', () => {
    const instance = renderedComponent.instance();
    instance.iconToggle();
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

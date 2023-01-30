import { ICON, ICON_BUTTON } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { ChecklistIcon } from '../index';

describe('<ChecklistIcon />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<ChecklistIcon {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ChecklistIcon).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderContent()', () => {
    it('should render correctly with checklist', () => {
      instance.renderComponent = jest.fn(() => 'renderComponent');
      instance.checkListButton = jest.fn(() => 'checkListButton');

      rendered.setProps({ checklists: [1], showChecklists: true });
      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderComponent()', () => {
    it('should render correctly with no data', () => {
      const snapshot = shallow(<div>{instance.renderComponent('')}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('checkListButton()', () => {
    it('should render still render add button', () => {
      rendered.setProps({
        variant: ICON,
        showAddButton: true,
        checklists: [],
      });
      const snapshot = shallow(<div>{instance.checkListButton()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render still render add icon button', () => {
      rendered.setProps({
        variant: ICON_BUTTON,
        showAddButton: true,
        checklists: [],
      });
      const snapshot = shallow(<div>{instance.checkListButton()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render', () => {
      rendered.setProps({
        variant: ICON,
        showAddButton: true,
        checklists: [1],
      });
      instance.checkListButton = jest.fn(() => 'checkListButton');

      expect(instance.render()).toBe('checkListButton');
    });
  });

  describe('toggleChecklists()', () => {
    it('should toggleChecklists()', () => {
      instance.toggleChecklists();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });
});

import { ability } from 'apis/components/Ability/ability';
import sections from 'datastore/templateManagementStore/helpers/sectionHelper';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Header } from '../index';

describe('<Header />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    id: 999,
  };

  beforeEach(() => {
    rendered = shallow(<Header {...props} />);
    instance = rendered.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Header).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleChange()', () => {
    it('should call setValue', () => {
      rendered.setProps({ id: 123 });
      sections.upsert = jest.fn(() => 'sections.upsert()');

      instance.handleChange('content')('abcd');

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
      expect(sections.upsert).toBeCalled();
      expect(sections.upsert).toMatchSnapshot();
    });
  });

  describe('canUpdate()', () => {
    it('should return null', () => {
      rendered.setProps({ editable: true });
      ability.can = jest.fn(() => true);

      expect(instance.canUpdate()).toBe(true);
    });
  });

  describe('renderContent()', () => {
    it('should renderContent batchEditing', () => {
      rendered.setProps({ batchEditing: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });

    it('should renderContent', () => {
      instance.canUpdate = jest.fn(() => true);
      rendered.setProps({ editing: false });

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render TextField if editing is truthy', () => {
      rendered.setProps({ editing: true });

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderButtons()', () => {
    it('should return null', () => {
      rendered.setProps({ editable: false });

      expect(instance.renderButtons()).toBe(null);
    });

    it('should renderButtons', () => {
      rendered.setProps({ editable: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderButtons);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

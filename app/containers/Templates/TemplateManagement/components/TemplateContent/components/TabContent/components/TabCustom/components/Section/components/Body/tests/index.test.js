import sections from 'datastore/templateManagementStore/helpers/sectionHelper';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ability } from 'apis/components/Ability/ability';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Body } from '../index';

describe('<Body />', () => {
  let rendered;
  let instance;

  const uploadFile = {
    enqueueData: jest.fn(),
    subscribeSuccess: jest.fn(),
  };

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    uploadFile,
    id: 999,
    onDataChange: jest.fn(() => jest.fn()),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Body {...props} />);
    instance = rendered.instance();
    Date.now = jest.fn(() => 1);
  });

  it('should exists', () => {
    expect(Body).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('canUpdate()', () => {
    it('should return true', () => {
      rendered.setProps({ editable: true });
      ability.can = jest.fn(() => true);

      expect(instance.canUpdate()).toBe(true);
    });
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

  describe('renderDescription()', () => {
    it('should render view mode', () => {
      rendered.setProps({ batchEditing: 0, description: 'hello world' });

      const snapshot = shallow(<div>{instance.renderDescription()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render view mode for print mode', () => {
      rendered.setProps({
        batchEditing: 0,
        description: 'hello world',
        isPrint: true,
      });

      const snapshot = shallow(<div>{instance.renderDescription()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render edit mode', () => {
      rendered.setProps({ batchEditing: 123, description: 'hello world' });

      const snapshot = shallow(<div>{instance.renderDescription()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderAttachment()', () => {
    it('should return null', () => {
      rendered.setProps({
        attachmentExist: false,
        editable: false,
        editing: false,
      });

      expect(instance.render()).toBe(null);
    });

    it('should render view mode', () => {
      rendered.setProps({
        attachmentExist: true,
        editing: 0,
        id: 13,
        attachmentId: 123,
      });

      const snapshot = shallow(<div>{instance.renderAttachment()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render edit mode', () => {
      rendered.setProps({
        attachmentExist: true,
        editing: 1,
        id: 13,
        attachmentId: 123,
      });

      const snapshot = shallow(<div>{instance.renderAttachment()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderLocation()', () => {
    it('should renderLocation batchEditing', () => {
      rendered.setProps({ batchEditing: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderLocation);
    });

    it('should renderLocation batchEditing false', () => {
      rendered.setProps({ batchEditing: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderLocation);
    });
  });

  describe('renderUrl()', () => {
    it('should renderUrl', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderUrl);
    });
    it('should render validation text field', () => {
      rendered.setProps({
        batchEditing: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderUrl);
    });
  });

  describe('renderBody()', () => {
    it('should return empty if !description && !attachment', () => {
      rendered.setProps({
        editing: false,
        attachmentExist: false,
        content: '',
      });
      instance.renderDescription = jest.fn();

      expect(instance.renderBody()).toBe(null);
    });

    it('should render view mode', () => {
      rendered.setProps({ editing: true });
      instance.renderLocation = jest.fn(() => 'renderLocation');
      instance.renderUrl = jest.fn(() => 'renderUrl');
      instance.renderDescription = jest.fn(() => 'renderDescription');
      instance.renderAttachment = jest.fn(() => 'renderAttachment');

      const snapshot = shallow(<div>{instance.renderBody()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render empty if !body', () => {
      instance.renderBody = jest.fn();

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly', () => {
      instance.renderBody = jest.fn(() => 'renderBody');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

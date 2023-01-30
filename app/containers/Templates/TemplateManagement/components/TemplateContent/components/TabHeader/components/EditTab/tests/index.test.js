import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import tabHelper from 'datastore/templateManagementStore/helpers/tab';
import { EditTab } from '../index';

describe('<EditTab />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    tabId: 999,
  };

  beforeEach(() => {
    rendered = shallow(<EditTab {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(EditTab).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleValidSubmit()', () => {
    it('should call editTab if tabId truthy', () => {
      rendered.setProps({ tabId: 123 });
      instance.editTab = jest.fn();

      instance.handleValidSubmit({
        content: 'some content',
        private: 'so private',
      });

      expect(instance.editTab).toBeCalledWith({
        content: 'some content',
        private: 'so private',
      });
    });

    it('should call addTab if tabId NOT truthy and parentId truthy', () => {
      rendered.setProps({ tabId: 0, parentId: 123 });
      instance.addTab = jest.fn();

      instance.handleValidSubmit({
        content: 'some content',
        private: 'so private',
      });

      expect(instance.addTab).toBeCalledWith({
        content: 'some content',
        private: 'so private',
      });
    });

    it('should not do anything otherwise', () => {
      rendered.setProps({ tabId: 0, parentId: 0 });
      instance.addTab = jest.fn();
      instance.editTab = jest.fn();

      instance.handleValidSubmit({
        content: 'some content',
        private: 'so private',
      });

      expect(instance.addTab).not.toBeCalled();
      expect(instance.editTab).not.toBeCalled();
    });
  });

  describe('addTab()', () => {
    it('should call resaga.dispatch', () => {
      rendered.setProps({ parentId: 123 });

      instance.addTab({ content: 'some content', private: 'so private' });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('addSuccess()', () => {
    it('should setValue', () => {
      tabHelper.upsert = jest.fn();

      instance.addSuccess(
        { updatedAt: 'long long ago' },
        { content: 'some content' },
      );

      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should call parent props', () => {
      const onSuccess = jest.fn();
      const onClose = jest.fn();
      rendered.setProps({ tabId: 0 });

      rendered.setProps({ onSuccess, onClose });

      instance.addSuccess(
        { updatedAt: 'long long ago' },
        { content: 'some content' },
      );

      expect(onSuccess).toBeCalledWith(
        { updatedAt: 'long long ago' },
        { content: 'some content' },
      );
      expect(onClose).toBeCalledWith('addTab');
    });
  });

  describe('editTab()', () => {
    it('should call resaga.dispatch', () => {
      rendered.setProps({ parentId: 123 });

      instance.editTab({ content: 'some content', private: 'so private' });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('editSuccess()', () => {
    it('should setValue', () => {
      tabHelper.upsert = jest.fn();

      instance.editSuccess(
        { updatedAt: 'long long ago' },
        { content: 'some content' },
      );

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();

      expect(tabHelper.upsert).toBeCalledWith(
        { updatedAt: 'long long ago' },
        { content: 'some content' },
      );
    });

    it('should call parent props', () => {
      const onSuccess = jest.fn();
      const onClose = jest.fn();

      rendered.setProps({ onSuccess, onClose });

      instance.editSuccess(
        { updatedAt: 'long long ago' },
        { content: 'some content' },
      );

      expect(onSuccess).toBeCalledWith(
        { updatedAt: 'long long ago' },
        { content: 'some content' },
      );
      expect(onClose).toBeCalledWith('editTab');
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if role is owner or admin', () => {
      rendered.setProps({ role: 'owner' });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if role is not owner or admin', () => {
      rendered.setProps({ role: 'member' });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

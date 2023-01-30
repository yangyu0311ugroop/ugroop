import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ButtonActions } from '../index';

describe('<ButtonActions />', () => {
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

  let childrenMock;

  beforeEach(() => {
    childrenMock = jest.fn();
    rendered = shallow(
      <ButtonActions {...props}>{childrenMock}</ButtonActions>,
    );
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ButtonActions).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('onOpenAddTemplateModal', () => {
    it('should call setValue with isAddTemplateModalOpen to true', () => {
      instance.onOpenAddTemplateModal();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('onAddFolderBtnClicked', () => {
    it('should call setValue with onAddFolderBtnClicked', () => {
      instance.onAddFolderBtnClicked();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('onCloseFolderBtnClicked', () => {
    it('should call setValue with onCloseFolderBtnClicked', () => {
      instance.onCloseFolderBtnClicked();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('onCloseAddTemplateModal', () => {
    it('should call setValue with onCloseAddTemplateModal', () => {
      instance.onCloseAddTemplateModal();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should pass a particular parameter in children', () => {
      expect(childrenMock.mock.calls).toMatchSnapshot();
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { CopyDialog } from '../index';
const resagaMock = {
  dispatchTo: jest.fn(),
  setValue: jest.fn(),
};

describe('CopyDialog', () => {
  let component;
  let instance;
  beforeEach(() => {
    component = shallow(
      <CopyDialog
        classes={{}}
        resaga={resagaMock}
        templateId={111}
        showCopyLinkDialog
      />,
    );
    instance = component.instance();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('Test Render and compare snapshot', () => {
    it('render component', () => {
      expect(toJSON(component)).toMatchSnapshot();
    });
    it('with copied state', () => {
      component.setState({ copied: true });
      expect(toJSON(component)).toMatchSnapshot();
    });
    it('with hashkey', () => {
      component.setProps({ hashkey: 'abcd' });
      expect(toJSON(component)).toMatchSnapshot();
    });
    it('with title', () => {
      component.setProps({ title: 'abcd' });
      expect(toJSON(component)).toMatchSnapshot();
    });
  });
  describe('Test Component actions', () => {
    it('copy fn', () => {
      instance.copy();
      expect(instance.state.copied).toBe(true);
    });
    it('resetCopy fn', () => {
      instance.resetCopy();
      expect(instance.state.copied).toBe(false);
    });
    it('toolTipClose fn', () => {
      jest.useFakeTimers();
      instance.toolTipClose();
      jest.runAllTimers();
      expect(instance.state.copied).toBe(false);
    });
    it('closeCopyLinkDialog fn', () => {
      instance.closeCopyLinkDialog();
      expect(resagaMock.setValue).toBeCalledWith({ showCopyLinkDialog: false });
    });
    it('removeHashToken', () => {
      instance.removeHashToken();
      expect(resagaMock.dispatchTo).toBeCalled();
    });
    it('generateHashToken', () => {
      instance.generateHashToken();
      expect(resagaMock.dispatchTo).toBeCalled();
    });
    it('closeCopyLinkDialog', () => {
      instance.closeCopyLinkDialog();
      expect(resagaMock.setValue).toBeCalledWith({ showCopyLinkDialog: false });
    });
    it('dialogContent has url', () => {
      expect(instance.dialogContent('url')).toBeDefined();
    });
    it('dialogContent has no url', () => {
      const snapshot = shallow(<div>{instance.dialogContent('')}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('onClickDisableRYI has no url', () => {
      const snapshot = shallow(<div>{instance.onClickDisableRYI('')}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('onSuccessGeneratetoken has no url', () => {
      component.setState({ disableRyi: true });
      const snapshot = shallow(<div>{instance.onSuccessGeneratetoken()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('onSuccessGeneratetoken has no url', () => {
      component.setState({ disableRyi: false });
      const snapshot = shallow(<div>{instance.onSuccessGeneratetoken()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('generatePublicTemplateLink', () => {
      const url = instance.generatePublicTemplateLink('abcd');
      expect(url).toBe('http://localhost/public/template/abcd');
    });
  });
});

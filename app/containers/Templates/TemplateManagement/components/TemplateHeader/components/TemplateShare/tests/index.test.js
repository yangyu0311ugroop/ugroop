import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TemplateShare } from '../index';

describe('TemplateShare', () => {
  let rendered;
  let instance;

  const resaga = {
    analyse: jest.fn(),
    dispatch: jest.fn(),
    setValue: jest.fn(),
  };

  const props = {
    people: ['people@gg.com'],
    resaga,
    templateId: 1,
    ownerId: 2,
  };

  beforeEach(() => {
    rendered = shallow(<TemplateShare {...props} />);
    instance = rendered.instance();
  });

  describe('onOpenShareModal', () => {
    it('should set openShareModal state to true', () => {
      instance.onOpenShareModal();
      expect(resaga.setValue).toBeCalledWith({ shareDialog: true });
    });
  });

  describe('onCloseShareModal', () => {
    it('should set openShareModal state to false', () => {
      instance.onCloseShareModal();
      expect(resaga.setValue).toBeCalledWith({ shareDialog: false });
    });
  });

  describe('onOpenOtherPeopleModal', () => {
    it('should set openOtherPeopleModal state to true', () => {
      instance.onOpenOtherPeopleModal();
      expect(rendered.state().openOtherPeopleModal).toBeTruthy();
    });
  });

  describe('onCloseTransferModal', () => {
    it('should set onCloseTransferModal state to false', () => {
      instance.onCloseTransferModal();
      expect(resaga.setValue).toBeCalledWith({ transferDialog: false });
    });
  });

  describe('onCloseOtherPeopleModal', () => {
    it('should set openOtherPeopleModal state to false', () => {
      instance.onCloseOtherPeopleModal();
      expect(rendered.state().openOtherPeopleModal).not.toBeTruthy();
    });
  });

  it('should render what it should render', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render correctly when templates is mounted', () => {
    rendered.setProps({ mountTemplateShare: true });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});

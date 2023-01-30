import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import React from 'react';
import { shallow } from 'enzyme';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { Form } from '../index';

describe('<Form />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Form {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  describe('renderRow', () => {
    it('should match snapshot if there is attachmentId', () => {
      instance.renderForm = jest.fn(() => jest.fn(() => 'renderValue'));
      rendered.setProps({
        attachmentId: 1,
        separator: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderRow());
    });
  });

  describe('renderRowValue', () => {
    it('should match snapshot', () => {
      instance.renderConsentPart = jest.fn(() => 'renderConsentPart');
      instance.renderAttachmentPart = jest.fn(() => 'renderAttachmentPart');
      rendered.setProps({
        iconPadding: true,
        id: 1,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderRowValue);
    });
  });

  describe('handleRequiresConsentChange', () => {
    it('should be called', () => {
      instance.handleRequiresConsentChange('', true);
      expect(rendered.state().requiresConsent).toBe(true);
    });
  });

  describe('handleRowOpen', () => {
    it('should setState', () => {
      rendered.setProps({
        requiresConsent: true,
      });
      instance.handleRowOpen();
      expect(rendered.state().requiresConsent).toBe(true);
    });
  });

  describe('handleRowSubmit', () => {
    it('should call NODE_API_HELPERS.updateNodeAndAttachment', () => {
      NODE_API_HELPERS.updateNodeAndAttachment = jest.fn();
      instance.handleRowSubmit({
        model: {
          node: {},
          attachment: 'attachment',
          consentConfirmation: true,
          consentChanged: true,
        },
        onSuccess: jest.fn(),
      });
      expect(NODE_API_HELPERS.updateNodeAndAttachment).toHaveBeenCalled();
    });
  });

  describe('handleConsentChange', () => {
    it('should call createNode', () => {
      rendered.setProps({
        id: 1,
        myId: 2,
        consentId: false,
      });
      NODE_API_HELPERS.createNode = jest.fn();
      instance.handleConsentChange({
        consentConfirmation: true,
        consentChanged: true,
      })();
      expect(NODE_API_HELPERS.createNode).toHaveBeenCalled();
    });
    it('should call updateNode', () => {
      rendered.setProps({
        id: 1,
        myId: 2,
        consentId: 7,
      });
      NODE_API_HELPERS.updateNode = jest.fn();
      instance.handleConsentChange({
        consentConfirmation: true,
        consentChanged: true,
      })();
      expect(NODE_API_HELPERS.updateNode).toHaveBeenCalled();
    });
    it('should call deleteNode', () => {
      rendered.setProps({
        id: 1,
        myId: 2,
        consentId: 7,
      });
      NODE_API_HELPERS.deleteNode = jest.fn();
      instance.handleConsentChange({
        consentConfirmation: false,
        consentChanged: true,
      })();
      expect(NODE_API_HELPERS.deleteNode).toHaveBeenCalled();
    });
    it('should call do something', () => {
      rendered.setProps({
        id: 1,
        myId: 2,
        consentId: false,
      });
      const rest = { onSuccess: jest.fn() };
      instance.handleConsentChange({
        consentConfirmation: false,
        consentChanged: true,
        ...rest,
      })();
      expect(rest.onSuccess).toHaveBeenCalled();
    });
    it('should call onSuccess', () => {
      rendered.setProps({
        id: 1,
        myId: 2,
        consentId: false,
      });
      const rest = { onSuccess: jest.fn() };
      NODE_API_HELPERS.deleteNode = jest.fn();
      instance.handleConsentChange({
        consentConfirmation: false,
        consentChanged: false,
        ...rest,
      })();
      expect(rest.onSuccess).toHaveBeenCalled();
    });
  });

  describe('renderPart', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPart);
    });
  });

  describe('renderAttachmentPart', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        attachmentId: 1,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderAttachmentPart);
    });
  });

  describe('renderConsentPart', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        consentId: 1,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderConsentPart);
    });
  });

  describe('renderRowFormActions', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        id: 1,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderRowFormActions);
    });
  });

  describe('renderConsentConfirmation', () => {
    it('should match snapshot if requires consent is true', () => {
      rendered.setState({
        requiresConsent: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderConsentConfirmation);
    });
    it('should match snapshot if requires consent is false', () => {
      rendered.setState({
        requiresConsent: false,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderConsentConfirmation);
    });
  });
});

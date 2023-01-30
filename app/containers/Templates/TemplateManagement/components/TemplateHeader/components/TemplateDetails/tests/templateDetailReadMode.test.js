import React from 'react';
import { shallow } from 'enzyme';
import theme from 'theme/coolTheme';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import mockStylesheet from 'utils/mockStylesheet';
import { ability } from 'apis/components/Ability/ability';
import toJSON from 'enzyme-to-json';
import stylesheet from '../style';
import { TemplateDetailReadMode } from '../templateDetailReadMode';

describe('TemplateDetailReadMode', () => {
  const props = {
    isLoading: false,
    classes: mockStylesheet('TemplateDetailReadMode', stylesheet, theme),
    templateDescriptionVal: 'qweqwe',
    templateTitleVal: 'King of kings',
    templateId: 1,
  };

  let rendered;
  let instance;

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<TemplateDetailReadMode {...props} />);
    instance = rendered.instance();
  });

  describe('canUpdateTemplate()', () => {
    it('should canUpdateTemplate() true', () => {
      ability.can = jest.fn(() => true);
      rendered.setProps({ publicView: false, editable: true });

      expect(instance.canUpdateTemplate()).toBe(true);
    });

    it('should canUpdateTemplate() false', () => {
      ability.can = jest.fn(() => true);
      rendered.setProps({ publicView: true });

      expect(instance.canUpdateTemplate()).toBe(false);
    });
  });

  describe('generateShareLinks', () => {
    it('should match snapshot if hashkey', () => {
      rendered.setProps({ hashkey: '111' });
      TEST_HELPERS.expectMatchSnapshot(instance.generateShareLinks);
    });
  });

  describe('renderNotifyStatus', () => {
    it('should match snapshot if renderNotifyStatus if on', () => {
      rendered.setProps({ hashkey: '111', smDown: true });
      const action = jest.fn();
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderNotifyStatus('1', action),
      );
    });
    it('should match snapshot if renderNotifyStatus if off', () => {
      rendered.setProps({ hashkey: '111' });
      instance.canUpdateTemplate = jest.fn(() => false);
      const action = jest.fn();
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderNotifyStatus('1', action),
      );
    });
  });

  describe('renderTourCode', () => {
    it('should match snapshot if renderNotifyStatus if not empty', () => {
      rendered.setProps({ smDown: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderTourCode());
    });
    it('should match snapshot if renderTourCode is empty', () => {
      rendered.setProps({ smDown: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderTourCode('test'));
    });
  });

  describe('renderCopyLinkDialog()', () => {
    it('should return null', () => {
      rendered.setProps({ readOnly: true });

      expect(instance.renderCopyLinkDialog()).toBe(null);
    });

    it('should renderCopyLinkDialog', () => {
      rendered.setProps({ readOnly: false });

      TEST_HELPERS.expectMatchSnapshot(instance.renderCopyLinkDialog);
    });
  });

  describe('renderTourTitle()', () => {
    it('should renderTourTitle', () => {
      rendered.setProps({ fetching: true, ongoing: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderTourTitle);
    });
  });

  describe('renderSubtitle()', () => {
    it('should renderSubtitle', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSubtitle);
    });
  });

  describe('renderHeaderContent()', () => {
    it('should renderHeaderContent', () => {
      instance.renderBreadcrumbs = jest.fn(() => 'renderBreadcrumbs');
      instance.renderTourTitle = jest.fn(() => 'renderTourTitle');
      instance.renderSubtitle = jest.fn(() => 'renderSubtitle');
      instance.renderButtons = jest.fn(() => 'renderButtons');

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeaderContent);
    });
  });

  describe('renderMobileTourHeader', () => {
    it('should match snapshot if hashkey has value and public view is false', () => {
      rendered.setProps({ hashkey: '1111', smDown: true });
      instance.generateShareLinks = jest.fn(() => 'generateShareLinks');

      TEST_HELPERS.expectMatchSnapshot(instance.renderMobileTourHeader);
    });

    it('should match snapshot if hashkey has no value and public view is false', () => {
      instance.generateShareLinks = jest.fn(() => 'generateShareLinks');

      TEST_HELPERS.expectMatchSnapshot(instance.renderMobileTourHeader);
    });

    it('should match snapshot if hashkey has value and public view is true', () => {
      rendered.setProps({ hashkey: '1111', publicView: true });
      instance.generateShareLinks = jest.fn(() => 'generateShareLinks');

      TEST_HELPERS.expectMatchSnapshot(instance.renderMobileTourHeader);
    });
  });

  describe('renderAssignedOrganiser()', () => {
    it('should renderAssignedOrganiser', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderAssignedOrganiser);
    });
  });

  describe('render()', () => {
    it('should render something when isLoading is false', () => {
      instance.renderHeaderContent = jest.fn(() => 'renderHeaderContent');
      instance.renderCopyLinkDialog = jest.fn(() => 'renderCopyLinkDialog');
      instance.renderMobileTourHeader = jest.fn(() => 'renderMobileTourHeader');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });

  describe('generateShareLinks()', () => {
    it('should return nothing if no hashkey', () => {
      rendered.setProps({ hashkey: null, title: 'test' });
      instance = rendered.instance();

      expect(instance.generateShareLinks()).toBe(null);
    });

    it('should match snapshot if public view', () => {
      rendered.setProps({ publicView: true });

      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render the buttons if complete props are provided', () => {
      rendered.setProps({ hashkey: 'aaa-bbb-ccc', title: 'test' });
      instance = rendered.instance();

      instance.generatePublicTemplateLink = jest.fn(
        () => 'http://some.domain.com/some-template-link',
      );

      TEST_HELPERS.expectMatchSnapshot(instance.generateShareLinks());
    });

    it('should render a default title in the Mail button if no title is provided', () => {
      rendered.setProps({ hashkey: 'aaa-bbb-ccc' });
      instance = rendered.instance();

      instance.generatePublicTemplateLink = jest.fn(
        () => 'http://some.domain.com/some-template-link',
      );

      TEST_HELPERS.expectMatchSnapshot(instance.generateShareLinks());
    });
  });
});

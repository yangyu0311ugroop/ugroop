import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TemplateActionButtonList } from '../templateActionButtonList';
import { PORTAL_HELPERS } from '../../../../../../../Portal/helpers';

describe('<TemplateActionButtonList />', () => {
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
    jest.clearAllMocks();

    rendered = shallow(<TemplateActionButtonList {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TemplateActionButtonList).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillMount()', () => {
    it('should check object', () => {
      rendered.setProps({ createdBy: { id: 2233 } });

      instance.componentWillMount();

      expect(instance.template).toMatchSnapshot();
    });

    it('should check number', () => {
      rendered.setProps({ createdBy: 12 });

      instance.componentWillMount();

      expect(instance.template).toMatchSnapshot();
    });
  });

  describe('toggleUpdateInfo()', () => {
    it('should call setValue', () => {
      instance.toggleUpdateInfo();

      expect(resaga.setValue).toBeCalled();
    });
  });

  describe('renderPeople()', () => {
    it('match snapshots', () => {
      const snapshot = shallow(
        <div>
          {instance.renderPeople({})({ handlePeopleRedirect: jest.fn() })}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('handleClickMenu()', () => {
    it('should call setValue', () => {
      instance.closeMoreMenu = jest.fn();
      const mock = jest.fn();

      instance.handleClickMenu(mock)(1, 2, 3);

      expect(instance.closeMoreMenu).toBeCalledWith(1, 2, 3);
      expect(mock).toBeCalledWith(1, 2, 3);
    });
  });

  describe('openSettings()', () => {
    it('should call setValue', () => {
      instance.openSettings();

      expect(resaga.setValue).toBeCalledWith({ tourSettingsDialog: true });
    });
  });

  describe('openTransferTour()', () => {
    it('should call setValue', () => {
      instance.openTransferTour();

      expect(resaga.setValue).toBeCalledWith({ transferDialog: true });
    });
  });

  describe('handleModeChange()', () => {
    it('should setValue', () => {
      instance.handleModeChange('editing')();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
    it('should setValue non editing', () => {
      rendered.setProps({ dayIds: [1, 2] });
      instance.handleModeChange('viewing')();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('renderBadge()', () => {
    it('should renderBadge', () => {
      rendered.setProps({ hashkey: 'abcd' });
      const snapshot = shallow(<div>{instance.renderBadge()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('canSeeChat()', () => {
    it('should canSeeChat', () => {
      const snapshot = shallow(<div>{instance.canSeeChat()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderUpdateInfoButton()', () => {
    it('should renderUpdateInfoButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderUpdateInfoButton(), [{}]);
    });
    it('should renderUpdateInfoButton on mobile', () => {
      rendered.setProps({ onStiky: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderUpdateInfoButton(true), [
        {},
      ]);
    });
  });

  describe('renderModeMenu()', () => {
    it('should renderModeMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderModeMenu, [{}]);
    });
  });

  describe('renderOpenCommentButton()', () => {
    it('should renderOpenCommentButton', () => {
      instance.canSeeChat = jest.fn(() => false);
      const snapshot = shallow(<div>{instance.renderOpenCommentButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderOpenCommentButton can see', () => {
      instance.canSeeChat = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.renderOpenCommentButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderMoreButton()', () => {
    it('should renderMoreButton', () => {
      const snapshot = shallow(<div>{instance.renderMoreButton()({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderMoreButton on mobile', () => {
      const snapshot = shallow(
        <div>{instance.renderMoreButton(true)({})}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderStar()', () => {
    it('should renderStar', () => {
      const snapshot = shallow(<div>{instance.renderStar({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderMoreMenu()', () => {
    it('should renderMoreMenu no move or delete', () => {
      const snapshot = shallow(<div>{instance.renderMoreMenu({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderMoreMenu show move and transfer', () => {
      instance.isOwner = jest.fn(() => true);
      instance.canTransferTour = jest.fn(() => true);
      instance.canDelete = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.renderMoreMenu({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderMoreMenu show delete', () => {
      instance.isOwner = jest.fn(() => false);
      instance.canTransferTour = jest.fn(() => false);
      instance.canDelete = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.renderMoreMenu({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('openCreateChatChannelPortal()', () => {
    it('should openCreateChatChannelPortal', () => {
      rendered.setProps({
        history: { replace: () => jest.fn },
        location: { pathname: 'aaa' },
      });
      const snapshot = shallow(<div>{instance.redirectMessengerPage()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('openEmailToEvent()', () => {
    it('should openEmailToEvent', () => {
      PORTAL_HELPERS.openCreateTourEmail = jest.fn();
      instance.openEmailToEvent();
      expect(PORTAL_HELPERS.openCreateTourEmail).toBeCalled();
    });
  });

  describe('renderMore()', () => {
    it('should return null', () => {
      instance.canSeeMoreButtons = jest.fn(() => false);

      expect(instance.renderMore()).toBe(false);
    });

    it('should renderMore', () => {
      instance.canSeeMoreButtons = jest.fn(() => true);

      const snapshot = shallow(<div>{instance.renderMore()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderrenderUpdateInfoButtonAddMenu = jest.fn(
        () => 'renderUpdateInfoButton',
      );
      instance.renderOpenCommentButton = jest.fn(
        () => 'renderOpenCommentButton',
      );
      instance.renderMore = jest.fn(() => 'renderMore');
      instance.canDoSomething = jest.fn(() => true);

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render if showManageTabs', () => {
      rendered.setProps({ showManageTabs: true });
      instance.canDoSomething = jest.fn(() => true);

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

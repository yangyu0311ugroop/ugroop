import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { VARIANTS } from 'variantsConstants';

import { InterestedList } from '..';

describe('<InterestedList />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    classes: {},
    templateId: 1,
    onClose: jest.fn(),
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
    connectedNodeIds: [{ nodeId: 3 }],
  });

  beforeEach(() => {
    wrapper = shallow(<InterestedList {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(InterestedList).toBeDefined();
  });

  describe('#componentDidUpdate()', () => {
    it('calls handleOpen', () => {
      wrapper.setProps({ open: true });
      const prevProps = { open: false };
      instance.handleOpen = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.handleOpen).toBeCalled();
    });
  });

  describe('#handleModeChange()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleModeChange({ target: { value: 'value' } });
    });

    it('resaga.setValue still matches snapshot if props.hasInterestedPersonIds', () => {
      wrapper.setProps({ hasInterestedPersonIds: true });
      doResagaSnapshot = true;
      instance.handleOpen();
    });
  });

  describe('handleFilterClick', () => {
    it('should call setValue with set of values', () => {
      doResagaSnapshot = true;
      instance.handleFilterClick(1, 2)();
    });
  });

  describe('#handleOpen()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleOpen();
    });
  });

  describe('#handleCloseClick()', () => {
    it('rcalls props.onClose', () => {
      instance.handleCloseClick();
      expect(instance.props.onClose).toBeCalled();
    });
  });

  describe('#handleOpenCreateInterestedPersonModal()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleOpenCreateInterestedPersonModal();
    });
  });

  describe('#handleRowClick()', () => {
    it('rcalls props.onClose', () => {
      doResagaSnapshot = true;
      instance.handleRowClick(1);
    });
  });

  describe('#renderFilters()', () => {
    it('still matches snapshot', () => {
      instance.canViewAll = jest.fn(() => true);
      expect(instance.renderFilters()).toMatchSnapshot();
    });

    it('still matches snapshot if props.modeList=invite', () => {
      wrapper.setProps({
        modeList: 'invite',
        interestedListViewModalFilter: VARIANTS.ALL_FOLLOWERS,
      });
      expect(instance.renderFilters()).toMatchSnapshot();
    });
    it('still matches snapshot children is function', () => {
      wrapper.setProps({
        children: jest.fn(),
        interestedPersonIds: [1],
      });
      instance.canViewAll = jest.fn(() => false);
      expect(instance.renderFilters()).toMatchSnapshot();
    });
  });

  describe('#renderConnectedRow()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderConnectedRow(1)).toMatchSnapshot();
    });
  });

  describe('#renderSubheading()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderSubheading()).toMatchSnapshot();
    });
  });

  describe('#renderInvitationRow()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderInvitationRow(1)).toMatchSnapshot();
    });
  });

  describe('#renderNoInvitations()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderNoInvitations()).toMatchSnapshot();
    });
  });

  describe('#renderNoInterestedRow()', () => {
    it('still matches snapshot if props.filterPending', () => {
      wrapper.setProps({ interestedListViewModalFilter: 'following' });
      expect(instance.renderNoInterestedRow()).toMatchSnapshot();
    });
    it('still matches snapshot if filterComplete is fale', () => {
      wrapper.setProps({ interestedListViewModalFilter: 'notFollowing' });
      expect(instance.renderNoInterestedRow()).toMatchSnapshot();
    });
  });

  describe('#renderList()', () => {
    beforeEach(() => {
      instance.renderNoInterestedRow = jest.fn(() => 'renderNoInterestedRow');
    });
    it('still matches snapshot if props.filterPending', () => {
      wrapper.setProps({ modeList: 'invite', shareTokens: ['token'] });
      expect(instance.renderList()).toMatchSnapshot();
    });
    it('still matches snapshot if mode is showEmail', () => {
      wrapper.setProps({
        modeList: 'showEmail',
        interestedListViewModalFilter: VARIANTS.ALL_FOLLOWERS,
        pendingInterestedPersonIds: [1],
      });
      expect(instance.renderList()).toMatchSnapshot();
    });
    it('still matches snapshot if mode is showEmail but there are no persons', () => {
      wrapper.setProps({ modeList: 'showEmail', interestedPersonIds: [] });
      expect(instance.renderList()).toMatchSnapshot();
    });
    it('still matches snapshot if mode is connected', () => {
      wrapper.setProps({
        modeList: 'connected',
        interestedPersonIds: [1],
        connectedNodeIds: [{ nodeId: 1 }],
      });
      expect(instance.renderList()).toMatchSnapshot();
    });
    it('still matches snapshot if mode is connected but there are no persons', () => {
      wrapper.setProps({ modeList: 'connected', interestedPersonIds: [] });
      instance.renderNoConnected = jest.fn(() => 'renderNoConnected');
      expect(instance.renderList()).toMatchSnapshot();
    });
    it('still matches snapshot if mode is showLastAccess', () => {
      wrapper.setProps({
        modeList: 'showLastAccess',
        interestedPersonIds: [1],
        connectedNodeIds: [{ nodeId: 1 }],
      });
      expect(instance.renderList()).toMatchSnapshot();
    });
    it('still matches snapshot if mode is showLastAccess but there are no persons', () => {
      wrapper.setProps({ modeList: 'showLastAccess', interestedPersonIds: [] });
      instance.renderNoLastAccess = jest.fn(() => 'renderNoLastAccess');
      expect(instance.renderList()).toMatchSnapshot();
    });
  });

  describe('#renderContent()', () => {
    it('still matches snapshot', () => {
      wrapper.setProps({ interestedPersonIds: [2] });
      expect(instance.renderContent()).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('#defaultProps', () => {
    it('#onClose()', () => {
      expect(() => {
        InterestedList.defaultProps.onClose();
      }).not.toThrow();
    });
  });

  describe('renderModePopperOptions()', () => {
    it('should renderModePopperOptions', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderModePopperOptions({}));
    });
  });

  describe('handleLayoutSelect()', () => {
    it('should handleLayoutSelect', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.handleLayoutSelect('mode', 'val'),
      );
    });
  });

  describe('renderLayoutPopperOptions()', () => {
    it('should renderLayoutPopperOptions', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLayoutPopperOptions({}));
    });
  });

  describe('handleModeSelect()', () => {
    it('should handleModeSelect', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.handleModeSelect('mode', 'value'),
      );
    });
  });

  describe('renderNoLastAccess()', () => {
    it('should renderNoLastAccess', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderNoLastAccess);
    });
  });

  describe('renderLayoutPopperButton()', () => {
    it('should renderLayoutPopperButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLayoutPopperButton({}));
    });
  });

  describe('getName()', () => {
    it('should getName', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.getName);
    });
  });

  describe('renderFilterPopperButton()', () => {
    it('should renderFilterPopperButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderFilterPopperButton({}));
    });
  });

  describe('renderFilterPopperOptions()', () => {
    it('should renderFilterPopperOptions', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderFilterPopperOptions({}));
    });
  });

  describe('renderFilterPopper()', () => {
    it('should renderFilterPopper', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderFilterPopper);
    });
  });

  describe('renderModePopperButton()', () => {
    it('should renderModePopperButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderModePopperButton({}));
    });
  });
  describe('renderInterestedRow()', () => {
    it('should renderInterestedRow', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderInterestedRow);
    });
  });

  describe('renderProp', () => {
    it('should call children as function', () => {
      const children = jest.fn();
      wrapper.setProps({ children });
      instance.renderProp();

      expect(children).toBeCalled();
    });
  });
});

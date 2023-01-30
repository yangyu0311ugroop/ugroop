import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { PrintParticipants } from '../index';

import { MOMENT_HELPERS } from '../../../../../../../utils/helpers/moment';

jest.mock('utils/helpers/request', () => ({
  queryImageURL: () => 'queryImageURL',
  postMetaInfo: () => 'postMetaInfo',
  horizontalSide: () => 'horizontalSide',
  padFacadeURL: () => 'horizontalSide',
}));

describe('<PrintParticipants />', () => {
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

    rendered = shallow(<PrintParticipants {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PrintParticipants).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('renderHeader()', () => {
    it('should renderHeader', () => {
      MOMENT_HELPERS.renderDate = jest.fn(() => 'date');
      rendered.setProps({
        iconUrl: 'some url',
        startDate: '1977/04/26',
        duration: 1,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });
  });
  describe('headerColumnMedical()', () => {
    it('should headerColumnMedical', () => {
      MOMENT_HELPERS.renderDate = jest.fn(() => 'date');
      rendered.setProps({
        iconUrl: 'some url',
        startDate: '1977/04/26',
        duration: 1,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.headerColumnMedical);
    });
  });
  describe('renderGroup()', () => {
    it('should renderGroup', () => {
      MOMENT_HELPERS.renderDate = jest.fn(() => 'date');
      rendered.setProps({
        iconUrl: 'some url',
        startDate: '1977/04/26',
        duration: 1,
      });
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderGroup({ groupId: 1, group: 'group 1' }, [
          { groupId: 1 },
        ]),
      );
    });
  });
  describe('componentWillUnmount()', () => {
    it('should call clearTimeout', () => {
      global.clearTimeout = jest.fn();

      instance.componentWillUnmount();

      expect(global.clearTimeout).toBeCalled();
    });
  });
  /*  describe('renderFooter()', () => {
    it('should renderFooter', () => {
      instance.renderFooterPage = jest.fn(() => 'renderFooterPage');
      TEST_HELPERS.expectMatchSnapshot(instance.renderFooter);
    });
  }); */

  describe('getPhoto()', () => {
    it('should return getPhoto with value null if photo is empty', () => {
      // instance.renderFooterPage = jest.fn(() => 'getPhoto');
      rendered.setProps({ orgPhoto: '' });
      TEST_HELPERS.expectMatchSnapshot(instance.getPhoto);
    });
    it('should getPhoto', () => {
      rendered.setProps({
        photoMetaInfo: {
          x: 1,
          y: 1,
          width: 1,
          height: 1,
          rotate: 1,
        },
        orgPhoto: 'abcd',
      });
      // rendered.setProps({ orgPhoto: 'somg/url.jpg' });
      TEST_HELPERS.expectMatchSnapshot(instance.getPhoto);
    });
  });

  describe('colStype()', () => {
    it('should renderFooter', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.colStype, [
        'test',
        { color: 'red' },
      ]);
    });
  });
  describe('renderPax()', () => {
    it('should renderPax', () => {
      rendered.setProps({
        participantsContent: [{ customData: { firstName: 'dan' } }],
        personDetails: [{ birthDate: '2020/10/21' }],
        phoneList: ['20012455'],
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPax, [
        { hasMedicals: true, hasDietaries: true },
        0,
      ]);
    });
    it('renderPax should not fail if all empty', () => {
      rendered.setProps({
        participantsContent: [],
        personDetails: [],
        phoneList: [],
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderPax, [1, 0]);
    });
  });

  describe('renderPax()', () => {
    it('should renderFooter', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPax, ['test']);
    });
  });
  describe('headerColumn()', () => {
    it('should headerColumn', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.headerColumn, ['test']);
    });
  });
  describe('renderContent()', () => {
    it('should renderContent', () => {
      instance.renderPax = jest.fn(() => 'renderPax');
      rendered.setProps({ filteredParticipants: [1] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
    it('should renderContent', () => {
      const parm = {
        index: 1,
        id: 1,
        groupId: 1,
        group: 'test',
        composedName: 'test',
        genderText: 'test',
        birth: 'test',
        ageType: 'test',
        phoneNo: 'test',
        roomType: 'test',
        personType: 'test',
      };
      instance.renderPax = jest.fn(() => 'renderPax');
      instance.participantVal = jest.fn(() => parm);
      rendered.setProps({ filteredParticipants: [1] });
      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });
  });
  describe('filterMedicals()', () => {
    it('should filterMedicals medicals', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.filterMedicals, [
        { medicals: [1], dietaries: [1] },
      ]);
    });
    it('should filterMedicals dietaries', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.filterMedicals, [
        { medicals: [], dietaries: [1] },
      ]);
    });
    it('should filterMedicals none', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.filterMedicals, []);
    });
  });
  describe('renderPaxMedical()', () => {
    it('should renderPaxMedical', () => {
      rendered.setProps({
        medicals: [{ personId: 1, id: 1 }],
        dietaries: [{ personId: 1, id: 1 }],
      });
      const data = {
        personId: 1,
        firstName: 'test',
        lastName: 'test',
        middleName: 'test',
        medicals: [1],
        dietaries: [1],
      };
      TEST_HELPERS.expectMatchSnapshot(instance.renderPaxMedical, [data]);
    });
  });
  describe('renderMedical()', () => {
    it('should renderMedical', () => {
      rendered.setProps({
        medicals: [{ personId: 1, id: 1 }],
        dietaries: [{ personId: 1, id: 1 }],
        filteredParticipants: [1],
        personDetails: [{ medicals: [1], dietaries: [1] }],
      });
      instance.renderPaxMedical = jest.fn();
      instance.renderMedical();
      expect(instance.renderPaxMedical).toBeCalled();
    });
  });
  describe('renderDocument()', () => {
    it('should renderDocument', () => {
      instance.renderHeader = jest.fn(() => 'renderHeader');
      instance.renderFooter = jest.fn(() => 'renderFooter');
      instance.headerColumn = jest.fn(() => 'headerColumn');
      instance.renderDocument();
      expect(instance.headerColumn).toBeCalled();
    });
  });

  describe('renderLoading()', () => {
    it('should renderLoading', () => {
      window.open = jest.fn();
      rendered.setProps({ handleClose: jest.fn() });
      TEST_HELPERS.expectMatchSnapshot(instance.renderLoading, [
        { loading: false, url: '' },
      ]);
    });
    it('should renderLoading when true', () => {
      rendered.setProps({ handleClose: jest.fn() });
      window.open = jest.fn();
      TEST_HELPERS.expectMatchSnapshot(instance.renderLoading, [
        { loading: true, url: '' },
      ]);
    });
  });
  describe('renderIcon()', () => {
    it('should renderLoading', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderIcon, [
        { loading: false },
      ]);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderDocument = jest.fn(() => 'renderDocument');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import mockStylesheet from 'utils/mockStylesheet';
import { AvatarList } from '..';
import styles from '../styles';

const classes = mockStylesheet('viewComponents/People/AvatarList', styles);

describe('<AvatarList />', () => {
  let rendered;
  let instance;

  const props = {
    ownerId: 111,
    classes,
    people: [],
    onShareClick: jest.fn(),
    onOpenMorePeople: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<AvatarList {...props} />);
    instance = rendered.instance();
  });

  it('exists', () => {
    expect(AvatarList).toBeDefined();
  });

  describe('#renderPeopleAvatars()', () => {
    const maxAvatars = 1;
    const person = 'person';
    const idx = 0;

    it('still matches snapshot if avatarById', () => {
      rendered.setProps({
        maxAvatars,
        avatarById: true,
        renderAvatar: null,
        ownerId: null,
      });
      expect(instance.renderPeopleAvatars(person, idx)).toMatchSnapshot();
    });

    it('still matches snapshot if renderAvatar', () => {
      rendered.setProps({
        maxAvatars,
        avatarById: false,
        renderAvatar: (...args) => args,
        ownerId: null,
      });
      expect(instance.renderPeopleAvatars(person, idx)).toMatchSnapshot();
    });
  });

  describe('#render()', () => {
    it('render without exploding', () => {
      expect(rendered.length).toBe(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('still matches snapshot if exceed max number of avatars', () => {
      rendered.setProps({
        maxAvatars: 4,
        people: [
          'pcartigo@gg.com',
          'pcartigo@gg.com',
          'pcartigo@gg.com',
          'pcartigo@gg.com',
          'pcartigo@gg.com',
        ],
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('renderAddAvatar()', () => {
    it('should renderAddAvatar', () => {
      rendered.setProps({ editable: true, add: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderAddAvatar);
    });
  });

  describe('#defaultProps', () => {
    it('#onClick()', () => {
      expect(() => {
        AvatarList.defaultProps.onClick();
      }).not.toThrow();
    });
  });

  describe('renderSeeMore', () => {
    it('should return null if seeMore is not true', () => {
      const snapshot = shallow(<div>{instance.renderSeeMore()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if seeMore is true', () => {
      rendered.setProps({
        seeMore: true,
      });
      const snapshot = shallow(<div>{instance.renderSeeMore()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render', () => {
      rendered.setProps({
        addOnly: false,
      });
      instance.renderSeeMore = jest.fn(() => '');
      instance.renderOwnerAvatar = jest.fn(() => '');
      instance.renderPeopleAvatars = jest.fn(() => '');
      instance.renderExcessPeopleAvatar = jest.fn(() => '');
      instance.renderAddAvatar = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});

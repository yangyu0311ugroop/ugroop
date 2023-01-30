import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { VARIANTS } from 'variantsConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { TabOption } from '../index';

describe('<TabOption />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    personEmail: 'qqq@gg.com',
    participantEmail: 'qqq@gg.com',
  };

  beforeEach(() => {
    rendered = shallow(<TabOption {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TabOption).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderMorePopper)', () => {
    it('renderMoreButton should return null', () => {
      rendered.setProps({ hasFullAccess: true });
      const snapshot = shallow(<div>{instance.renderMorePopper(true)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderMoreButton)', () => {
    it('renderMoreButton should return null', () => {
      const snapshot = shallow(<div>{instance.renderMoreButton(true)}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('openMoveDialog)', () => {
    it('handleOpenFollowerDialog should return null', () => {
      PORTAL_HELPERS.openCopyTabOther = jest.fn();
      instance.openMoveDialog(true);
      expect(PORTAL_HELPERS.openCopyTabOther).toBeCalled();
    });
  });
  describe('openCopyDialog)', () => {
    it('sopenCopyDialog hould return null', () => {
      PORTAL_HELPERS.openCopyTabOther = jest.fn();
      instance.openCopyDialog();
      expect(PORTAL_HELPERS.openCopyTabOther).toBeCalled();
    });
  });
  describe('render()', () => {
    it('should render something different if userConnected is true', () => {
      rendered.setProps({ variant: VARIANTS.POPPER });
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

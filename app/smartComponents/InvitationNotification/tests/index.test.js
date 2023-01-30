import { OPTION } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import { JOIN_ORGANISATION, SHARE_NODE } from 'utils/modelConstants';
import { Notification } from '../index';
import JoinOrganisation from '../types/JoinOrganisation';
import ShareNode from '../types/ShareNode';

describe('<Notification />', () => {
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
    rendered = shallow(<Notification {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Notification).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('ownProps()', () => {
    it('omit ownProps', () => {
      rendered.setProps({ type: 'some type' });

      const ownProps = instance.ownProps();

      expect(typeof ownProps.resaga).toBe('undefined');
      expect(typeof ownProps.type).toBe('undefined');
    });
  });

  describe('renderJoinOrganisation()', () => {
    it('should renderJoinOrganisation', () => {
      rendered.setProps({ variant: OPTION });

      const snapshot = shallow(<div>{instance.renderJoinOrganisation()}</div>);

      expect(snapshot.find(JoinOrganisation).length).toBe(1);
    });
  });

  describe('renderShareNode()', () => {
    it('should renderShareNode', () => {
      rendered.setProps({ variant: OPTION });

      const snapshot = shallow(<div>{instance.renderShareNode()}</div>);

      expect(snapshot.find(ShareNode).length).toBe(1);
    });
  });

  describe('render()', () => {
    it('should return null if !id', () => {
      rendered.setProps({ id: 0 });

      expect(instance.render()).toBe(null);
    });

    it('should render JOIN_ORGANISATION', () => {
      rendered.setProps({ id: 999, type: JOIN_ORGANISATION });
      instance.renderJoinOrganisation = jest.fn(() => 'renderJoinOrganisation');

      expect(instance.render()).toBe('renderJoinOrganisation');
    });

    it('should render SHARE_NODE', () => {
      rendered.setProps({ id: 999, type: SHARE_NODE });
      instance.renderShareNode = jest.fn(() => 'renderShareNode');

      expect(instance.render()).toBe('renderShareNode');
    });

    it('should render null', () => {
      rendered.setProps({ id: 999, type: 'othertype' });

      expect(instance.render()).toBe(null);
    });
  });
});

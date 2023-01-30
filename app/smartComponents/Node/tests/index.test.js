import { OPTION } from 'appConstants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import {
  ACTIVITY,
  CHECKGROUP,
  CHECKITEM,
  CHECKLIST,
  DAY,
  FOLDER,
  FORM,
  INTERESTED_PERSON,
  PARTICIPANT,
  RATING,
  SEAT,
  TAB_GALLERY,
  TAB_OTHER,
  TEMPLATE,
} from 'utils/modelConstants';
import toJSON from 'enzyme-to-json';
import { Checkgroup, Checkitem, Checklist } from '../types';
import { Node } from '../index';

describe('<Node />', () => {
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
    rendered = shallow(<Node {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Node).toBeDefined();
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

  describe('renderCheckgroup()', () => {
    it('should renderCheckgroup', () => {
      rendered.setProps({ variant: OPTION });

      const snapshot = shallow(<div>{instance.renderCheckgroup()}</div>);

      expect(snapshot.find(Checkgroup).length).toBe(1);
    });
  });

  describe('renderChecklist()', () => {
    it('should renderChecklist', () => {
      rendered.setProps({ variant: OPTION });

      const snapshot = shallow(<div>{instance.renderChecklist()}</div>);

      expect(snapshot.find(Checklist).length).toBe(1);
    });
  });

  describe('renderCheckitem()', () => {
    it('should renderCheckitem', () => {
      rendered.setProps({ variant: OPTION });

      const snapshot = shallow(<div>{instance.renderCheckitem()}</div>);

      expect(snapshot.find(Checkitem).length).toBe(1);
    });
  });

  describe('render()', () => {
    it('should return null if !id', () => {
      rendered.setProps({ id: 0 });

      expect(instance.render()).toBe(null);
    });

    it('should return null if ignore', () => {
      rendered.setProps({ id: 999, ignore: ['thistype'], type: 'thistype' });
      NODE_STORE_HELPERS.removeChildId = jest.fn();

      expect(instance.render()).toBe(null);
      expect(NODE_STORE_HELPERS.removeChildId).toBeCalled();
      expect(NODE_STORE_HELPERS.removeChildId.mock.calls).toMatchSnapshot();
    });

    it('should render INTERESTED_PERSON', () => {
      rendered.setProps({ id: 999, type: INTERESTED_PERSON });
      instance.renderInterestedPerson = jest.fn(() => 'renderInterestedPerson');

      expect(instance.render()).toBe('renderInterestedPerson');
    });

    it('should render PARTICIPANT', () => {
      rendered.setProps({ id: 999, type: PARTICIPANT });
      instance.renderParticipant = jest.fn(() => 'renderParticipant');

      expect(instance.render()).toBe('renderParticipant');
    });

    it('should render CHECKGROUP', () => {
      rendered.setProps({ id: 999, type: CHECKGROUP });
      instance.renderCheckgroup = jest.fn(() => 'renderCheckgroup');

      expect(instance.render()).toBe('renderCheckgroup');
    });

    it('should render CHECKLIST', () => {
      rendered.setProps({ id: 999, type: CHECKLIST });
      instance.renderChecklist = jest.fn(() => 'renderChecklist');

      expect(instance.render()).toBe('renderChecklist');
    });

    it('should render CHECKITEM', () => {
      rendered.setProps({ id: 999, type: CHECKITEM });
      instance.renderCheckitem = jest.fn(() => 'renderCheckitem');

      expect(instance.render()).toBe('renderCheckitem');
    });

    it('should render DAY', () => {
      rendered.setProps({ id: 999, type: DAY });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render ACTIVITY', () => {
      rendered.setProps({ id: 999, type: ACTIVITY });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render TAB_OTHER', () => {
      rendered.setProps({ id: 999, type: TAB_OTHER });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render TAB_GALLERY', () => {
      rendered.setProps({ id: 999, type: TAB_GALLERY });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render TEMPLATE', () => {
      rendered.setProps({ id: 999, type: TEMPLATE });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render FORM', () => {
      rendered.setProps({ id: 999, type: FORM });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render FOLDER', () => {
      rendered.setProps({ id: 999, type: FOLDER });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render SEAT', () => {
      rendered.setProps({ id: 999, type: SEAT });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render RATING', () => {
      rendered.setProps({ id: 999, type: RATING });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render null', () => {
      rendered.setProps({ id: 999, type: 'othertype' });

      expect(instance.render()).toBe(null);
    });
  });
});

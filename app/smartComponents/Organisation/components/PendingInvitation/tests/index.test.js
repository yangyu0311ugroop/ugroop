import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { PendingInvitaion } from '../index';

describe('<PendingInvitaion />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 999,
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<PendingInvitaion {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PendingInvitaion).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClose()', () => {
    it('should not do anything', () => {
      rendered.setProps({ onClose: undefined });

      expect(instance.handleClose()).toBe(DO_NOTHING);
    });

    it('should call props.onClose', () => {
      const onClose = jest.fn();
      rendered.setProps({ onClose });

      instance.handleClose();

      expect(onClose).toBeCalledWith();
    });
  });
  describe('renderContent()', () => {
    it('should renderContent', () => {
      rendered.setProps({ ids: [] });
      // instance.renderEmptyPending = jest.fn(() => 'renderEmptyPending');
      const snapshot = shallow(<div>{instance.renderContent()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render list', () => {
      rendered.setProps({ ids: ['this@guy', 'that@guy'] });

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderHeading()', () => {
    it('should renderHeading', () => {
      const snapshot = shallow(<div>{instance.renderHeading()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderHeading = jest.fn(() => 'renderHeading');
      instance.renderFilter = jest.fn(() => 'renderFilter');
      instance.renderContent = jest.fn(() => 'renderContent');

      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
      props.showPendingOnly = true;
    });
    it('should render correctly showPendingOnly is true', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

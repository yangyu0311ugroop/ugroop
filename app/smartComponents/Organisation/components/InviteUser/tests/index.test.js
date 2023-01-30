import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { InviteUser } from '../index';

describe('<InviteUser />', () => {
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
    rendered = shallow(<InviteUser {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(InviteUser).toBeDefined();
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

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

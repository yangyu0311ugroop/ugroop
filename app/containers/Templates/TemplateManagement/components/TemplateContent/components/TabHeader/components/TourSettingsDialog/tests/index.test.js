import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TourSettingsDialog } from '../index';

describe('<TourSettingsDialog />', () => {
  let rendered;
  let instance;

  const intl = { formatMessage: m => m.id };
  const onClose = jest.fn();

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    intl,
    onClose,
  };
  beforeEach(() => {
    rendered = shallow(<TourSettingsDialog {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TourSettingsDialog).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClose()', () => {
    it('should handleClose correctly', () => {
      instance.handleClose();
      expect(onClose).toBeCalled();
    });

    it('should DO_NOTHING', () => {
      rendered.setProps({ onClose: undefined });

      instance.handleClose();

      expect(instance.handleClose()).toBe(DO_NOTHING);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

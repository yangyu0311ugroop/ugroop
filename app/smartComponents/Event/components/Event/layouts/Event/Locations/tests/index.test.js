import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Locations } from '../index';

describe('<Locations />', () => {
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
    rendered = shallow(<Locations {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Locations).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleEditable', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        readOnly: false,
        pickupName: 'PLM',
        dropoffName: 'LPU',
      });
      instance.renderEditable = jest.fn(() => <div />);
      const snapshot = shallow(<div>{instance.handleEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot if swapButton is null', () => {
      rendered.setProps({
        readOnly: true,
        pickupName: '',
        dropoffName: '',
      });
      instance.renderEditable = jest.fn(() => <div />);
      const snapshot = shallow(<div>{instance.handleEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('onSwap', () => {
    it('should be called', () => {
      rendered.setProps({
        handleSwap: jest.fn(),
      });
      const snapshot = shallow(<div>{instance.onSwap()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('handleSameAsOriginClicked', () => {
    it('should toggle sameAsOrigin and set the value of eventDropoff and formDropoff to empty objects', () => {
      instance.handleSameAsOriginClicked();

      expect(resaga.setValue).toBeCalledWith({
        eventDropoff: {},
        formDropoff: {},
      });
    });
  });

  describe('handlePopperHelperClicked', () => {
    it('should set isSameAsOriginHelpOpened to true and helpEl to the currentTarget event', () => {
      instance.handlePopperHelperClicked({
        currentTarget: 'currentTarget',
      });

      expect(rendered.state().isSameAsOriginHelpOpened).toBe(true);
      expect(rendered.state().helpEl).toBe('currentTarget');
    });
  });

  describe('handlePopperClosed', () => {
    it('should set isSameAsOriginHelpOpened to false and helpEl to the null', () => {
      instance.handlePopperClosed({
        currentTarget: 'currentTarget',
      });

      expect(rendered.state().isSameAsOriginHelpOpened).toBe(false);
      expect(rendered.state().helpEl).toBe(null);
    });
  });

  describe('handleField', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.handleField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPart', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderPart('div')}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEndLocAndTimeField', () => {
    it('should match snapshot if state sameAsOrigin is false', () => {
      rendered.setState({
        sameAsOrigin: false,
      });
      const snapshot = shallow(
        <div>{instance.renderEndLocAndTimeField()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if state sameAsOrigin is true', () => {
      rendered.setState({
        sameAsOrigin: true,
      });
      const snapshot = shallow(
        <div>{instance.renderEndLocAndTimeField()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderEndLocAndTimeField = jest.fn(
        () => 'renderEndLocAndTimeField',
      );
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

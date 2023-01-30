import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TRANSPORTATION_START_LOC_INPUTS } from 'smartComponents/Event/components/Event/parts/Transportation/Start/inputs';
import { EventLocation } from 'smartComponents/Event/components/Event/parts/shared/Location/index';
import GoogleMaps from 'utils/hoc/withGoogleMaps';

describe('<EventLocation />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    inputLocationProps: TRANSPORTATION_START_LOC_INPUTS,
  };

  beforeEach(() => {
    rendered = shallow(<EventLocation {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(EventLocation).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleViewMap', () => {
    it('should stop propagating the event', () => {
      const mockEv = {
        stopPropagation: jest.fn(),
      };

      instance.handleViewMap(mockEv);

      expect(mockEv.stopPropagation).toBeCalled();
    });
  });

  describe('renderAction', () => {
    it('should render button that redirects to google maps via google map url', () => {
      const snapshot = shallow(<div>{instance.renderAction()}</div>)
        .find(GoogleMaps)
        .renderProp('children')({
        url: 'google maps',
      });

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderField', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderField()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditable', () => {
    it('should match snapshot', () => {
      instance.renderTimeData = jest.fn(() => 'renderTimeData');
      const snapshot = shallow(<div>{instance.renderEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTimeData', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderTimeData()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderLocationLabel', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderLocationLabel()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderLink', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(
        <div>{instance.renderLink('qqq')({ url: 'qqq' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderLabel', () => {
    it('should match snapshot if name do exist', () => {
      rendered.setProps({
        name: 'qqqq',
      });
      const snapshot = shallow(<div>{instance.renderLabel()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if name does not exist', () => {
      const snapshot = shallow(<div>{instance.renderLabel()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderValue', () => {
    it('should return value being passed to it', () => {
      expect(instance.renderValue(1)).toMatchSnapshot();
    });
  });

  describe('renderIcon', () => {
    it('should match snapshot if name does not exist', () => {
      const snapshot = shallow(<div>{instance.renderIcon()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if name does exist', () => {
      rendered.setProps({ name: 'qqqq' });
      const snapshot = shallow(<div>{instance.renderIcon()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

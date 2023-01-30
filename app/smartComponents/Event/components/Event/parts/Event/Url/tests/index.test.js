import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_UTILS } from 'utils/events';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Url } from '../index';

describe('<Url />', () => {
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
    rendered = shallow(<Url {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Url).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleSubmit', () => {
    it('should call patchEvent of template api helpers', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();

      instance.handleSubmit({});

      expect(TEMPLATE_API_HELPERS.patchEvent).toBeCalled();
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
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
      EVENT_UTILS.participantCannotExecuteEvent = jest.fn(() => false);
      const snapshot = shallow(<div>{instance.renderEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should return null', () => {
      EVENT_UTILS.participantCannotExecuteEvent = jest.fn(() => true);
      expect(instance.renderEditable()).toEqual(null);
    });
  });

  describe('renderLabelValueStacked', () => {
    it('should match snapshot', () => {
      rendered.setProps({ value: 'https://google.com' });
      const snapshot = shallow(<div>{instance.renderLabelValueStacked()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should match snapshot if value is blank', () => {
      rendered.setProps({ value: '' });
      const snapshot = shallow(<div>{instance.renderLabelValueStacked()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('handleURLClicked', () => {
    it('should call window.open', () => {
      const e = {
        stopPropagation: jest.fn(),
      };
      window.open = jest.fn();
      rendered.setProps({ value: 'www.facebook.com' });
      instance.handleURLClicked(e);
      expect(window.open).toHaveBeenCalled();
    });
    it('should not call window.open', () => {
      const e = {
        stopPropagation: jest.fn(),
      };
      window.open = jest.fn();
      rendered.setProps({ value: 'wenk' });
      instance.handleURLClicked(e);
      expect(window.open).not.toHaveBeenCalled();
    });
  });
});

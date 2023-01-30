import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Content } from '../index';

describe('<Content />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
    title: 'Nice',
    description: 'nice description',
    baseUrl: 'baseUrl',
    queryParam: 'queryParam',
  };

  beforeEach(() => {
    rendered = shallow(<Content {...props} />);
    instance = rendered.instance();
  });

  describe('renderTemplateTitle', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderTemplateTitle()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderStartSection', () => {
    it('should render nothing if start is an empty string', () => {
      expect(instance.renderStartSection('')).toEqual('');
    });
    it('should match snapshot if start is not empty string', () => {
      const snapshot = shallow(
        <div>{instance.renderStartSection('start')}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDescription', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderDescription()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render', () => {
    it('should render something', () => {
      rendered.setProps({
        renderAdditionalContent: jest.fn(() => 'renderAdditionalContent'),
      });
      instance.renderTemplateTitle = jest.fn(() => 'renderTemplateTitle');
      instance.renderStartSection = jest.fn(() => 'renderStartSection');
      instance.renderDescription = jest.fn(() => 'renderDescription');

      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should have start of startDate if it is not empty string', () => {
      rendered.setProps({
        renderAdditionalContent: jest.fn(() => 'renderAdditionalContent'),
        startDate: 'April 20, 2010',
      });

      instance.renderTemplateTitle = jest.fn(() => 'renderTemplateTitle');
      instance.renderStartSection = jest.fn(() => 'renderStartSection');
      instance.renderDescription = jest.fn(() => 'renderDescription');

      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should have start of weekDay if it is not empty string', () => {
      rendered.setProps({
        renderAdditionalContent: jest.fn(() => 'renderAdditionalContent'),
        startDate: null,
        weekDay: 'Monday',
      });

      instance.renderTemplateTitle = jest.fn(() => 'renderTemplateTitle');
      instance.renderStartSection = jest.fn(() => 'renderStartSection');
      instance.renderDescription = jest.fn(() => 'renderDescription');

      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});

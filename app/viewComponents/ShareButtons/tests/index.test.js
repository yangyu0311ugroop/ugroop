import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Twitter, Facebook, Mail, WhatsApp } from '../index';

describe('<ShareButton />', () => {
  const props = {
    classes: {},
    link: 'abcd.com',
    message: 'shared',
  };

  describe('Twitter', () => {
    it('should exists', () => {
      expect(Twitter).toBeDefined();
    });
    it('should render something', () => {
      const snapshot = shallow(<Twitter {...props} />);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('Facebook', () => {
    it('should exists', () => {
      expect(Facebook).toBeDefined();
    });
    it('should render something', () => {
      const snapshot = shallow(<Facebook {...props} />);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('WhatsApp', () => {
    it('should exists', () => {
      expect(WhatsApp).toBeDefined();
    });
    it('should render something', () => {
      const snapshot = shallow(<WhatsApp {...props} />);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('Mail', () => {
    it('should exists', () => {
      expect(Mail).toBeDefined();
    });
    it('should render something', () => {
      const snapshot = shallow(<Mail {...props} />);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});

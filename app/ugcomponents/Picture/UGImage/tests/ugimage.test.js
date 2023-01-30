import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { UGImageUI } from '../ugimage';

describe('UGImageUI ', () => {
  describe('UGImageUI component ', () => {
    let wrapper;
    let baseUrl;
    let props;

    beforeEach(() => {
      baseUrl = process.env.ACCOUNT_BASE_URL;
      process.env.ACCOUNT_BASE_URL = 'https://localhost/api';

      wrapper = shallow(
        <UGImageUI imageUrl="https://some.domain.com/images/beach.jpg" />,
      );
    });

    afterEach(() => {
      process.env.ACCOUNT_BASE_URL = baseUrl;
    });

    it('should exist ', () => {
      expect(wrapper.render()).toBeDefined();
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should accept imageUrl prop', () => {
      expect(
        wrapper
          .find('Img')
          .at(0)
          .props().src,
      ).toBe('https://some.domain.com/images/beach.jpg');
    });

    it('should accept various sizes', () => {
      const sizes = ['small', 'medium', 'large', 'extrasmall', 'custom'];
      sizes.forEach(size => {
        wrapper.setProps({ size });
        expect(toJSON(wrapper)).toMatchSnapshot();
      });
    });

    it('should accept roundness (1)', () => {
      wrapper.setProps({ round: true });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should accept roundness (2)', () => {
      wrapper.setProps({ round: false });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should accept crop meta info', () => {
      props = {
        cropMetaInfo: {
          x: 0.1,
          y: 0.2,
          width: 0.3,
          height: 0.4,
        },
      };

      wrapper.setProps(props);

      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should accept resizeWidth', () => {
      wrapper.setProps({ resizeWidth: 1000 });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should accept resizeHeight', () => {
      wrapper.setProps({ resizeHeight: 200 });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('if both resizeWidth and resizeHeight are present, then height should win', () => {
      props = {
        resizeWidth: 1000,
        resizeHeight: 200,
      };

      wrapper.setProps(props);

      expect(wrapper.find('Img').props().src).toBe(
        'https://some.domain.com/images/beach.jpg?height=200',
      );
    });

    it('should accept various rotation values', () => {
      const rotateOpts = [0, 90, 180, 270];
      rotateOpts.forEach(rotate => {
        wrapper.setProps({ rotate });
        expect(toJSON(wrapper)).toMatchSnapshot();
      });
    });

    it('should accept alt prop', () => {
      wrapper.setProps({ alt: 'Test Image' });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should accept a true padFacadeURL', () => {
      wrapper.setProps({ imageURL: 'images/beach.jpg' });
      wrapper.setProps({ padFacadeURL: true });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should accept a false padFacadeURL', () => {
      wrapper.setProps({ imageURL: 'images/beach.jpg' });
      wrapper.setProps({ padFacadeURL: false });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should accept a className prop', () => {
      wrapper.setProps({ className: 'my-root' });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should accept an imgClassName prop', () => {
      wrapper.setProps({ imgClassName: 'my-img' });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should accept an onLoad event handler', () => {
      const myOnLoad = jest.fn();
      wrapper = shallow(
        <UGImageUI
          imageUrl="https://some.domain.com/images/beach.jpg"
          onLoad={myOnLoad}
        />,
      );

      wrapper
        .find('Img')
        .at(0)
        .simulate('load');

      expect(myOnLoad).toHaveBeenCalled();
    });

    it('should accept an onError event handler', () => {
      const myOnError = jest.fn();
      wrapper = shallow(
        <UGImageUI
          imageUrl="https://some.domain.com/images/beach.jpg"
          onError={myOnError}
        />,
      );

      wrapper
        .find('Img')
        .at(0)
        .simulate('error');

      expect(myOnError).toHaveBeenCalled();
    });
    it('should render when isLazyLoad is false)', () => {
      wrapper.setProps({ isLazyLoad: false });
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});

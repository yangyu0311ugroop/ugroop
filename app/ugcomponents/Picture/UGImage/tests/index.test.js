/**
 * Created by paulcedrick on 6/21/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import stylesheet from '../styles';
import { UGImage } from '../index';

const mockStyle = mockStylesheet('UGImage', stylesheet);

describe('<UGImage /> component', () => {
  const imageUrl = 'https://www.placecage.com/100/100';
  it('should exist', () => {
    const wrapper = shallow(
      <UGImage classes={mockStyle} imageUrl={imageUrl} />,
    );
    expect(wrapper.render()).toBeDefined();
  });
  it('should accept imageUrl', () => {
    const wrapper = shallow(
      <UGImage classes={mockStyle} imageUrl={imageUrl} />,
    );
    expect(
      wrapper
        .find('WithStyles(UGImageUI)')
        .at(0)
        .props().imageUrl,
    ).toBe(imageUrl);
  });
  it('should accept size params', () => {
    const sizes = ['small', 'medium', 'large', 'extrasmall', 'custom'];
    sizes.forEach(size => {
      const wrapper = shallow(
        <UGImage classes={mockStyle} size={size} imageUrl={imageUrl} />,
      );
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  it('should accept an onLoad event handler', () => {
    const myOnLoad = jest.fn();
    const wrapper = shallow(
      <UGImage classes={mockStyle} imageUrl={imageUrl} onLoad={myOnLoad} />,
    );

    wrapper.simulate('load');

    expect(myOnLoad).toHaveBeenCalled();
  });

  it('should accept an onError event handler', () => {
    const myOnError = jest.fn();
    const wrapper = shallow(
      <UGImage classes={mockStyle} imageUrl={imageUrl} onError={myOnError} />,
    );

    wrapper.simulate('error');

    expect(myOnError).toHaveBeenCalled();
  });
});

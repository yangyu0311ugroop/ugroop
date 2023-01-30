/**
 * Created by paulcedrick on 6/20/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { UGImageItem } from '../index';
import stylesheet from '../styles';

const mockStyle = mockStylesheet('UGImageItem', stylesheet);

describe('<UGImageItem /> component', () => {
  it('should accept className', () => {
    const sampleClassName = 'ug-image-item';
    const wrapper = shallow(
      <UGImageItem classes={mockStyle} className={sampleClassName} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should accept imageUrl props', () => {
    const sampleUrl = 'sampleUrl';
    const wrapper = shallow(
      <UGImageItem imageUrl={sampleUrl} classes={mockStyle} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

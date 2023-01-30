/**
 * Created by paulcedrick on 6/20/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import stylesheet from '../styles';
import { UGCardHeaderImage } from '../index';

const mockStyle = mockStylesheet('UGCardHeaderImage', stylesheet);

describe('<UGCardHeaderImage /> component', () => {
  const sampleImages = [
    {
      key: 1,
      url:
        'https://lonelyplanetimages.imgix.net/mastheads/78349125.jpg?sharp=10&vib=20&w=1200',
    },
    {
      key: 2,
      url:
        'http://www.daytripperpalawan.com/wp-content/uploads/2015/02/Daytripper_Palawan_ElNido.jpg',
    },
  ];
  it('should exist', () => {
    expect(UGCardHeaderImage).toBeDefined();
  });

  it('should accept className props to override style of it', () => {
    const sampleClassName = 'ug-card-header-image';
    const wrapper = shallow(
      <UGCardHeaderImage classes={mockStyle} className={sampleClassName} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should contain <UGImageItem /> components depending on the number of images passed', () => {
    const wrapper = shallow(
      <UGCardHeaderImage classes={mockStyle} images={sampleImages} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should contain <UGImageItem /> components depending on the number of images passed (2)', () => {
    const wrapper = shallow(
      <UGCardHeaderImage classes={mockStyle} images={[{}, {}]} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should contain <UGImageItem /> components depending on the number of images passed (3)', () => {
    const wrapper = shallow(
      <UGCardHeaderImage classes={mockStyle} images={[]} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

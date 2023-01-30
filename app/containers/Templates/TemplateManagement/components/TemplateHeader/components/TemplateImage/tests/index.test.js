import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TemplateImageContainer } from '../index';

jest.mock('utils/helpers/request', () => ({
  queryImageURL: () => 'queryImageURL',
  postMetaInfo: () => 'postMetaInfo',
  horizontalSide: () => 'horizontalSide',
}));

describe('TemplateImageContainer', () => {
  let mockResaga;
  let rendered;
  beforeEach(() => {
    mockResaga = {
      setValue: jest.fn(),
      analyse: jest.fn(),
    };
    rendered = shallow(<TemplateImageContainer resaga={mockResaga} />);
  });
  it('should render what it should render', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render what it should render with Data', () => {
    rendered.setProps({
      photoMetaInfo: {
        x: 1,
        y: 1,
        width: 1,
        height: 1,
        rotate: 1,
      },
      templatePhotoUrl: 'abcd',
      photoId: 123,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});

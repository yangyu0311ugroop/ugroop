import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { AttachmentBorder } from '..';

describe('<AttachmentBorder />', () => {
  let rendered;

  const props = {
    classes: {
      root: 'root',
    },
  };

  beforeEach(() => {
    rendered = shallow(<AttachmentBorder {...props} />);
  });

  it('should exists', () => {
    expect(AttachmentBorder).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});

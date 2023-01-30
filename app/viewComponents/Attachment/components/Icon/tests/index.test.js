import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { AttachmentIcon } from '..';

describe('<AttachmentIcon />', () => {
  let rendered;

  const props = {};

  beforeEach(() => {
    rendered = shallow(<AttachmentIcon {...props} />);
  });

  it('should exists', () => {
    expect(AttachmentIcon).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});

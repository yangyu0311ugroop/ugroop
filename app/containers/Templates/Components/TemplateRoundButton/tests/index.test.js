import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import { TemplateRoundButton } from '../index';
import styles from '../styles';

const mockStyle = mockStylesheet('TemplateRoundButton', styles);

describe('<TemplateRoundButton />', () => {
  let rendered;

  const props = {
    classes: mockStyle,
    label:
      'Come to me, all who labor and are heavy laden, and I will give you rest.',
  };

  beforeEach(() => {
    rendered = shallow(
      <TemplateRoundButton {...props}>
        Jesus is my Lord and Savior
      </TemplateRoundButton>,
    );
  });

  it('should exists', () => {
    expect(TemplateRoundButton).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});

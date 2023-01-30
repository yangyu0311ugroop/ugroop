import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import mockStylesheet from 'utils/mockStylesheet';
import { TemplateRoundButtonWrapper } from '../index';
import styles from '../styles';

const mockStyle = mockStylesheet('TemplateRoundButtonWrapper', styles);

describe('<TemplateRoundButtonWrapper />', () => {
  let rendered;

  const props = {
    classes: mockStyle,
  };

  beforeEach(() => {
    rendered = shallow(
      <TemplateRoundButtonWrapper {...props}>
        Jesus is Lord of all
      </TemplateRoundButtonWrapper>,
    );
  });

  it('should exists', () => {
    expect(TemplateRoundButtonWrapper).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});

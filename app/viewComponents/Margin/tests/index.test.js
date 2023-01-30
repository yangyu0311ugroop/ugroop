import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { MarginWrapper } from '../index';

describe('<MarginWrapper />', () => {
  let rendered;

  const props = {
    classes: {},
  };

  beforeEach(() => {
    rendered = shallow(
      <MarginWrapper {...props}>
        <div />
      </MarginWrapper>,
    );
  });

  it('should exists', () => {
    expect(MarginWrapper).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render something if props isInline is true', () => {
    rendered.setProps({
      isInline: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});

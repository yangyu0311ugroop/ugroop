import React from 'react';
import { shallow } from 'enzyme';
import { UlTest } from '../index';
import Li from '../../Li/index';

const styleSheet = {
  root: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
};

const renderedComponent = shallow(
  <UlTest classes={styleSheet} component={Li} items={['test']} />,
);

describe('<Ul />', () => {
  it('should render an <ul> tag', () => {
    expect(renderedComponent.type()).toEqual('ul');
  });
  it('should have a className attribute', () => {
    expect(renderedComponent.prop('className')).toBeDefined();
  });
  it('should not adopt an invalid attribute', () => {
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
  it('should render children', () => {
    expect(renderedComponent.contains(<Li item="test" />)).toEqual(true);
  });
  it('should render children props', () => {
    const component = shallow(
      <UlTest classes={styleSheet}>
        <Li>Test</Li>
      </UlTest>,
    );
    expect(component.find('WithStyles(Li)').length).toBe(1);
  });
  it('should render the returned of the function', () => {
    const SampleRender = () => <Li>Jesus is mighty to save!</Li>;
    const component = shallow(
      <UlTest classes={styleSheet} component={SampleRender} />,
    );
    expect(component.render().find('li').length).toBe(1);
  });
});

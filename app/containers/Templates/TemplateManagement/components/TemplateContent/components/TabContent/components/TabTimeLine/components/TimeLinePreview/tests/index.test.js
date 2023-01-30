import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Sticky from 'react-stickynode';
import { TimeLinePreview } from '../index';

const mockedFn = jest.fn();
const renderedComponent = shallow(
  <TimeLinePreview tabId={1} data={0} classes={{}} onSuccess={mockedFn} />,
);

describe('TimeLinePreview component', () => {
  it('should render something', () => {
    expect(renderedComponent).toBeDefined();
  });
  it('should match snapshot', () => {
    expect(toJSON(renderedComponent)).toMatchSnapshot();
  });
  it('shall not render anything', () => {
    expect(renderedComponent.find(Sticky).children()).toHaveLength(0);
  });
  it('shall render something if data is not null', () => {
    renderedComponent.setProps({ data: 2 });
    expect(renderedComponent.find(Sticky).children()).toHaveLength(1);
  });
});

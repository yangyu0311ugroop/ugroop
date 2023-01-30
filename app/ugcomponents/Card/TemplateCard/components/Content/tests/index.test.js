import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Content } from '../index';

describe('<Content />', () => {
  let rendered;

  const props = {
    classes: {},
    title: 'The Cross',
    description: 'It is where mercy and righteousness kissed',
    baseUrl: 'Golgotha',
  };

  beforeEach(() => {
    rendered = shallow(<Content {...props} />);
  });

  it('should exists', () => {
    expect(Content).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render date if startDate exist', () => {
    rendered.setProps({
      customData: {
        startDate: '2018-11-13T00:35:24.315Z',
      },
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render weekday if weekDay data exist', () => {
    rendered.setProps({
      customData: {
        weekDay: 2,
      },
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});

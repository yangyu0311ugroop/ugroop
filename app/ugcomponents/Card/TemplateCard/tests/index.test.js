/**
 * Created by paulcedrick on 6/16/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import stylesheet from '../styles';
import { TemplateCard } from '../index';

const mockStyle = mockStylesheet('TemplateCard', stylesheet);

describe('<TemplateCard /> component', () => {
  const sampleData = {
    content: 'Small Group Tokyo Biking Tour',
    parentNodeId: 1,
    type: 'template',
    id: 9,
    createdAt: '2017-06-13T01:36:09.990Z',
    updatedAt: '2017-06-13T01:36:09.990Z',
    photos: [],
    feedbacks: [],
    children: [],
    nextNodes: [],
  };
  const customData = {
    duration: 5,
  };

  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <TemplateCard
        id={0}
        classes={mockStyle}
        content={sampleData.content}
        customData={customData}
      />,
    );
  });

  it('should render what it should render when component is not loading', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render what it should render when component is loading', () => {
    rendered.setProps({
      isLoading: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render shortDescription and preserve new line', () => {
    rendered.setProps({
      customData: {
        duration: 5,
        shortDescription: 'qweqwe\nqweqwe\nqweqwe\n',
      },
    });

    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render actions if showActions is true', () => {
    rendered.setProps({
      showActions: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should not render actions if showActions is false', () => {
    rendered.setProps({
      showActions: false,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/coolTheme';
import stylesheet from '../styles';
import { UGBreadcrumbs } from '../index';

const mockStyle = mockStylesheet('UGBreadcrumbs', stylesheet, theme);

describe('UGBreadcrumbs component', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<UGBreadcrumbs classes={mockStyle} />);
  });

  it('should render something', () => {
    expect(rendered.render()).toBeDefined();
  });

  it('should render links depending on the number of items passed', () => {
    const itemList = [
      {
        label: 'First',
        url: 'link1',
      },
      {
        label: 'Second',
        url: 'link2',
      },
      {
        label: 'Third',
        url: 'link3',
      },
    ];
    rendered.setProps({
      items: itemList,
      showLastItem: false,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
    rendered.setProps({
      items: itemList,
      showLastItem: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render home with active state when items contains only one item', () => {
    const itemList = [
      {
        label: 'First',
        url: 'link1',
      },
    ];
    rendered.setProps({
      items: itemList,
      showLastItem: true,
      showOneItem: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render dropdown if item length is > MAX_ITEMS', () => {
    const itemList = [
      {
        label: 'First',
        url: 'link1',
      },
      {
        label: 'Second',
        url: 'link2',
      },
      {
        label: 'Third',
        url: 'link3',
      },
      {
        label: 'Fourth',
        url: 'link4',
      },
      {
        label: 'Fifth',
        url: 'link5',
      },
    ];
    rendered.setProps({
      items: itemList,
      showLastItem: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render something if isLoading prop is true', () => {
    rendered.setProps({
      isLoading: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render only the root (first item) if onlyDisplayRoot prop is true', () => {
    const itemList = [
      {
        label: 'First',
        url: 'link1',
      },
      {
        label: 'Second',
        url: 'link2',
      },
      {
        label: 'Third',
        url: 'link3',
      },
      {
        label: 'Fourth',
        url: 'link4',
      },
      {
        label: 'Fifth',
        url: 'link5',
      },
    ];
    rendered.setProps({
      items: itemList,
      onlyDisplayRoot: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should render without the last item if showLastItem is false', () => {
    const itemList = [
      {
        label: 'First',
        url: 'link1',
      },
      {
        label: 'Second',
        url: 'link2',
      },
      {
        label: 'Third',
        url: 'link3',
      },
      {
        label: 'Fourth',
        url: 'link4',
      },
      {
        label: 'Fifth',
        url: 'link5',
      },
    ];
    rendered.setProps({
      items: itemList,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});

/**
 * Created by Yang on 17/7/17.
 */
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import List from '@material-ui/core/List';

import { UIItemListView } from '../index';

const delegate = {
  data: [],
  numberOfRow: () => 0,
};
const renderComponent = (props = {}) =>
  shallow(
    <UIItemListView viewDelegate={delegate} shouldUpdate={0} {...props} />,
  );

const delegate2 = {
  data: [3, 4],
  numberOfRow: () => 2,
  itemCellView: () => <div key={1}>123</div>,
};
const renderComponent2 = (props = {}) =>
  shallow(
    <UIItemListView viewDelegate={delegate2} shouldUpdate={0} {...props} />,
  );

describe('<UIItemListView />', () => {
  it('should render item of ListItem', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find(List)).toHaveLength(1);
  });
  it('should have no children', () => {
    const renderedComponent = renderComponent();
    const list = renderedComponent.find(List);
    expect(list.children()).toHaveLength(0);
  });
  it('should render children', () => {
    const renderedComponent = renderComponent2();
    const list = renderedComponent.find(List);
    expect(list.children()).toHaveLength(2);
  });
  it('should only render li', () => {
    const renderedComponent = shallow(
      <UIItemListView noULWrap viewDelegate={delegate2} shouldUpdate={0} />,
    );
    expect(toJSON(renderedComponent)).toMatchSnapshot();
  });
});

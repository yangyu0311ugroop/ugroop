/**
 * Created by Yang on 17/7/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import UGItemCell from '../index';

const onclick = jest.fn();
const delegate = {
  secondaryButtons: () => null,
  didSelectRowAt: row => {
    onclick(row);
  },
};
const style = {
  item: {},
};
const row = 0;
const renderComponent = (props = {}) =>
  shallow(
    <UGItemCell style={style} delegate={delegate} row={row} {...props} />,
  );

describe('<UGItemCell />', () => {
  it('should render item of ListItem', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find(ListItem)).toHaveLength(1);
  });
  it('should render item of ListItemText', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find(ListItemText)).toHaveLength(1);
  });
  it('should click with correct row number', () => {
    const renderedComponent = renderComponent();
    const itemCell = renderedComponent.find(ListItem);
    itemCell.simulate('click');
    expect(onclick).toHaveBeenCalledWith(row);
  });
  it('delegate one shall only have one child, List Item Text', () => {
    const renderedComponent = renderComponent();
    const itemCell = renderedComponent.find(ListItem);
    expect(itemCell.children).toHaveLength(1);
  });
  it('secondButtons shall render something', () => {
    const delegate2 = {
      secondaryButtons: () => <div className="secondaryButton" />,
      didSelectRowAt: row2 => {
        onclick(row2);
      },
    };
    const renderComponent2 = (props = {}) =>
      shallow(
        <UGItemCell style={style} delegate={delegate2} row={row} {...props} />,
      );
    const renderedComponent2 = renderComponent2();
    expect(renderedComponent2.find('.secondaryButton')).toHaveLength(1);
  });
  it('secondButtons shall render nothing', () => {
    const delegate3 = {
      didSelectRowAt: row3 => {
        onclick(row3);
      },
    };
    const renderComponent2 = (props = {}) =>
      shallow(<UGItemCell delegate={delegate3} row={row} {...props} />);
    const renderedComponent = renderComponent2();
    const itemCell = renderedComponent.find(ListItem);
    expect(itemCell.children).toHaveLength(1);
  });
});

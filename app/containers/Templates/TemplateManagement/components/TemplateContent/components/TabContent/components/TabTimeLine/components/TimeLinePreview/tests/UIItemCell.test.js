/**
 * Created by edil on 11/06/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { ListItem } from '@material-ui/core';
import { UGItemCell } from '../UIItemCell';

const onclick = jest.fn();

const row = 0;

describe('<UGItemCell />', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <UGItemCell classes={{}} didSelectRowAt={onclick} row={row} />,
    );
  });

  it('should render item of ListItem', () => {
    const props = { active: false };
    rendered.setProps(props);
    expect(rendered.find(ListItem)).toHaveLength(1);
    expect(toJSON(rendered)).toMatchSnapshot();
  });
  it('should click with correct row number', () => {
    const props = { active: true };
    rendered.setProps(props);
    const itemCell = rendered.find(ListItem);
    itemCell.simulate('click');
    expect(onclick).toHaveBeenCalledWith(row);
  });
  it('delegate one shall only have one child, List Item Text', () => {
    const itemCell = rendered.find(ListItem);
    expect(itemCell.children).toHaveLength(1);
  });
  it('should not have blank tooltip title if showTooltip is false and has Badge', () => {
    rendered.setProps({
      hasBadge: true,
      showTooltip: false,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import CoolTheme from 'theme/coolTheme';
import { UGHorizontalTab, stylesheet } from '../index';

const mockStyle = mockStylesheet('UGHorizontalTab', stylesheet, CoolTheme);

describe('UGHorizontalTab', () => {
  it('should render the first children of the Tab', () => {
    const tabItems = [{ label: 'first item' }, { label: 'second item' }];
    const wrapper = shallow(
      <UGHorizontalTab classes={mockStyle} tabItems={tabItems}>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </UGHorizontalTab>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('should render the selected item in the Tab', () => {
    const tabItems = [{ label: 'first item' }, { label: 'second item' }];
    const wrapper = shallow(
      <UGHorizontalTab classes={mockStyle} tabItems={tabItems} selectedTab={1}>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </UGHorizontalTab>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  describe('handleChangeTab', () => {
    it('should set state the selectedTab based on the value being passed to the function', () => {
      const tabItems = [{ label: 'first item' }, { label: 'second item' }];
      const wrapper = shallow(
        <UGHorizontalTab classes={mockStyle} tabItems={tabItems}>
          <div>First</div>
          <div>Second</div>
          <div>Third</div>
        </UGHorizontalTab>,
      );
      const formerSelectedTab = wrapper.state().tabSelected;
      const selectedIndexTab = 1;

      wrapper.instance().handleChangeTab(null, selectedIndexTab);
      const actualSelectedTab = wrapper.state().tabSelected;

      expect(actualSelectedTab).not.toBe(formerSelectedTab);
      expect(actualSelectedTab).toBe(selectedIndexTab);
    });
  });
});

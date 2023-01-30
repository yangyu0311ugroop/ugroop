/**
 * Created by quando on 1/7/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../index';
import AdminHeader from '../../../../NaviBar/AdminNavBar/index';

describe('<Header />', () => {
  let renderedComponent;

  beforeEach(() => {
    renderedComponent = shallow(<Header location={{ some: 'location' }} />);
  });

  it('should exists', () => {
    expect(Header).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(renderedComponent.length).toBe(1);
  });
  it('should render children', () => {
    expect(renderedComponent.find(AdminHeader).length).toBe(1);
  });
});

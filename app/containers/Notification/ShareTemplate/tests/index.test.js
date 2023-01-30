/**
 * Created by quando on 1/7/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import ShareTemplate from '../index';

describe('containers/Notification/ShareTemplate', () => {
  const hello = 'Hello';
  const renderedComponent = shallow(<ShareTemplate>{hello}</ShareTemplate>);

  describe('<ShareTemplate />', () => {
    it('should exists', () => {
      expect(ShareTemplate).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(renderedComponent.length).toBe(1);
    });
  });
});

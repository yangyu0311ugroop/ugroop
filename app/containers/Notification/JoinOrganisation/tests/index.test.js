/**
 * Created by quando on 1/7/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import JoinOrganisation from '../index';

describe('containers/Notification/JoinOrganisation', () => {
  const hello = 'Hello';
  const renderedComponent = shallow(
    <JoinOrganisation>{hello}</JoinOrganisation>,
  );

  describe('<JoinOrganisation />', () => {
    it('should exists', () => {
      expect(JoinOrganisation).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(renderedComponent.length).toBe(1);
    });
  });
});

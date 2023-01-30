/* ************************************************************************** */
/*  Testing Unit for Pricing Page */
/*  Created by: Vincent Lobrigo (09/12/2016)  */
/*  **************************************************************************** */

import React from 'react';
import { shallow } from 'enzyme';
import { UGPricingPage } from '../index';

describe('<UGClientListing />', () => {
  it('renders the pricing page', () => {
    const renderedComponent = shallow(
      <UGPricingPage classes={{ root: 'root' }} />,
    );
    expect(renderedComponent.length).toBe(1);
  });
});

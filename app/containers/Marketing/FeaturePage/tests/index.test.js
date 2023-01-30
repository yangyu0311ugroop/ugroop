/* ************************************************************************** */
/*  Testing Unit for Feature Page */
/*  Created by: Vincent Lobrigo (09/12/2016)  */
/*  **************************************************************************** */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import { UGFeaturePage } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('MarketingFeaturePage', stylesheet);

describe('<UGFeaturePage  />', () => {
  it('renders the feature page', () => {
    const renderedComponent = shallow(<UGFeaturePage classes={mockStyle} />);
    expect(toJSON(renderedComponent)).toMatchSnapshot();
  });
});

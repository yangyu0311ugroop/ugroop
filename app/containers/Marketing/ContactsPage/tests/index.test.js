/* ************************************************************************** */
/*  Testing Unit for Contact Page */
/*  Created by: Vincent Lobrigo (09/12/2016)  */
/*  **************************************************************************** */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { UGContactsPage } from '../index';

describe('<UGContactsPage />', () => {
  it('still matches snapshot', () => {
    const props = {
      classes: {
        root: 'root',
      },
    };
    const renderedComponent = shallow(<UGContactsPage {...props} />);
    expect(toJSON(renderedComponent)).toMatchSnapshot();
  });
});

/* ************************************************************************** */
/*  Testing Unit for FAQ Page  */
/*  Created by: Vincent Lobrigo (09/12/2016)  */
/*  **************************************************************************** */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import mockStylesheet from 'utils/mockStylesheet';
import theme from 'theme/warmTheme';
import { UGFaqPage } from '../index';
import stylesheet from '../style';

const mockStyle = mockStylesheet('MarketingFAQPage', stylesheet, theme);

describe('<UGFaqPage />', () => {
  it('onHandleChange sets state.tabVal', () => {
    const renderedComponent = shallow(<UGFaqPage classes={mockStyle} />);
    const instance = renderedComponent.instance();
    const value = 'value';
    instance.setState = jest.fn();
    instance.onHandleChange(null, value);
    expect(instance.setState).toBeCalledWith({ tabVal: value });
  });

  it('renders the faq page', () => {
    const renderedComponent = shallow(<UGFaqPage classes={mockStyle} />);
    expect(toJSON(renderedComponent)).toMatchSnapshot();
  });

  it('renders the faq page if state.tabVal=1', () => {
    const renderedComponent = shallow(<UGFaqPage classes={mockStyle} />);
    const instance = renderedComponent.instance();
    instance.setState({ tabVal: 1 });
    expect(instance.render()).toMatchSnapshot();
  });
});

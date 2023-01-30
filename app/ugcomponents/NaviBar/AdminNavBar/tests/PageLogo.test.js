/**
 * Created by Yang on 22/2/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import UGLink from 'components/Link';
import { PageLogo } from '../PageLogo';

describe('<PageLogo />', () => {
  const link = 'http://mxstbr.com/';
  const wrapper = shallow(<PageLogo classes={{}} />);

  it('should render link', () => {
    wrapper.setProps({
      link,
      text: true,
      xs: true,
      full: true,
      customText: 'Home',
    });

    expect(wrapper.find(UGLink)).toHaveLength(1);
  });

  it('should not render link', () => {
    wrapper.setProps({ link: '' });

    expect(wrapper.find(UGLink)).toHaveLength(0);
  });
});

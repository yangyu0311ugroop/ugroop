import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmPageWrapper } from '../wrapper';

describe('wrapper.test', () => {
  let rendered;

  const location = {};
  const intl = { formatMessage: msg => msg.id };

  beforeEach(() => {
    rendered = shallow(<ConfirmPageWrapper location={location} intl={intl} />);
  });

  it('should exist', () => {
    expect(ConfirmPageWrapper).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  let testLocation;

  it('should return the success page if the URL path name matches the success URL (1)', () => {
    testLocation = {
      pathname: '/confirm/success',
      search: '?email=test%40example.com',
      msg: 'Test',
    };

    rendered.setProps({ location: testLocation });
    expect(rendered.find('WithStyles(ConfirmSuccessPage)').length).toBe(1);
  });

  it('should return the success page if the URL path name matches the success URL (2)', () => {
    testLocation = {
      pathname: '/confirm/success/',
      search: '?email=test%40example.com',
      msg: 'Test',
    };

    rendered.setProps({ location: testLocation });
    expect(rendered.find('WithStyles(ConfirmSuccessPage)').length).toBe(1);
  });

  it('should return the error page if the URL path name does not match the success URL', () => {
    testLocation = {
      pathname: '/some/other/path',
      search: '?email=test%40example.com',
      msg: 'Test',
    };

    rendered.setProps({ location: testLocation });
    expect(rendered.find('WithStyles(ConfirmErrorPage)').length).toBe(1);
  });
});

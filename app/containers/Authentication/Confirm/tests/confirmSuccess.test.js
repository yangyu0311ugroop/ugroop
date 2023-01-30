import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmSuccessPage } from '../confirmSuccess';

describe('confirmSuccess.test', () => {
  let rendered;

  const config = () => false;
  const classes = { para: 'para' };
  const intl = { formatMessage: msg => msg.id };
  const query = {};

  beforeEach(() => {
    rendered = shallow(
      <ConfirmSuccessPage
        config={config}
        classes={classes}
        intl={intl}
        query={query}
      />,
    );
  });

  it('should exist', () => {
    expect(ConfirmSuccessPage).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render the page properly when the query parameters are supplied', () => {
    rendered.setProps({ query: { email: 'test@example.com' } });
    expect(
      rendered
        .find('P.para a')
        .at(0)
        .props().href,
    ).toBe('/login?email=test%40example.com');
  });
});

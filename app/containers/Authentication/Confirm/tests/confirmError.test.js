import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ConfirmErrorPage } from '../confirmError';

describe('confirmError.test', () => {
  let rendered;

  const config = () => false;
  const classes = { para: 'para', error: 'error' };
  const intl = { formatMessage: msg => msg.id };
  const query = {};

  beforeEach(() => {
    rendered = shallow(
      <ConfirmErrorPage
        config={config}
        classes={classes}
        intl={intl}
        query={query}
      />,
    );
  });

  it('should exist', () => {
    expect(ConfirmErrorPage).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render the page properly when the query parameters are supplied, for regular messages', () => {
    rendered.setProps({
      query: { email: 'test@example.com', msg: 'Test message' },
    });
    expect(
      rendered
        .find('P strong')
        .at(0)
        .text(),
    ).toBe('test@example.com');
    expect(
      rendered
        .find('WithStyles(Error) P.para')
        .at(0)
        .childAt(0)
        .text(),
    ).toBe('Test message');
  });

  it('should render the page properly when the query parameters are supplied, for "User already confirmed" messages (1)', () => {
    rendered.setProps({
      query: {
        email: 'test@example.com',
        msg: 'User cannot be confirm. Current status is CONFIRMED',
      },
    });
    expect(
      toJSON(rendered.find('WithStyles(Information) P.para')),
    ).toMatchSnapshot();
  });

  it('should render the page properly when the query parameters are supplied, for "User already confirmed" messages (2)', () => {
    rendered.setProps({
      query: {
        email: 'test@example.com',
        msg: 'User cannot be confirmed. Current status is CONFIRMED',
      },
    });
    expect(
      toJSON(rendered.find('WithStyles(Information) P.para')),
    ).toMatchSnapshot();
  });
});

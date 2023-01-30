import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { HelpOrgRoles } from '../index';

describe('<HelpOrgRoles />', () => {
  let rendered;

  const intl = { formatMessage: m => m.id };
  const onClose = jest.fn();

  beforeEach(() => {
    rendered = shallow(
      <HelpOrgRoles classes={{}} intl={intl} onClose={onClose} />,
    );
  });

  it('should exists', () => {
    expect(HelpOrgRoles).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render correctly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});

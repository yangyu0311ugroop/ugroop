import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { HelpTab } from '../index';

describe('<HelpTab />', () => {
  let rendered;

  const intl = { formatMessage: m => m.id };
  const onClose = jest.fn();

  beforeEach(() => {
    rendered = shallow(<HelpTab classes={{}} intl={intl} onClose={onClose} />);
  });

  it('should exists', () => {
    expect(HelpTab).toBeDefined();
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

import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Footer } from '../index';

describe('<Footer />', () => {
  let rendered;
  const props = {
    classes: {},
    duration: 1,
    renderActions: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<Footer {...props} />);
  });

  describe('render', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        actions: 'actions',
      });

      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});

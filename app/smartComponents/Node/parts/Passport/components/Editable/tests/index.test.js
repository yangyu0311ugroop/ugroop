import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { shallow } from 'enzyme';
import { PassportEditable } from '../index';

describe('<PassportEditable />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<PassportEditable />);
    instance = rendered.instance();
  });

  describe('handleClick', () => {
    it('should call handleClick defaultProps', () => {
      const onPassportView = jest.fn();
      rendered.setProps({
        onPassportView,
      });
      instance.handleClick();
      expect(onPassportView).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    it('should match snapshot', () => {
      rendered.props().renderValue();
      rendered.props().renderActions();
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});

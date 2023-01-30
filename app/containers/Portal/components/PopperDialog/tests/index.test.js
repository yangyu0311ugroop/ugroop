import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import React from 'react';
import { shallow } from 'enzyme';

import { PORTAL_HELPERS } from '../../../helpers';
import { PopperDialog } from '../index';

describe('<PopperDialog />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
    renderPopper: () => <span />,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<PopperDialog {...props} />);
    instance = rendered.instance();
  });

  describe('handleCloseDialog', () => {
    it('should call PORTAL_HELPERS.close', () => {
      PORTAL_HELPERS.close = jest.fn();

      instance.handleCloseDialog();
      expect(PORTAL_HELPERS.close).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});

import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import React from 'react';
import { shallow } from 'enzyme';
import { InterestedListItem } from '../index';

describe('<InterestedListItem', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<InterestedListItem id={1} onClick={jest.fn()} />);
    instance = rendered.instance();
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });

  describe('renderItem()', () => {
    it('should renderItem', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderItem({ userId: 1 }));
    });
    it('should renderItem by nodeUserId', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderItem({ userId: null }));
    });
  });
});

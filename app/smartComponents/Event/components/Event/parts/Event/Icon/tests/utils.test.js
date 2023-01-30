/**
 * Created by stephenkarpinskyj on 20/11/18.
 */

import { EVENT_HELPERS } from 'utils/helpers/events';
import iconUtils from '../utils';

describe('smartComponents/Event/parts/Icon/utils', () => {
  describe('#makeIconOptions()', () => {
    it('still matches snapshot', () => {
      EVENT_HELPERS.getEventIcons = jest.fn(() => [
        { type: 'icon_a', name: 'Icon A' },
        { type: 'icon_b', name: 'Icon B', hidden: true },
      ]);
      expect(iconUtils.makeIconOptions()).toMatchSnapshot();
    });
  });

  describe('#iconOptions()', () => {
    it('still matches snapshot', () => {
      EVENT_HELPERS.getEventIcons = jest.fn(() => [
        { type: 'icon_a', name: 'Icon A' },
        { type: 'icon_b', name: 'Icon B', hidden: true },
      ]);
      expect(iconUtils.iconOptions()).toMatchSnapshot();
    });
  });
});

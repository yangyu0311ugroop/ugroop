/**
 * Created by stephenkarpinskyj on 4/11/18.
 */

import { EVENT_CONSTANTS } from 'utils/constants/events';
import { EVENT_HELPERS } from 'utils/helpers/events';
import subtypeUtils from '../utils';

describe('smartComponents/Event/parts/Subtype/utils', () => {
  describe('#makeSubtypeOptions()', () => {
    it('still matches snapshot', () => {
      const type = EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type;
      expect(subtypeUtils.makeSubtypeOptions(type)).toMatchSnapshot();
    });

    it('still matches snapshot if filter is not null', () => {
      const type = EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type;
      const filter = subtype =>
        !EVENT_HELPERS.isFlightTransportationEvent(subtype.value);
      expect(subtypeUtils.makeSubtypeOptions(type, filter)).toMatchSnapshot();
    });
  });
});

import { EVENT_CONSTANTS } from 'utils/constants/events';
import { getEventDetails } from '../utils';

describe('getEventDetails', () => {
  it('should match snapshot when event type is accommodation', () => {
    expect(
      getEventDetails({
        type: EVENT_CONSTANTS.TYPES.ACCOMMODATIONS.type,
      }),
    ).toMatchSnapshot();
  });

  it('should match snapshot when event type is activities', () => {
    expect(
      getEventDetails({
        type: EVENT_CONSTANTS.TYPES.ACTIVITIES.type,
      }),
    ).toMatchSnapshot();
  });

  it('should match snapshot when event type is activities and iconOverride is cycling', () => {
    expect(
      getEventDetails({
        type: EVENT_CONSTANTS.TYPES.ACTIVITIES.type,
        subtype: EVENT_CONSTANTS.ACTIVITIES.MATCH.type,
        iconOverride: 'Cycling',
        activityDetailStartValue: '{}',
        activityDetailEndValue: '{}',
      }),
    ).toMatchSnapshot();
  });

  it('should match snapshot when event type is activities and iconOverride is not cycling', () => {
    expect(
      getEventDetails({
        type: EVENT_CONSTANTS.TYPES.ACTIVITIES.type,
        subtype: EVENT_CONSTANTS.ACTIVITIES.MATCH.type,
        iconOverride: 'Default',
      }),
    ).toMatchSnapshot();
  });

  it('should match snapshot when event type is transportation', () => {
    expect(
      getEventDetails({
        type: EVENT_CONSTANTS.TYPES.TRANSPORTATIONS.type,
      }),
    ).toMatchSnapshot();
  });

  it('should match snapshot when event type is transportation and subtype is Flight', () => {
    expect(
      getEventDetails({
        type: EVENT_CONSTANTS.TYPES.TRANSPORTATIONS.type,
        subtype: EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type,
      }),
    ).toMatchSnapshot();
  });
});

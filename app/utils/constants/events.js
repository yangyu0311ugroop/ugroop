import difference from 'lodash/difference';
import { NODE_CONSTANTS } from 'utils/constants/nodes';

// region Types
const makeSubtypeColours = (
  iconBackgroundDefault = '#ff0000',
  iconBackgroundHover = null,
) => {
  const hover = iconBackgroundHover || iconBackgroundDefault;
  return {
    icon: {
      background: { default: iconBackgroundDefault, hover },
    },
  };
};

export const DEFAULT_ICON_TYPE = '';
export const DEFAULT_ICON_NAME = 'Default';
export const DEFAULT_ICON = null;

export const UNKNOWN_EVENT_SUBTYPE = {
  type: 'unknown',
  name: 'Coming Soon',
  icon: 'question',
  colors: makeSubtypeColours(),
};

export const UNKNOWN_EVENT_TYPE = {
  type: 'Unknown',
  name: 'Unknown',
  getTypes: () => ({}),
};

export const EVENTS = {
  ACTIVITY: {
    type: 'Activity',
    name: 'Activity',
    getTypes: () => ACTIVITIES,
  },
  TRANSPORTATION: {
    type: 'Transportation',
    name: 'Transportation',
    getTypes: () => TRANSPORTATIONS,
  },
  ACCOMMODATION: {
    type: 'Accommodation',
    name: 'Accommodation',
    getTypes: () => ACCOMMODATIONS,
  },
};
export const TYPES = {
  ACTIVITIES: {
    type: 'Activity',
    name: 'Activity',
  },
  TRANSPORTATIONS: {
    type: 'Transportation',
    name: 'Transportation',
  },
  ACCOMMODATIONS: {
    type: 'Accommodation',
    name: 'Accommodation',
  },
};

export const FOOD_COLOR = '#de4f79';
export const ACTIVITY_COLOR = '#4CAF50';
export const TRANSPORTATION_COLOR = '#6493f7';
export const ACCOMMODATION_COLOR = '#eb9a2d';

export const FOOD_DEFAULT_COLOR = makeSubtypeColours(FOOD_COLOR);
export const ACTIVITY_DEFAULT_COLOR = makeSubtypeColours(ACTIVITY_COLOR);
export const TRANSPORTATION_DEFAULT_COLOR = makeSubtypeColours(
  TRANSPORTATION_COLOR,
);
export const ACCOMMODATION_COLORS = makeSubtypeColours(ACCOMMODATION_COLOR);

export const ACTIVITIES = {
  FOOD: {
    type: 'Food',
    name: 'Food',
    icon: 'dinner',
    iconOverrides: [
      {
        type: 'Food',
        name: 'Food',
        icon: 'dinner',
      },
      {
        type: 'Breakfast',
        name: 'Breakfast',
        icon: 'ug-breakfast',
      },
      {
        type: 'Lunch',
        name: 'Lunch',
        icon: 'ug-lunch',
      },
      {
        type: 'Dinner',
        name: 'Dinner',
        icon: 'ug-dinner',
      },
      {
        type: 'Drinks',
        name: 'Drinks',
        icon: 'lnr-glass2',
      },
      {
        type: 'Snack',
        name: 'Snack',
        icon: 'lnr-ice-cream',
      },
    ],
    color: FOOD_COLOR,
    colors: FOOD_DEFAULT_COLOR,
  },

  EVENT: {
    type: 'Event',
    name: 'Event',
    icon: 'calendar-check',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
    iconOverrides: [
      {
        type: 'helicopter',
        icon: 'lnr-helicopter',
      },
      {
        type: 'binoculars',
        icon: 'lnr-binoculars',
      },
      {
        type: 'paper-plane',
        icon: 'lnr-paper-plane',
      },
      {
        type: 'graduation-hat',
        icon: 'lnr-graduation-hat',
      },
      {
        type: 'trophy',
        icon: 'lnr-trophy',
      },
      {
        type: 'guitar',
        icon: 'lnr-guitar',
      },
      {
        type: 'trumpet',
        icon: 'lnr-trumpet',
      },
      {
        type: 'presentation',
        icon: 'lnr-presentation',
      },
      {
        type: 'store',
        icon: 'lnr-store',
      },
      {
        type: 'haircut',
        icon: 'lnr-haircut',
      },
      {
        type: 'store-24',
        icon: 'lnr-store-24',
      },
      {
        type: 'cart',
        icon: 'lnr-cart',
      },
      {
        type: 'bag2',
        icon: 'lnr-bag2',
      },
      {
        type: 'map',
        icon: 'lnr-map',
      },
      {
        type: 'road-sign',
        icon: 'lnr-road-sign',
      },
      {
        type: 'bubbles',
        icon: 'lnr-bubbles',
      },
      {
        type: 'first-aid',
        icon: 'lnr-first-aid',
      },
      {
        type: 'construction',
        icon: 'lnr-construction',
      },
      {
        type: 'cake',
        icon: 'lnr-cake',
      },
      {
        type: 'gift',
        icon: 'lnr-gift',
      },
      {
        type: 'balloon',
        icon: 'lnr-balloon',
      },
      {
        type: 'lollipop',
        icon: 'lnr-lollipop',
      },
      {
        type: 'lotus',
        icon: 'lnr-lotus',
      },
      {
        type: 'diamond4',
        icon: 'lnr-diamond4',
      },
      {
        type: 'landscape',
        icon: 'lnr-landscape',
      },
      {
        type: 'balance',
        icon: 'lnr-balance',
      },
      {
        type: 'luggage-weight',
        icon: 'lnr-luggage-weight',
      },
      {
        type: 'hammer2',
        icon: 'lnr-hammer2',
      },
      {
        type: 'wheelchair',
        icon: 'lnr-wheelchair',
      },
      {
        type: 'spotlights',
        icon: 'lnr-spotlights',
      },
      {
        type: 'hourglass',
        icon: 'lnr-hourglass',
      },
      {
        type: 'thumbs-up',
        icon: 'lnr-thumbs-up',
      },
      {
        type: 'magnifier',
        icon: 'lnr-magnifier',
      },
      {
        type: 'notification',
        icon: 'lnr-notification',
      },
      {
        type: 'prohibited',
        icon: 'lnr-prohibited',
      },
      {
        type: 'home',
        icon: 'lnr-home',
      },
      {
        type: 'bathtub',
        icon: 'lnr-bathtub',
      },
      {
        type: 'bed',
        icon: 'lnr-bed',
      },
      {
        type: 'city',
        icon: 'lnr-city',
      },
      {
        type: 'apartment',
        icon: 'lnr-apartment',
      },
      {
        type: 'pen',
        icon: 'lnr-pen',
      },
      {
        type: 'feather',
        icon: 'lnr-feather',
      },
      {
        type: 'palette',
        icon: 'lnr-palette',
      },
      {
        type: 'magic-wand',
        icon: 'lnr-magic-wand',
      },
      {
        type: 'snow2',
        icon: 'lnr-snow2',
      },
      {
        type: 'umbrella2',
        icon: 'lnr-umbrella2',
      },
      {
        type: 'sun',
        icon: 'lnr-sun',
      },
      {
        type: 'moon',
        icon: 'lnr-moon',
      },
      {
        type: 'wind',
        icon: 'lnr-wind',
      },
      {
        type: 'cloud',
        icon: 'lnr-cloud',
      },
      {
        type: 'lock',
        icon: 'lnr-lock',
      },
      {
        type: 'factory',
        icon: 'lnr-factory',
      },
      {
        type: 'gamepad',
        icon: 'lnr-gamepad',
      },
      {
        type: 'joystick',
        icon: 'lnr-joystick',
      },
      {
        type: 'heart',
        icon: 'lnr-heart',
      },
      {
        type: 'mailbox-full',
        icon: 'lnr-mailbox-full',
      },
      {
        type: 'drawers2',
        icon: 'lnr-drawers2',
      },
      {
        type: 'tape2',
        icon: 'lnr-tape2',
      },
      {
        type: 'papers',
        icon: 'lnr-papers',
      },
      {
        type: 'document2',
        icon: 'lnr-document2',
      },
      {
        type: 'license2',
        icon: 'lnr-license2',
      },
      {
        type: 'library2',
        icon: 'lnr-library2',
      },
      {
        type: 'library3',
        icon: 'lnr-library3',
      },
    ],
  },

  MEETING: {
    type: 'Meeting',
    name: 'Meeting',
    icon: 'users2',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  CONCERT: {
    type: 'Concert',
    name: 'Concert',
    icon: 'mic2',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  TOUR: {
    type: 'Tour',
    name: 'Excursion',
    icon: 'walk',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  THEATRE: {
    type: 'Theatre',
    name: 'Theatre',
    icon: 'theater',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  MATCH: {
    type: 'Match',
    name: 'Sports',
    icon: 'soccer',
    iconOverrides: [
      {
        type: 'Basketball',
        name: 'Basketball',
        icon: 'basketball',
      },
      {
        type: 'Bowling',
        name: 'Bowling',
        icon: 'bowling-pins',
      },
      {
        type: 'Cycling',
        name: 'Cycling',
        icon: 'ug-bicycle',
      },
      {
        type: 'Football',
        name: 'Football',
        icon: 'football',
      },
      {
        type: 'Golf',
        name: 'Golf',
        icon: 'golf2',
      },
      {
        type: 'Soccer',
        name: 'Soccer',
        icon: 'soccer',
      },
      {
        type: 'Swimming',
        name: 'Swimming',
        icon: 'swim',
      },
      {
        type: 'TableTennis',
        name: 'Table Tennis',
        icon: 'ping-pong',
      },
      {
        type: 'Tennis',
        name: 'Tennis',
        icon: 'tennis2',
      },
    ],
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  RECREATION: {
    type: 'Recreation',
    name: 'Recreation',
    icon: 'landscape',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  GAME: {
    type: 'Game',
    name: 'Game',
    icon: 'joystick',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  MATCH_COMPETITION: {
    type: 'MatchCompetition',
    name: 'Match',
    icon: 'lan',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  OCCASION: {
    type: 'Occasion',
    name: 'Occasion',
    icon: 'gift',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  WALK: {
    type: 'Walk',
    name: 'Walk',
    icon: 'walk',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  LESSONS: {
    type: 'Lesson',
    name: 'Lessons',
    icon: 'book',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  CRUISE: {
    type: 'Cruise',
    name: 'Cruise',
    icon: 'ship',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  EXHIBITION: {
    type: 'Exhibition',
    name: 'Exhibition',
    icon: 'file-image',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  GUIDED_TOUR: {
    type: 'GuidedTour',
    name: 'Guided Tour',
    icon: 'flag3',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  SELF_GUIDED_TOUR: {
    type: 'SelfGuidedTour',
    name: 'Self Guided Tour',
    icon: 'map2',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  MUSEUM: {
    type: 'Museum',
    name: 'Museum',
    icon: 'library2',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  RISE_AND_SHINE: {
    type: 'RiseAndShine',
    name: 'Rise and Shine',
    icon: 'cloud-sun',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  REST_AND_SLEEP: {
    type: 'SleepAndRest',
    name: 'Sleep and Rest',
    icon: 'moon',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },

  OTHER: {
    type: 'Other',
    name: 'Other',
    icon: 'calendar-text',
    color: ACTIVITY_COLOR,
    colors: ACTIVITY_DEFAULT_COLOR,
  },
};

const ACTIVITY_AND_FOOD_TYPES = Object.values(ACTIVITIES).map(
  ({ type }) => type,
);

const ACTIVITY_TYPES = difference(ACTIVITY_AND_FOOD_TYPES, [
  ACTIVITIES.FOOD.type,
]);

export const FOOD_ICONS = [-1, 0, 1, 2, 3, 4];
export const ACTIVITY_KEYS = difference(Object.keys(ACTIVITIES), ['FOOD']);

export const TRANSPORTATIONS = {
  FLIGHT: {
    type: 'Flight',
    name: 'Flight',
    icon: 'ug-departure3',
    iconEnd: 'ug-arrival3',
    iconOverrides: [
      {
        type: 'flying',
        name: 'In-Flight',
        icon: 'ug-in-flight3',
        hidden: true,
      },
    ],
    color: TRANSPORTATION_COLOR,
    colors: TRANSPORTATION_DEFAULT_COLOR,
  },
  CAR: {
    type: 'Car',
    name: 'Car',
    icon: 'ug-car',
    iconEnd: 'ug-car',
    color: TRANSPORTATION_COLOR,
    colors: TRANSPORTATION_DEFAULT_COLOR,
  },
  CAB: {
    type: 'Cab',
    name: 'Cab',
    icon: 'ug-cab',
    iconEnd: 'ug-cab',
    color: TRANSPORTATION_COLOR,
    colors: TRANSPORTATION_DEFAULT_COLOR,
  },
  TAXI: {
    type: 'Taxi',
    name: 'Taxi',
    icon: 'ug-taxi',
    iconEnd: 'ug-taxi',
    color: TRANSPORTATION_COLOR,
    colors: TRANSPORTATION_DEFAULT_COLOR,
  },
  RIDESHARE: {
    type: 'Rideshare',
    name: 'Ride Share',
    icon: 'ug-rideshare',
    iconEnd: 'ug-rideshare',
    color: TRANSPORTATION_COLOR,
    colors: TRANSPORTATION_DEFAULT_COLOR,
  },
  VEHICLE_HIRE: {
    type: 'VehicleHire',
    name: 'Vehicle Hire',
    icon: 'ug-vehicle-hire',
    iconEnd: 'ug-vehicle-hire',
    color: TRANSPORTATION_COLOR,
    colors: TRANSPORTATION_DEFAULT_COLOR,
  },
  COACH: {
    type: 'Coach',
    name: 'Coach',
    icon: 'ug-coach',
    iconEnd: 'ug-coach',
    color: TRANSPORTATION_COLOR,
    colors: TRANSPORTATION_DEFAULT_COLOR,
  },
  BUS: {
    type: 'Bus',
    name: 'Bus',
    icon: 'ug-bus',
    iconEnd: 'ug-bus',
    color: TRANSPORTATION_COLOR,
    colors: TRANSPORTATION_DEFAULT_COLOR,
  },
  TRAIN: {
    type: 'Train',
    name: 'Train',
    icon: 'ug-train',
    iconEnd: 'ug-train',
    color: TRANSPORTATION_COLOR,
    colors: TRANSPORTATION_DEFAULT_COLOR,
  },
  TRAM: {
    type: 'Tram',
    name: 'Tram',
    icon: 'ug-tram',
    iconEnd: 'ug-tram',
    color: TRANSPORTATION_COLOR,
    colors: TRANSPORTATION_DEFAULT_COLOR,
  },
  SHIP: {
    type: 'Ship',
    name: 'Ship',
    icon: 'ug-ship',
    iconEnd: 'ug-ship',
    color: TRANSPORTATION_COLOR,
    colors: TRANSPORTATION_DEFAULT_COLOR,
  },
  BOAT: {
    type: 'Boat',
    name: 'Boat',
    icon: 'ug-boat-wave',
    iconEnd: 'ug-boat-wave',
    color: TRANSPORTATION_COLOR,
    colors: TRANSPORTATION_DEFAULT_COLOR,
  },
  FERRY: {
    type: 'Ferry',
    name: 'Ferry',
    icon: 'ug-ferryboat',
    iconEnd: 'ug-ferryboat',
    color: TRANSPORTATION_COLOR,
    colors: TRANSPORTATION_DEFAULT_COLOR,
  },
  BICYCLE: {
    type: 'Bicycle',
    name: 'Bicycle',
    icon: 'lnr-bicycle',
    iconEnd: 'lnr-bicycle',
    color: TRANSPORTATION_COLOR,
    colors: TRANSPORTATION_DEFAULT_COLOR,
  },
  WALK: {
    type: 'Walk',
    name: 'Walking',
    icon: 'footprint',
    iconEnd: 'footprint',
    color: TRANSPORTATION_COLOR,
    colors: TRANSPORTATION_DEFAULT_COLOR,
  },
};

const ACCOMMODATION_ICON = 'bed';

export const AIR_TRANSPORTATIONS = ['FLIGHT'];
export const SEA_TRANSPORTATIONS = ['SHIP', 'BOAT', 'FERRY'];
export const ROAD_TRANSPORTATIONS = [
  'CAR',
  'CAB',
  'TAXI',
  'RIDESHARE',
  'VEHICLE_HIRE',
  'COACH',
  'BUS',
  'BICYCLE',
  'WALK',
];
export const RAIL_TRANSPORTATIONS = ['TRAIN', 'TRAM'];

export const ACCOMMODATIONS = {
  HOTEL: {
    type: 'Hotel',
    name: 'Hotel',
    icon: ACCOMMODATION_ICON,
    color: ACCOMMODATION_COLOR,
    colors: ACCOMMODATION_COLORS,
  },

  MOTEL: {
    type: 'Motel',
    name: 'Motel',
    icon: ACCOMMODATION_ICON,
    color: ACCOMMODATION_COLOR,
    colors: ACCOMMODATION_COLORS,
  },

  HOSTEL: {
    type: 'Hostel',
    name: 'Hostel',
    icon: ACCOMMODATION_ICON,
    color: ACCOMMODATION_COLOR,
    colors: ACCOMMODATION_COLORS,
  },

  APARTMENT: {
    type: 'Apartment',
    name: 'Apartment',
    icon: ACCOMMODATION_ICON,
    color: ACCOMMODATION_COLOR,
    colors: ACCOMMODATION_COLORS,
  },

  BED_AND_BREAKFAST: {
    type: 'BedAndBreakfast',
    name: 'B&B',
    icon: ACCOMMODATION_ICON,
    color: ACCOMMODATION_COLOR,
    colors: ACCOMMODATION_COLORS,
  },

  CAMPING_GROUND: {
    type: 'CampingGround',
    name: 'Camping Ground',
    icon: ACCOMMODATION_ICON,
    color: ACCOMMODATION_COLOR,
    colors: ACCOMMODATION_COLORS,
  },

  CHALET: {
    type: 'Chalet',
    name: 'Chalet',
    icon: ACCOMMODATION_ICON,
    color: ACCOMMODATION_COLOR,
    colors: ACCOMMODATION_COLORS,
  },

  FARMSTAY: {
    type: 'Farmstay',
    name: 'Farmstay',
    icon: ACCOMMODATION_ICON,
    color: ACCOMMODATION_COLOR,
    colors: ACCOMMODATION_COLORS,
  },

  GUEST_HOUSE: {
    type: 'GuestHouse',
    name: 'Guest House',
    icon: ACCOMMODATION_ICON,
    color: ACCOMMODATION_COLOR,
    colors: ACCOMMODATION_COLORS,
  },

  HOLIDAY_PARK: {
    type: 'HolidayPark',
    name: 'Holiday Park',
    icon: ACCOMMODATION_ICON,
    color: ACCOMMODATION_COLOR,
    colors: ACCOMMODATION_COLORS,
  },

  HOMESTAY: {
    type: 'Homestay',
    name: 'Homestay',
    icon: ACCOMMODATION_ICON,
    color: ACCOMMODATION_COLOR,
    colors: ACCOMMODATION_COLORS,
  },

  LODGE: {
    type: 'Lodge',
    name: 'Lodge',
    icon: ACCOMMODATION_ICON,
    color: ACCOMMODATION_COLOR,
    colors: ACCOMMODATION_COLORS,
  },

  RESORT: {
    type: 'Resort',
    name: 'Resort',
    icon: ACCOMMODATION_ICON,
    color: ACCOMMODATION_COLOR,
    colors: ACCOMMODATION_COLORS,
  },

  OTHER: {
    type: 'Other',
    name: 'Other',
    icon: ACCOMMODATION_ICON,
    color: ACCOMMODATION_COLOR,
    colors: ACCOMMODATION_COLORS,
  },
};
// endregion

// region Groupings
const transportations = Object.values(TRANSPORTATIONS).map(({ type }) => type);
const verticalTransportations = [
  TRANSPORTATIONS.FLIGHT.type,
  TRANSPORTATIONS.VEHICLE_HIRE.type,
];
const horizontalTransportations = difference(
  transportations,
  verticalTransportations,
);

export const verticalTransportationEvents = [
  { type: EVENTS.TRANSPORTATION.type },
  {
    subtype: {
      inq: verticalTransportations,
    },
  },
];
export const horizontalTransportationEvents = [
  { type: EVENTS.TRANSPORTATION.type },
  {
    subtype: {
      inq: horizontalTransportations,
    },
  },
];
export const transportationEvents = [
  { type: EVENTS.TRANSPORTATION.type },
  {
    subtype: {
      inq: transportations,
    },
  },
];

const verticallyDisplayedEventTypes = [
  { type: EVENTS.ACCOMMODATION.type },
  {
    and: verticalTransportationEvents,
  },
];

const horizontallyDisplayedEventTypes = [
  { type: EVENTS.ACTIVITY.type },
  {
    and: [
      { type: EVENTS.TRANSPORTATION.type },
      {
        subtype: {
          inq: horizontalTransportations,
        },
      },
    ],
  },
];

const pinnedEvents = [
  {
    cacheKey: 'pvd',
    where: {
      or: verticallyDisplayedEventTypes,
    },
    positions: NODE_CONSTANTS.POSITIONS.startEnd,
    dayCountType: NODE_CONSTANTS.DAY_COUNT_TYPES.any,
  },
  {
    cacheKey: 'phd',
    where: {
      or: horizontallyDisplayedEventTypes,
    },
    positions: NODE_CONSTANTS.POSITIONS.startEnd,
    dayCountType: NODE_CONSTANTS.DAY_COUNT_TYPES.multiDay,
  },
];

const singleDayEvents = {
  cacheKey: 'shd',
  positions: NODE_CONSTANTS.POSITIONS.start,
  dayCountType: NODE_CONSTANTS.DAY_COUNT_TYPES.singleDay,
};

const nonSingleDayEvents = [
  {
    cacheKey: 'nshd',
    positions: NODE_CONSTANTS.POSITIONS.all,
    dayCountType: NODE_CONSTANTS.DAY_COUNT_TYPES.multiDay,
  },
];

const allEvents = [singleDayEvents, ...nonSingleDayEvents];

const singleDayAndPinnedEvents = [singleDayEvents, ...pinnedEvents];

const accommodationGrouping = {
  where: { type: EVENTS.ACCOMMODATION.type },
  positions: NODE_CONSTANTS.POSITIONS.startMiddle,
};

const foodGrouping = [
  {
    where: {
      and: [
        { type: EVENTS.ACTIVITY.type },
        { subtype: ACTIVITIES.FOOD.type },
        { dayCount: { gt: 0 } },
        { position: { inq: NODE_CONSTANTS.POSITIONS.all } },
      ],
    },
  },
  {
    where: {
      and: [
        { type: EVENTS.ACTIVITY.type },
        { subtype: ACTIVITIES.FOOD.type },
        { dayCount: 0 },
        { position: NODE_CONSTANTS.POSITIONS.start },
      ],
    },
  },
];

const activityGrouping = [
  {
    where: {
      and: [
        { type: EVENTS.ACTIVITY.type },
        {
          subtype: {
            inq: ACTIVITY_TYPES,
          },
        },
        { dayCount: { gt: 0 } },
        { position: { inq: NODE_CONSTANTS.POSITIONS.all } },
      ],
    },
  },
  {
    where: {
      and: [
        { type: EVENTS.ACTIVITY.type },
        {
          subtype: {
            inq: ACTIVITY_TYPES,
          },
        },
        { dayCount: 0 },
        { position: NODE_CONSTANTS.POSITIONS.start },
      ],
    },
  },
];

const transportationGrouping = [
  {
    where: {
      and: [
        ...verticalTransportationEvents,
        { dayCount: { gt: 0 } },
        { position: { inq: NODE_CONSTANTS.POSITIONS.startEnd } },
      ],
    },
  },
  {
    where: {
      and: [
        ...horizontalTransportationEvents,
        { dayCount: { gt: 0 } },
        { position: { inq: NODE_CONSTANTS.POSITIONS.all } },
      ],
    },
  },
  {
    where: {
      and: [
        ...transportationEvents,
        { dayCount: 0 },
        { position: NODE_CONSTANTS.POSITIONS.start },
      ],
    },
  },
];

export const transportationFlightEvents = [
  { type: EVENTS.TRANSPORTATION.type },
  {
    subtype: {
      inq: [TRANSPORTATIONS.FLIGHT.type],
    },
  },
];

const transportationWithFlightStartEndGrouping = [
  ...transportationGrouping,
  {
    where: {
      and: [
        ...transportationFlightEvents,
        { dayCount: 0 },
        { position: NODE_CONSTANTS.POSITIONS.end },
      ],
    },
  },
  {
    where: {
      and: [
        ...transportationFlightEvents,
        { dayCount: { gt: 0 } },
        { position: NODE_CONSTANTS.POSITIONS.end },
      ],
    },
  },
];
export const EVENT_GROUPINGS = {
  pinnedEvents: { name: 'pinnedEvents', obj: pinnedEvents },
  singleDayEvents: { name: 'singleDayEvents', obj: singleDayEvents },
  nonSingleDayEvents: { name: 'nonSingleDayEvents', obj: nonSingleDayEvents },
  allEvents: { name: 'allEvents', obj: allEvents },
  singleDayAndPinnedEvents: {
    name: 'singleDayAndPinnedEvents',
    obj: singleDayAndPinnedEvents,
  },
  verticalTransportationEvents: {
    name: 'verticalTransportationEvents',
    obj: verticalTransportationEvents,
  },
  horizontalTransportationEvents: {
    name: 'horizontalTransportationEvents',
    obj: horizontalTransportationEvents,
  },
  transportationEvents: {
    name: 'transportationEvents',
    obj: transportationEvents,
  },
  accommodationGrouping: {
    name: 'accommodationGrouping',
    obj: accommodationGrouping,
  },
  foodGrouping: {
    name: 'foodGrouping',
    obj: foodGrouping,
  },
  activityGrouping: {
    name: 'activityGrouping',
    obj: activityGrouping,
  },
  transportationGrouping: {
    name: 'transportationGrouping',
    obj: transportationGrouping,
  },
  transportationWithFlightStartEndGrouping: {
    name: 'transportationWithFlightStartEndGrouping',
    obj: transportationWithFlightStartEndGrouping,
  },
};
// endregion

/**
 * Event component rendering variants.
 */
export const EVENT_VARIANTS = {
  // TODO: Rename more specifically once design/styling concepts have been thought through

  /** Inline editable, own form */
  editableForm: 'editableForm',

  /** Styled as heading, part of larger form */
  editableHeading: 'editableHeading',

  /** Styled as heading, own form */
  editableHeadingForm: 'editableHeadingForm',

  /** Input field, part of larger form */
  field: 'field',

  /** Display label, no input */
  label: 'label',

  /** Display heading label, no input */
  labelHeading: 'labelHeading',

  /** Display label with value only, no input */
  labelValue: 'labelValue',

  /** Display label with value only, no input, with label above the value */
  labelValueStacked: 'labelValueStacked',

  /** Display label with value only as a flag, no input */
  labelValueFlag: 'labelValueFlag',

  /** For time, render home time value */
  labelValueWithHomeTime: 'labelValueWithHomeTime',

  /** Display on event icon */
  icon: 'icon',

  /** Display on event card */
  card: 'card',

  /** Display as select option */
  option: 'option',

  /** Data input */
  data: 'data',

  /** Display value only without any tags */
  valueOnly: 'valueOnly',

  /** Render prop */
  renderProp: 'renderProp',
};

export const EVENT_SUBLABEL_TYPES = {
  time: 'time',
  duration: 'duration',
};

export const REMINDER_INPUT_MODE = {
  ABSOLUTE: 'Absolute',
  RELATIVE_BEFORE: 'RelativeBefore',
  ARRIVE: 'Arrive',
  DEPART: 'Depart',
};

const makeReminderInputModeOption = (value, name) => ({
  value,
  children: name,
});
export const REMINDER_INPUT_MODE_OPTIONS = [
  makeReminderInputModeOption(
    REMINDER_INPUT_MODE.ABSOLUTE,
    'Specific date & time',
  ),
  makeReminderInputModeOption(
    REMINDER_INPUT_MODE.RELATIVE_BEFORE,
    'Time before event commences',
  ),
  makeReminderInputModeOption(
    REMINDER_INPUT_MODE.ARRIVE,
    'When I arrive at the place',
  ),
  makeReminderInputModeOption(
    REMINDER_INPUT_MODE.DEPART,
    'When I leave the place',
  ),
];

export const START_END_INPUT_MODE = {
  day: 'SingleDay',
  dayTime: 'MultiDay',
  duration: 'Duration',
};

export const START_END_INPUT_MODE_OPTIONS = [
  { type: START_END_INPUT_MODE.day, name: 'end time only' },
  { type: START_END_INPUT_MODE.dayTime, name: 'end day + time' },
  { type: START_END_INPUT_MODE.duration, name: 'duration only' },
];

export const DEFAULT_ROOM_CONFIGURATION = [
  { name: 'Single', bedCount: 1, guestCount: 1 },
  { name: 'Double', bedCount: 1, guestCount: 2 },
  { name: 'Twin', bedCount: 2, guestCount: 2 },
  { name: 'Triple', bedCount: 3, guestCount: 3 },
  { name: 'Quad', bedCount: 4, guestCount: 4 },
];

export const EVENT_DETAILS_VARIANT = {
  DEFAULT: 'default',
  CARD: 'card',
  LIST: 'list',
};

export const COACH_TYPES = {
  ESCORTED: 'Escorted',
  SELF_DRIVE: 'SelfDrive',
  DRIVE: 'Driver',
};

export const COACH_TYPES_OPTIONS = [
  {
    children: 'Escorted',
    value: COACH_TYPES.ESCORTED,
  },
  {
    children: 'Self-Drive',
    value: COACH_TYPES.SELF_DRIVE,
  },
  {
    children: 'Driver',
    value: COACH_TYPES.DRIVE,
  },
];

export const BUS_TYPES = {
  PRIVATE: 'Private',
  CHARTER: 'Charter',
  PUBLIC: 'Public',
};

export const BUS_TYPES_OPTIONS = [
  {
    children: 'Private',
    value: BUS_TYPES.PRIVATE,
  },
  {
    children: 'Charter',
    value: BUS_TYPES.CHARTER,
  },
  {
    children: 'Public',
    value: BUS_TYPES.PUBLIC,
  },
];

export const BUS_TYPES_MAPPING = {
  Private: 'Private',
  Charter: 'Charter',
  Public: 'Public',
};

export const COACH_TYPES_MAPPING = {
  Escorted: 'Escorted',
  SelfDrive: 'Self-Drive',
  Driver: 'Driver',
};

export const LOCATION_TYPES = {
  Popper: 'popper',
  SingleLocation: 'singleLocation',
};

const ACCOMMODATION_SELECT = Object.values(ACCOMMODATIONS).map(
  ({ type, name }) => ({ value: type, children: name }),
);

export const FOOD_ICON_SELECT = ACTIVITIES.FOOD.iconOverrides.map(
  ({ type, name }) => ({
    value: type,
    children: name,
  }),
);

export const FOOD_ICON_KEY = ACTIVITIES.FOOD.iconOverrides.reduce(
  (accu, { type, icon }) => ({
    ...accu,
    [type]: icon,
  }),
  {},
);

export const TRANSPORTATION_NAMES = Object.values(TRANSPORTATIONS).map(
  ({ type, name, icon }) => ({ subtype: type, name, icon }),
);

export const ACCOMMODATION_NAMES = Object.values(ACCOMMODATIONS).map(
  ({ type, name }) => ({ subtype: type, name }),
);

export const FOOD_NAMES = ACTIVITIES.FOOD.iconOverrides.map(
  ({ type, name, icon }) => ({ subtype: type, name, icon }),
);

export const ACTIVITY_NAMES = Object.values(ACTIVITIES).map(
  ({ type, name, icon }) => ({ subtype: type, name, icon }),
);

export const subtypeNamesByType = type => {
  if (type === 'Transportation') return TRANSPORTATION_NAMES;
  if (type === 'Activity') return ACTIVITY_NAMES;
  if (type === 'Accommodation') return ACCOMMODATION_NAMES;

  return [];
};

export const EVENT_CONSTANTS = {
  FOOD_ICON_SELECT,
  FOOD_ICON_KEY,
  EVENTS,
  TYPES,
  ACTIVITIES,
  ACTIVITY_TYPES: ACTIVITY_AND_FOOD_TYPES,
  ACCOMMODATIONS,
  ACCOMMODATION_SELECT,
  TRANSPORTATIONS,
  COACH_TYPES,
  BUS_TYPES,
  LOCATION_TYPES,
  GROUPINGS: EVENT_GROUPINGS,
  VARIANTS: EVENT_VARIANTS,
  SUBLABEL_TYPES: EVENT_SUBLABEL_TYPES,
  REMINDER_INPUT_MODE,
  REMINDER_INPUT_MODE_OPTIONS,
  START_END_INPUT_MODE,
  START_END_INPUT_MODE_OPTIONS,
  DEFAULT_ROOM_CONFIGURATION,
  EVENT_DETAILS_VARIANT,
  subtypeNamesByType,
};

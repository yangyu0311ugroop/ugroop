export const BTN_ITEMS_TOUR_INDEX = [
  {
    label: 'Card',
    icon: 'grid',
    value: 'card',
  },
  {
    label: 'List',
    icon: 'list4',
    value: 'list',
  },
];

export const BTN_ITEMS_TOUR_PAGE = [
  {
    label: 'List',
    icon: 'list4',
    value: 'list',
  },
  {
    label: 'Card',
    icon: 'grid',
    value: 'card',
  },
  {
    label: 'Itinerary',
    icon: 'calendar-full',
    value: 'itinerary',
  },
  {
    label: 'Title',
    icon: 'menu-square',
    value: 'title',
  },
  {
    label: 'Map',
    icon: 'map-marker',
    value: 'map',
  },
];

export const DEFAULT_VIEW_TOUR_PAGE = undefined;
export const DEFAULT_VIEW_TOUR_INDEX = BTN_ITEMS_TOUR_INDEX[0].value;

export const DEFAULT_OFFSET = 0;
export const DEFAULT_LIMIT = 9;
export const DEFAULT_SORT_FIELD = 'createdAt';
export const DEFAULT_SORT_ORDER = 'desc';

export const TEMPLATE_TYPE = 'template';
export const FOLDER_TYPE = 'folder';

export const MY_TOURS_FOLDER_NAME = 'rootFolder';

export const FOLDER_QUERY_PARAM = {
  ORG_TOURS: 'organisation',
  SHARED_TOURS: 'shared',
  MY_TOURS: 'my',
};

export const FOLDER_NAME = {
  MY_TOURS: 'Person Root Folder',
  ORG_TOURS: 'Organisation',
  SHARED_TOURS: 'Shared',
};

/**
 *  This contains all the common or at least variants that are somehow expected
 *  to smart components (not all are required to be implemented to each smart components)
 *
 */
export const VARIANTS = {
  TITLE: 'title',
  INLINE_TEXT: 'inlineText',
  TEXT_ONLY: 'textOnly',
  ICON: 'icon',
  TABLE: 'table',
  TEXT_FIELD: 'textField',
  RADIO_FIELD: 'radioField',
  WITH_FORM: 'withForm',
  FIELDS_ONLY: 'fieldsOnly',
  LIST_ONLY: 'listOnly',
  SELECT_FIELD: 'selectField',
  CHECKBOX_FIELD: 'checkboxField',
  ACTIONS: 'actions',
  CARD_FORM: 'cardForm',
  CARD: 'card',
  CARD_ITEM: 'cardItem',
  BORDERLESS: 'borderless',
  OUTLINE: 'outline',
  INLINE: 'inline',
  STANDARD: 'standard',
  TEXT_WITH_LABEL_INLINE: 'textWithLabelInline',
  TEXT_WITH_LABEL: 'textWithLabel',
  ROUND: 'imageRound',
  SQUARE: 'imageSquare',
  EDITABLE: 'editable',
  READ_ONLY: 'readOnly',
  STRING_ELLIPSIS: 'stringEllipsis',
  STRING_ONLY: 'stringOnly',
  VALUE_ONLY: 'valueOnly',
  SPAN_ONLY: 'spanOnly',
  SUBTITLE_TEXT: 'subtitleText',
  AVATAR: 'avatar',
  VALUE: 'value',
  DATA: 'data',
  SIMPLE_TOOLTIP: 'simpleTooltip',
  RENDER_PROP: 'renderProp',
  BUTTON: 'ShowButton',
  LIST_ITEM: 'listItem',
  BADGE: 'badge',
  LOGIC: 'logic',
  WITH_EMAIL: 'withEmail',
  WITH_LAST_ACCESS: 'withLastAccess',
  CONNECTED: 'connected',
  DATE: 'date',
  POPPER: 'popper',
  WITH_PASSPORT: 'withPassport',
  CONTENT_ONLY: 'contentOnly',
  ACTION_ONLY: 'actionOnly',
  AVATAR_ONLY: 'avatarOnly',
  SORTERS_ONLY: 'sortersOnly',
  AVATARS_ONLY: 'avatarsOnly',
  FILTERS_ONLY: 'filtersOnly',
  COUNT_ONLY: 'countOnly',
  WITH_NAME: 'withName',
  WITH_NAME_STRING_ONLY: 'withNameStringOnly',
  ONE_LINE_PREVIEW: 'oneLinePreview',
  COUNT: 'count',
  // Layout variants
  FORM: 'form',
  LIST: 'list',
  ROW: 'row',
  MAP: 'map',
  ITINERARY: 'itinerary',
  MENU_ITEM: 'menuItem',
  ROW_SIMPLE: 'rowSimple',

  // FILTER VARIANTS
  CONFIRMED: 'confirmed',
  DECLINED: 'declined',
  PENDING: 'pending',
  FOLLOWING: 'following',
  NOT_FOLLOWING: 'notFollowing',
  ALL_FOLLOWERS: 'allFollowers',
  ALL_PARTICIPANTS: 'allParticipants',

  // participant Action Varians
  MOVE: 'move',
  LINK: 'link',
  UNLINK: 'unlink',

  CREATE: 'create',
  VIEW: 'view',

  MODALS: 'modals',

  ORG_MEMBER: 'orgMember',

  PUBLIC_VIEW: 'publicView',
  THUMBNAIL: 'THUMBNAIL',
  SEE_MORE_SWITCH: 'seeMoreSwitch',
  PERSON_TYPE: 'personType',
};

export const STATUS_CONSTANTS = {
  [VARIANTS.FOLLOWING]: 'Followers',
  [VARIANTS.NOT_FOLLOWING]: 'Not Following',
  [VARIANTS.CONFIRMED]: 'Participants',
  [VARIANTS.PENDING]: 'Pending Participants',
  [VARIANTS.DECLINED]: 'Not Going Participants',
  [VARIANTS.ALL_FOLLOWERS]: 'All Followers',
  [VARIANTS.ALL_PARTICIPANTS]: 'All Participants',
};

export const TRANSFER_TOUR_TYPE = {
  TOUR_CONNECTION: 'tourConnection',
  ORG_CONNECTION: 'orgConnection',
  EMAIL: 'email',
};
export const TRANSFER_TOUR_VIEW = {
  [TRANSFER_TOUR_TYPE.TOUR_CONNECTION]: 'TOUR CONTRIBUTOR',
  [TRANSFER_TOUR_TYPE.ORG_CONNECTION]: 'ORGANISATION MEMBERS',
  [TRANSFER_TOUR_TYPE.EMAIL]: 'ANYONE',
};

export const PRINT_FORM_VARIANTS = {
  PEOPLE_PARTICIPANTS: 'peopleParticipants',
  PEOPLE_CONTRIBUTOR: 'peopleContributor',
  PEOPLE_FOLLOWER: 'peopleFollower',
};

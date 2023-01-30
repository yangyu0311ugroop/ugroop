/**
 * Created by Yang on 28/2/17.
 */
/*
 * Redux First Level Key
 * */
import { LOGIC_HELPERS } from 'utils/helpers/logic';

const GLOBAL_STORE = 'global';
const LANGUAGE_STORE = 'language';
const COGNITO_ACCOUNTSTORE = 'cognitoAcctStore';
const ORG_DATASTORE = 'orgDataStore';
const TEMPLATE_MANAGEMENT_DATASTORE = 'templateManagementStore';
const TEMPLATE_MANAGEMENT_VIEWSTORE = 'templateManagementView';
const MY_TEMPLATES_DATASTORE = 'myTemplateListDataStore';
const SHARED_TEMPLATES_DATASTORE = 'sharedTemplateListDataStore';
const FOLDER_EXPLORER_DATASTORE = 'folderExplorerDataStore';
const PHOTO_DATASTORE = 'photoStore';
const ROUTE_DATASTORE = 'route';
const REALTIME_DATASTORE = 'realtimeStore';
const NOTIFICATION_DATASTORE = 'notificationStore';
const DISCUSSION_DATASTORE = 'discussionStore';
const APP_DATA_CACHE = 'appDataCache';
const ORGANISATION_VIEWSTORE = 'organisationView';
const ATTACHMENT_DATASTORE = 'attachmentStore';
const STREAM_CHAT_STORE_IMMER = 'streamChatStoreImmer';
const USER_DATA_STORE = 'userDataStore';
const PERSON_DATA_STORE = 'personDataStore';
const ORGANISATION_DATA_STORE = 'organisationDataStore';
const NODE_STORE = 'nodeStore';
const INVITATION_STORE = 'invitationStore';
const INVITATION_VIEW_STORE = 'invitationViewStore';
const DASHBOARD_VIEW_STORE = 'dashboardViewStore';
const ABILITY_DATA_STORE = 'abilityDataStore';
const NODE_TRAILS_DATASTORE = 'nodeTrailsDataStore';
const INVITATION_SWITCH_ACCOUNT_STORE = 'invitationSwitchAccountStore';
const COORDINATE_DATA_STORE = 'coordinateDataStore';
const FILE_DATA_STORE = 'fileDataStore';
const PHONE_DATA_STORE = 'phoneDataStore';
const EVENT_STORE = 'eventStore';
const GEOCODE_STORE = 'geocodeStore';
const PRODUCT_STORE_IMMER = 'productDataStoreImmer';
const PLAN_STORE_IMMER = 'planDataStoreImmer';
const CUSTOMER_STORE_IMMER = 'customerStoreImmer';
const INVOICE_STORE_IMMER = 'invoiceStoreImmer';
const SUBSCRIPTION_VIEW_STORE = 'subscriptionViewStore';
const SUBSCRIPTION_STORE_IMMER = 'subscriptionImmerStore';
const MARKET_PLACE_STORE = 'marketPlaceImmerStore';

export {
  GLOBAL_STORE,
  LANGUAGE_STORE,
  MY_TEMPLATES_DATASTORE,
  COGNITO_ACCOUNTSTORE,
  ORG_DATASTORE,
  TEMPLATE_MANAGEMENT_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  NODE_TRAILS_DATASTORE,
  PHOTO_DATASTORE,
  ROUTE_DATASTORE,
  SHARED_TEMPLATES_DATASTORE,
  REALTIME_DATASTORE,
  NOTIFICATION_DATASTORE,
  DISCUSSION_DATASTORE,
  APP_DATA_CACHE,
  USER_DATA_STORE,
  PERSON_DATA_STORE,
  ORGANISATION_DATA_STORE,
  ABILITY_DATA_STORE,
  NODE_STORE,
  INVITATION_STORE,
  INVITATION_VIEW_STORE,
  FOLDER_EXPLORER_DATASTORE,
  DASHBOARD_VIEW_STORE,
  INVITATION_SWITCH_ACCOUNT_STORE,
  COORDINATE_DATA_STORE,
  FILE_DATA_STORE,
  PHONE_DATA_STORE,
  ORGANISATION_VIEWSTORE,
  EVENT_STORE,
  GEOCODE_STORE,
  ATTACHMENT_DATASTORE,
  PRODUCT_STORE_IMMER,
  PLAN_STORE_IMMER,
  CUSTOMER_STORE_IMMER,
  SUBSCRIPTION_VIEW_STORE,
  SUBSCRIPTION_STORE_IMMER,
  STREAM_CHAT_STORE_IMMER,
  MARKET_PLACE_STORE,
  INVOICE_STORE_IMMER,
};

export const WIDTHS = {
  LG: 1920,
  MD: 1280,
  SM: 960,
  XS: 750,
  XXS: 600,
};

/*
 * LocalStorage Key
 * */
const LOGIN_STATUS = 'loginStatus';
const UGROOP_STORAGE = 'UGroopStorage';
const UGROOP_COGNITO_DATASTORE = `${UGROOP_STORAGE}:${COGNITO_ACCOUNTSTORE}`;
const UGROOP_ORG_DATASTORE = `${UGROOP_STORAGE}:${ORG_DATASTORE}`;
export { LOGIN_STATUS, UGROOP_COGNITO_DATASTORE, UGROOP_ORG_DATASTORE };

/* S3 Bucket Name */
const PERSON_CONTAINER = 'com.ugroop.personContainer';
export { PERSON_CONTAINER };

/* React Google Maps URL with API Key */
export const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${
  process.env.GOOGLE_MAPS_API_KEY
}&v=3.exp&libraries=geometry,drawing,places`;
export const GOOGLE_API_KEYS = {
  GOOGLE_MAPS_URL,
};

// INTERCOM TOUR PRODUCT
export const INTERCOM_TOUR_PRODUCT = `?product_tour_id=241369`;

/* Global Error Msg */
const REFRESH_TOKEN_ERROR = 'authenticated error, no refresh token';
export { REFRESH_TOKEN_ERROR };

/* Invite Tooltip Msg */
export const INVITE_TOOLTIP_MSG = `Ask them to securely register to update their details,
  have ongoing access to the itinerary as well as receiving
  immediate notifications if there are any changes.`;

/* Invite Tooltip Msg */
export const ADD_FOLLOWER_TOOLTIP_MSG = `Add people that you would like to follow your
 journey, and for the organisers, your emergency contacts just in case`;

/* Invite Error Msg */
export const ADD_INVITE_ERROR_MSG = `has already been invited so this may be a duplicated entry?
If so, you can delete this entry, alter the email address and try again or cancel the original invitation if it is
still pending.`;

/* Drag & Drop */
export const ON_DRAG_START = 'onDragStart';
export const ON_DRAG_END = 'onDragEnd';

export const DRAG_TYPES = {
  SINGLE_DAY: 'singleDayEvent',
};

export const IATA_API = {
  airportSearch: 'https://api-pub.ugroop.com/iata/airports/search?',
};

export const THE_DOT = '\u{00B7}';
export const THE_BIG_DOT = '\u{2022}';
export const THE_LONG_DASH = '–';
export const EVENT_NO_TIME = '––:––';
export const DO_NOTHING =
  'For testing purpose, to indicate a function is doing nothing';
export const DO_NOTHING_FUNC = () => {};
export const EMPTY_RTE = '<p><br></p>';
export const UNMATCHED_PWD = "Passwords don't match.";
export const CREATED = 'created';
export const OUTSTANDING = 'outstanding';
export const OPEN = 'open';
export const CLOSED = 'closed';
export const COMPLETED = 'completed';
export const PENDING = 'pending';
export const CONNECTED = 'connected';
export const CANCELLED = 'cancelled';
export const CONFIRMED = 'confirmed';
export const OWNER = 'owner';
export const READ_ONLY = 'readOnly';
export const AVATAR = 'avatar';
export const EXPANDED = 'expanded';
export const ORG_SEAT_RENDER = 'ORG_SEAT_RENDER';
export const COMPRESSED = 'compressed';
export const BADGE = 'badge';
export const CHAT = 'chat';
export const PHOTO_TITLE_DATE = 'photoTitleDate';
export const DEFAULT = 'default';
export const CALENDAR_BADGE = 'calendarBadge';
export const OVERVIEW_ROW = 'OVERVIEW_ROW';
export const SELECT = 'select';
export const ICON_BUTTON = 'iconButton';
export const FLAT_BUTTON = 'flatButton';
export const NULL = 'null';
export const SUMMARY = 'summary';
export const OUTSTANDING_SHORT = 'outstandingshort';
export const CONNECT_TO_TOUR = 'Connect to Tour';

export const DETAILED_VIEW = 'detailedView';
export const SIMPLE_VIEW = 'simpleView';
export const INVITE = 'invite';
export const PERSON_TYPE = 'personType';

export const HEADING = 'heading';
export const TITLE = 'title';
export const UNDERLINE = 'underline';
export const LOGIC = 'logic';
export const LINK = 'link';
export const OPTION = 'option';
export const TEXT = 'text';
export const VALUE = 'value';
export const BUTTON_TEXT = 'buttonText';
export const MENU_TEXT = 'menuText';
export const BUTTON = 'button';
export const ICON = 'icon';
export const POPPER = 'popper';
export const RENDER_PROP = 'renderProp';
export const REMAINING = 'remaining';
export const PROGRESS_BAR = 'progressBar';
export const COMPLETED_MESSAGE = 'completedMessage';
export const CARD = 'card';
export const LIST = 'list';
export const ASC = 'asc';
export const DESC = 'desc';
export const DEFAULT_SORT_BY = 'createdAt';
export const DEFAULT_DISCUSSION_SORT_BY = 'content';
export const DEFAULT_ORDER = DESC;
export const DEFAULT_FEEDBACK_ORDER = DESC;
export const DEFAULT_COMMENT_ORDER = ASC;
export const DEFAULT_DISCUSSION_ORDER = ASC;
export const ORG_FORM_NAME = 'lastSeen';
export const TEXT_WITH_LABEL = 'textWithLabel';
export const CHECK_INPUT = 'checkInput';
export const TOTAL = 'total';

export const CONTENT = 'content';
export const URL = 'url';
export const LAST_MODIFIED_BY = 'lastModifiedBy';
export const CREATED_BY = 'createdBy';
export const UPDATED_AT = 'updatedAt';
export const NO_CONTENT = 'Untitled';
export const DURATION = 'duration';
export const START_DATE = 'startdate';
export const ROOM_TYPE = 'roomType';

export const CREATED_AT = 'createdAt';
export const DUE_DATE = 'dueDate';
export const PERCENTAGE = 'percentage';
export const MY = '/tours';
export const MY_TOURS = 'My Tours';
export const ORGANISATION = 'organisation';
export const ORGANISATION_TOURS = 'Organisation Tours';
export const SHARED_TOURS = 'Shared Tours';
export const DEFAULT_CURRENT_ROUTE = MY;
export const PERSONAL = 'personal';
export const CHANGE_DURATION = 'Change Duration';
export const UPGRADE = 'Upgrade'; // DO NOT CHANGE THIS VALUE, PLEASE CONTACT YANG
export const ADD_SEAT = 'addSeat';
export const DOWNGRADE = 'Downgrade'; // DO NOT CHANGE THIS VALUE, PLEASE CONTACT YANG
export const REMOVE_SEAT = 'removeSeat';
export const PERSONAL_DOWNGRADE = 'personalDowngrade';
export const FREE_PLAN_DOWNGRADE = 'freePlanDowngrade';
export const HIGHEST_PLAN_UPGRADE = 'highestPlanUpgrade';
export const MY_TOURS_NODE_CONTENT = 'rootFolder';
export const MY_TOURS_NODE_CONTENT_2 = 'Person Root Folder';
export const PRODUCTION = 'production';
export const NONE = 'none';
export const UNKNOWN = '?';

export const NEWEST = `${CREATED_AT}.${DESC}`;
export const OLDEST = `${CREATED_AT}.${ASC}`;
export const NAME_ASC = `${CONTENT}.${ASC}`;
export const NAME_DESC = `${CONTENT}.${DESC}`;
export const AUTHOR_ASC = `${CREATED_BY}.${ASC}`;
export const AUTHOR_DESC = `${CREATED_BY}.${DESC}`;
export const UPDATED_BY_ASC = `${LAST_MODIFIED_BY}.${ASC}`;
export const UPDATED_BY_DESC = `${LAST_MODIFIED_BY}.${DESC}`;
export const RECENTLY_UPDATED = `${UPDATED_AT}.${DESC}`;
export const LEAST_RECENTLY_UPDATED = `${UPDATED_AT}.${ASC}`;

export const DURATION_ASC = `${DURATION}.${ASC}`; // shortest first
export const DURATION_DESC = `${DURATION}.${DESC}`; // longest first
export const START_DATE_ASC = `${START_DATE}.${ASC}`; // earliest first
export const START_DATE_DESC = `${START_DATE}.${DESC}`; // latest first

export const DEFAULT_NODE_SHARE_TOUR_ID = -1;
export const INVALID_ROOT_NODE_ID = -1;
export const CHAT_DRAWER = 'ChatDrawer';

export const PAGE_HELMETS = {
  MY_TOURS: 'My Tours',
  SHARED_TOURS: 'Shared Tours',
  MY_CHECKLISTS: 'My Checklists',
  MY_ASSETS: 'Assets',
  ASSIGNED_CHECKLISTS: 'Assigned Checklists',
  SHARED_ASSETS: 'Shared Assets',
  ORGANISATION_ASSETS: 'Organisation Assets',
  ALL_ASSETS: 'All Assets',
  PERSON_PROFILE: 'My Profile',
  CHANGE_PASSWORD: 'Change Password',
  PERSON_ROLES: 'Roles',
  PERSON_PREFERENCES: 'Preferences',
  PASSPORTS: 'Passports',
  DOCUMENTS: 'Documents',
  ORGANISATION_PROFILE: 'My Organisation',
  ORGANISATION_ROLES: 'Organisation Roles',
  ORGANISATION_PREFERENCES: 'Organisation Preferences',
  ORGANISATION_BILLING: 'Organisation Billing',
  SUBSCRIPTION: 'Subscription',
  DASHBOARD: 'Dashboard',
  ORGANISATION_CHECKLISTS: 'Organisation Checklists',
  TEMPLATES: 'Templates',
  TEMPLATE_LIBRARY: 'Template Library',
  ORGANISATION_CREATE: 'Create Organisation',
  SCHOOL: 'School | Organisation Settings',
  TRAVEL_BOARDS: 'Itineraries',
  PERSONAL_TOURS: 'Personal Tours',
  BILLING: 'Billing',
};

export const USER_FIELDS = {
  KNOWN_AS: 'knownAs',
  EMAIL: 'email',
  CREATED_DATE: 'createdDate',
  LASTSEEN_DATE: 'lastSeenDate',
};

// Share Button Constants
export const MAIL = 'Mail';
export const TWITTER = 'Twitter';
export const FACEBOOK = 'Facebook';
export const WHATSAPP = 'WhatsApp';

export const SHARE_URL_HELPERS = {
  facebookURL: (link, message) =>
    `https://www.facebook.com/sharer/sharer.php?u=${link}&quote=${message}`,
  twitterURL: (link, message) =>
    `https://twitter.com/intent/tweet?url=${link}&text=${message}`,
  whatsAppURL: (link, message) =>
    `https://api.whatsapp.com/send?text=${message}%0A${link}`,
  mailURL: (link, message) => `mailto:?subject=${message}&body=${link}`,
};

const goTo = (url, { history }) => () => history.push(URL_HELPERS.tours(url));

const goToUrl = (url, { history }) => () => history.push(url);

const home = (page, match = {}) => {
  if (match.path === URL_HELPERS.myTours() && match.isExact) {
    return URL_HELPERS.index();
  }

  if (match.path === URL_HELPERS.myTours() && !match.isExact) {
    return URL_HELPERS.myTours();
  }

  if (match.path === URL_HELPERS.index() && match.isExact) {
    return URL_HELPERS.myTours();
  }

  return page || URL_HELPERS.myTours();
};

export const URL_HELPERS = {
  goTo,
  goToUrl,
  home,
  index: () => '/',
  myTours: id => {
    if (id === -1) {
      return '/my-tours/personal';
    }

    return id ? `/my-tours/${id}` : '/my-tours';
  },
  personalDenyAccess: () => `/my-tours/personal/denyaccess`,
  dashboard: () => '/admin',
  tours: id => (id ? `/tours/${id}` : '/tours'),
  sharedTours: () => '/shared_tours',
  checklists: () => '/checklists',
  settings: () => '/settings',
  personalSettingBilling: () => '/settings/billings',
  personalSettingsPreference: () => '/settings/preferences',
  subscriptionSetup: () => '/subscription/new',
  subscriptionResubscribe: () => '/subscription/subscribe',
  subscriptionUpgrade: () => '/subscription/upgrade',
  subscriptionDowngrade: () => '/subscription/downgrade',
  subscriptionDurationChangeDowngrade: () =>
    '/subscription/changeDuration/downgrade',
  subscriptionDurationChangeUpgrade: () =>
    '/subscription/changeDuration/upgrade',
  settingsOrganisations: () => '/settings?tab=2',
  orgIndex: id => `/orgs/${id}`,
  orgNew: () => '/orgs/new',
  orgTours: id => `/orgs/${id}/tours`,
  orgSharedTours: id => `/orgs/${id}/shared_tours`,
  orgChecklists: id => `/orgs/${id}/checklists`,
  orgDenyAccess: id => `/orgs/${id}/denyaccess`,
  orgSubscriptionSetup: id => `/orgs/${id}/subscription/new`,
  orgSubscriptionSubscribe: id => `/orgs/${id}/subscription/subscribe`,
  orgSubscriptionUpgrade: id => `/orgs/${id}/subscription/upgrade`,
  orgSubscriptionDowngrade: id => `/orgs/${id}/subscription/downgrade`,
  orgSubscriptionTourPlanUpgrade: id =>
    `/orgs/${id}/subscription/tourplan/upgrade`,
  orgSubscriptionTourPlanDowngrade: id =>
    `/orgs/${id}/subscription/tourplan/downgrade`,
  orgSubscriptionAddSeats: id => `/orgs/${id}/subscription/addSeat`,
  orgSubscriptionRemoveSeats: id => `/orgs/${id}/subscription/removeSeat`,
  orgSubscriptionDurationChangeDowngrade: id =>
    `/orgs/${id}/subscription/changeDuration/downgrade`,
  orgSubscriptionDurationChangeUpgrade: id =>
    `/orgs/${id}/subscription/changeDuration/upgrade`,
  orgPeople: id => `/orgs/${id}/people`,
  orgTeams: id => `/orgs/${id}/teams`,
  orgSettings: id => `/orgs/${id}/settings`,
  tourPrint: id => `/print/tour/${id}`,
  orgViewPaymentHistory: id => `/orgs/${id}/subscription/paymentHistory`,
  personalViewPaymentHistory: () => '/subscription/paymentHistory',
  tourTabPrint: ({ id, tabId }) => `/print/tour/${id}?tabId=${tabId}`,
  googlePlace: (name, placeId) =>
    `https://www.google.com/maps/search/?api=1&query=${name}${LOGIC_HELPERS.ifElse(
      placeId,
      `&query_place_id=${placeId}`,
      '',
    )}`,
  googleDirection: ({
    origin,
    originPlaceId,
    destination,
    destinationPlaceId,
  }) =>
    `https://www.google.com/maps/dir/?api=1&origin=${origin}${LOGIC_HELPERS.ifElse(
      originPlaceId,
      `&origin_place_id=${originPlaceId}`,
      '',
    )}&destination=${destination}${LOGIC_HELPERS.ifElse(
      originPlaceId,
      `&destination_place_id=${destinationPlaceId}`,
      '',
    )}`,
  makeUrl: url => url.replace(/^(http|https):\/\//g, ''),
  marketPlace: () => '/marketplace',
  personalInfo: () => '/settings/personal-info',
  productDetail: ({ category, id }) => `/marketplace/${category}/product/${id}`,
  tourStats: id => `/tours/${id}/statistics`,
  orgInfo: id => `/orgs/${id}/settings/org-info`,
  orgPreference: id => `/orgs/${id}/settings/preferences`,
  orgSchool: id => `/orgs/${id}/settings/school`,
  orgContacts: id => `/orgs/${id}/contacts`,
  whatsNew: () =>
    'https://s3.us-west-2.amazonaws.com/com.ugroop.public/ugroopWhatNew.json',
  ugroopHelpCenter: () => 'https://intercom.help/ugroop/en/',
};

URL_HELPERS.dashboardPages = [
  URL_HELPERS.index(),
  URL_HELPERS.myTours(),
  URL_HELPERS.dashboard(),
];
URL_HELPERS.personalPages = [
  URL_HELPERS.tours(),
  URL_HELPERS.tours(':id?'),
  URL_HELPERS.sharedTours(),
  URL_HELPERS.checklists(),
  URL_HELPERS.settings(),
];
URL_HELPERS.personalSettingPages = [URL_HELPERS.settings()];
URL_HELPERS.organisationPages = [
  URL_HELPERS.orgIndex(':id'),
  URL_HELPERS.orgNew(),
  URL_HELPERS.orgTours(':id'),
  URL_HELPERS.orgSharedTours(),
  URL_HELPERS.orgChecklists(),
  URL_HELPERS.orgPeople(),
  URL_HELPERS.orgTeams(),
  URL_HELPERS.orgSettings(),
  URL_HELPERS.orgContacts(),
];
URL_HELPERS.isDashboardPage = match =>
  URL_HELPERS.dashboardPages.indexOf(match.path) !== -1;
URL_HELPERS.isTourPage = match =>
  match.path === URL_HELPERS.tours(':id?') && match.isExact && match.params.id;
URL_HELPERS.isPersonalPage = match =>
  URL_HELPERS.personalPages.indexOf(match.path) !== -1;
URL_HELPERS.isOrganisationPage = match =>
  URL_HELPERS.organisationPages.indexOf(match.path) !== -1;
URL_HELPERS.isPersonalSettingPages = match =>
  URL_HELPERS.personalSettingPages.indexOf(match.path) !== -1;

export const REGISTRATION_OPTIONS = {
  personal: 'Yes',
  organisation: 'No',
};

export const TOUR_SETTINGS = {
  PUSH_NOTIFICATION: 'PUSH_NOTIFICATION',
  SHOW_PARTICIPANTS_TO: 'show_participants_to',
  OWNER_CUSTOM_ROLE: 'owner_custom_role',
};

export const ADMIN_TOUR_SETTINGS = {
  TOUR_CODE: 'tour_code',
  MIN_PAX: 'min_pax_count',
  MAX_PAX: 'max_pax_count',
  HOME_CURRENCY: 'home_currency',
  LAST_CURRENCY_ADDED: 'lastCurrencyAdded',
  LAST_RATES_UPDATED: 'LAST_RATES_UPDATED',
  EXCHANGE_RATES: (currency, homeCurrency) => `${currency}_to_${homeCurrency}`,
};

export const REGISTRATION_TYPE_DEFAULT = 'organisation';

export const USER_PREFERENCE = {
  DASH_BOARD_ACTIVITY: 'dashBoardActivityExpanded',
  DASH_BOARD_UP_NEXT: 'dashBoardUpNextExpanded',
  DASH_BOARD_INVITATION: 'dashBoardInvitationExpanded',
  DASH_BOARD_FEATURED_TOURS: 'dashBoardFeaturedToursExpanded',
  BOOL_VALUE: 'true',
  PREFERRED_DISTANCE_MEASUREMENT: 'preferredDistanceMeasurement',
};

export const FLIGHT_TRAVEL_CLASSES = {
  ECONOMY: {
    children: 'Economy',
    value: 'Economy',
  },
  PREMIUM_ECONOMY: {
    children: 'Premium Economy',
    value: 'PremiumEconomy',
  },
  BUSINESS_CLASS: {
    children: 'Business',
    value: 'Business',
  },
  FIRST_CLASS: {
    children: 'First',
    value: 'First',
  },
  OTHER: {
    children: 'Other',
    value: 'Other',
  },
};

export const FLIGHT_TRAVEL_CLASSES_OPTIONS = [
  FLIGHT_TRAVEL_CLASSES.ECONOMY,
  FLIGHT_TRAVEL_CLASSES.PREMIUM_ECONOMY,
  FLIGHT_TRAVEL_CLASSES.BUSINESS_CLASS,
  FLIGHT_TRAVEL_CLASSES.FIRST_CLASS,
  FLIGHT_TRAVEL_CLASSES.OTHER,
];

export const PRIVACY_OPTIONS = [
  {
    children: '[Select who can see this tab]',
    value: '',
  },
  {
    children: `Public: Everyone in this tour`,
    value: 'public',
  },
  {
    children: 'Organisers: Tour owner and organisers',
    value: 'organisers',
  },
  {
    children: 'Private: Only me',
    value: 'onlyMe',
  },
];

export const FLIGHT_TRAVEL_CLASSES_MAP = {
  Economy: 'Economy',
  PremiumEconomy: 'Premium Economy',
  Business: 'Business',
  First: 'First',
  Other: 'Other',
};

export const GOOGLE_TRAVEL_MODES = {
  CYCLING: 'cycling',
  DRIVING: 'driving',
};

// Node Store items
export const NODE_STORE_ITEM = {
  FEATURED_TOURS: 'featuredTours',
};
export const HUMANIZE_DURATION_CONSTANT = {
  units: ['d'],
  round: true,
};

export const VIEW_MODE = 'viewMode';
export const VIEW_MODE_COPY = 'VIEW_MODE_COPY';
export const INLINE_EDIT_MODE = 'inlineEditMode';
export const ADVANCED_EDIT_MODE = 'advancedEditMode';

export const SECONDARY = 'secondary';

// node properties
export const LOCATION = 'location';
export const DESCRIPTION = 'description';
export const SUB_TITLE = 'subtitle';
export const ORGANISATION_ID = 'organisationId';
export const NOTES = 'notes';
export const IS_PRIVATE = 'isPrivate';

export const NODE_PROPS = [
  CONTENT,
  SUB_TITLE,
  DESCRIPTION,
  LOCATION,
  ORGANISATION_ID,
  URL,
  IS_PRIVATE,
];

export const PREVIOUS = 'previous';

export const UPCOMING = 'upcoming';
export const ACTIVE = 'active';
export const PAST = 'past';
export const NODE_PROP = 'NodeProp';

export const FEEDBACK_EMAIL = 'hello@ugroop.com';

export const IPI_LOCATION_API = {
  locationSearch: 'http://ip-api.com/json',
};

export const STARRED = 'starred';
export const RECENT = 'recent';
export const FEATURED = 'featured';

export const TOUR_LIST_NAMES = [STARRED, RECENT, FEATURED];

export const TOUR_LISTS = {
  [STARRED]: {
    header: 'Starred',
    icon: 'lnr-star',
    color: 'star',
  },
  [RECENT]: {
    header: 'Recently viewed',
    icon: 'lnr-clock3',
    color: 'success',
  },
  [FEATURED]: {
    header: 'Featured Tours',
    icon: 'lnr-earth',
    color: 'blue',
  },
};

export const ORGANISATION_CARD = 'OrganisationCard';
export const INVITATION_CARD = 'InvitationCard';
export const UP_NEXT = 'UpNext';
export const TRANSFER_CARD = 'TransferCard';

export const HOME_NAMES = [
  ORGANISATION_CARD,
  INVITATION_CARD,
  TRANSFER_CARD,
  UP_NEXT,
];

export const HOME_CARDS = {
  [ORGANISATION_CARD]: {
    header: 'Organisation Invitations',
    icon: 'lnr-users-plus',
    color: 'success',
    adj: 'pending',
  },
  [INVITATION_CARD]: {
    header: 'Invitations',
    icon: 'lnr-user-plus',
    color: 'success',
    adj: 'pending',
  },
  [TRANSFER_CARD]: {
    header: 'Tour Ownership Transfer',
    icon: 'lnr-share3',
    color: 'success',
    adj: 'pending',
  },
  [UP_NEXT]: {
    header: 'Up Next',
    icon: 'lnr-clock3',
    color: 'success',
    adj: 'days',
  },
};

export const LINE = 'Line';
export const LOCAL_USER_STORE = 'LocalUserStore';
export const SUBSCRIPTION_INDIVIDUAL = 'Individual';
export const SUBSCRIPTION_ENTERPRISE = 'Enterprise';
export const SUBSCRIPTION_ENTERPRISE_TOUR = 'Enterprise-Tour';
export const PHOTO_PREVIEW = 'PHOTO_PREVIEW';
export const PHOTO_CARD = 'PHOTO_CARD';
export const ADD_ROUTE = 'ADD_ROUTE';
export const ADD_TOUR = 'ADD_TOUR';
export const ADD_RISK = 'ADD_RISK';
export const ADD_HAZARD = 'ADD_HAZARD';
export const ADD_ROOM = 'ADD_ROOM';
export const ADD_ROOM_PAX = 'ADD_ROOM_PAX';
export const VIEW_EVENT = 'VIEW_EVENT';
export const ADD_TAB = 'ADD_TAB';
export const ADD_EVENT = 'ADD_EVENT';
export const DATES_SELECT = 'DATES_SELECT';
export const POPPER_DIALOG = 'POPPER_DIALOG';
export const VIEW_RISK = 'VIEW_RISK';
export const VIEW_ROOM = 'VIEW_ROOM';
export const CREATE_CHAT_CHANNEL = 'CREATE_CHAT_CHANNEL';
export const EDIT_CHAT_DESCRIPTION = 'EDIT_CHAT_DESCRIPTION';
export const HIDE_CHAT_DESCRIPTION = 'HIDE_CHANNEL';
export const LEAVE_CHAT_DESCRIPTION = 'LEAVE_CHANNEL';
export const DELETE_CHAT_DESCRIPTION = 'DELETE_CHANNEL';
export const ADD_PEOPLE_IN_CHANNEL = 'ADD_PEOPLE_IN_CHANNEL';
export const CLONE_TEMPLATE = 'CLONE_TEMPLATE';
export const CREATE_TOUR_EMAIL = 'CREATE_TOUR_EMAIL';
export const TAB_PHOTO = 'TAB_PHOTO';
export const DROPPED_PHOTO = 'DROPPED_PHOTO';
export const AVATAR_AND_NAME = 'AVATAR_AND_NAME';
export const AVATAR_AND_NAME_TEXT = 'AVATAR_AND_NAME_TEXT';
export const UPLOADED = 'uploaded';
export const UPLOADING = 'uploading';
export const AWAITING = 'awaiting';
export const PREVIEW = 'Preview';
export const RECENTLY_UPLOADED = 'RECENTLY_UPLOADED';
export const LEAST_RECENTLY_UPLOADED = 'LEAST_RECENTLY_UPLOADED';
export const MOST_LIKED = 'mostLiked';
export const PHOTO_WITH_INFO = 'PHOTO_WITH_INFO';
export const PHOTO_WITHOUT_INFO = 'PHOTO_WITHOUT_INFO';
export const PROMPT = 'PROMPT';
export const UPLOAD_PHOTOS = 'UPLOAD_PHOTOS';
export const TOUR_ITINERARY = 'TOUR_ITINERARY';
export const STARTDATE = 'startDate';
export const WEEK_DAY = 'weekDay';

export const PRINT_PDF_FORM = 'printPdfForm';

export const COPY_PARTICIPANT = 'copyParticipant';
export const PARTICIPANT_LIST = 'participantList';

export const COPY_TAB_OTHER = 'copyTabOther';

export const HELP_DIALOG = 'helpDialog';

export const ADD_EDIT_INSURANCE = 'addEditInsurance';

export const SHOW_SYSTEM_UPDATE = 'showSystemUpdate';

export const DRIVING = 'DRIVING';
export const WALKING = 'WALKING';
export const BICYCLING = 'BICYCLING';

export const PUBLIC_LINK = {
  PUBLIC_TAB_MAP_LABEL: 'Maps',
};

export const STRIPE_FETCH_THRESHOLD = {
  CHARGES_GET_LIMIT: 100,
};
export const ISO8601 = 'YYYY-MM-DDTHH:mm:ssZ';
export const FREE_ORG_SEATS_THRESHOLD = 0;
export const DEFAULT_TAX_GST = 10;
export const NEGATIVE = -1;

export const SORT_FILTERS = {
  LATEST: 'latest',
  OLDEST: 'oldest',
  HIGHEST: 'highest',
  LOWEST: 'lowest',
};

export const MAP_VIEW = 'MAP_VIEW';
export const MAP_CARD = 'MAP_CARD';
export const RENDER_TIME = 'RENDER_TIME';
export const RENDER_LOCATION = 'RENDER_LOCATION';

export const TRANSIT = 'TRANSIT';
export const ROUTES = 'ROUTES';
export const TRANSPORTATION = 'Transportation';

export const TRAVEL_MODE_IDS = [DRIVING, TRANSIT, WALKING, BICYCLING];
export const TRAVEL_MODES = {
  [DRIVING]: {
    content: 'Driving',
    icon: 'lnr-car2',
  },
  [TRANSIT]: {
    content: 'Transit',
    icon: 'lnr-train',
  },
  [WALKING]: {
    content: 'Walking',
    icon: 'lnr-walk',
  },
  [BICYCLING]: {
    content: 'Bicycling',
    icon: 'lnr-bicycle2',
  },
};
export const TAB = 'tab';
export const ROUTE_CONTENT = 'ROUTE_CONTENT';
export const SELECT_ROUTE = 'SELECT_ROUTE';
export const ROUTE_DETAILS = 'ROUTE_DETAILS';
export const ROUTE_CARD = 'ROUTE_CARD';

// Caution: Requests using more than 10 waypoints,
// or waypoint optimization, are billed at a higher rate
// https://developers.google.com/maps/documentation/javascript/directions
export const WAYPOINTS_LIMIT = 12;

export const MARKER = 'MARKER';
export const POLYLINE = 'POLYLINE';
export const ROW = 'ROW';
export const CIRCLE = 'CIRCLE';
export const NOT_FOUND = 'NOT_FOUND';
export const ZERO_RESULTS = 'ZERO_RESULTS';
export const MAP = 'map';
export const SELECTING = 'SELECTING';
export const SELECTED = 'SELECTED';
export const DIALOG = 'DIALOG';
export const MANAGE_TABS = 'MANAGE_TABS';

export const MODE_CONSTANTS = {
  CREATED_AT: 'createdAt',
  CONNECTED: 'connected',
  INVITE: 'invite',
};

export const MODE_CONSTANTS_VALUES = {
  [MODE_CONSTANTS.CREATED_AT]: 'Show All',
  [MODE_CONSTANTS.CONNECTED]: 'Show Connected',
  [MODE_CONSTANTS.INVITE]: 'Show Pending',
};

export const SORT_CONSTANTS = {
  CREATED_AT: 'createdAt',
  NAME: 'name',
  MEDICALS: 'medicals',
  LAST_NAME: 'lastName',
  LAST_SEEN: 'lastSeen',
  MOST_LIKES: 'mostLikes',
  KNOWN_AS: 'knownAs',
  TYPE: 'type',
};

export const SORT_CONSTANTS_VALUES = {
  [SORT_CONSTANTS.CREATED_AT]: 'Created At',
  [SORT_CONSTANTS.NAME]: 'Name',
  [SORT_CONSTANTS.MEDICALS]: 'Medicals',
  [SORT_CONSTANTS.LAST_NAME]: 'Last Name',
  [SORT_CONSTANTS.LAST_SEEN]: 'Last Seen',
  [SORT_CONSTANTS.MOST_LIKES]: 'Most Likes',
};

export const LAYOUT_CONSTANTS = {
  SIMPLE_VIEW: 'simpleView',
  DETAILED_VIEW: 'detailedView',
};

export const LAYOUT_CONSTANTS_VALUES = {
  [LAYOUT_CONSTANTS.SIMPLE_VIEW]: 'Simple View',
  [LAYOUT_CONSTANTS.DETAILED_VIEW]: 'Detailed View',
};

export const PARTICIPANT_MODE_VALUES = {
  [INVITE]: 'Show Invitations',
  [PERSON_TYPE]: 'Show People',
};

export const REACTION_LIST = {
  LIKE: 'like',
};

export const USER_ACTION_LIST = {
  REACT: 'reaction',
};

export const INTERCOM = {
  APP_ID: process.env.INTERCOM_APP_ID,
  USER_ID_PREFIX: process.env.INTERCOM_USER_ID_PREFIX,
  ORG_TYPE_PERSONAL: 'personal',
};

export const HIDDEN = 'HIDDEN';

export const MENU_ITEM = 'MENU_ITEM';
export const TOUR_INVITATION_TYPE = {
  TRANSFER: 'transfers',
  SHARE: 'shares',
};
export const TOUR_INVITATION_VIEW = {
  TEMPLATE: 'template',
};
export const SUBSCRIPTION_PLAN_TYPE = {
  ORG_SEAT: 'orgseat',
  TOUR_SEAT: 'tourseat',
  INDIVIDUAL_SEAT: 'individualseat',
  CHANGE_DURATION: 'changeDuration',
};

export const SUBSCRIPTION_FREE_TOUR_PLANS = [
  'Free-TourPlan',
  'Free-TourPlan-Yearly',
];

export const SUBSCRIPTION_FREE_PLANS = ['Yearly Free', 'Monthly Free'];

export const DENY_ACCESS_REASON = {
  INSUFFICIENT_CONTRIBUTOR_SEAT: 'insufficientContributorSeat',
  INSUFFICIENT_TOUR_SEAT: 'insufficientTourSeat',
  NO_SUBSCRIPTION: 'noSubscription',
  NO_ORG_BILLING_ACCESS: 'noOrgBillingAccess',
  NO_PERSON_BILLING_ACCESS: 'noPersonBillingAccess',
};

export const SUBSCRIPTION_PLANS = {
  FREE: {
    value: 1.5,
  },
};

export const COUPON_MODE = {
  REPEATING: 'repeating',
  FOREVER: 'forever',
  ONCE: 'once',
};

export const ORG_SEAT_LABEL = 'team seat';
export const DOUBLE_CARD = 'DOUBLE_CARD';
export const SMALL_BADGE = 'SMALL_BADGE';

export const MAX_FILE_SIZE = 10485760; // In bytes: 10mb

export const DEFAULT_REMINDER_FREQUENCY_DAYS = '1';
export const DEFAULT_REMINDER_ATTEMPTS = '5';
export const DEFAULT_REMINDER_DISABLED = '0';
export const DEFAULT_SEEMORE_DISABLED = '1';

export const PEOPLE_TAB_OPTIONS = {
  ALL_CONTRIBUTORS: 'allContributors',
  ONLY_ORGANISERS: 'onlyOrganisers',
  ONLY_CONTRIBUTORS: 'onlyContributors',
  ONLY_VIEWERS: 'onlyViewers',

  ALL_PARTICIPANTS: 'allParticipants',
  GOING_PARTICIPANTS: 'goingParticipants',
  MAYBE_PARTICIPANTS: 'maybeParticipants',
  NOT_GOING_PARTICIPANTS: 'notGoingParticipants',

  ALL_FOLLOWERS: 'allFollowers',
  ONLY_FOLLOWING: 'onlyFollowing',
  ONLY_NOT_FOLLOWING: 'onlyNotFollowing',
};

export const PEOPLE_FILTERS = {
  CONTRIBUTORS: 'contributorsFilter',
  PARTICIPANTS: 'participantsFilter',
  FOLLOWER: 'followersFilter',
};

export const INVITATION_MODE = {
  BY_ORG: 'byOrgMemberList',
  BY_EMAIL: 'byEmail',
};

export const ADD_CHECKLIST = 'ADD_CHECKLIST';
export const GOOGLE_API_DEBOUNCE_MS = 500;

export const RELATIONSHIPS = {
  FATHER: 'father',
  MOTHER: 'mother',
  SIBLING: 'sibling',
  GUARDIAN: 'guardian',
  OTHER: 'other',
};

export const EMERGENCY_CONTACT_VALUES = {
  YES: 'Yes',
  NO: 'No',
};

export const NON_OTHER_RELATIONSHIPS = [
  RELATIONSHIPS.FATHER,
  RELATIONSHIPS.MOTHER,
  RELATIONSHIPS.SIBLING,
  RELATIONSHIPS.GUARDIAN,
];

export const RTE_IMAGE_ACCEPT = 'image/*';
export const Category = {
  CheckList: 'Checklist',
  FeaturedTours: 'Featured Tours',
};

export const ROOM_SINGLE = 'Single';
export const ROOM_DOUBLE = 'Double';
export const ROOM_TWIN = 'Twin';
export const ROOM_TRIPLE = 'Triple';
export const ROOM_OTHERS = 'Others';
export const ROOM_TYPES = {
  [ROOM_SINGLE]: { guestCount: 1, bedCount: 1 },
  [ROOM_DOUBLE]: { guestCount: 2, bedCount: 1 },
  [ROOM_TWIN]: { guestCount: 2, bedCount: 2 },
  [ROOM_TRIPLE]: { guestCount: 3, bedCount: 3 },
  [ROOM_OTHERS]: { guestCount: 0, bedCount: 0 },
};
export const DEFAULT_ROOM_FILTER = 'All Rooms';

export const DEFAULT_AGE_TYPE = 'Adult';

export const DEFAULT_MAILTO_LINK_TEXT = 'Click link to view';
export const TourFrom = {
  PERSONAL: 'PERSONAL',
  ORGANISATION: 'ORGANISATION',
};

export const ROOM_FIELS = {
  ROOM_TYPE: 'roomType',
};

export const UGROOP_TRIP_SUBDOMAIN = 'trips.ugroop.com';
export const LIST_VIEW = 'LIST_VIEW';
export const CARD_VIEW = 'CARD_VIEW';
export const GRID_VIEW = 'GRID_VIEW';

export const RANGE_FILTERS = {
  THIS_WEEK: 'this_week',
  THIS_MONTH: 'this_month',
  THIS_YEAR: 'this_year',
};

export const RANGE_FILTERS_LABEL_MAPPING = {
  this_week: 'This Week',
  this_month: 'This Month',
  this_year: 'This Year',
};

export const PRINT_ORIENTATION = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
};

export const TAB_ACTION = {
  MOVE: 'move',
  COPY: 'copy',
};
export const SECTION_ACTION = {
  MOVE: 'move',
  COPY: 'copy',
};
export const HELP_DIALOG_KEYS = {
  TAB_HELP: 'tabHelp',
  CONTRIBUTOR_HELP: 'contributorHelp',
  ORG_ROLE_HELP: 'orgRoleHelp',
};
export const HELP_DIALOG_ATTRIBUTES = {
  [HELP_DIALOG_KEYS.TAB_HELP]: {
    header: 'Tab Help',
    message:
      'Tabs provide a way of organising the whole itinerary into different parts and controlling who has access to this content',
    linkUrl: 'https://intercom.help/ugroop/en/articles/5490302-tab-help',
  },
  [HELP_DIALOG_KEYS.CONTRIBUTOR_HELP]: {
    header: 'Tour Connections Help',
    message:
      'Work together with teammates and service providers to build and manage this itinerary.',
    linkUrl:
      'https://intercom.help/ugroop/en/articles/5486830-contributors-help',
  },
  [HELP_DIALOG_KEYS.ORG_ROLE_HELP]: {
    header: 'Organisation Roles Help',
    message:
      'Your organisation is a shared space where team members can work together.',
    linkUrl:
      'https://intercom.help/ugroop/en/articles/5486830-contributors-help',
  },
};

export const ATTACHMENT_MODEL_NAME = 'data.eventAttachments';
export const NOT_APPLICABLE = 'n/a';

// list updated 19/07/2021
export const CURRENCY_LIST = {
  AED: 'United Arab Emirates Dirham',
  AFN: 'Afghan Afghani',
  ALL: 'Albanian Lek',
  AMD: 'Armenian Dram',
  ANG: 'Netherlands Antillean Guilder',
  AOA: 'Angolan Kwanza',
  ARS: 'Argentine Peso',
  AUD: 'Australian Dollar',
  AWG: 'Aruban Florin',
  AZN: 'Azerbaijani Manat',
  BAM: 'Bosnia-Herzegovina Convertible Mark',
  BBD: 'Barbadian Dollar',
  BDT: 'Bangladeshi Taka',
  BGN: 'Bulgarian Lev',
  BHD: 'Bahraini Dinar',
  BIF: 'Burundian Franc',
  BMD: 'Bermudan Dollar',
  BND: 'Brunei Dollar',
  BOB: 'Bolivian Boliviano',
  BRL: 'Brazilian Real',
  BSD: 'Bahamian Dollar',
  BTC: 'Bitcoin',
  BTN: 'Bhutanese Ngultrum',
  BWP: 'Botswanan Pula',
  BYN: 'Belarusian Ruble',
  BZD: 'Belize Dollar',
  CAD: 'Canadian Dollar',
  CDF: 'Congolese Franc',
  CHF: 'Swiss Franc',
  CLF: 'Chilean Unit of Account (UF)',
  CLP: 'Chilean Peso',
  CNH: 'Chinese Yuan (Offshore)',
  CNY: 'Chinese Yuan',
  COP: 'Colombian Peso',
  CRC: 'Costa Rican Colón',
  CUC: 'Cuban Convertible Peso',
  CUP: 'Cuban Peso',
  CVE: 'Cape Verdean Escudo',
  CZK: 'Czech Republic Koruna',
  DJF: 'Djiboutian Franc',
  DKK: 'Danish Krone',
  DOP: 'Dominican Peso',
  DZD: 'Algerian Dinar',
  EGP: 'Egyptian Pound',
  ERN: 'Eritrean Nakfa',
  ETB: 'Ethiopian Birr',
  EUR: 'Euro',
  FJD: 'Fijian Dollar',
  FKP: 'Falkland Islands Pound',
  GBP: 'British Pound Sterling',
  GEL: 'Georgian Lari',
  GGP: 'Guernsey Pound',
  GHS: 'Ghanaian Cedi',
  GIP: 'Gibraltar Pound',
  GMD: 'Gambian Dalasi',
  GNF: 'Guinean Franc',
  GTQ: 'Guatemalan Quetzal',
  GYD: 'Guyanaese Dollar',
  HKD: 'Hong Kong Dollar',
  HNL: 'Honduran Lempira',
  HRK: 'Croatian Kuna',
  HTG: 'Haitian Gourde',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  IMP: 'Manx pound',
  INR: 'Indian Rupee',
  IQD: 'Iraqi Dinar',
  IRR: 'Iranian Rial',
  ISK: 'Icelandic Króna',
  JEP: 'Jersey Pound',
  JMD: 'Jamaican Dollar',
  JOD: 'Jordanian Dinar',
  JPY: 'Japanese Yen',
  KES: 'Kenyan Shilling',
  KGS: 'Kyrgystani Som',
  KHR: 'Cambodian Riel',
  KMF: 'Comorian Franc',
  KPW: 'North Korean Won',
  KRW: 'South Korean Won',
  KWD: 'Kuwaiti Dinar',
  KYD: 'Cayman Islands Dollar',
  KZT: 'Kazakhstani Tenge',
  LAK: 'Laotian Kip',
  LBP: 'Lebanese Pound',
  LKR: 'Sri Lankan Rupee',
  LRD: 'Liberian Dollar',
  LSL: 'Lesotho Loti',
  LYD: 'Libyan Dinar',
  MAD: 'Moroccan Dirham',
  MDL: 'Moldovan Leu',
  MGA: 'Malagasy Ariary',
  MKD: 'Macedonian Denar',
  MMK: 'Myanma Kyat',
  MNT: 'Mongolian Tugrik',
  MOP: 'Macanese Pataca',
  MRO: 'Mauritanian Ouguiya (pre-2018)',
  MRU: 'Mauritanian Ouguiya',
  MUR: 'Mauritian Rupee',
  MVR: 'Maldivian Rufiyaa',
  MWK: 'Malawian Kwacha',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  MZN: 'Mozambican Metical',
  NAD: 'Namibian Dollar',
  NGN: 'Nigerian Naira',
  NIO: 'Nicaraguan Córdoba',
  NOK: 'Norwegian Krone',
  NPR: 'Nepalese Rupee',
  NZD: 'New Zealand Dollar',
  OMR: 'Omani Rial',
  PAB: 'Panamanian Balboa',
  PEN: 'Peruvian Nuevo Sol',
  PGK: 'Papua New Guinean Kina',
  PHP: 'Philippine Peso',
  PKR: 'Pakistani Rupee',
  PLN: 'Polish Zloty',
  PYG: 'Paraguayan Guarani',
  QAR: 'Qatari Rial',
  RON: 'Romanian Leu',
  RSD: 'Serbian Dinar',
  RUB: 'Russian Ruble',
  RWF: 'Rwandan Franc',
  SAR: 'Saudi Riyal',
  SBD: 'Solomon Islands Dollar',
  SCR: 'Seychellois Rupee',
  SDG: 'Sudanese Pound',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  SHP: 'Saint Helena Pound',
  SLL: 'Sierra Leonean Leone',
  SOS: 'Somali Shilling',
  SRD: 'Surinamese Dollar',
  SSP: 'South Sudanese Pound',
  STD: 'São Tomé and Príncipe Dobra (pre-2018)',
  STN: 'São Tomé and Príncipe Dobra',
  SVC: 'Salvadoran Colón',
  SYP: 'Syrian Pound',
  SZL: 'Swazi Lilangeni',
  THB: 'Thai Baht',
  TJS: 'Tajikistani Somoni',
  TMT: 'Turkmenistani Manat',
  TND: 'Tunisian Dinar',
  TOP: "Tongan Pa'anga",
  TRY: 'Turkish Lira',
  TTD: 'Trinidad and Tobago Dollar',
  TWD: 'New Taiwan Dollar',
  TZS: 'Tanzanian Shilling',
  UAH: 'Ukrainian Hryvnia',
  UGX: 'Ugandan Shilling',
  USD: 'United States Dollar',
  UYU: 'Uruguayan Peso',
  UZS: 'Uzbekistan Som',
  VEF: 'Venezuelan Bolívar Fuerte (Old)',
  VES: 'Venezuelan Bolívar Soberano',
  VND: 'Vietnamese Dong',
  VUV: 'Vanuatu Vatu',
  WST: 'Samoan Tala',
  XAF: 'CFA Franc BEAC',
  XAG: 'Silver Ounce',
  XAU: 'Gold Ounce',
  XCD: 'East Caribbean Dollar',
  XDR: 'Special Drawing Rights',
  XOF: 'CFA Franc BCEAO',
  XPD: 'Palladium Ounce',
  XPF: 'CFP Franc',
  XPT: 'Platinum Ounce',
  YER: 'Yemeni Rial',
  ZAR: 'South African Rand',
  ZMW: 'Zambian Kwacha',
  ZWL: 'Zimbabwean Dollar',
};
export const CURRENCY_OPTIONS = [
  {
    value: '',
    children: 'Select Currency',
  },
  ...Object.keys(CURRENCY_LIST).map(key => ({
    value: key,
    children: `${key} - ${CURRENCY_LIST[key]}`,
  })),
];

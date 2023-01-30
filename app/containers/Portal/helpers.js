import {
  ADD_ROUTE,
  PHOTO_PREVIEW,
  MANAGE_TABS,
  PROMPT,
  UPLOAD_PHOTOS,
  USER_DATA_STORE,
  ADD_RISK,
  VIEW_RISK,
  ADD_HAZARD,
  CREATE_CHAT_CHANNEL,
  EDIT_CHAT_DESCRIPTION,
  ADD_PEOPLE_IN_CHANNEL,
  DATES_SELECT,
  POPPER_DIALOG,
  HIDE_CHAT_DESCRIPTION,
  LEAVE_CHAT_DESCRIPTION,
  DELETE_CHAT_DESCRIPTION,
  CLONE_TEMPLATE,
  VIEW_EVENT,
  ADD_ROOM,
  VIEW_ROOM,
  ADD_ROOM_PAX,
  CREATE_TOUR_EMAIL,
  ADD_EVENT,
  PRINT_PDF_FORM,
  ADD_TOUR,
  COPY_PARTICIPANT,
  PARTICIPANT_LIST,
  ADD_TAB,
  COPY_TAB_OTHER,
  SHOW_SYSTEM_UPDATE,
  HELP_DIALOG,
  ADD_EDIT_INSURANCE,
} from 'appConstants';
import { DATA_HELPERS } from 'datastore/utils';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { STRING_HELPERS } from 'utils/stringAdditions';

const openPortal = type => (
  portalProps,
  { resaga },
  portalId,
  now = Date.now(),
) => {
  const id = portalId || now;
  resaga.setValue({
    portalIds: DATA_HELPERS.arrayAdd(id),
    portalData: DATA_HELPERS.objectAdd({
      [id]: { type, ...portalProps },
    }),
  });

  return id;
};

const closePortal = (id, { resaga }) => {
  resaga.setValue({
    portalIds: DATA_HELPERS.arrayRemove(id),
    portalData: DATA_HELPERS.objectRemove(id),
  });
};

// convenience functions, optional, can call openPortal(TYPE)(...props) instead
const openAddRoute = openPortal(ADD_ROUTE);
const openAddRisk = openPortal(ADD_RISK);
const openAddHazard = openPortal(ADD_HAZARD);
const openAddRoom = openPortal(ADD_ROOM);
const openAddRoomPax = openPortal(ADD_ROOM_PAX);
const openCreateChatChannel = openPortal(CREATE_CHAT_CHANNEL);
const openEditChatChannel = openPortal(EDIT_CHAT_DESCRIPTION);
const openAddPeopleInChannel = openPortal(ADD_PEOPLE_IN_CHANNEL);
const openArchiveChannelDialog = openPortal(HIDE_CHAT_DESCRIPTION);
const openLeaveChannelDialog = openPortal(LEAVE_CHAT_DESCRIPTION);
const openDeleteChannelDialog = openPortal(DELETE_CHAT_DESCRIPTION);
const openViewEvent = (portalProps, props, portalId, now) =>
  openPortal(VIEW_EVENT)(
    { flightBookingId: null, id: null, selectedId: null, ...portalProps },
    props,
    portalId,
    now,
  );
const openAddTab = openPortal(ADD_TAB);
const openAddEvent = openPortal(ADD_EVENT);
const openAddTour = openPortal(ADD_TOUR);
const openDatesSelect = openPortal(DATES_SELECT);
const openPopperDialog = openPortal(POPPER_DIALOG);
const openViewRisk = openPortal(VIEW_RISK);
const openViewRoom = openPortal(VIEW_ROOM);
const openPhotoPreview = openPortal(PHOTO_PREVIEW);
const openUploadPhotos = openPortal(UPLOAD_PHOTOS);
const openManageTabs = openPortal(MANAGE_TABS);
const prompt = openPortal(PROMPT);
const openCloneMarketTemplate = openPortal(CLONE_TEMPLATE);
const openCreateTourEmail = openPortal(CREATE_TOUR_EMAIL);
const DANGER = 'delete';
const openPrintPdfForm = openPortal(PRINT_PDF_FORM);
const openCopyParticipant = openPortal(COPY_PARTICIPANT);
const openParticipantList = openPortal(PARTICIPANT_LIST);
const openCopyTabOther = openPortal(COPY_TAB_OTHER);
const openHelpDialog = openPortal(HELP_DIALOG);
const showSystemUpdate = openPortal(SHOW_SYSTEM_UPDATE);
const showAddEditInsurance = openPortal(ADD_EDIT_INSURANCE);

const confirmDeletePhoto = ({ count, onConfirm }, props) =>
  PORTAL_HELPERS.prompt(
    {
      template: DANGER,
      closeOnConfirm: false,
      onConfirm,
      simplifyDialog: true,
      headlineText: (
        <>
          Are you sure you want to delete{' '}
          {LOGIC_HELPERS.ifElse(
            count > 1,
            `the selected ${STRING_HELPERS.pluralise('image', count)}`,
            'this image',
          )}
          ?
        </>
      ),
      dialogTitle: `Delete ${STRING_HELPERS.pluralise('Image', count)}`,
      confirmButton: LOGIC_HELPERS.ifElse(
        count > 1,
        `Delete ${count} Selected ${STRING_HELPERS.pluralise('Image', count)}`,
        'Delete',
      ),
      cancelButton: 'Go Back',
    },
    props,
  );

const confirmCancelUploadPhotos = ({ onConfirm }, props) => {
  PORTAL_HELPERS.prompt(
    {
      template: DANGER,
      onConfirm,
      simplifyDialog: true,
      headlineText: "If you discard now, you'll lose your progress.",
      dialogTitle: 'Discard Changes?',
      confirmButton: 'Discard',
      cancelButton: 'Go Back',
    },
    props,
  );
};

const promptEventAdded = ({ name, type = 'Event' }, props) => {
  PORTAL_HELPERS.prompt(
    {
      template: 'confirm',
      confirmation: true,
      simplifyDialog: true,
      headlineText: `${LOGIC_HELPERS.ifElse(
        name,
        `"${name}"`,
        type,
      )} has been added successfully.`,
      dialogTitle: 'Success',
      confirmButton: 'OK',
    },
    props,
  );
};

const confirmCancelAddRoute = ({ onConfirm }, props) => {
  PORTAL_HELPERS.prompt(
    {
      template: DANGER,
      onConfirm,
      simplifyDialog: true,
      headlineText: "If you discard now, you'll lose your progress.",
      dialogTitle: 'Success',
      confirmButton: 'OK',
    },
    props,
  );
};

const confirmDeleteRoute = ({ onConfirm }, props) =>
  PORTAL_HELPERS.prompt(
    {
      template: DANGER,
      closeOnConfirm: false,
      onConfirm,
      simplifyDialog: true,
      headlineText: 'Are you sure you want to delete this route?',
      dialogTitle: `Delete Route`,
      confirmButton: 'Delete',
      cancelButton: 'Go Back',
    },
    props,
  );

const confirmDeleteBooking = ({ onConfirm }, props) =>
  PORTAL_HELPERS.prompt(
    {
      template: DANGER,
      closeOnConfirm: false,
      onConfirm,
      simplifyDialog: true,
      headlineText: 'Are you sure you want to delete this flight itinerary?',
      dialogTitle: `Delete flight itinerary`,
      confirmButton: 'Delete',
      cancelButton: 'Go Back',
    },
    props,
  );

const confirmDelete = (
  {
    onConfirm,
    message,
    title,
    closeOnConfirm,
    confirmButton = 'Delete',
    cancelButton = 'Go Back',
  },
  props,
) =>
  PORTAL_HELPERS.prompt(
    {
      simplifyDialog: true,
      template: DANGER,
      closeOnConfirm,
      onConfirm,
      headlineText: message,
      dialogTitle: title,
      confirmButton,
      cancelButton,
    },
    props,
  );

const confirmCustom = (
  {
    onConfirm,
    message,
    title,
    closeOnConfirm,
    confirmButton = 'Continue',
    cancelButton = 'Go Back',
    template = 'confirm',
  },
  props,
) =>
  PORTAL_HELPERS.prompt(
    {
      simplifyDialog: true,
      template,
      closeOnConfirm,
      onConfirm,
      headlineText: message,
      dialogTitle: title,
      confirmButton,
      cancelButton,
    },
    props,
  );

const confirmCancelTransfer = ({ onConfirm }, props) =>
  PORTAL_HELPERS.prompt(
    {
      template: DANGER,
      closeOnConfirm: false,
      onConfirm,
      simplifyDialog: true,
      headlineText: 'Are you sure you want to cancel pending transfer?',
      dialogTitle: `Cancel Transfer of Ownership`,
      confirmButton: 'Continue',
      cancelButton: 'Go Back',
    },
    props,
  );
export const PORTAL_IDS_SELECTOR = [USER_DATA_STORE, 'portal', 'portalIds'];
export const PORTAL_DATA_SELECTOR = [USER_DATA_STORE, 'portal', 'portalData'];
export const PORTAL_DATA_ID_SELECTOR = ({ portalId }) => [
  USER_DATA_STORE,
  'portal',
  'portalData',
  portalId,
];
const setValue = {
  portalIds: PORTAL_IDS_SELECTOR,
  portalData: PORTAL_DATA_SELECTOR,
};

const close = ({ onClose, portalId }) => {
  LOGIC_HELPERS.ifFunction(onClose, [portalId]);
};

export const PORTAL_HELPERS = {
  openPhotoPreview,
  openAddRoute,
  openAddRisk,
  openAddHazard,
  openAddRoom,
  openAddRoomPax,
  openViewEvent,
  openAddTab,
  openAddEvent,
  openAddTour,
  openDatesSelect,
  openViewRisk,
  openViewRoom,
  openUploadPhotos,
  openManageTabs,
  openCreateChatChannel,
  openEditChatChannel,
  openAddPeopleInChannel,
  openArchiveChannelDialog,
  openLeaveChannelDialog,
  openDeleteChannelDialog,
  openCloneMarketTemplate,
  openCreateTourEmail,
  openPortal,
  closePortal,
  close,
  prompt,
  confirmDeletePhoto,
  confirmDeleteRoute,
  confirmDelete,
  confirmCancelUploadPhotos,
  promptEventAdded,
  confirmCancelAddRoute,
  setValue,
  confirmCancelTransfer,
  openPopperDialog,
  openPrintPdfForm,
  openCopyParticipant,
  confirmCustom,
  openParticipantList,
  openCopyTabOther,
  confirmDeleteBooking,
  openHelpDialog,
  showSystemUpdate,
  showAddEditInsurance,
};

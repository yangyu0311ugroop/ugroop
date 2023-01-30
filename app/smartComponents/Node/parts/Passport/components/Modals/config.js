import { USER_VIEW_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    passportCreateOpen: USER_VIEW_STORE_SELECTORS.PASSPORT.CREATE.open,
    passportCreatePersonId: USER_VIEW_STORE_SELECTORS.PASSPORT.CREATE.personId,

    passportViewOpen: USER_VIEW_STORE_SELECTORS.PASSPORT.VIEW.open,
    passportViewId: USER_VIEW_STORE_SELECTORS.PASSPORT.VIEW.id,
    passportViewReadOnly: USER_VIEW_STORE_SELECTORS.PASSPORT.VIEW.readOnly,
  },
  setValue: {
    passportCreateOpen: USER_VIEW_STORE_SELECTORS.PASSPORT.CREATE.open,
    passportCreatePersonId: USER_VIEW_STORE_SELECTORS.PASSPORT.CREATE.personId,
    passportCreateCreatedId:
      USER_VIEW_STORE_SELECTORS.PASSPORT.CREATE.createdId,

    passportViewOpen: USER_VIEW_STORE_SELECTORS.PASSPORT.VIEW.open,
    passportViewId: USER_VIEW_STORE_SELECTORS.PASSPORT.VIEW.id,
    passportViewReadOnly: USER_VIEW_STORE_SELECTORS.PASSPORT.VIEW.readOnly,
    passportViewDeletedId: USER_VIEW_STORE_SELECTORS.PASSPORT.VIEW.deletedId,
  },
};

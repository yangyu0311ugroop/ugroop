import { useImmer } from 'use-immer';

const defaultSortASC = 'EMAIL_ASC__LASTUPDATE_DESC__LASTNAME_ASC';
const defaultSortDES = 'EMAIL_DESC__LASTUPDATE_DESC__LASTNAME_ASC';
const lastUpdateSortDESC = 'LASTUPDATE_DESC__EMAIL_ASC__LASTNAME_ASC';
const lastUpdateSortASC = 'LASTUPDATE_ASC__EMAIL_ASC__LASTNAME_ASC';
const lastNameSortASC = 'LASTNAME_ASC__LASTUPDATE_DESC__EMAIL_ASC';
const lastNameSortDESC = 'LASTNAME_DESC__LASTUPDATE_DESC__EMAIL_ASC';

export function useParticipantSortState() {
  const [sortState, setSortState] = useImmer({
    options: [
      defaultSortASC,
      defaultSortDES,
      lastUpdateSortDESC,
      lastUpdateSortASC,
      lastNameSortASC,
      lastNameSortDESC,
    ],
    sortIndex: 0,
    label: [
      'Email Ascending',
      'Email Descending',
      'Recently updated',
      'Least recently updated',
      'Last Name Ascending',
      'Last Name Descending',
    ],
  });

  return {
    setSortState,
    sortState,
  };
}

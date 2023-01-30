import React, { useCallback } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { TextField } from '../../../../../../../../../../../../../ugcomponents/Form';
import { isEmptyString } from '../../../../../../../../../../../../../utils/stringAdditions';
import { useParticipantSearch } from '../../../../../../../../../../../../../hooks/useParticipantSearchHook';
/* eslint-disable no-param-reassign */
export const InputUser = {
  id: 'filterCondition',
  label: 'Find',
  placeholder: 'search via email or first name',
  required: false,
  autoFocus: false,
  validText: '',
  validations: {
    maxLength: 64,
  },
  validationErrors: {
    maxLength: 'max length 64 characters',
  },
  variant: 'outlined',
  size: 'small',
  name: 'password',
  autoComplete: 'off',
  type: 'text',
  'data-testid': 'findPaxSearch',
};
function FindPaxSearch(props) {
  const { setQueryLoading, orgId, queryName } = props;

  const {
    setSearchResult,
    searchResultState,
    setSearchQueryState,
  } = useParticipantSearch({
    setQueryLoading,
    queryName,
    itemsPerPage: 50,
  });

  const delayedQuery = useCallback(
    _.debounce(q => {
      if (isEmptyString(q)) {
        setSearchResult(draft => {
          draft.queryText = '';
          draft.searchData = [];
        });
      } else {
        setSearchQueryState(draft => {
          draft.filter = {
            and: [
              { orgid: { equalTo: orgId } },
              {
                or: [
                  { firstname: { startsWithInsensitive: q } },
                  { email: { startsWithInsensitive: q } },
                ],
              },
            ],
          };
        });
      }
      if (isEmptyString(q)) {
        setQueryLoading(false);
      }
    }, 500),
    [],
  );

  const textOnChanges = v => {
    if (!isEmptyString(v)) {
      setQueryLoading(true);
    }
    setSearchResult(draft => {
      draft.queryText = v;
    });
    delayedQuery(v);
  };

  return {
    searchPaxComponent: <TextField {...InputUser} onChange={textOnChanges} />,
    searchResultState,
    setSearchResult,
  };
}

FindPaxSearch.propTypes = {
  setQueryLoading: PropTypes.func,
  orgId: PropTypes.number,
};

export default FindPaxSearch;

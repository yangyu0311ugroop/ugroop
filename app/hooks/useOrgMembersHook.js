import { useSelector } from 'react-redux';
import { useImmer } from 'use-immer';
import { useEffect } from 'react';
import {
  MEMBER_ATTRIBUTE,
  ORG_DATASTORE_RESELECTORS,
  ORGROLE_ATTRIBUTE,
} from '../datastore/orgStore/selectorsViaConnect';
import { makeSingleSelect } from '../datastore/selectUtility';

function useOrgMembersHook(props) {
  const [localState, setlocalState] = useImmer({
    isPartOf: false,
  });
  // orgId and userId
  const userIds = useSelector(state =>
    JSON.stringify(
      makeSingleSelect(ORG_DATASTORE_RESELECTORS.getOrgRolesAttribute)(state, {
        id: props.orgId,
        attribute: ORGROLE_ATTRIBUTE.ACTIVATED,
      }),
    ),
  );

  const memberRole = useSelector(state =>
    makeSingleSelect(ORG_DATASTORE_RESELECTORS.getMemberAttribute)(state, {
      id: props.userId,
      attribute: MEMBER_ATTRIBUTE.ROLE,
    }),
  );

  const memberKnownAs = useSelector(state =>
    makeSingleSelect(ORG_DATASTORE_RESELECTORS.getMemberAttribute)(state, {
      id: props.userId,
      attribute: MEMBER_ATTRIBUTE.KNOWN_AS,
    }),
  );

  useEffect(() => {
    if (userIds) {
      const userIdArray = JSON.parse(userIds);
      if (userIdArray.includes(props.userId)) {
        setlocalState(draft => {
          // eslint-disable-next-line no-param-reassign
          draft.isPartOf = true;
        });
      }
    }
  }, [userIds, props.userId]);

  return {
    isPartOfOrg: localState.isPartOf,
    memberRole,
    memberKnownAs,
  };
}

export default useOrgMembersHook;

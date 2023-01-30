import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useImmer } from 'use-immer';
import { useHistory } from 'react-router-dom';
import querystring from 'querystring';
import { useSelector } from 'react-redux';
import RenderLiveSupport from './content';
import {
  selectCurrentUserAccount,
  selectCurrentLoginPerson,
} from '../../datastore/stormPathStore/selectors';
import { ORG_DATASTORE_RESELECTORS } from '../../datastore/orgStore/selectorsViaConnect';
import { makeSingleSelect } from '../../datastore/selectUtility';
import { USER_STORE_RESELECTORS } from '../../datastore/userStore/selectorsViaConnect';
import { NameUtility } from '../../utils/displayNameUtility';
import { isEmptyString } from '../../utils/stringAdditions';
const getCurrentTimestamp = () => new Date().toISOString();
/* eslint-disable no-param-reassign */
function LiveSupport(props) {
  let messenger = 'false';
  const { appId } = props;
  const [liveSupportState, setLiveSupportState] = useImmer({
    lastTimestamp: getCurrentTimestamp(),
  });

  const history = useHistory();
  const currentUser = useSelector(state => selectCurrentUserAccount()(state));
  const currentPerson = useSelector(state => selectCurrentLoginPerson()(state));
  useEffect(() => {
    if (currentUser) {
      setLiveSupportState(draft => {
        draft.lastTimestamp = getCurrentTimestamp();
      });
    }
  }, [currentUser]);
  const orgIds = useSelector(state =>
    makeSingleSelect(USER_STORE_RESELECTORS.selectUserDataAttribute)(state, {
      id: currentUser && currentUser.id,
      attribute: 'organisations',
    }),
  );
  const orgNames = useSelector(state =>
    ORG_DATASTORE_RESELECTORS.getOrgNameLists(state, {
      ids: JSON.stringify(orgIds),
    }),
  );

  const orgRoles = useSelector(state =>
    ORG_DATASTORE_RESELECTORS.getOrgRoleLists(state, {
      ids: JSON.stringify(orgIds),
    }),
  );

  const orgTypes = useSelector(state =>
    ORG_DATASTORE_RESELECTORS.getOrgTypeLists(state, {
      ids: JSON.stringify(orgIds),
    }),
  );

  if (history.location.search && history.location.search.startsWith('?')) {
    const qs = history.location.search.substr(1);
    const parms = querystring.parse(qs);

    if (parms.messenger) {
      messenger = `${parms.messenger}`;
    }
  }

  const userId = currentUser && currentUser.id;
  const email = currentUser && currentUser.email;
  const firstName = currentPerson && currentPerson.firstName;
  const lastName = currentPerson && currentPerson.lastName;
  const orgName = names => {
    const name = `${NameUtility.userDisplayName(currentPerson)}`;
    if (!isEmptyString(names)) {
      return name.concat(names);
    }
    return name;
  };
  const orgType = types => {
    const name = 'Personal';
    if (!isEmptyString(types)) {
      return name.concat(types);
    }
    return name;
  };
  const orgRole = roles => {
    const name = 'owner';
    if (!isEmptyString(roles)) {
      return name.concat(roles);
    }
    return name;
  };

  const orgId = ids => {
    const allIds = `${userId}`;
    if (!isEmptyString(ids)) {
      return allIds.concat(ids).replace(/([,])/g, '|');
    }
    return allIds;
  };
  if (messenger !== 'true' && appId) {
    return (
      <RenderLiveSupport
        lastTimestamp={liveSupportState.lastTimestamp}
        appId={appId}
        email={email}
        firstname={firstName}
        lastname={lastName}
        userId={userId}
        orgName={orgName(orgNames)}
        orgType={orgType(orgTypes)}
        orgRole={orgRole(orgRoles)}
        orgId={orgId(orgIds)}
      />
    );
  }

  return null;
}

LiveSupport.propTypes = {
  appId: PropTypes.string,
};

LiveSupport.defaultProps = {};

export default LiveSupport;

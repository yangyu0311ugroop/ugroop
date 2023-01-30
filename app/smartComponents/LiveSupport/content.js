import Intercom from 'react-intercom';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { INTERCOM } from '../../appConstants';
import { useGlobalContext } from '../../containers/App/globalStateContext';

function RenderLiveSupport(props) {
  const [globalState] = useGlobalContext();

  const {
    appId,
    email,
    firstname,
    lastname,
    userId,
    orgName,
    orgRole,
    orgType,
    orgId,
    lastTimestamp,
  } = props;
  useEffect(() => {}, [globalState.IntercomContext.hideIntercomButton]);
  if (globalState.IntercomContext.hideIntercomButton) {
    return null;
  }
  if (email) {
    const passProps = {
      appID: appId,
      email,
      user_id: `${INTERCOM.USER_ID_PREFIX}${userId}`,
      name: `${firstname} ${lastname}`,
      Last_Login: lastTimestamp,
      OrgName: orgName,
      OrgRole: orgRole,
      OrgType: orgType,
      OrgId: orgId,
    };
    return <Intercom {...passProps} />;
  }

  return <Intercom appID={appId} />;
}

RenderLiveSupport.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types

  // custom props
  appId: PropTypes.string,
  email: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  userId: PropTypes.number,
  orgList: PropTypes.string,
  orgName: PropTypes.string,
  orgRole: PropTypes.string,
  orgType: PropTypes.string,
  orgId: PropTypes.string,
  history: PropTypes.object.isRequired,
  lastTimestamp: PropTypes.string,
};

export default RenderLiveSupport;

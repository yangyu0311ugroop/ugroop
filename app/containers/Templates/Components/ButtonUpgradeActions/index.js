import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../../../viewComponents/Button';
import { isNumber } from '../../../../utils/numberAdditions';
import { DENY_ACCESS_REASON, URL_HELPERS } from '../../../../appConstants';
import { makeSingleSelect } from '../../../../datastore/selectUtility';
import { ORG_DATASTORE_RESELECTORS } from '../../../../datastore/orgStore/selectorsViaConnect';

export function ButtonUpgradeActions({ orgId, name, tourCreatedBy, userId }) {
  const history = useHistory();
  const location = useLocation();
  const orgOwnerId = useSelector(store =>
    makeSingleSelect(ORG_DATASTORE_RESELECTORS.getOrgAttribute)(store, {
      id: orgId,
      attribute: 'createdBy',
    }),
  );

  const userOrgId = useSelector(store =>
    makeSingleSelect(ORG_DATASTORE_RESELECTORS.getOrgUserAttribute)(store, {
      id: orgId,
      attribute: 'userId',
    }),
  );

  const role = useSelector(store =>
    makeSingleSelect(ORG_DATASTORE_RESELECTORS.getOrgUserAttribute)(store, {
      id: orgId,
      attribute: 'role',
    }),
  );

  const handleUpgradeRedirect = () => {
    if (isNumber(orgId)) {
      let orgOwner = orgOwnerId;
      if (!orgOwner && role === 'owner') {
        orgOwner = userOrgId;
      }
      if (orgOwner === userId) {
        history.push(`/orgs/${orgId}/settings/billings`);
      } else {
        history.push({
          pathname: URL_HELPERS.orgDenyAccess(orgId),
          state: {
            reason: DENY_ACCESS_REASON.NO_ORG_BILLING_ACCESS,
            fromPath: location.pathname,
          },
        });
      }
    } else if (tourCreatedBy === userId) {
      history.push(`/settings/billings`);
    } else {
      history.push({
        pathname: URL_HELPERS.personalDenyAccess(),
        search: `?userId=${tourCreatedBy}`,
        state: {
          reason: DENY_ACCESS_REASON.NO_PERSON_BILLING_ACCESS,
          fromPath: location.pathname,
        },
      });
    }
  };

  return (
    <Button dense size="small" color="base" onClick={handleUpgradeRedirect}>
      {name}
    </Button>
  );
}

ButtonUpgradeActions.propTypes = {
  orgId: PropTypes.number,
  userId: PropTypes.number,
  name: PropTypes.string,
  tourCreatedBy: PropTypes.number,
};

ButtonUpgradeActions.defaultProps = {};

export default React.memo(ButtonUpgradeActions);

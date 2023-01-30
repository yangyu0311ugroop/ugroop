import React from 'react';
import PropTypes from 'prop-types';
import { usePlanContext } from '../../context/planStateContext';
import RemoveOrgSeatPreviewDue from './newRemoveOrgSeatPreviewDue';
import AddOrgSeatPreviewDue from './newAddOrgSeatPreviewDue';
import { UPGRADE } from '../../../../appConstants';
function NewOrgSeatPreviewDue(props) {
  const {
    orgId,
    type,
    customerId,
    orgSeats,
    subscriptionItemIndex,
    renderSeatComponent,
  } = props;
  const [planState] = usePlanContext();
  if (planState.subscriptionProcess === UPGRADE) {
    return (
      <AddOrgSeatPreviewDue
        orgId={orgId}
        type={type}
        customerId={customerId}
        orgSeats={orgSeats}
        subscriptionItemIndex={subscriptionItemIndex}
        renderSeatComponent={renderSeatComponent}
      />
    );
  }
  return (
    <RemoveOrgSeatPreviewDue
      orgId={orgId}
      type={type}
      customerId={customerId}
      orgSeats={orgSeats}
      subscriptionItemIndex={subscriptionItemIndex}
      renderSeatComponent={renderSeatComponent}
    />
  );
}
NewOrgSeatPreviewDue.propTypes = {
  // parent props
  customerId: PropTypes.string,
  orgId: PropTypes.any,
  type: PropTypes.string,
  orgSeats: PropTypes.number,
  renderSeatComponent: PropTypes.func,
  subscriptionItemIndex: PropTypes.number,
};

export default React.memo(NewOrgSeatPreviewDue);

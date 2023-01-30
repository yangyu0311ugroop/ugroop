import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import _ from 'lodash';
import { withPopoverButtonHook } from '../../../../../ugcomponents/ButtonGroup/withPopoverButtonHoc';
import { SUBSCRIPTION_VIEW_STORE } from '../../../../../appConstants';
import { isEmptyString } from '../../../../../utils/stringAdditions';
import { isNumber } from '../../../../../utils/numberAdditions';
export const CONFIG = {
  value: {
    showPopover: ({ currentActiveScheduleId, subscriptionItemIndex }) => [
      SUBSCRIPTION_VIEW_STORE,
      'SUBSCRIPTIONS',
      currentActiveScheduleId,
      subscriptionItemIndex,
    ],
    hasPendingSubscription: ({ currentActiveScheduleId }) => [
      SUBSCRIPTION_VIEW_STORE,
      'SUBSCRIPTIONS',
      currentActiveScheduleId,
      'countArray',
    ],
  },
};

export function CurrentSubscriptionButton(props) {
  const { currentActiveScheduleId, ...rest } = props;
  const passProps = rest;
  if (isEmptyString(props.currentActiveScheduleId)) {
    passProps.showPopover = false;
  } else if (isNumber(props.subscriptionItemIndex)) {
    passProps.showPopover = props.showPopover;
  } else {
    const countArray = props.hasPendingSubscription;
    if (
      countArray &&
      countArray &&
      countArray.length > 0 &&
      _.findIndex(countArray, o => o === true) !== -1
    ) {
      passProps.showPopover = true;
    } else {
      passProps.showPopover = false;
    }
  }
  return props.buttonPopover(passProps);
}

CurrentSubscriptionButton.propTypes = {
  buttonPopover: PropTypes.func,
  currentActiveScheduleId: PropTypes.string,
  subscriptionItemIndex: PropTypes.number,
  hasPendingSubscription: PropTypes.array,
};

export default compose(
  withPopoverButtonHook,
  resaga(CONFIG),
)(CurrentSubscriptionButton);

import { useEffect } from 'react';
import { usePlanContext } from '../context/planStateContext';
import { DOWNGRADE, UPGRADE, CHANGE_DURATION } from '../../../appConstants';

export const useDetectSubscriptionProcess = props => {
  const [, dispatch] = usePlanContext();
  useEffect(() => {
    if (props.isChangeDuration) {
      dispatch.setSubscriptionProcessLabel(CHANGE_DURATION);
      if (props.isUpgrade) {
        dispatch.setSubscriptionProcess(UPGRADE);
      } else {
        dispatch.setSubscriptionProcess(DOWNGRADE);
      }
    } else if (props.isUpgrade) {
      dispatch.setSubscriptionProcessLabel(UPGRADE);
      dispatch.setSubscriptionProcess(UPGRADE);
    } else if (props.isDowngrade) {
      dispatch.setSubscriptionProcessLabel(DOWNGRADE);
      dispatch.setSubscriptionProcess(DOWNGRADE);
    }
  }, [props.isUpgrade, props.isDowngrade, props.isChangeDuration]);
};

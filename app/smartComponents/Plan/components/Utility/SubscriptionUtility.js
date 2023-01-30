import { usePlanContext } from '../../context/planStateContext';

export function getDisplayText() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [planState] = usePlanContext();
  return planState.subscriptionProcessLabel;
}

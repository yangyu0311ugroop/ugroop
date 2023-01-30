import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { selectCurrentUserAccount } from '../datastore/stormPathStore/selectors';
import { makeSelectNodeOwner } from '../datastore/nodeStore/selectorsViaConnect';
import { useGlobalContext } from '../containers/App/globalStateContext';

// eslint-disable-next-line no-unused-vars
export function useUserNodesInTours(props) {
  const [globalState] = useGlobalContext();
  const [isLoginUserPartOfTours, setLoginUserPartOfTours] = useState(false);
  const [isTourOwner, setIsTourOwner] = useState(false);
  const [isPassedUserPartOfTour, setIsPassedUserPartOfTour] = useState(false);
  const currentUser = useSelector(state => selectCurrentUserAccount()(state));
  const userNodes = _.uniq(
    globalState.BillingContext.tourConnectedPeople.map(o => o.userId),
  );
  const nodeOwnerId = useSelector(state =>
    makeSelectNodeOwner(state, { id: props.templateId }),
  );
  useEffect(() => {
    if (currentUser && userNodes) {
      if (
        userNodes.includes(currentUser.id) ||
        nodeOwnerId === currentUser.id
      ) {
        setLoginUserPartOfTours(true);
      }
      if (nodeOwnerId === currentUser.id) {
        setIsTourOwner(true);
      }
    }
    if (props.userId) {
      if (userNodes.includes(props.userId)) {
        setIsPassedUserPartOfTour(true);
      }
    }
  }, [currentUser, userNodes, nodeOwnerId, props.userId]);

  return {
    isLoginUserPartOfTours,
    userNodes,
    tourOwner: isTourOwner,
    isPassedUserPartOfTour,
  };
}

export default useUserNodesInTours;

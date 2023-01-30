// For the sake of old components that not yet convert into hooks
import React from 'react';
import Editable from 'viewComponents/Editable';
import GridItem from '../../../../../../components/GridItem';
import InviteeByUserNode from './index';
import { useGlobalContext } from '../../../../../App/globalStateContext';
function InviteeByUserNodeWrapper(props) {
  const [globalState] = useGlobalContext();
  const { id, handleEditableClick } = props;
  const tourConnectPeople = globalState.BillingContext.tourConnectedPeople;
  return tourConnectPeople
    .filter(o => o.userId)
    .map((p, index) => (
      <GridItem key={p.id}>
        <Editable onClick={handleEditableClick(p.userId)}>
          <InviteeByUserNode
            templateId={id}
            userNodeId={p.id}
            index={index}
            content={p.content}
            role={p.role}
            userId={p.userId}
            email={p.email}
          />
        </Editable>
      </GridItem>
    ));
}

export default InviteeByUserNodeWrapper;

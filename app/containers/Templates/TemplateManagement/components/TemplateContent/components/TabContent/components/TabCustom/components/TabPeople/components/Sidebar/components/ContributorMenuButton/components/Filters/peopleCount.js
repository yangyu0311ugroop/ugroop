import React from 'react';
import GridItem from '../../../../../../../../../../../../../../../../../components/GridItem';
import Badge from '../../../../../../../../../../../../../../../../../viewComponents/Badge';
import { VARIANTS } from '../../../../../../../../../../../../../../../../../variantsConstants';
import { useGlobalContext } from '../../../../../../../../../../../../../../../../App/globalStateContext';
import { TOUR_CONTRIBUTOR_ROLE } from '../../../../../../../../../../../../../../../../../apis/components/Ability/roles';

function PeopleCount(props) {
  const { selectedRole } = props;
  const [globalState] = useGlobalContext();
  const connectedTourPeople = globalState.BillingContext.tourConnectedPeople;
  const lists = connectedTourPeople.filter(
    o => selectedRole.includes(o.role) && o.userId,
  );
  const renderCount = count => {
    if (count === 0) return null;
    return (
      <GridItem>
        <Badge variant={VARIANTS.SQUARE}>{count}</Badge>
      </GridItem>
    );
  };
  let count = lists.length;
  if (selectedRole.includes(TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER)) {
    count += 1;
  }
  return renderCount(count);
}

export default PeopleCount;

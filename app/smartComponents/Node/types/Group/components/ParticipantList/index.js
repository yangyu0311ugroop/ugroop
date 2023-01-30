import {
  LINK_STORE_RESELECTORS,
  NODE_STORE_RESELECTORS,
} from 'datastore/nodeStore/selectorsViaConnect';
import GridContainer from 'components/GridContainer';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Participant from 'smartComponents/Node/types/Participant';
import zip from 'lodash/zip';
import { SORT_HELPERS } from 'utils/sorter';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';

import NoParticipantPlaceholder from '../NoParticipantPlaceholder';

const useParticipantData = id => {
  const participantLinks = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeParticipants(state, id),
  );
  const participantIds = useSelector(state =>
    LINK_STORE_RESELECTORS.getLinkPrevNodeIds(state, participantLinks),
  );

  const idsWithStatus = useSelector(state =>
    NODE_STORE_RESELECTORS.getParticipantsIdByStatus(state, participantIds),
  );

  return idsWithStatus;
};

const useParticipantSorter = ids => {
  // const sortMode = useSelector(state =>
  //   TEMPLATE_VIEWSTORE_RESELECTORS.getSortMode(state),
  // );
  const names = useSelector(state =>
    NODE_STORE_RESELECTORS.getParticipantsFirstNameByIds(state, ids),
  );
  const idsWithNames = zip(ids, names);
  const sorted = idsWithNames
    .sort(SORT_HELPERS.sortArrayItems())
    .map(([id]) => id);

  return sorted;
};

export const ParticipantList = props => {
  const { id } = props;
  const participantIds = useParticipantData(id);
  const sortedIds = useParticipantSorter(participantIds);

  if (sortedIds.length === 0) return <NoParticipantPlaceholder />;

  return (
    <GridContainer direction="column">
      {sortedIds.map(participantId => (
        <Participant {...props} id={participantId} />
      ))}
    </GridContainer>
  );
};

ParticipantList.propTypes = {
  id: PropTypes.number,
};

export default withSMDown(ParticipantList);

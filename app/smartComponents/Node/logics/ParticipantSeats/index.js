import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import Name from 'smartComponents/Node/parts/Name';
import { VARIANTS } from 'variantsConstants';
import P from 'viewComponents/Typography';

import {
  CONFIG,
  GET_PARENT_NODE_ID,
  FILTER_CONFIRMED_PARTICIPANTS,
  FILTER_PARTICIPANTS_WITH_NO_SEATS,
  GET_EVENT_FLIGHT_SEATS,
  FILTER_PARTICIPANTS_WITH_SEATS,
} from './config';

export const avatarProps = {
  xxs: false,
  xs: true,
  sm: false,
};

export const PersonAvatarProps = {
  imageSize: IMAGE_SIZES_CONSTANTS.XXS,
};

export const generateOptions = id => ({
  children: (
    <GridContainer alignItems="center">
      <GridItem>
        <Name
          AvatarProps={avatarProps}
          id={id}
          variant={VARIANTS.AVATAR}
          PersonAvatarProps={PersonAvatarProps}
        />
      </GridItem>
      <GridItem>
        <P dense>
          <Name id={id} />
        </P>
      </GridItem>
    </GridContainer>
  ),
  value: id,
});

// TODO: Add the user id as well for participant in case the participant registers
export const ParticipantSeats = ({
  filteredIds,
  participantWithSeats,
  participantWithoutSeats,
  children,
}) => {
  let data = [
    {
      children: (
        <GridContainer alignItems="center">
          <GridItem>
            <P dense>None</P>
          </GridItem>
        </GridContainer>
      ),
      value: 0,
    },
  ];

  if (Array.isArray(filteredIds)) {
    if (participantWithoutSeats.length > 0) {
      data = [
        ...data,
        {
          children: (
            <GridContainer alignItems="center">
              <GridItem>
                <P dense weight="bolder" subtitle>
                  Participants without seats
                </P>
              </GridItem>
            </GridContainer>
          ),
          value: -1,
          disabled: true,
        },
        ...participantWithoutSeats.map(generateOptions),
      ];
    }

    if (participantWithSeats.length > 0) {
      data = [
        ...data,
        {
          children: (
            <GridContainer alignItems="center">
              <GridItem>
                <P dense weight="bolder" subtitle>
                  Participants with seats
                </P>
              </GridItem>
            </GridContainer>
          ),
          value: -2,
          disabled: true,
        },
        ...participantWithSeats.map(generateOptions),
      ];
    }
  }

  return children(data);
};

ParticipantSeats.propTypes = {
  // hoc props

  // parent props
  id: PropTypes.number,
  children: PropTypes.func,

  // resaga props
  participantIds: PropTypes.array,
  userId: PropTypes.array,
  filteredIds: PropTypes.array,
  participantWithSeats: PropTypes.array,
  participantWithoutSeats: PropTypes.array,
};

ParticipantSeats.defaultProps = {
  filteredIds: [],
  participantWithSeats: [],
  participantWithoutSeats: [],
};

export default compose(
  resaga(GET_PARENT_NODE_ID),
  resaga(CONFIG),
  resaga(FILTER_CONFIRMED_PARTICIPANTS),
  resaga(GET_EVENT_FLIGHT_SEATS),
  resaga(FILTER_PARTICIPANTS_WITH_NO_SEATS),
  resaga(FILTER_PARTICIPANTS_WITH_SEATS),
)(React.memo(ParticipantSeats));

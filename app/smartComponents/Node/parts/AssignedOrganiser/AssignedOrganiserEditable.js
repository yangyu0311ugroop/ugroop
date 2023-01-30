import { NODE_API, UPDATE_NODE } from 'apis/constants';
import { INVITATION_STORE_RESELECTORS } from 'datastore/invitationStore/selectorsViaConnect';
import { NODE_STORE_RESELECTORS } from 'datastore/nodeStore/selectorsViaConnect';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import withResaga from 'resaga';

import Popper from 'components/Popper';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import MenuItem from 'components/Popper/components/MenuItem';
import { AssignedOrganiserInfo } from 'smartComponents/Node/parts/AssignedOrganiser/AssignedOrganiserInfo';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';

const useStyles = makeStyles(() => ({
  root: {},
  btn: {
    textAlign: 'left',
  },
}));

export const AssignedOrganiserEditable = memo(
  withResaga()(({ id, resaga, templateId }) => {
    const classes = useStyles();
    const organisers = useSelector(state =>
      INVITATION_STORE_RESELECTORS.getTourOrganisersUserIds(state, id),
    );
    const owner = useSelector(state =>
      NODE_STORE_RESELECTORS.getCreatedBy(state, id),
    );
    const assignedOrganiserId = useSelector(state =>
      NODE_STORE_RESELECTORS.getAssignedOrganiser(state, id),
    );
    const createdBy = useSelector(state =>
      NODE_STORE_RESELECTORS.getCreatedBy(state, id),
    );
    const assignableIds = [owner, ...organisers];
    const buttonContent = LOGIC_HELPERS.ifElse(
      assignedOrganiserId,
      <AssignedOrganiserInfo
        templateId={templateId}
        id={assignedOrganiserId}
      />,
      <AssignedOrganiserInfo templateId={templateId} id={createdBy} />,
    );

    const handleMenuClick = userId => () => {
      resaga.dispatchTo(NODE_API, UPDATE_NODE, {
        payload: {
          nodeId: id,
          node: {
            customData: {
              assignedOrganiserId: userId,
            },
          },
        },
      });
    };

    // eslint-disable-next-line react/prop-types
    const renderButton = ({ openMenu }) => (
      <GridContainer>
        <GridItem>{buttonContent}</GridItem>
        <GridItem>
          <Button
            variant={VARIANTS.BORDERLESS}
            size="xs"
            color="black"
            onClick={openMenu}
            className={classes.btn}
          >
            <GridContainer data-testid="inviteeTestId">
              <GridItem>
                <Icon icon="lnr-chevron-down" size="xsmall" />
              </GridItem>
            </GridContainer>
          </Button>
        </GridItem>
      </GridContainer>
    );

    // eslint-disable-next-line react/prop-types
    const renderPopperContent = ({ closeMenu }) => (
      <GridContainer direction="column">
        {assignableIds.map(assignableId => (
          <GridItem key={assignableId}>
            <MenuItem
              onClick={handleMenuClick(assignableId)}
              closeMenu={closeMenu}
            >
              <AssignedOrganiserInfo
                templateId={templateId}
                id={assignableId}
              />
            </MenuItem>
          </GridItem>
        ))}
      </GridContainer>
    );

    return (
      <Popper
        placement="bottom-end"
        renderButton={renderButton}
        stopPropagation
      >
        {renderPopperContent}
      </Popper>
    );
  }),
);

AssignedOrganiserEditable.propTypes = {
  resaga: PropTypes.object.isRequired,

  id: PropTypes.number,
};

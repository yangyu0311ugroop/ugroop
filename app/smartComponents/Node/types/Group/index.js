// import { ability } from 'apis/components/Ability/ability';
import { CONTENT, HEADING, LINK, MENU_ITEM } from 'appConstants';
import JText from 'components/JText';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Hr from 'components/Hr';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import CreatedAt from 'smartComponents/Node/parts/CreatedAt';
import Icon from 'ugcomponents/Icon';
import Button from 'viewComponents/Button';
import Popper from 'components/Popper';
import { Can } from 'apis/components/Ability/components/Can';
import { PARTICIPANT } from 'utils/modelConstants';
import MenuItem from 'components/Popper/components/MenuItem';

import TravelingWithDialog from '../../parts/TravelingWith/components/EditableTravelingWith/components/TravelingWithDialog';
import ParticipantList from './components/ParticipantList';
import DeleteGroupButton from './components/DeleteGroupButton';

// import AddParticipantButton from './components/AddParticipantButton';

const useStyles = makeStyles(() => ({
  root: {},
  header: {},
  actionButton: {
    background: 'white',
    boxShadow: 'unset',
    // borderLeft: '1px solid #dbdee4',
    color: '#4c5673',
    minHeight: 33,
    padding: '4px 12px',
    borderRadius: 'unset',
    wordBreak: 'keep-all',

    '&:hover': {
      background: '#ebedf0',
    },
  },
  more: {
    padding: '0px !important',
  },
}));

export const Group = props => {
  const [openDialog, setOpenDialog] = useState(false);
  const { id } = props;
  const classes = useStyles();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const renderDeleteGroup = () => (
    <DeleteGroupButton id={id} variant={LINK} label="Delete Group" />
  );

  const renderMoreButton = parm => (
    <Button
      dense
      noPadding
      size="extraSmall"
      color="black"
      className={classes.actionButton}
      onClick={parm.openMenu}
      tooltipProps={{
        title: 'More options',
      }}
    >
      <Icon icon="lnr-ellipsis" size="small" />
    </Button>
  );

  const renderMorePopper = parm => (
    <GridContainer direction="column" spacing={0}>
      <Can do="create" on={PARTICIPANT}>
        <GridItem>
          <DeleteGroupButton
            id={id}
            variant={MENU_ITEM}
            label="Remove Group"
            closeMenu={parm.closeMenu}
          />
        </GridItem>
      </Can>
      <Can do="create" on={PARTICIPANT}>
        <GridItem>
          <MenuItem
            icon="lnr-user-plus"
            closeMenu={parm.closeMenu}
            onClick={handleOpenDialog}
          >
            Add/Remove Participants
          </MenuItem>
        </GridItem>
      </Can>
    </GridContainer>
  );

  const renderMoreMenu = () => (
    <Popper placement="bottom-end" renderButton={renderMoreButton} noPadding>
      {renderMorePopper}
    </Popper>
  );

  return (
    <GridItem>
      <GridContainer className={classes.root} card direction="column">
        <GridItem>
          <GridContainer justify="space-between" alignItems="center">
            <GridItem>
              <GridContainer spacing={0} direction="column">
                <GridItem>
                  <JText link dark onClick={handleOpenDialog}>
                    <NodeProp
                      id={id}
                      bold
                      variant={HEADING}
                      valueKey={CONTENT}
                      editable={false} // {ability.can('execute', PARTICIPANT)}
                      showEmpty
                      ellipsis
                      component="div"
                      isCustomData={false}
                      required
                      placeholder="Group Name"
                    />
                  </JText>
                </GridItem>
                <GridItem>
                  <JText sm>
                    Added <CreatedAt id={id} showFromNow />
                  </JText>
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem className={classes.more}>{renderMoreMenu()}</GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <Hr quarter />
        </GridItem>
        <GridItem>
          <ParticipantList id={id} hideRenderRowTail />
        </GridItem>
      </GridContainer>
      <GridItem>
        <TravelingWithDialog
          templateId={props.templateId}
          open={openDialog}
          onClose={handleCloseDialog}
          onButtonClose={handleCloseDialog}
          currentGroupId={props.id}
          renderDeleteGroup={renderDeleteGroup}
        />
      </GridItem>
    </GridItem>
  );
};

Group.propTypes = {
  id: PropTypes.number,
  templateId: PropTypes.number,
};

export default Group;

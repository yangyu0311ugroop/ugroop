import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { ROOM_TYPES, ROOM_TWIN, ROOM_OTHERS } from 'appConstants';
import Dialog from 'components/Dialog';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';
import Form, { TextField } from 'ugcomponents/Form';
import Icon from 'ugcomponents/Icon';
import SimpleRTE from 'ugcomponents/Inputs/SimpleRTE';
import { ROOM } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import { FormattedMessage as M } from 'react-intl';
import flatten from 'lodash/flatten';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG, TEMPLATE_CONFIG } from './config';
import styles from './styles';
import m from './messages';
import inputs from './inputs';

export class AddRoom extends PureComponent {
  state = {
    selectedType: ROOM_TWIN,
    room: { ...ROOM_TYPES[ROOM_TWIN] },
  };

  handleClose = () => {
    PORTAL_HELPERS.close(this.props);
  };

  handleCreateSuccess = roomType => ({ node }) => {
    this.handleClose();
    this.props.resaga.setValue({
      selectedRoomId: node.id,
      layout: 'room',
      selectedRoomType: roomType,
    });
  };

  handleValidSubmit = ({
    content,
    description,
    roomCount,
    otherRoomType,
    bedCount,
    guestCount,
  }) => {
    const { id } = this.props;
    const { selectedType } = this.state;
    const roomType = LOGIC_HELPERS.ifElse(
      selectedType === ROOM_OTHERS,
      otherRoomType,
      selectedType,
    );

    const room = {
      type: ROOM,
      parentNodeId: id,
      content,
      customData: {
        description,
        roomType,
        bedCount,
        guestCount,
      },
    };

    const node = flatten(Array.from({ length: roomCount }, () => [...[room]]));

    return NODE_API_HELPERS.createNode(
      {
        node,
        parentNodeId: id,
        childKey: 'rooms',
        onSuccess: this.handleCreateSuccess(roomType),
      },
      this.props,
    );
  };

  renderSaveCancelButton = () => (
    <GridContainer alignItems="center">
      <GridItem xs />

      <GridItem>
        <Button size="xs" color="gray" onClick={this.handleClose}>
          Discard
        </Button>
      </GridItem>

      <GridItem>
        <Button size="xs" color="primary" type="submit">
          <GridContainer alignItems="center" spacing={0}>
            <GridItem>Continue</GridItem>
            <GridItem>
              <Icon icon="lnr-chevron-right" size="xsmall" paddingLeft />
            </GridItem>
          </GridContainer>
        </Button>
      </GridItem>
    </GridContainer>
  );

  renderRoomTypeButton = ({ openMenu }) => {
    const { classes } = this.props;
    const { selectedType } = this.state;
    return (
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem>
          <MenuItem
            block={false}
            button
            onClick={openMenu}
            className={classes.minHeight}
            stopPropagation
          >
            <GridContainer alignItems="center">
              <GridItem className={classes.selectedContainer}>
                {selectedType}
              </GridItem>
              <GridItem>
                <Icon icon="lnr-chevron-down" size="xsmall" />
              </GridItem>
            </GridContainer>
          </MenuItem>
        </GridItem>
        {selectedType === ROOM_OTHERS && (
          <GridItem>
            <TextField {...inputs.ROOM_TYPE_OTHERS} />
          </GridItem>
        )}
      </GridContainer>
    );
  };

  handleSelectType = value => () =>
    this.setState({ selectedType: value, room: { ...ROOM_TYPES[value] } });

  renderRoomTypeOptions = ({ closeMenu }) => {
    const { selectedType } = this.state;
    return (
      <GridContainer direction="column" spacing={0}>
        {Object.keys(ROOM_TYPES).map(key => (
          <GridItem key>
            <MenuItem
              selected={selectedType === key}
              closeMenu={closeMenu}
              onClick={this.handleSelectType(key)}
            >
              {key}
            </MenuItem>
          </GridItem>
        ))}
      </GridContainer>
    );
  };

  renderContent = () => {
    const { classes } = this.props;
    const { selectedType, room } = this.state;

    return (
      <Form onValidSubmit={this.handleValidSubmit}>
        <GridContainer direction="column">
          <GridItem>
            <div>
              <div className={classes.label}>
                {<M {...m.roomTypeLabelSub} />}
              </div>
              <Popper
                placement="bottom-start"
                renderButton={this.renderRoomTypeButton}
                value={selectedType}
                selectedType
              >
                {this.renderRoomTypeOptions}
              </Popper>
            </div>
          </GridItem>
          <GridItem>
            <div className={classes.input}>
              <div className={classes.label}>
                {<M {...m.roomCountLabelSub} />}
              </div>
              <TextField
                label={<M {...m.roomCountLabel} />}
                fullWidth={false}
                {...inputs.ROOM_COUNT}
              />
            </div>
          </GridItem>
          <GridItem>
            <div className={classes.input}>
              <div className={classes.label}>
                {<M {...m.guestCountLabelSub} />}
              </div>
              <TextField
                fullWidth={false}
                {...inputs.GUEST_COUNT}
                value={room.guestCount}
              />
            </div>
          </GridItem>
          <GridItem>
            <div className={classes.input}>
              <div className={classes.label}>
                {<M {...m.bedCountLabelSub} />}
              </div>
              <TextField
                fullWidth={false}
                {...inputs.BED_COUNT}
                value={room.bedCount}
              />
            </div>
          </GridItem>
          {/* <GridItem>
            <TextField {...inputs.TITLE} />
          </GridItem> */}
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <div className={classes.heading}>Description</div>
              </GridItem>
              <GridItem>
                <SimpleRTE {...inputs.DESCRIPTION} className={classes.rte} />
              </GridItem>
            </GridContainer>
          </GridItem>
          <Hr half />
          <GridItem>{this.renderSaveCancelButton()}</GridItem>
        </GridContainer>
      </Form>
    );
  };

  render = () => (
    <Dialog maxWidth="xs" fullWidth open onClose={this.handleClose}>
      <DialogTitle noPaddingBottom>
        <Title heading="Add Room" />
        <CloseButton onClick={this.handleClose} />
      </DialogTitle>
      <DialogContent halfPaddingTop>{this.renderContent()}</DialogContent>
    </Dialog>
  );
}

AddRoom.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,

  // resaga props
};

AddRoom.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'AddRoom' }),
  resaga(TEMPLATE_CONFIG),
  resaga(CONFIG),
)(AddRoom);

import { Hidden } from '@material-ui/core';
import { ability } from 'apis/components/Ability/ability';
import { CARD, SUMMARY, LIST } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Rooms from 'smartComponents/Node/components/Rooms';
import LayoutSelect from 'smartComponents/Node/types/TabTimeline/components/LayoutSelect';
import { ROOM } from 'utils/modelConstants';
import MenuItem from 'components/Popper/components/MenuItem';
import { CONFIG, PARENT_CONFIG } from './config';
import styles from './styles';
import { LOGIC_HELPERS } from '../../../../../../../../../utils/helpers/logic';
import { VARIANTS } from '../../../../../../../../../variantsConstants';
import WrapperParticipantList from '../../../../../../../../../smartComponents/Node/components/ParticipantList';

export class TabRoomList extends PureComponent {
  state = {
    cardView: true,
  };

  componentWillMount = () => {
    const { createdBy } = this.props;
    this.room = {
      type: ROOM,
      createdBy,
    };
  };

  canEdit = () => {
    const { editable } = this.props;

    return editable && ability.can('execute', this.room);
  };

  handleDeleteRoom = () => {
    this.props.resaga.setValue({
      selectedRoomId: 0,
    });
  };

  handleChange = newValue => () => {
    this.setState({ cardView: newValue });
  };

  renderLeft = () => {
    const { templateId } = this.props;

    return (
      <GridContainer direction="column">
        <GridItem>
          <Rooms variant={SUMMARY} id={templateId} />
        </GridItem>
      </GridContainer>
    );
  };

  renderCard = () => {
    const { templateId } = this.props;

    return (
      <GridContainer direction="column">
        <GridItem>
          <Rooms
            variant={CARD}
            id={templateId}
            cardView={this.state.cardView}
          />
        </GridItem>
      </GridContainer>
    );
  };

  handleSortSelect = sortMode => () => {
    this.props.resaga.setValue({
      sortMode,
    });
  };

  renderContent = () => {
    const { rooms, editable, classes, templateId } = this.props;
    const { cardView } = this.state;
    if (!rooms.length)
      return (
        <GridContainer direction="column">
          <Rooms id={templateId} rooms={rooms} editable={editable} />
        </GridContainer>
      );
    return (
      <div className={classes.body}>
        <GridContainer direction="column">
          <Hidden mdUp>
            <GridItem>{this.renderLeft()}</GridItem>
          </Hidden>
          <GridItem>
            <GridContainer alignItems="left" direction="column">
              <GridItem xs>{this.renderMenuView()}</GridItem>
              <GridItem>
                <GridContainer spacing={2}>
                  <Rooms
                    id={templateId}
                    rooms={rooms}
                    editable={editable}
                    cardView={this.state.cardView}
                    variant={LOGIC_HELPERS.ifElse(!cardView, LIST)}
                    showFiltered
                  />
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
          <WrapperParticipantList variant={VARIANTS.VIEW} />
        </GridContainer>
      </div>
    );
  };

  renderMenuView = () => {
    const { classes } = this.props;
    const { cardView } = this.state;
    return (
      <GridContainer
        alignItems="center"
        spacing={0}
        className={classnames(classes.headerOption)}
      >
        <GridItem>
          <MenuItem
            selected={cardView}
            icon="lnr-list4"
            iconClassName={classes.menuIcon}
            onClick={this.handleChange(true)}
          >
            Card
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={!cardView}
            icon="lnr-grid"
            iconClassName={classes.menuIcon}
            onClick={this.handleChange(false)}
          >
            List
          </MenuItem>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { classes, rooms } = this.props;

    return (
      <GridContainer direction="column">
        <GridItem>
          <Hidden smDown>
            <LayoutSelect row />
          </Hidden>
          <Hidden mdUp>
            <LayoutSelect />
          </Hidden>
        </GridItem>
        <GridItem>
          <GridContainer
            justify="space-between"
            className={classes.root}
            wrap="nowrap"
          >
            {!!rooms.length && (
              <Hidden smDown>
                <GridItem>
                  <div className={classes.left}>{this.renderLeft()}</div>
                </GridItem>
              </Hidden>
            )}
            <GridItem
              className={classnames(
                classes.grow,
                classes.content,
                classes.contentMaxWidth,
              )}
            >
              {this.renderContent()}
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

TabRoomList.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  templateId: PropTypes.number,

  // resaga props
  createdBy: PropTypes.number,
  editable: PropTypes.bool,
  rooms: PropTypes.array,
};

TabRoomList.defaultProps = {
  rooms: [],
};

export default compose(
  withStyles(styles, { name: 'TabRoomList' }),
  resaga(CONFIG),
  resaga(PARENT_CONFIG),
)(TabRoomList);

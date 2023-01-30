import { Can } from 'apis/components/Ability/components/Can';
import { CONTENT, DEFAULT_ROOM_FILTER } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import Children from 'smartComponents/Node/parts/Children';
import RoomSummary from 'smartComponents/Node/components/Rooms/components/RoomSummary';
import Headx from 'ugcomponents/Headx';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ROOM } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import { VARIANTS } from 'variantsConstants';
import { first } from 'lodash';
import JText from 'components/JText';
import { CONFIG } from './config';
import styles from './styles';

export const MAX_IDS = 3;

export class RoomCard extends PureComponent {
  openAddRoom = () => {
    PORTAL_HELPERS.openAddRoom({}, this.props);
  };

  selectRoom = id => () => {
    this.props.resaga.setValue({
      selectedRoomId: id,
      layout: 'room',
      selectedRoomType: DEFAULT_ROOM_FILTER,
    });
  };

  renderEmpty = () => {
    const { classes } = this.props;

    return <div className={classes.noContent}>No rooms have been created.</div>;
  };

  renderChildren = ({ ids }) => {
    const { classes } = this.props;

    if (!ids.length) return null;

    return (
      <GridItem>
        <div className={classes.badge}>{ids.length}</div>
      </GridItem>
    );
  };

  renderRoom = (id, index) => {
    const { selectedRoomId, classes } = this.props;

    return (
      <GridItem onClick={this.selectRoom(id)}>
        <div
          className={classnames(
            classes.item,
            LOGIC_HELPERS.ifElse(selectedRoomId === id, classes.itemActive),
          )}
        >
          <GridContainer alignItems="center" wrap="nowrap">
            <GridItem>
              <Headx>#{index + 1}</Headx>
            </GridItem>
            <GridItem xs>
              <NodeProp
                id={id}
                valueKey={CONTENT}
                isCustomData={false}
                editable={false}
              />
            </GridItem>
            <Children id={id}>{this.renderChildren}</Children>
          </GridContainer>
        </div>
      </GridItem>
    );
  };

  renderRooms = () => {
    const { rooms, id } = this.props;

    if (!rooms.length) {
      return this.renderEmpty();
    }

    return (
      <GridContainer direction="column" spacing={0}>
        <RoomSummary
          id={id}
          variant={VARIANTS.COUNT_ONLY}
          onClick={this.selectRoom(first(rooms))}
          selectType
        />
        {rooms.length > 1 && (
          <GridItem>
            <JText link onClick={this.selectRoom(first(rooms))}>
              See all ({rooms.length})
            </JText>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  render = () => {
    const { classes } = this.props;

    return (
      <GridContainer card direction="column">
        <GridItem>
          <GridContainer alignItems="center">
            <Can do="create" on={ROOM}>
              <GridItem>
                <Button
                  color="primary"
                  size="xs"
                  className={classes.smallText}
                  onClick={this.openAddRoom}
                >
                  <GridContainer alignItems="center">
                    <GridItem>
                      <Icon size="xsmall" icon="lnr-plus" bold />
                    </GridItem>
                  </GridContainer>
                </Button>
              </GridItem>
            </Can>
            <GridItem xs>
              <JText link onClick={this.selectRoom(null)}>
                <div className={classes.header}>Rooming</div>
              </JText>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>{this.renderRooms()}</GridItem>
      </GridContainer>
    );
  };
}

RoomCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number, // templateId / parentId

  // resaga props
  rooms: PropTypes.array,
  selectedRoomId: PropTypes.number,
};

RoomCard.defaultProps = {
  rooms: [],
};

export default compose(
  withStyles(styles, { name: 'RoomCard' }),
  resaga(CONFIG),
)(RoomCard);

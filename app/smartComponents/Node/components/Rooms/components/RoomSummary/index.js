import { Can } from 'apis/components/Ability/components/Can';
import { DEFAULT, DEFAULT_ROOM_FILTER } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Headx from 'ugcomponents/Headx';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ROOM } from 'utils/modelConstants';
import Button from 'viewComponents/Button';

import JText from 'components/JText';
import { CONFIG, CONFIG1 } from './config';
import styles from './styles';
import { VARIANTS } from '../../../../../../variantsConstants';
import P from '../../../../../../viewComponents/Typography';
import Badge from '../../../../../../viewComponents/Badge';
import Hr from '../../../../../../components/Hr';

export const MAX_IDS = 3;
export class RoomSummary extends PureComponent {
  setSelectedType = type => () =>
    this.props.resaga.setValue({ selectedRoomType: type });

  openAddRoom = () => {
    PORTAL_HELPERS.openAddRoom({}, this.props);
  };

  renderEmpty = () => {
    const { classes } = this.props;

    return <div className={classes.noContent}>No rooms have been created.</div>;
  };

  renderCount = ({ count }) => {
    if (count === 0) return null;
    return (
      <GridItem>
        <Badge variant={VARIANTS.SQUARE}>{count}</Badge>
      </GridItem>
    );
  };

  renderTotalLabel = (count, icon, label, color) => (
    <GridItem clickable onClick={this.setSelectedType([label])}>
      <GridContainer justify="space-between" noWrap>
        <GridItem>
          <GridContainer noWrap alignItems="baseline">
            <GridItem>
              <Icon size="small" icon={icon} color={color} />
            </GridItem>
            <GridItem>
              <P
                whiteSpace="nowrap"
                dense
                weight={LOGIC_HELPERS.ifElse(
                  this.props.selectedRoomType.includes(label),
                  'bold',
                  'light',
                )}
              >
                <JText ellipsis>{label}</JText>
              </P>
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem>{this.renderCount({ count })}</GridItem>
      </GridContainer>
    </GridItem>
  );

  renderNonRoomTotalLabel = (count, icon, label, color) => (
    <GridItem>
      <GridContainer justify="space-between" noWrap>
        <GridItem>
          <GridContainer noWrap alignItems="baseline">
            <GridItem>
              <Icon size="small" icon={icon} color={color} />
            </GridItem>
            <GridItem>
              <P
                whiteSpace="nowrap"
                dense
                weight={LOGIC_HELPERS.ifElse(
                  this.props.selectedRoomType.includes(label),
                  'bold',
                  'light',
                )}
              >
                {label}
              </P>
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem>{this.renderCount({ count })}</GridItem>
      </GridContainer>
    </GridItem>
  );

  summary = () => {
    const {
      rooms,
      confirmedParticipantIds,
      allRoomPaxIds,
      emptyRoomIds,
    } = this.props;
    return (
      <GridContainer card direction="column">
        <GridItem>
          <JText gray bold halfPaddingLeft md>
            Rooms
          </JText>
          <Hr noMarginBottom halfMarginTop />
        </GridItem>
        {this.renderTotalLabel(
          rooms.length,
          'lnr-bed',
          DEFAULT_ROOM_FILTER,
          'success',
        )}
        <GridItem>{this.renderRoomTypes()}</GridItem>
        <Hr noMarginBottom halfMarginTop />
        {this.renderNonRoomTotalLabel(
          confirmedParticipantIds.length,
          'lnr-users',
          `Going ${this.props.paxLabel}:`,
        )}
        {this.renderNonRoomTotalLabel(
          allRoomPaxIds.length,
          'lnr-users-plus',
          `${this.props.paxLabel} Allocated:`,
        )}
        {this.renderNonRoomTotalLabel(
          emptyRoomIds.length,
          'lnr-bed',
          'Unallocated rooms:',
          'warning',
        )}
      </GridContainer>
    );
  };

  renderRoomTypes = () => {
    const { roomTypes } = this.props;
    const distinctRooms = [...new Set(roomTypes)];
    if (!roomTypes.length) return null;
    return (
      <GridContainer direction="column">
        {distinctRooms.sort().map(type => {
          const count = roomTypes.filter(item => item === type).length;
          return (
            <GridItem>
              {this.renderTotalLabel(count, 'lnr-key', `${type}`, 'white')}
            </GridItem>
          );
        })}
      </GridContainer>
    );
  };

  renderRoomType = (type, index, count) => {
    const { classes, onClick, selectType } = this.props;

    return (
      <GridItem clickable={selectType} onClick={this.setSelectedType([type])}>
        <div className={classnames(classes.item)}>
          <GridContainer alignItems="center" wrap="nowrap" onClick={onClick}>
            <GridItem>
              <Headx>#{index + 1}</Headx>
            </GridItem>
            <GridItem xs>{`${type} (${count})`}</GridItem>
          </GridContainer>
        </div>
      </GridItem>
    );
  };

  renderRoomCountByType = () => {
    const { roomTypes } = this.props;
    const distinctRooms = [...new Set(roomTypes)];
    if (!roomTypes.length) return null;
    return (
      <React.Fragment>
        {distinctRooms.sort().map((type, index) => {
          const count = roomTypes.filter(item => item === type).length;
          return this.renderRoomType(type, index, count);
        })}
      </React.Fragment>
    );
  };

  renderDefault = () => {
    const { classes } = this.props;
    return (
      <GridContainer card direction="column">
        <GridItem>
          <GridContainer alignItems="center">
            <GridItem xs>
              <div className={classes.header}>Room Summary</div>
            </GridItem>

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
                    <GridItem>Room</GridItem>
                  </GridContainer>
                </Button>
              </GridItem>
            </Can>
          </GridContainer>
        </GridItem>
        <GridItem>{this.summary()}</GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.COUNT_ONLY]: this.renderRoomCountByType,
      [DEFAULT]: this.renderDefault,
    });
  };
}

RoomSummary.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  // parent props
  variant: PropTypes.string,
  onClick: PropTypes.func,
  selectType: PropTypes.bool,
  // resaga props
  rooms: PropTypes.array,
  confirmedParticipantIds: PropTypes.array,
  allRoomPaxIds: PropTypes.array,
  emptyRoomIds: PropTypes.array,
  roomTypes: PropTypes.array,
  selectedRoomType: PropTypes.array,
  paxLabel: PropTypes.string,
};

RoomSummary.defaultProps = {
  rooms: [],
  confirmedParticipantIds: [],
  allRoomPaxIds: [],
  roomTypes: [],
  emptyRoomIds: [],
  selectedRoomType: [DEFAULT_ROOM_FILTER],
};

export default compose(
  withStyles(styles, { name: 'RoomSummary' }),
  resaga(CONFIG),
  resaga(CONFIG1),
)(RoomSummary);

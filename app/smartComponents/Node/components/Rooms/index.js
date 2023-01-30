import {
  CARD,
  DEFAULT,
  SUMMARY,
  LIST,
  SORT_CONSTANTS,
  ROOM_TYPES,
  ROOM_OTHERS,
} from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import Room from 'smartComponents/Node/types/Room';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Icon from 'viewComponents/Icon';
import { H3 } from 'viewComponents/Typography';
import { ROOM } from 'utils/modelConstants';
import { withStyles } from '@material-ui/core/styles';
import resaga from 'resaga';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import Button from 'viewComponents/Button';
import { Can } from 'apis/components/Ability/components/Can';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import Table, {
  TableHeader,
  TableBody,
  TableHeadCell,
  TableRow,
} from 'viewComponents/Table';
import { FormattedMessage as M } from 'react-intl';
import first from 'lodash/first';
import omit from 'lodash/omit';
import RoomCard from './components/RoomCard';
import RoomSummary from './components/RoomSummary';
import styles from './styles';
import { CONFIG, CONFIG_2 } from './config';
import m from './messages';
import JText from '../../../../components/JText';
import MenuItem from '../../../../components/Popper/components/MenuItem';
import { NODE_API_HELPERS } from '../../../../apis/components/Node/helpers';
import { CREATE_LINK, DELETE_LINK, NODE_API } from '../../../../apis/constants';

export class Rooms extends PureComponent {
  state = {
    loading: false,
  };

  renderCard = () => <RoomCard {...omit(this.props, ['classes'])} />;

  renderSummary = () => <RoomSummary {...omit(this.props, ['classes'])} />;

  openAddRoom = () => {
    PORTAL_HELPERS.openAddRoom({ heading: 'Add Room' }, this.props);
  };

  renderBlankSlate = (simple = false) => {
    const { classes } = this.props;
    if (simple) {
      return (
        <JText md italic gray textCenter>
          There are no rooms created yet
        </JText>
      );
    }
    return (
      <React.Fragment>
        <GridContainer
          direction="column"
          alignItems="center"
          spacing={1}
          className={classes.padding}
        >
          <GridItem className={classes.iconContainer}>
            <GridItem>
              <Icon icon="lnr-bed" size="xl" color="gray" />
            </GridItem>
          </GridItem>
          <GridItem>
            <H3 className={classes.heading}>There are no rooms created yet</H3>
          </GridItem>
          <GridItem>
            <Can do="create" on={ROOM}>
              <Button
                color="primary"
                size="small"
                dense
                className={classnames(
                  classes.smallText,
                  classes.iphoneWidthBtn,
                )}
                onClick={this.openAddRoom}
              >
                <GridContainer
                  direction="row"
                  alignItems="center"
                  justify="center"
                  wrap="nowrap"
                  className={classes.noWrap}
                >
                  <GridItem>
                    <Icon size="xsmall" icon="lnr-plus" bold />
                  </GridItem>
                  <GridItem>Add Room</GridItem>
                </GridContainer>
              </Button>
            </Can>
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  };

  renderListHeader = () => {
    const { smDown } = this.props;
    if (smDown) {
      return (
        <TableHeader>
          <TableRow>
            <TableHeadCell padding="halfLeftRight">
              <M {...m.colLabelRoomType} />
            </TableHeadCell>
            <TableHeadCell padding="halfLeftRight">
              <M
                {...m.colLabelRoomGeneral}
                values={{ paxLabel: this.props.paxLabel }}
              />
            </TableHeadCell>
            <TableHeadCell padding="halfLeftRight" />
          </TableRow>
        </TableHeader>
      );
    }
    return (
      <TableHeader>
        <TableRow>
          <TableHeadCell padding="halfLeftRight">
            <M {...m.colLabelRoomType} />
          </TableHeadCell>
          <TableHeadCell padding="halfLeftRight">
            <M {...m.colLabelRoomTitle} />
          </TableHeadCell>
          <TableHeadCell padding="halfLeftRight">
            <M {...m.colLabelName} />
          </TableHeadCell>
          <TableHeadCell padding="halfLeftRight">
            <M {...m.colLabelRoomAgeType} />
          </TableHeadCell>
          <TableHeadCell padding="halfLeftRight" />
        </TableRow>
      </TableHeader>
    );
  };

  renderBody = ({ id }) => id;

  getRoomIds = () =>
    LOGIC_HELPERS.ifElse(
      this.props.showFiltered,
      this.props.filteredRooms,
      this.props.rooms,
    );

  renderDefault = () => {
    const { rooms, classes, id: parentNodeId, editable, cardView } = this.props;
    if (!rooms.length) {
      return (
        <GridItem className={classnames(classes.contentGrid)}>
          {this.renderBlankSlate()}
        </GridItem>
      );
    }
    const roomIds = this.getRoomIds();

    const content = roomIds.map(id => (
      <Room
        key={id}
        id={id}
        parentNodeId={parentNodeId}
        index={roomIds.indexOf(id)}
        editable={editable}
        cardView={cardView}
      />
    ));

    return content;
  };

  renderList = () => {
    const {
      rooms,
      classes,
      id: parentNodeId,
      editable,
      cardView,
      sortMode,
    } = this.props;
    if (!rooms.length) {
      return (
        <GridItem className={classnames(classes.contentGrid)}>
          {this.renderBlankSlate()}
        </GridItem>
      );
    }

    const roomIds = this.getRoomIds();

    const content = roomIds.map(id => (
      <TableBody>
        <Room
          key={id}
          id={id}
          variant={LIST}
          parentNodeId={parentNodeId}
          index={roomIds.indexOf(id)}
          editable={editable}
          cardView={cardView}
          sortMode={sortMode}
        />
      </TableBody>
    ));

    return (
      <GridItem xs={12} className={classes.container}>
        <Table>
          {this.renderListHeader()}
          {content}
        </Table>
      </GridItem>
    );
  };

  handleSelectOption = selectedType => () => {
    const { id } = this.props;
    const { bedCount, guestCount } = ROOM_TYPES[selectedType];
    if (this.state.loading) return null;

    this.setState({ loading: true });

    const room = {
      type: ROOM,
      parentNodeId: id,
      // content,
      customData: {
        // description,
        roomType: LOGIC_HELPERS.ifElse(
          selectedType === ROOM_OTHERS,
          ROOM_OTHERS,
          selectedType,
        ),
        bedCount,
        guestCount,
      },
    };

    const node = [{ ...room }];

    return NODE_API_HELPERS.createNode(
      {
        node,
        parentNodeId: id,
        childKey: 'rooms',
        onSuccess: this.createLink(),
        onError: this.handleCreateLinkError,
      },
      this.props,
    );
  };

  createLink = id => ({ result }) => {
    const { participantId } = this.props;
    const nodeId = id || first(result);

    return this.props.resaga.dispatchTo(NODE_API, CREATE_LINK, {
      payload: {
        id: Number(participantId),
        data: {
          nextNodeId: nodeId,
          action: 'occupant',
          actionContent: {
            ageClass: 'adult',
          },
        },
        prevNodeChildKey: 'rooms',
        nextNodeChildKey: 'participants',
        upsertLinkId: false,
      },
      onSuccess: this.handleCreateLinkSuccess,
      onError: this.handleCreateLinkError,
    });
  };

  handleMoveRoomParticipant = id => () => {
    const { participantId, selectedId, id: parentNodeId } = this.props;
    // First delete the current link
    return this.props.resaga.dispatchTo(NODE_API, DELETE_LINK, {
      payload: {
        id: Number(participantId),
        fk: selectedId,
        linkKey: selectedId,
        parentNodeId,
        prevNodeChildKey: 'rooms',
        nextNodeChildKey: 'participants',
        removeLinkId: false,
      },
      onSuccess: this.createLink(id),
    });
  };

  handleCreateLinkError = () => this.setState({ loading: false });

  handleCreateLinkSuccess = () => this.setState({ loading: false });

  renderRoomOptions = () => {
    const { rooms, classes, id: parentNodeId, selectedId } = this.props;
    const ids = rooms.filter(item => item !== selectedId);
    if (!ids.length) {
      return (
        <GridItem className={classnames(classes.contentGrid)}>
          {this.renderBlankSlate(true)}
        </GridItem>
      );
    }

    const content = ids.map(id => (
      <GridItem key>
        <Room
          key={id}
          id={id}
          variant={VARIANTS.MENU_ITEM}
          parentNodeId={parentNodeId}
          index={rooms.indexOf(id)}
          menuItemClick={
            selectedId ? this.handleMoveRoomParticipant : this.createLink
          }
        />
      </GridItem>
    ));
    return content;
  };

  renderRoomTypeOptions = () => (
    <GridContainer direction="column" spacing={0}>
      <GridItem>Create new room</GridItem>
      {Object.keys(ROOM_TYPES).map(key => (
        <GridItem key>
          <MenuItem onClick={this.handleSelectOption(key)}>{key}</MenuItem>
        </GridItem>
      ))}
    </GridContainer>
  );

  renderSelect = () => {
    const { selectedId, participantId } = this.props;
    const occupantLabel = (
      <JText blue uppercase ellipsis sm paddingRight>
        Rooming with
      </JText>
    );
    // const otherRooms = rooms.filter(item => item !== selectedId);

    const options = selectedId ? (
      <Room
        id={selectedId}
        variant={VARIANTS.SELECT_FIELD}
        occupantLabel={occupantLabel}
        participantId={participantId}
      />
    ) : (
      this.renderRoomTypeOptions()
    );
    return (
      <GridContainer direction="column">
        <GridItem>{options}</GridItem>
        {/* {!!otherRooms.length && (
          <React.Fragment>
            <Hr halfMarginBottom halfMarginTop />
            <GridItem>
              <JText blue uppercase ellipsis sm paddingRight>
                Add pax to existing rooms
              </JText>
            </GridItem>
            {this.renderRoomOptions()}
          </React.Fragment>
        )} */}
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [CARD]: this.renderCard,
      [SUMMARY]: this.renderSummary,
      [LIST]: this.renderList,
      [VARIANTS.SELECT_FIELD]: this.renderSelect,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Rooms.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  smDown: PropTypes.bool,
  // parent props
  variant: PropTypes.string,
  id: PropTypes.number, // Template id
  rooms: PropTypes.array,
  editable: PropTypes.bool,
  limit: PropTypes.bool,
  cardView: PropTypes.bool,
  selectedId: PropTypes.number,
  participantId: PropTypes.number,
  paxLabel: PropTypes.string,
  selectedRoomType: PropTypes.string,
  showFiltered: PropTypes.bool,

  // resaga props
  sortMode: PropTypes.string,
  filteredRooms: PropTypes.array,
};

Rooms.defaultProps = {
  rooms: [],
  sortMode: SORT_CONSTANTS.NAME,
  filteredRooms: [],
};

export default compose(
  withStyles(styles, { name: 'Rooms' }),
  resaga(CONFIG),
  resaga(CONFIG_2),
  withSMDown,
)(Rooms);

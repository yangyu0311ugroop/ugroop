import {
  DEFAULT,
  LIST,
  DEFAULT_AGE_TYPE,
  ROOM_OTHERS,
  NODE_PROP,
  DEFAULT_ROOM_FILTER,
} from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import DeleteNode from 'smartComponents/Node/components/DeleteNode';
// import { RoomType, GuestCount, BedCount } from 'smartComponents/Node/parts';
import RoomType from 'smartComponents/Node/parts/RoomType';
import GuestCount from 'smartComponents/Node/parts/GuestCount';
import BedCount from 'smartComponents/Node/parts/BedCount';
import { H2 } from 'viewComponents/Typography';
import Name from 'smartComponents/Node/parts/Name';
// import Status from 'smartComponents/Node/parts/Status';
import Description from 'smartComponents/Node/parts/Description';
import { ability } from 'apis/components/Ability/ability';
import { Can } from 'apis/components/Ability/components/Can';
import { ROOM } from 'utils/modelConstants';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import Button from 'viewComponents/Button';
// import Icon from 'viewComponents/Icon';
import Icon from 'ugcomponents/Icon';
import JText from 'components/JText';
import Hr from 'components/Hr';
import { VARIANTS } from 'variantsConstants';
import { TableRow, TableCell } from 'viewComponents/Table';
import { DELETE_LINK, NODE_API, UPDATE_LINK } from 'apis/constants';
import first from 'lodash/first';
import classnames from 'classnames';
import { CONFIG, CONFIG2, CONFIG3 } from './config';
import Participant from './components/Participant';
import styles from './styles';
import MenuItem from '../../../../components/Popper/components/MenuItem';
import { NODE_API_HELPERS } from '../../../../apis/components/Node/helpers';

export class Room extends PureComponent {
  state = {
    loading: false,
    processId: null,
    showPaxDetail: false,
    editing: false,
  };

  componentWillMount = () => {
    const { createdBy } = this.props;
    this.room = {
      type: ROOM,
      createdBy,
    };
  };

  componentDidUpdate = prevProps => {
    if (prevProps.editable !== this.props.editable) {
      if (!this.props.editable) {
        const { editing } = this.state;
        if (editing) {
          this.setState({ editing: false });
        }
      }
    }
  };

  setLoading = ({ value, id }) =>
    this.setState({ loading: value, processId: id });

  isEditing = () => {
    const { editable } = this.props;
    const { editing } = this.state;
    return this.canEdit() && (editable || editing);
  };

  openAddPax = () => {
    const { id, parentNodeId, participantId } = this.props;
    PORTAL_HELPERS.openAddRoomPax(
      {
        id,
        parentNodeId,
        participantId,
        heading: LOGIC_HELPERS.ifElse(participantId, this.roomingHeader()),
      },
      this.props,
    );
  };

  roomingHeader = () => {
    const { participantId, classes } = this.props;
    return (
      <GridContainer noWrap>
        <GridItem className={classes.noWrapText}>Rooming With</GridItem>
        <GridItem>
          <Participant
            id={participantId}
            variant={VARIANTS.TEXT_ONLY}
            showSubDetail={false}
            showAvatar={false}
            textComponent={H2}
          />
        </GridItem>
      </GridContainer>
    );
  };

  toggleShowPaxDetail = event => {
    event.stopPropagation();
    const { showPaxDetail } = this.state;
    this.setState({ showPaxDetail: !showPaxDetail });
  };

  canEdit = () => ability.can('execute', this.room);

  handleDeleteRoom = () => {
    this.props.resaga.setValue({
      selectedRoomId: 0,
    });
  };

  handleRemoveLink = ({ participantId }) => () => {
    const { id, parentNodeId } = this.props;
    this.setLoading({ value: true, id: participantId });
    return this.props.resaga.dispatchTo(NODE_API, DELETE_LINK, {
      payload: {
        id: Number(participantId),
        fk: id,
        linkKey: id,
        parentNodeId,
        prevNodeChildKey: 'rooms',
        nextNodeChildKey: 'participants',
        removeLinkId: false,
      },
      onSuccess: this.handleremoveLinkSuccess,
      onerror: this.handleremoveLinkSuccess,
    });
  };

  handleremoveLinkSuccess = () => {
    this.setLoading({ value: false, id: null });
  };

  handleRequestError = () => {
    this.setLoading({ value: false, id: null });
  };

  handleRelocateParticipant = roomValues => {
    const { parentNodeId, participantId } = this.props;
    this.setLoading({ value: true, id: participantId });

    const room = {
      type: ROOM,
      parentNodeId,
      customData: {
        ...roomValues,
      },
    };
    const node = [{ ...room }];

    return NODE_API_HELPERS.createNode(
      {
        node,
        parentNodeId,
        childKey: 'rooms',
        onSuccess: this.updateLink(),
        onError: this.handleCreateLinkError,
      },
      this.props,
    );
  };

  updateLink = id => ({ result }) => {
    const { participantId, id: oldRoomId } = this.props;
    const nodeId = id || first(result);

    return this.props.resaga.dispatchTo(NODE_API, UPDATE_LINK, {
      payload: {
        id: Number(participantId),
        fk: oldRoomId,
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
      onSuccess: this.handleremoveLinkSuccess,
      onError: this.handleRequestError,
    });
  };

  toggleEditing = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  renderHeaderButton = () => {
    const { classes, parentNodeId, id, editable } = this.props;
    const { editing } = this.state;
    return (
      <React.Fragment>
        {!editable && (
          <GridItem>
            <Button
              noMargin
              dense
              size="xxs"
              variant={VARIANTS.OUTLINE}
              onClick={this.toggleEditing}
              className={classnames(
                LOGIC_HELPERS.ifElse(
                  this.isFull(),
                  classes.actionButton,
                  classes.actionButtonFull,
                ),
                LOGIC_HELPERS.ifElse(editing, classes.editingButton),
              )}
              buttonTitle={LOGIC_HELPERS.ifElse(
                editing,
                'Finish editing',
                'Start editing this room',
              )}
            >
              <GridContainer alignItems="center">
                <GridItem>
                  <Icon
                    icon={LOGIC_HELPERS.ifElse(
                      editing,
                      'lnr-check',
                      'lnr-pencil',
                    )}
                    size="xsmall"
                  />
                </GridItem>
              </GridContainer>
            </Button>
          </GridItem>
        )}
        {this.isEditing() && (
          <GridItem>
            <DeleteNode
              id={id}
              parentId={parentNodeId}
              childKey="rooms"
              onSuccess={this.handleDeleteRoom}
              noText
              tooltip="Remove this room, and if there are any allocated guests, place them in another room"
              buttonClass={LOGIC_HELPERS.ifElse(
                this.isFull(),
                classes.actionButton,
                classes.actionButtonFull,
              )}
            />
          </GridItem>
        )}
      </React.Fragment>
    );
  };

  renderDeleteButton = id => {
    // const { classes } = this.props;
    const { loading, processId } = this.state;
    return (
      <Button
        iconButton
        variant={VARIANTS.INLINE}
        size="xsmall"
        square
        dense
        title={`Remove ${this.props.paxLabel} from this room`}
        icon="lnr-trash2"
        color="alert"
        onClick={this.handleRemoveLink({ participantId: id })}
        loading={loading && processId === id}
        disabled={loading}
        // noPadding
      />
    );
  };

  renderNoPax = (showAdd = false, roomWith = false) => (
    <JText md italic gray textCenter>
      {!roomWith &&
        LOGIC_HELPERS.ifElse(
          this.props.smDown && showAdd,
          `No ${this.props.paxLabel} yet`,
          'Room not yet allocated',
        )}
      {LOGIC_HELPERS.ifElse(
        roomWith,
        `No ${this.props.paxLabel} to room with yet`,
      )}
      {showAdd && (
        <Can do="create" on={ROOM}>
          <React.Fragment>
            {', '}
            <JText link onClick={this.openAddPax}>
              click to add
            </JText>
          </React.Fragment>
        </Can>
      )}
    </JText>
  );

  renderPaxcontentByAgeType = () => {
    const { occupantIds, ageTypeValues } = this.props;
    if (!occupantIds.length) {
      return this.renderNoPax();
    }
    const ageTypeValuesDistinct = [
      ...new Set(ageTypeValues.map(val => val || DEFAULT_AGE_TYPE)),
    ];

    return ageTypeValuesDistinct.sort().map(value => (
      <GridContainer spacing={0} key={value} direction="column">
        <GridItem>{this.roomPaxContentCard({ value })}</GridItem>
      </GridContainer>
    ));
  };

  roomPaxContentCard = ({ value }) => {
    const { occupantIds, ageTypeValues, classes } = this.props;
    const ids = occupantIds.filter(
      (id, index) => (ageTypeValues[index] || DEFAULT_AGE_TYPE) === value,
    );
    return (
      <React.Fragment>
        <GridItem>
          <JText
            sm
            gray
            bold
            uppercase
            className={classes.ageGroup}
          >{`${value} (${ids.length})`}</JText>
        </GridItem>
        <GridItem>
          <GridContainer direction="column" spacing={1}>
            {ids.map(id => (
              <GridItem>
                <GridContainer wrap="nowrap" justify="space-between">
                  <GridItem>
                    <Participant
                      id={id}
                      variant={VARIANTS.ROW_SIMPLE}
                      showSubDetail={false}
                    />
                  </GridItem>
                  {this.isEditing() && (
                    <GridItem xs>
                      <GridContainer justify="flex-end" spacing={0}>
                        <GridItem className={classes.deletBtn}>
                          {this.renderDeleteButton(id)}
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  )}
                </GridContainer>
              </GridItem>
            ))}
          </GridContainer>
        </GridItem>
      </React.Fragment>
    );
  };

  renderPaxContentAvatar = () => {
    const { occupantIds, participantId, showFullPaxdetail } = this.props;
    const ids = occupantIds.filter(id => id !== participantId);
    if (!ids.length) return this.renderNoPax();
    return (
      <GridContainer spacing={0}>
        {ids.map(id => (
          <GridItem>
            <GridContainer wrap="nowrap" justity="space-between">
              <GridItem>
                <Participant
                  id={id}
                  variant={LOGIC_HELPERS.ifElse(
                    showFullPaxdetail,
                    VARIANTS.ROW_SIMPLE,
                    VARIANTS.AVATAR_ONLY,
                  )}
                  showSubDetail={false}
                />
                {/* {this.renderDeleteButton(id, true)} */}
              </GridItem>
              {/* <GridItem>{this.renderDeleteButton(id)}</GridItem> */}
            </GridContainer>
          </GridItem>
        ))}
        {/* <GridItem>
          <CreateButton
            className={classes.createButton}
            title="Add Pax"
            onClick={this.openAddPax}
          />
        </GridItem> */}
      </GridContainer>
    );
  };

  renderPaxContentFiltered = () => {
    const { occupantIds, participantId, classes } = this.props;
    const ids = occupantIds.filter(id => id !== participantId);
    if (!ids.length) return this.renderNoPax(false, true);
    return (
      <GridContainer direction="column">
        {ids.map(id => (
          <GridItem>
            <GridContainer wrap="nowrap" justity="space-between">
              <GridItem>
                <Participant
                  id={id}
                  variant={VARIANTS.ROW_SIMPLE}
                  showSubDetail={false}
                />
              </GridItem>
              {/* <GridItem>{this.renderDeleteButton(id)}</GridItem> */}
              <GridItem xs>
                <GridContainer justify="flex-end" spacing={0}>
                  <GridItem className={classes.deletBtn}>
                    {this.renderDeleteButton(id)}
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
        ))}
      </GridContainer>
    );
  };

  onEditSuccess = data => {
    const { roomType } = data;
    const { selectedRoomType } = this.props;
    if (
      !selectedRoomType.length ||
      selectedRoomType.includes(DEFAULT_ROOM_FILTER)
    )
      return;

    if (roomType) {
      this.props.resaga.setValue({
        selectedRoomType: [roomType],
      });
    }
  };

  deleteRoom = ({ onClick }) => {
    const { classes } = this.props;
    return (
      <Button
        color="alert"
        size="xs"
        className={classes.smallText}
        onClick={onClick}
        title="Remove this room, and if there are any allocated guests, place them in another room"
      >
        <GridContainer alignItems="center" noWrap>
          {/* <GridItem>
            <Icon size="xsmall" icon="lnr-trash" bold />
          </GridItem> */}
          <GridItem className={classes.textNoWrap}>Delete Room</GridItem>
        </GridContainer>
      </Button>
    );
  };

  cardHeader = () => {
    const { id, classes } = this.props;
    return (
      <GridItem>
        <div
          className={classnames(
            this.isFull() && classes.cardHeaderFull,
            classes.subtitle,
          )}
        >
          <GridContainer
            alignItems="baseline"
            className={classes.cardHeader}
            noWrap
          >
            {this.isFull() && (
              <GridItem>
                <Icon
                  icon="lnr-lock"
                  size="lg"
                  color="alert"
                  title="Room is full"
                />
              </GridItem>
            )}
            <GridItem className="j-text-ellipsis" xs>
              <RoomType
                id={id}
                variant={VARIANTS.POPPER}
                editable={this.isEditing()}
                onSuccess={this.onEditSuccess}
                ellipsis
              />
            </GridItem>
            {this.renderHeaderButton()}
          </GridContainer>
        </div>
      </GridItem>
    );
  };

  roomContent = () => {
    const { id, classes } = this.props;
    return (
      <GridItem>
        <GridContainer direction="column">
          <GridItem>
            <Description
              id={id}
              placeholder="Describe this room if needed"
              editable={this.isEditing()}
            >
              {this.renderDescription}
            </Description>
          </GridItem>
          <GridItem>
            <GridContainer spacing={0} wrap="nowrap" justify="space-between">
              <GridItem>
                <GridContainer spacing={0} wrap="nowrap">
                  <GridItem>
                    <Icon icon="lnr-user" size="xsmall" paddingRight />
                  </GridItem>
                  <GridItem className="j-text-ellipsis">Guest Count </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem className={classes.editable}>
                <GuestCount id={id} readOnly={!this.isEditing()} noLabel />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <GridContainer spacing={0} wrap="nowrap" justify="space-between">
              <GridItem>
                <GridContainer spacing={0} wrap="nowrap">
                  <GridItem>
                    <Icon icon="lnr-bed" size="xsmall" paddingRight />
                  </GridItem>
                  <GridItem className="j-text-ellipsis">Bed Count </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem className={classes.editable}>
                <BedCount id={id} readOnly={!this.isEditing()} noLabel />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderActionButton = () => {
    const { classes, paxLabel } = this.props;
    return (
      <Can do="create" on={ROOM}>
        <React.Fragment>
          <GridItem>
            <GridContainer justify="space-between" noWrap>
              <GridItem>
                <Button
                  color="primary"
                  size="xs"
                  className={classes.smallText}
                  onClick={this.openAddPax}
                  title={`Add or remove ${paxLabel} from this room`}
                >
                  <GridContainer alignItems="center" noWrap>
                    {/* <GridItem>
                      <Icon size="xsmall" icon="lnr-user" bold />
                    </GridItem> */}
                    <GridItem className="j-text-ellipsis">
                      {/* Add/Remove {paxLabel} */}
                      Allocate Room
                    </GridItem>
                  </GridContainer>
                </Button>
              </GridItem>
              {/* <GridItem>
                <DeleteNode
                  id={id}
                  parentId={parentNodeId}
                  childKey="rooms"
                  onSuccess={this.handleDeleteRoom}
                  variant={VARIANTS.RENDER_PROP}
                  showIcon={false}
                >
                  {this.deleteRoom}
                </DeleteNode>
              </GridItem> */}
            </GridContainer>
          </GridItem>
        </React.Fragment>
      </Can>
    );
  };

  renderDefault = () => {
    const { classes, occupantIds } = this.props;
    return (
      <GridItem xs={12} md={4}>
        <div className={classnames(classes.grid, classes.tourGrid)}>
          <GridContainer
            direction="column"
            spacing={0}
            className={classnames(classes.card)}
          >
            {this.cardHeader()}
            {this.roomContent()}
            <GridItem>
              <Hr />
            </GridItem>
            <GridItem className={!occupantIds.length && classes.center}>
              {this.renderPaxcontentByAgeType()}
            </GridItem>
            <GridItem>
              {this.isEditing() && !this.isFull() && (
                <React.Fragment>
                  <Hr />
                  {this.renderActionButton()}
                </React.Fragment>
              )}
            </GridItem>
          </GridContainer>
        </div>
      </GridItem>
    );
  };

  renderList = () => {
    const { occupantIds, id, classes, smDown } = this.props;
    const firstCell = (
      <GridContainer wrap="nowrap">
        <Can do="create" on={ROOM}>
          <GridItem>
            <Button
              color="primary"
              variant={VARIANTS.INLINE}
              dense
              size="xs"
              className={classes.addBtnList}
              onClick={this.openAddPax}
              title={`Add/Edit ${this.props.paxLabel}`}
            >
              <GridContainer alignItems="center">
                <GridItem>
                  <Icon size="xsmall" icon="lnr-plus" bold />
                </GridItem>
              </GridContainer>
            </Button>
          </GridItem>
        </Can>
        <GridItem>
          <RoomType
            id={id}
            variant={VARIANTS.POPPER}
            editable={ability.can('execute', this.room)}
          />
        </GridItem>
      </GridContainer>
    );
    if (!occupantIds.length) {
      return (
        <TableRow>
          <TableCell className={classes.tableCellPadding}>
            {firstCell}
          </TableCell>
          <TableCell
            className={classes.tableCellPadding}
            colSpan={LOGIC_HELPERS.ifElse(smDown, 0, 2)}
          >
            {this.renderNoPax(true)}
          </TableCell>
          <TableCell />
          {!smDown && <TableCell />}
        </TableRow>
      );
    }
    return (
      <React.Fragment>{this.roomPaxContentList(firstCell)}</React.Fragment>
    );
  };

  roomPaxContentList = firstCol => {
    const { occupantIds, classes } = this.props;
    if (!occupantIds.length) {
      return null;
    }
    return (
      <React.Fragment>
        {occupantIds.map((itemId, index) => (
          <TableRow>
            <TableCell className={classes.tableCellPadding}>
              {LOGIC_HELPERS.ifElse(index === 0, firstCol, null)}
            </TableCell>
            <Participant
              id={itemId}
              variant={VARIANTS.TABLE}
              showSubDetail={false}
            />
            <TableCell
              padding="halfLeftRight"
              className={classes.tableCellPadding}
            >
              {this.renderDeleteButton(itemId)}
            </TableCell>
          </TableRow>
        ))}
      </React.Fragment>
    );
  };

  renderEditable = () => {
    const { id } = this.props;
    if (!id) return null;
    return (
      <GridContainer direction="column" card>
        <GridItem>
          <RoomType
            id={id}
            variant={VARIANTS.POPPER}
            editable={ability.can('execute', this.room)}
          />
        </GridItem>
        <Hr />
        {/* {this.roomPaxContentCard()} */}
        {this.renderPaxcontentByAgeType()}
        <Hr />
        <GridItem xs />
      </GridContainer>
    );
  };

  isFull = () => {
    const { guestCount, occupantIds } = this.props;
    if (!guestCount) return false;
    return occupantIds.length >= guestCount;
  };

  isOthers = () => this.props.roomType === ROOM_OTHERS;

  renderLabel = () => (
    <JText italic blue>
      Change Room Type
    </JText>
  );

  renderChangeRoom = () => {
    const { occupantIds, id } = this.props;
    return (
      <RoomType
        id={id}
        variant={VARIANTS.POPPER}
        editable={ability.can('execute', this.room)}
        renderLabel={this.renderLabel}
        showLabel={false}
        showOthers
        handleOnSubmit={
          occupantIds.length > 1 ? this.handleRelocateParticipant : null
        }
      />
    );
  };

  renderSelect = () => {
    const {
      id,
      occupantLabel,
      classes,
      guestCount,
      bedCount,
      paxLabel,
    } = this.props;
    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer spacing={0} direction="column">
            <GridItem>
              <RoomType
                id={id}
                variant={NODE_PROP}
                editable={ability.can('execute', this.room)}
              />
            </GridItem>
            {!!guestCount && (
              <GridItem>
                <JText sm gray italic bold>
                  {`Guest( ${guestCount}) Bed( ${bedCount})`}
                </JText>
              </GridItem>
            )}
          </GridContainer>
        </GridItem>
        <GridItem>{this.renderChangeRoom()}</GridItem>
        {(!guestCount || guestCount > 1) && (
          <React.Fragment>
            <Hr halfMarginBottom halfMarginTop />
            {occupantLabel && <GridItem>{occupantLabel}</GridItem>}
            <GridItem>{this.renderPaxContentFiltered()}</GridItem>
          </React.Fragment>
        )}
        {!this.isFull() && (
          <GridItem>
            <Button
              color="primary"
              size="xs"
              className={classes.smallText}
              onClick={this.openAddPax}
            >
              <GridContainer alignItems="center">
                <GridItem>
                  <Icon size="xsmall" icon="lnr-user" bold />
                </GridItem>
                <GridItem>Add {paxLabel} to room with</GridItem>
              </GridContainer>
            </Button>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderRowSimple = () => (
    <GridItem>
      <GridContainer spacing={0} direction="column">
        {this.renderTextOnly()}
        <GridItem>{this.renderPaxContentAvatar()}</GridItem>
      </GridContainer>
    </GridItem>
  );

  renderCard = () => {
    const { occupantIds, participantId, classes } = this.props;
    const ids = occupantIds.filter(id => id !== participantId);
    // if (!ids.length) return this.renderNoPax();

    return (
      <GridContainer spacing={0} direction="column">
        <GridItem className={classes.labelCard}>
          <GridContainer wrap="nowrap">
            <GridItem>
              <Icon icon="lnr-bed" size="extraSmall" color="darkGray" />
            </GridItem>
            {this.renderTextOnly()}
          </GridContainer>
        </GridItem>
        {!ids.length && (
          <JText md italic gray>
            Room not shared yet.
          </JText>
        )}
        {!!ids.length && (
          <GridItem className={classes.subPaddingLeft}>
            <GridContainer alignItems="center">
              {ids.map(participant => (
                <GridItem xs={12} md={4} key={`${participant}`}>
                  <GridContainer alignItems="center" wrap="nowrap">
                    <GridItem xs>
                      <GridContainer
                        alignItems="center"
                        card
                        elevation={1}
                        wrap="nowrap"
                      >
                        <GridItem>
                          <Name id={participant} variant={VARIANTS.AVATAR} />
                        </GridItem>
                        <GridItem>
                          <JText bold>
                            <Name
                              id={participant}
                              variant={VARIANTS.TEXT_ONLY}
                            />
                          </JText>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              ))}
            </GridContainer>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderMenuItem = () => {
    const { id, classes, menuItemClick, occupantIds } = this.props;
    return (
      <MenuItem
        onClick={menuItemClick(id)}
        className={classes.menuItem}
        disabled={this.isFull()}
      >
        <GridContainer spacing={0} direction="column" wrap="nowrap">
          <GridItem>
            <GridContainer spacing={0} direction="row" wrap="nowrap">
              {this.renderTextOnly()}
              <GridItem className={classes.spacer}>
                <JText
                  sm
                  link
                  underline
                  blue
                  textCenter
                  italic
                  onClick={this.toggleShowPaxDetail}
                >
                  {`${this.props.paxLabel} (${occupantIds.length})`}
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
          {this.state.showPaxDetail && (
            <GridItem>{this.renderPaxContentAvatar()}</GridItem>
          )}
        </GridContainer>
      </MenuItem>
    );
  };

  renderTextOnly = () => {
    const { id } = this.props;
    return (
      <GridItem>
        <RoomType
          id={id}
          variant={VARIANTS.TEXT_ONLY}
          editable={ability.can('execute', this.room)}
        />
      </GridItem>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [LIST]: this.renderList,
      [VARIANTS.EDITABLE]: this.renderEditable,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.ROW_SIMPLE]: this.renderRowSimple,
      [VARIANTS.SELECT_FIELD]: this.renderSelect,
      [VARIANTS.MENU_ITEM]: this.renderMenuItem,
      [VARIANTS.CARD_ITEM]: this.renderCard,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Room.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  variant: PropTypes.string,
  id: PropTypes.number,
  parentNodeId: PropTypes.number,
  editable: PropTypes.bool,
  occupantLabel: PropTypes.string,
  participantId: PropTypes.number, // this is use to exempt from current selection
  menuItemClick: PropTypes.func,
  // resaga props
  createdBy: PropTypes.number,
  occupantIds: PropTypes.array,
  ageTypeValues: PropTypes.array,
  guestCount: PropTypes.number,
  roomType: PropTypes.string,
  paxLabel: PropTypes.string,
  bedCount: PropTypes.number,
  showFullPaxdetail: PropTypes.bool,
  selectedRoomType: PropTypes.array,
};

Room.defaultProps = {
  variant: '',
  occupantIds: [],
  ageTypeValues: [],
  selectedRoomType: [],
  showFullPaxdetail: false,
};

export default compose(
  withStyles(styles, { name: 'Room' }),
  resaga(CONFIG),
  resaga(CONFIG2),
  resaga(CONFIG3),
  withSMDown,
)(Room);

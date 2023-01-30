import React, { useEffect } from 'react';
import _ from 'lodash';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import withResaga from 'resaga';
import { isMobile } from 'react-device-detect';
import { makeStyles } from 'components/material-ui';
import { useImmer } from 'use-immer';
import Loading from 'react-loading';
import InfiniteLoader from 'react-window-infinite-loader';
import classNames from 'classnames';
import { URL_HELPERS } from 'appConstants';
import { useHistory } from 'react-router-dom';
import Dialog from '../../../../components/Dialog';
import DialogTitle from '../../../../components/Dialog/UGDialogTitle';
import DialogContent from '../../../../components/Dialog/UGDialogContent';
import { CONFIG } from './config';
import { PORTAL_HELPERS } from '../../helpers';
import {
  CloseButton,
  Title,
} from '../../../../ugcomponents/DialogForm/Complex';
import GridContainer from '../../../../components/GridContainer';
import GridItem from '../../../../components/GridItem';
import Button from '../../../../viewComponents/Button';
import {
  useFetchNode,
  useTemplateGraph,
} from '../../../../graphqlRequest/templateGraphql';
import JText from '../../../../components/JText';
import RenderAvatar from '../../../../smartComponents/Messenger/components/ChannelDetail/components/renderAvatar';
import { NameUtility } from '../../../../utils/displayNameUtility';
import { MOMENT_HELPERS } from '../../../../utils/helpers/moment';
import {
  useFetchPeopleData,
  usePersonGraph,
} from '../../../../graphqlRequest/personGraphql';
import { isEmptyString } from '../../../../utils/stringAdditions';
import MenuItem from '../../../../components/Popper/components/MenuItem';
import Popper from '../../../../components/Popper';
import {
  CLONE_PARTICIPANT,
  GET_TEMPLATE_DETAIL,
  NODE_API,
  TEMPLATE_API,
} from '../../../../apis/constants';
import { TEMPLATE_API_HELPERS } from '../../../../apis/components/Template/helpers';
import SnackbarHelper from '../../../../ugcomponents/SnackBar/helpers';
import { ListWithStickyCells } from '../../../../viewComponents/ListWithStickHeader';
import { VARIANTS } from '../../../../variantsConstants';
/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-shadow,no-unused-vars
const styles = ({ isMobile }) => ({ colors }) => ({
  heading: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.metallicGray,
  },
  Odd: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    borderBottom: '1px solid #d9dddd',
  },
  Even: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    borderBottom: '1px solid #d9dddd',
  },
  LastUpdateStyle: {
    textAlign: 'left',
  },
  LoadingStyle: {
    alignItems: 'center',
  },
  columnStyle: {
    minWidth: 155,
    maxWidth: 155,
    margin: 'auto',
    padding: '0px !important',
    paddingRight: '15px !important',
  },
  mediumColumnStyle: {
    minWidth: 175,
    margin: 'auto',
    padding: '0px !important',
    paddingRight: '15px !important',
    textAlign: 'center',
  },
  largerColumnStyle: {
    minWidth: 245,
    maxWidth: 245,
    margin: 'auto',
    paddingRight: '10px !important',
    paddingLeft: '15px !important',
    textAlign: 'center',
  },
  fifthHeaderColumn: {
    width: 185,
    height: 30,
    paddingLeft: 20,
    left: 710,
  },
  fourthHeaderColumn: {
    width: 200,
    height: 30,
    paddingLeft: 17,
    left: 510,
  },
  thirdHeaderColumn: {
    width: 255,
    height: 30,
    paddingLeft: 17,
    left: 255,
    borderBottom: 0,
  },
  // secondHeaderColumn: {
  //   width: 180,
  //   height: 30,
  //   paddingLeft: 80,
  //   left: 140,
  // },
  headerColumn: {
    width: 260,
    height: 30,
    paddingLeft: 20,
    left: 0,
  },
  actionButton: {
    margin: 'auto',
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    zIndex: 3,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '20px 20px',
  },
  column: {
    position: 'absolute',
    flexDirection: 'row',
    zIndex: 4,
    display: 'flex',
    background: 'white',
    alignItems: 'center',
    borderBottom: '1px solid #d9dddd',
  },
  firstRow: {
    marginTop: 20,
  },
  goingStatusStyle: {
    marginLeft: 45,
  },
  nameStyle: {
    marginLeft: -5,
    marginRight: 30,
  },
  lastUpdateStyle: {
    marginLeft: 25,
  },
  tourInfo: {
    marginLeft: 3,
  },
});

const useStyles = props => makeStyles(styles(props));
const renderTitle = handleClose => (
  <>
    <Title />
    <CloseButton onClick={handleClose} />
  </>
);
const limitedItems = 5;
export const displayPhoneComponent = (participant, onClick) => {
  const makePhoneCall = phone => () => {
    if (onClick) {
      window.open(`tel:${phone}`);
    }
  };
  if (!isEmptyString(participant.phone)) {
    return (
      <GridItem>
        <GridContainer spacing={0} alignItems="center">
          <GridItem>
            <Button
              icon="telephone"
              iconButton
              color="inline"
              size="xxxs"
              noMargin
              noPadding
              data-testid="phoneButton"
              onClick={makePhoneCall(participant.phone)}
            />
          </GridItem>
          <GridItem>
            <JText halfPaddingLeft gray ellipsis sm>
              {participant.phone}
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  }
  return <GridItem />;
};
export const displayTourStartDate = participant => {
  if (
    participant.ugroopnodeByParentnodeid.ugroopnodeByParentnodeid
      .templatesByParentnodeid.nodes
  ) {
    const customData =
      participant.ugroopnodeByParentnodeid.ugroopnodeByParentnodeid
        .templatesByParentnodeid.nodes[0];
    const date = customData.startdate;
    const displaydate = customData.displaydate;
    if (date && displaydate === 'startDate') {
      return (
        <GridItem data-testid="tourStartDate">
          <JText gray ellipsis sm>
            {MOMENT_HELPERS.renderDate(date)}
          </JText>
        </GridItem>
      );
    }
  }
  return <GridItem />;
};
export const displayBirthDate = (personData, participant) => {
  let date = participant.dob;
  if (personData && personData.birthdate) {
    date = personData.birthdate;
  }
  if (date) {
    return (
      <JText gray ellipsis sm>
        DOB: {MOMENT_HELPERS.renderDateShorter(date)}
      </JText>
    );
  }
  return '';
};
export const displayGender = personData => {
  if (personData && personData.gender) {
    return (
      <JText gray ellipsis sm>
        Gender: {personData.gender}
      </JText>
    );
  }
  return '';
};

export function ParticipantLists(props) {
  const { orgId, email, tourId, resaga, viewOnly } = props;
  const classes = useStyles({ isMobile })();
  const history = useHistory();
  const [result, setResult] = useImmer({
    data: [],
    templateIds: [],
    tourGoingStatus: {},
  });
  const [state, setState] = useFetchNode({
    limitedItems,
    sort: 'EMAIL_ASC__LASTUPDATE_DESC__LASTNAME_ASC',
  });
  const [personQueryState, setPersonQueryState] = useFetchPeopleData();
  const [nodeQueryState, setNodeQueryState] = useFetchNode({
    limitedItems: null,
    sort: 'ID_ASC',
  });
  const nodesQuery = useTemplateGraph(state.gqlQueryNodes, {
    // To get number of people going query
    filter: nodeQueryState.filter,
    limited: nodeQueryState.limited,
    after: nodeQueryState.endCursor,
    sort: nodeQueryState.sort,
  });
  const templateGraphQuery = useTemplateGraph(state.gqlQueryWithTemplateData, {
    filter: state.filter,
    limited: state.limited,
    after: state.endCursor,
    sort: state.sort,
  });
  const personGraphQuery = usePersonGraph(personQueryState.gqlQuery, {
    filter: personQueryState.filter,
    limited: personQueryState.limited,
    after: personQueryState.endCursor,
    sort: personQueryState.sort,
  });
  const { data, error } = templateGraphQuery || {};
  const { data: NodeData } = nodesQuery || {};
  const edges = data && data.participants.edges;

  const nodeEdges = NodeData && NodeData.ugroopnodes.edges;
  const pageInfo = data && data.participants.pageInfo;
  const { data: PersonData } = personGraphQuery || {};
  const totalCount =
    pageInfo && pageInfo.hasNextPage
      ? result.data.length + 2
      : result.data.length;
  useEffect(() => {
    if (orgId && email) {
      setState(draft => {
        draft.filter = {
          and: [{ orgid: { equalTo: orgId } }, { email: { equalTo: email } }],
        };
        draft.loading = true;
      });
    }
  }, [orgId, email]);

  useEffect(() => {
    if (edges && edges.length > 0) {
      const ids = edges.map(o => o.node.ugroopnodeByParentnodeid.parentnodeid);
      const uniqueIds = _.uniq(ids);
      setState(draft => {
        draft.loadingMore = false;
        draft.loading = false;
      });
      setResult(draft => {
        draft.data.push(...edges);
        draft.templateIds.push(...uniqueIds);
      });
    }
  }, [edges]);

  useEffect(() => {
    if (result.data && result.data.length > 0) {
      setPersonQueryState(draft => {
        draft.filter = {
          nodeid: { in: result.data.map(o => o.node.parentnodeid) },
        };
      });
    }
  }, [result.data]); // mutate the expected result

  useEffect(() => {
    if (result.templateIds && result.templateIds.length > 0) {
      setNodeQueryState(draft => {
        draft.filter = {
          and: [
            { type: { equalTo: 'participant' } },
            {
              parentnodeid: { in: result.templateIds },
            },
            {
              status: { equalTo: 'confirmed' },
            },
          ],
        };
      });
    }
  }, [result.templateIds]);

  useEffect(() => {
    if (nodeEdges && nodeEdges.length > 0) {
      const groupByData = _.groupBy(nodeEdges, o => o.node.parentnodeid);
      setResult(draft => {
        draft.tourGoingStatus = groupByData;
      });
    }
  }, [nodeEdges]);

  const displayLoadMore = () => (
    <div
      style={{
        display: state.loadingMore ? 'block' : 'none',
        width: 300,
      }}
    >
      <Loading type="bubbles" height="30px" width="30px" />
    </div>
  );

  const displayGoingStatus = participant => {
    let label = 'MayBe';
    if (participant.node.ugroopnodeByParentnodeid) {
      const status = participant.node.ugroopnodeByParentnodeid.status;
      if (!isEmptyString(status)) {
        if (status === 'confirmed') {
          label = 'Going';
        } else {
          label = 'Not Going';
        }
      }
    }
    return (
      <GridItem>
        <JText sm gray>
          {label}
        </JText>
      </GridItem>
    );
  };

  const displayTourGoingStatus = participant => {
    if (participant.node.ugroopnodeByParentnodeid.parentnodeid) {
      const templateId = participant.node.ugroopnodeByParentnodeid.parentnodeid;
      const array = result.tourGoingStatus[templateId];
      if (array && array.length > 0) {
        return (
          <GridItem>
            <JText sm gray>
              {array.length} going in total
            </JText>
          </GridItem>
        );
      }
    }
    return <GridItem />;
  };

  const redirectTour = ({ id, participantId }) => () => {
    if (tourId === id) {
      resaga.setValue({
        participantViewOpen: true,
        participantViewId: participantId,
      });
      return handleClose();
    }
    const link = `${URL_HELPERS.tours(id)}?participant=${participantId}`;
    history.push(link);
    return handleClose();
  };

  const RowItemButton = (name, participant, personData, index) => ({
    // eslint-disable-next-line react/prop-types
    openMenu: om,
  }) => (
    <Button
      noPadding
      noMargin
      variant={VARIANTS.BORDERLESS}
      onClick={om}
      data-testid="paxRowButton"
    >
      <GridContainer
        noWrap
        spacing={0}
        style={index === 0 ? { marginTop: 20 } : {}}
      >
        <GridItem data-testid="paxRow" className={classes.row}>
          <GridContainer spacing={4} noWrap alignItems="center">
            <GridItem>{RenderAvatar(null, name, false, 'md')}</GridItem>
            <GridItem
              className={classNames(classes.columnStyle, classes.nameStyle)}
            >
              <GridContainer
                spacing={0}
                direction="column"
                alignItems="flex-start"
              >
                <GridItem data-testid="nameDisplay">
                  <JText black bold nowrap={false} ellipsis2 textLeft>
                    {NameUtility.userDisplayName({
                      firstName: participant.node.firstname,
                      lastName: participant.node.lastname,
                      knownAs: name,
                    })}
                  </JText>
                </GridItem>
                <GridItem>
                  {displayBirthDate(personData, participant.node)}
                </GridItem>
                <GridItem>{displayGender(personData)}</GridItem>
                <GridItem>
                  {displayPhoneComponent(participant.node, true)}
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem
              className={classNames(
                classes.largerColumnStyle,
                classes.tourInfo,
              )}
            >
              <GridContainer
                direction="column"
                alignItems="flex-start"
                spacing={0}
              >
                <GridItem>
                  <Button
                    variant="inline"
                    noMargin
                    noPadding
                    onClick={redirectTour({
                      id:
                        participant.node.ugroopnodeByParentnodeid
                          .ugroopnodeByParentnodeid.id,
                      participantId: participant.node.parentnodeid,
                    })}
                  >
                    <JText black bold link textLeft ellipsis2>
                      {
                        participant.node.ugroopnodeByParentnodeid
                          .ugroopnodeByParentnodeid.content
                      }
                    </JText>
                  </Button>
                </GridItem>
                {displayTourStartDate(participant.node)}
              </GridContainer>
            </GridItem>
            <GridItem
              className={classNames(
                classes.columnStyle,
                classes.lastUpdateStyle,
              )}
            >
              <GridContainer
                direction="column"
                alignItems="flex-start"
                spacing={0}
              >
                <GridItem />
                <GridItem>
                  <JText gray ellipsis>
                    {MOMENT_HELPERS.timeSinceAtLeast(
                      participant.node.lastupdate,
                      false,
                      undefined,
                      {
                        postfix: ' ago',
                      },
                    )}
                  </JText>
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem
              className={classNames(
                classes.columnStyle,
                classes.goingStatusStyle,
              )}
            >
              <GridContainer
                direction="column"
                alignItems="flex-start"
                justify="flex-start"
                spacing={0}
              >
                {displayGoingStatus(participant)}
                {displayTourGoingStatus(participant)}
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </Button>
  );

  const cloneParticipant = index => () => {
    const clickParticipant = result.data[index];
    resaga.dispatchTo(NODE_API, CLONE_PARTICIPANT, {
      payload: {
        id: clickParticipant.node.parentnodeid,
        data: {
          templateId: tourId,
        },
      },
      onSuccess: response => {
        resaga.dispatchTo(TEMPLATE_API, GET_TEMPLATE_DETAIL, {
          payload: { id: tourId },
        });
        TEMPLATE_API_HELPERS.getParticipants(
          { id: tourId, ids: [response.participantNodeClone.parentNodeId] },
          { resaga },
        );
        return SnackbarHelper.openSuccessSnackbar('Added Successfully', resaga);
      },
      onError: errorResponse =>
        SnackbarHelper.openErrorSnackbar(JSON.stringify(errorResponse), resaga),
    });
  };

  const addParticipantRequest = (closeMenu, index) => () => {
    cloneParticipant(index)();
    closeMenu();
  };

  const makeCall = phone => () => {
    window.open(`tel:${phone}`);
  };

  // eslint-disable-next-line react/prop-types
  const RowMoreOptions = index => ({ closeMenu }) => {
    const rowData = result.data[index];
    const participant = rowData || {};
    let phoneMenu;
    let addMenu;
    if (!isEmptyString(participant.node.phone)) {
      phoneMenu = (
        <MenuItem key="phone" onClick={makeCall(participant.node.phone)}>
          Call
        </MenuItem>
      );
    }
    if (!viewOnly) {
      addMenu = (
        <MenuItem key="Add" onClick={addParticipantRequest(closeMenu, index)}>
          Add
        </MenuItem>
      );
    }
    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          {addMenu}
          <MenuItem
            key="View Tour"
            onClick={redirectTour({
              id:
                participant.node.ugroopnodeByParentnodeid
                  .ugroopnodeByParentnodeid.id,
              participantId: participant.node.parentnodeid,
            })}
          >
            View in itinerary
          </MenuItem>
          {phoneMenu}
        </GridItem>
      </GridContainer>
    );
  };

  const applyRowStyle = index => (index % 2 ? classes.Odd : classes.Even);
  // eslint-disable-next-line react/prop-types
  const Row = rowProps => {
    if (rowProps.rowIndex === 0) {
      return headers();
    }
    const index = rowProps.index;
    const style = rowProps.style;
    const rowData = result.data[index];
    const participant = rowData;
    if (participant) {
      const personData =
        PersonData &&
        PersonData.people.edges.find(
          o => o.node.nodeid === participant.node.parentnodeid,
        );
      const name = personData
        ? personData.node.knownas
        : NameUtility.userDisplayName(participant.node);

      return (
        <div className={applyRowStyle(index)} style={style}>
          <Popper
            noPadding
            renderButton={RowItemButton(name, participant, personData, index)}
            placement="right-end"
          >
            {RowMoreOptions(index)}
          </Popper>
        </div>
      );
    }
    return null;
  };

  const loadMoreItems = () => {
    if (pageInfo && pageInfo.hasNextPage && !state.loadingMore) {
      // eslint-disable-next-line no-return-assign
      setState(draft => {
        draft.endCursor = pageInfo.endCursor;
        draft.loadingMore = true;
      });
    }
  };
  const getItemSize = index => {
    if (index === 0) {
      return 130;
    }
    return 100;
  };

  const isItemLoaded = index => index <= result.data.length;
  const contactLists = () => {
    if (error) {
      return (
        <JText warning>Oops, something went wrong, please try it again.</JText>
      );
    }
    if (state.loading) {
      return <JText bold>Loading...</JText>;
    }
    const lists = result.data;
    if (lists.length > 0) {
      return (
        <>
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={totalCount}
            loadMoreItems={loadMoreItems}
            threshold={1}
            minimumBatchSize={1}
          >
            {({ onItemsRendered, ref }) => (
              <ListWithStickyCells
                ref={ref}
                itemCount={totalCount}
                onItemsRendered={onItemsRendered}
                itemSize={getItemSize}
                rowHeight={getItemSize}
                height={450}
                width="auto"
              >
                {Row}
              </ListWithStickyCells>
            )}
          </InfiniteLoader>
          {displayLoadMore()}
        </>
      );
    }
    return <JText bold>Found no data</JText>;
  };

  const handleClose = () => {
    PORTAL_HELPERS.close(props);
  };

  const headers = () => {
    const lists = result.data;
    if (lists.length > 0) {
      return (
        <div spacing={0} alignItems="center" className={classes.stickyHeader}>
          <div className={classNames(classes.column, classes.headerColumn)}>
            <JText gray bold>
              Person Info
            </JText>
          </div>
          <div
            className={classNames(classes.column, classes.thirdHeaderColumn)}
          >
            <JText gray bold>
              Tour Info
            </JText>
          </div>
          <div
            className={classNames(classes.column, classes.fourthHeaderColumn)}
          >
            <JText gray bold>
              Last Updated
            </JText>
          </div>
          <div
            className={classNames(classes.column, classes.fifthHeaderColumn)}
          >
            <JText gray bold>
              Going Status
            </JText>
          </div>
        </div>
      );
    }
    return '';
  };

  return (
    <Dialog maxWidth="md" fullWidth open onClose={handleClose}>
      <DialogTitle noPaddingBottom>{renderTitle(handleClose)}</DialogTitle>
      <DialogContent halfPaddingTop>
        <GridContainer direction="column" spacing={1}>
          <GridItem>{contactLists()}</GridItem>
        </GridContainer>
      </DialogContent>
    </Dialog>
  );
}

ParticipantLists.propTypes = {
  email: PropTypes.string,
  orgId: PropTypes.number,
  tourId: PropTypes.any,
  resaga: PropTypes.any,
  viewOnly: PropTypes.bool,
};

ParticipantLists.defaultProps = {
  viewOnly: false,
};

export default compose(withResaga(CONFIG))(
  injectIntl(React.memo(ParticipantLists)),
);

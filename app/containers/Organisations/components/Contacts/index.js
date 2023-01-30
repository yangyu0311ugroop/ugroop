import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'components/Container';
import Loading from 'react-loading';
import classNames from 'classnames';
import withResaga from 'resaga';
import { useHistory } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import { useParticipantRequest } from '../../../../hooks/useParticipantRequestHook';
import Form from '../../../../ugcomponents/Form';
import GridContainer from '../../../../components/GridContainer';
import GridItem from '../../../../components/GridItem';
import { isEmptyString } from '../../../../utils/stringAdditions';
import Button from '../../../../viewComponents/Button';
import { VARIANTS } from '../../../../variantsConstants';
import Popper from '../../../../components/Popper';
import { makeStyles } from '../../../../components/material-ui';
import Icon from '../../../../ugcomponents/Icon';
import MenuItem from '../../../../components/Popper/components/MenuItem';
import JText from '../../../../components/JText';
import { NameUtility } from '../../../../utils/displayNameUtility';
import RenderAvatar from '../../../../smartComponents/Messenger/components/ChannelDetail/components/renderAvatar';
import { MOMENT_HELPERS } from '../../../../utils/helpers/moment';
import { PORTAL_HELPERS } from '../../../Portal/helpers';
import FindPaxSearch from '../../../Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabCustom/components/TabPeople/components/AddParticipantFromContact/findPaxSearch';
import ParticipantSortButton from '../../../Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabCustom/components/TabPeople/components/AddParticipantFromContact/participantSortButton';
import {
  displayBirthDate,
  displayGender,
  displayPhoneComponent,
  displayTourStartDate,
} from '../../../Portal/components/ParticipantList/participantLists';
import { CONFIG } from '../../../Portal/components/ParticipantList/config';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { ListWithStickyCells } from '../../../../viewComponents/ListWithStickHeader';
import { URL_HELPERS } from '../../../../appConstants';
import JDialog from '../../../../ugcomponents/JDialog';
import {
  GET_PARTICIPANTS,
  GET_PEOPLE,
  TEMPLATE_API,
} from '../../../../apis/constants';
import { Participant } from '../../../../smartComponents/Node/types';
import { PARTICIPANT_ACCESS_LEVELS } from '../../../../utils/constants/people';
import {
  useFetchNode,
  useTemplateGraph,
} from '../../../../graphqlRequest/templateGraphql';
import { makeSingleSelect } from '../../../../datastore/selectUtility';
import { ORG_DATASTORE_RESELECTORS } from '../../../../datastore/orgStore/selectorsViaConnect';

const styles = ({ colors }) => ({
  List: {
    border: '1px solid #d9dddd',
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    zIndex: 3,
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
  row: {
    height: '50px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 25px',
    maxWidth: '250px',
  },
  Odd: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid #d9dddd',
  },
  Even: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid #d9dddd',
  },
  Input: {
    width: 200,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 10,
  },
  LastUpdateStyle: {
    textAlign: 'left',
  },
  LoadingStyle: {
    alignItems: 'center',
  },
  ContentContainer: {
    background: 'white',
    minHeight: 900,
    paddingLeft: 16,
    paddingRight: 16,
  },
  root: {
    // maxWidth: 700,
    margin: '0 auto',
    padding: '24px 0',
    width: '100%',
  },
  columnStyle: {
    minWidth: 180,
    margin: 'auto',
    padding: '0px !important',
    paddingRight: '15px !important',
  },
  mediumColumnStyle: {
    minWidth: 240,
    margin: 'auto',
    padding: '0px !important',
    paddingRight: '15px !important',
    textAlign: 'center',
  },
  largerColumnStyle: {
    minWidth: 300,
    margin: 'auto',
    padding: '0px !important',
    paddingRight: '15px !important',
    textAlign: 'center',
  },
  fourthHeaderColumn: {
    width: 310,
    height: 30,
    paddingLeft: 30,
    left: 770,
  },
  thirdHeaderColumn: {
    width: 350,
    height: 30,
    paddingLeft: 80,
    left: 420,
  },
  secondHeaderColumn: {
    width: 240,
    height: 30,
    paddingLeft: 80,
    left: 180,
  },
  headerColumn: {
    width: 180,
    height: 30,
    paddingLeft: 30,
    left: 0,
  },
  actionButton: {
    margin: 'auto',
  },
  dialogContent: {
    background: colors.lightGray,
    padding: 4,
  },
  headerCenter: {
    textAlign: 'center',
  },
});
const itemPage = 50;
/* eslint-disable no-param-reassign */
const useStyles = makeStyles(styles);
export function Contacts(props) {
  const { orgId, resaga, itemPerPage } = props;
  const orgType = useSelector(store =>
    makeSingleSelect(ORG_DATASTORE_RESELECTORS.getOrgType)(store, {
      id: orgId,
    }),
  );

  const orgPreferenceId = useSelector(store =>
    makeSingleSelect(ORG_DATASTORE_RESELECTORS.getOrgPreference)(store, {
      id: orgId,
    }),
  );

  const paxLabel = useSelector(store =>
    makeSingleSelect(ORG_DATASTORE_RESELECTORS.getPaxLabel)(store, {
      id: orgPreferenceId,
    }),
  );

  const [stateDialog, setStateDialog] = useImmer({
    open: false,
    loading: false,
    selectPaxData: {
      id: -1,
      personId: -1,
      templateId: -1,
      tourName: '',
      tourDate: '',
      roomType: '',
      travelGroup: '',
      travelWith: [],
    },
  });
  const [noPersonDataDialog, setNoPersonDataDialog] = useImmer({
    open: false,
  });
  const classes = useStyles();
  const items = itemPerPage || itemPage;
  const {
    result,
    setResult,
    personQueryResult,
    state,
    error,
    setState,
    pageInfo,
    setPersonQueryState,
  } = useParticipantRequest({
    orgId,
    itemsPerPage: items,
    queryName: 'gqlQueryWithTemplateData',
  });

  const [nodeMultiFilter, setNodeMultiFilter] = useFetchNode();

  const participantRoomTravelData = useTemplateGraph(
    nodeMultiFilter.gqlQueryParticipantRoomTravelGroup,
    {
      filter: nodeMultiFilter.filter,
    },
  );

  useEffect(() => {
    if (participantRoomTravelData && participantRoomTravelData.data) {
      const travelGroup =
        participantRoomTravelData.data.ugroopnodes.edges[0].node
          .linksByPrevnodeid.nodes;
      if (travelGroup && travelGroup.length > 0) {
        const tg =
          travelGroup[0].ugroopnodeByNextnodeid.groupsByParentnodeid.nodes;
        if (tg.length > 0) {
          setStateDialog(draft => {
            draft.selectPaxData.travelGroup =
              tg[0].ugroopnodeByParentnodeid.content;
          });
          const pnodes = tg[0].ugroopnodeByParentnodeid.linksByNextnodeid.nodes.map(
            o => o.ugroopnodeByPrevnodeid.participantsByParentnodeid.nodes[0],
          );
          setStateDialog(draft => {
            draft.selectPaxData.travelWith = pnodes;
          });
        }
      }

      const room =
        participantRoomTravelData.data.ugroopnodes.edges[0].node
          .linksByNextnodeid.nodes;
      if (room && room.length > 0) {
        setStateDialog(draft => {
          draft.selectPaxData.roomType =
            room[0].occupantsByLinkid.nodes[0].linkByLinkid.ugroopnodeByPrevnodeid.roomsByParentnodeid.nodes[0].roomtype;
        });
      }
    }
  }, [participantRoomTravelData.data]);
  const history = useHistory();

  const setQueryLoading = value => {
    setState(draft => {
      draft.loading = value;
    });
  };
  const { searchPaxComponent, searchResultState } = FindPaxSearch({
    orgId,
    setQueryLoading,
    queryName: 'gqlQueryWithTemplateData',
  });
  useEffect(() => {
    if (searchResultState.searchData.length > 0) {
      const searchedResult = searchResultState.searchData;
      setPersonQueryState(draft => {
        draft.filter = {
          nodeid: { in: searchedResult.map(o => o.node.parentnodeid) },
        };
      });
    }
  }, [searchResultState, setPersonQueryState]);

  const loadMoreAction = () => {
    if (pageInfo && pageInfo.endCursor) {
      setState(draft => {
        draft.endCursor = pageInfo ? pageInfo.endCursor : null;
      });
      setResult(draft => {
        const index = Math.floor(draft.participants.length / items);
        draft.pageIndexTrack = index + 1;
      });
      setState(draft => {
        draft.loadingMore = true;
      });
    }
  };

  const showLoadMore = () => {
    if (isEmptyString(searchResultState.queryText)) {
      if (pageInfo) {
        if (pageInfo.hasNextPage && !state.loadingMore) {
          return (
            <Button
              size="small"
              variant={VARIANTS.OUTLINE}
              onClick={loadMoreAction}
              noMargin={false}
              data-testid="loadMoreButton"
            >
              Load More
            </Button>
          );
        }
      }
    }
    return null;
  };

  const changeSort = sort => {
    setState(draft => {
      draft.sort = sort;
      draft.endCursor = null;
    });
    setResult(draft => {
      draft.participants = [];
      draft.readIndex = 0;
      draft.loadedResult = [];
      draft.expectedResult = [];
      draft.pageIndexTrack = 1;
    });
  };

  const sortButton = ParticipantSortButton({
    changeSort,
    showSortLabel: true,
  });

  const viewDetail = (closeMenu, closeParentMenu, participant) => () => {
    if (participant.node && participant.node.email) {
      PORTAL_HELPERS.openParticipantList(
        {
          orgId,
          email: participant.node.email,
          viewOnly: true,
        },
        { resaga },
      );
    }
    closeMenu();
  };

  // eslint-disable-next-line react/prop-types
  const RowMoreOptions = (participant, closeParentMenu) => ({ closeMenu }) => (
    <GridContainer direction="column" spacing={0}>
      <GridItem>
        <MenuItem
          key="View"
          onClick={viewDetail(closeMenu, closeParentMenu, participant)}
        >
          View Details
        </MenuItem>
      </GridItem>
    </GridContainer>
  );

  // eslint-disable-next-line react/prop-types
  const moreOptionsButton = ({ openMenu: om }) => (
    <Button
      dense
      noMargin
      size="extraSmall"
      color="inline"
      className={classes.actionButton}
      onClick={om}
      data-testid="moreOptions"
    >
      <Icon icon="lnr-ellipsis" size="small" />
    </Button>
  );

  // eslint-disable-next-line no-unused-vars
  const redirectTour = ({ id, participantId }) => () => {
    if (id !== -1) {
      const link = `${URL_HELPERS.tours(id)}?participant=${participantId}`;
      history.push(link);
    }
  };

  const handleDialogClose = () => {
    setStateDialog(draft => {
      draft.open = false;
    });
  };

  const handleNoPersonDialogClose = () => {
    setNoPersonDataDialog(draft => {
      draft.open = false;
    });
  };

  const getParticipantSuccess = participantId => () => {
    setStateDialog(draft => {
      draft.loading = false;
    });
    setNodeMultiFilter(draft => {
      const filter = [
        { id: { equalTo: participantId } },
        { type: { equalTo: 'participant.group' } },
        { prevnodeid: { notEqualTo: participantId } },
        { type: { equalTo: 'occupant' } },
      ];
      draft.filter = JSON.stringify(filter);
    });
  };
  const showDialog = ({
    id,
    participantId,
    personData,
    tourName,
    customData,
  }) => () => {
    if (stateDialog.selectPaxData.id !== participantId) {
      setStateDialog(draft => {
        draft.selectPaxData.roomType = '';
        draft.selectPaxData.travelWith = [];
        draft.selectPaxData.travelGroup = '';
      });
    }
    if (personData) {
      setStateDialog(draft => {
        draft.open = true;
        draft.loading = true;
        draft.selectPaxData.id = participantId;
        draft.selectPaxData.personId = personData.id;
        draft.selectPaxData.templateId = id;
        draft.selectPaxData.tourName = tourName;
      });
      resaga.dispatchTo(TEMPLATE_API, GET_PEOPLE, {
        payload: {
          id,
        },
      });

      resaga.dispatchTo(TEMPLATE_API, GET_PARTICIPANTS, {
        payload: { id, ids: [participantId] },
        onSuccess: getParticipantSuccess(participantId),
      });
    } else {
      // never init person data so go directly to the tour
      setStateDialog(draft => {
        draft.selectPaxData.id = participantId;
        draft.selectPaxData.templateId = id;
        draft.selectPaxData.tourName = tourName;
      });
      setNoPersonDataDialog(draft => {
        draft.open = true;
      });
    }
    if (customData) {
      const date = customData[0].startdate;
      const displaydate = customData[0].displaydate;
      if (date && displaydate === 'startDate') {
        setStateDialog(draft => {
          draft.selectPaxData.tourDate = MOMENT_HELPERS.renderDate(date);
        });
      }
    }
  };

  const roomComponent = () => {
    if (!isEmptyString(stateDialog.selectPaxData.roomType)) {
      return (
        <GridContainer spacing={0} direction="column">
          <GridItem>
            <JText bold darkGray>
              Room Type
            </JText>
          </GridItem>
          <GridItem>
            <JText>{stateDialog.selectPaxData.roomType}</JText>
          </GridItem>
        </GridContainer>
      );
    }
    return null;
  };

  const travelWithComponent = () => {
    if (!isEmptyString(stateDialog.selectPaxData.travelGroup)) {
      return (
        <GridContainer spacing={0} direction="column">
          <GridItem>
            <JText bold darkGray>
              Traveling With
            </JText>
          </GridItem>
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <Icon icon="lnr-users" />
                <JText halfPaddingLeft>
                  {stateDialog.selectPaxData.travelGroup}
                </JText>
              </GridItem>
              <GridItem>
                <Icon icon="lnr-group-work" />
                <JText halfPaddingLeft>
                  {stateDialog.selectPaxData.travelWith.reduce(
                    (au, c, index) => {
                      if (index === 0) {
                        return NameUtility.userDisplayName(c);
                      }

                      return `${au}, ${NameUtility.userDisplayName(c)}`;
                    },
                    {},
                  )}
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      );
    }
    return null;
  };

  const paxScreen = () => {
    let content = <div />;
    if (
      stateDialog.selectPaxData.personId !== -1 &&
      stateDialog.loading !== true
    ) {
      content = (
        <>
          <Participant
            accessLevel={PARTICIPANT_ACCESS_LEVELS.full}
            templateId={stateDialog.selectPaxData.templateId}
            variant={VARIANTS.VIEW}
            orgType={orgType}
            personId={stateDialog.selectPaxData.personId}
            id={stateDialog.selectPaxData.id}
            RoomComponent={roomComponent()}
            TravelGroupComponent={travelWithComponent()}
          />
        </>
      );
    }
    return (
      <JDialog
        maxWidth="md"
        open={stateDialog.open}
        loading={stateDialog.loading}
        disabled={false}
        fullWidth
        onValidSubmit={redirectTour({
          id: stateDialog.selectPaxData.templateId,
          participantId: stateDialog.selectPaxData.id,
        })}
        onButtonClose={handleDialogClose}
        header={
          <GridContainer
            direction="column"
            alignitems="center"
            className={classes.headerCenter}
            data-testid="headertext"
          >
            <GridItem>
              <JText xl textCenter>
                {paxLabel} details
              </JText>
            </GridItem>
            <GridItem>
              <JText md gray ellipsis textCenter>
                {stateDialog.selectPaxData.tourName} {' | '}
                {stateDialog.selectPaxData.tourDate}
              </JText>
            </GridItem>
          </GridContainer>
        }
        notesTextWrap
        submitButton="Edit in the itinerary"
      >
        <GridContainer alignItems="center" className={classes.dialogContent}>
          <GridItem xs={12} sm={12} md={12}>
            {content}
          </GridItem>
        </GridContainer>
      </JDialog>
    );
  };

  const noPersonDataRedirectScreen = () => (
    <JDialog
      maxWidth="xs"
      open={noPersonDataDialog.open}
      disabled={false}
      fullWidth
      onValidSubmit={redirectTour({
        id: stateDialog.selectPaxData.templateId,
        participantId: stateDialog.selectPaxData.id,
      })}
      onButtonClose={handleNoPersonDialogClose}
      header={<JText xl>No {paxLabel} detail</JText>}
      notes={`No ${paxLabel} detail found in ${
        stateDialog.selectPaxData.tourName
      }`}
      notesTextWrap={false}
      submitButton="Redirect to the tour to create a record"
    />
  );

  // eslint-disable-next-line react/prop-types
  const Row = closeMenu => rowProps => {
    if (rowProps.rowIndex === 0) {
      return headers();
    }
    const index = rowProps.index;
    const style = rowProps.style;
    const participant =
      searchResultState.searchData.length > 0
        ? searchResultState.searchData[index]
        : result.participants[index];
    if (participant) {
      const personData = personQueryResult.peopleData.find(
        o => o.nodeid === participant.node.parentnodeid,
      );
      const name = personData
        ? personData.knownas
        : NameUtility.userDisplayName(participant.node);
      return (
        <div className={index % 2 ? classes.Odd : classes.Even} style={style}>
          <GridContainer
            justify="space-between"
            alignItems="center"
            noWrap
            spacing={0}
            data-testid="paxRow"
          >
            <GridItem className={classes.row}>
              <GridContainer spacing={4} noWrap>
                <GridItem>{RenderAvatar(null, name, false, 'md')}</GridItem>
                <GridItem className={classes.columnStyle}>
                  <GridContainer
                    spacing={0}
                    direction="column"
                    alignItems="flex-start"
                  >
                    <GridItem data-testid="nameDisplay">
                      <Button
                        variant="inline"
                        noMargin
                        noPadding
                        onClick={showDialog({
                          id:
                            participant.node.ugroopnodeByParentnodeid
                              .ugroopnodeByParentnodeid.id,
                          participantId: participant.node.parentnodeid,
                          personData,
                          tourName:
                            participant.node.ugroopnodeByParentnodeid
                              .ugroopnodeByParentnodeid.content,
                          customData:
                            participant.node.ugroopnodeByParentnodeid
                              .ugroopnodeByParentnodeid.templatesByParentnodeid
                              .nodes,
                        })}
                        data-testid="nameButton"
                      >
                        <JText
                          black
                          bold
                          nowrap={false}
                          ellipsis2
                          link
                          textLeft
                        >
                          {NameUtility.userDisplayName({
                            firstName: participant.node.firstname,
                            lastName: participant.node.lastname,
                            knownAs: name,
                          })}
                        </JText>
                      </Button>
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
                <GridItem className={classes.mediumColumnStyle}>
                  <GridContainer
                    direction="column"
                    alignItems="flex-start"
                    spacing={0}
                  >
                    <GridItem />
                    <GridItem>
                      <JText gray ellipsis2 textLeft>
                        {participant.node.email}
                      </JText>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem className={classes.largerColumnStyle}>
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
                        data-testid="tourLinkButton"
                      >
                        <JText black nowrap={false} bold link textLeft>
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
                <GridItem className={classes.columnStyle}>
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
                <GridItem className={classes.actionButton}>
                  <Popper renderButton={moreOptionsButton} halfPadding>
                    {RowMoreOptions(participant, closeMenu)}
                  </Popper>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      );
    }
    return null;
  };

  const displayLoadMore = () => (
    <div
      style={{
        display: state.loadingMore && !state.loading ? 'block' : 'none',
        width: 300,
      }}
    >
      <Loading type="bubbles" height="30px" width="30px" />
    </div>
  );

  const getItemSize = index => {
    if (index === 0) {
      return 130;
    }
    return 100;
  };

  const contactLists = () => {
    if (error) {
      return (
        <JText warning>Oops, something went wrong, please try it again.</JText>
      );
    }
    if (state.loading) {
      return <LoadingIndicator margin={false} size={30} />;
    }
    let lists;
    if (!isEmptyString(searchResultState.queryText)) {
      lists = searchResultState.searchData;
    } else {
      lists = result.participants;
    }
    if (lists.length > 0) {
      return (
        <>
          <ListWithStickyCells
            itemCount={lists.length}
            itemSize={getItemSize}
            height={850}
            rowHeight={getItemSize}
            width="auto"
          >
            {Row()}
          </ListWithStickyCells>
          {displayLoadMore()}
        </>
      );
    }
    return <JText bold>Found no data</JText>;
  };

  const headers = () => {
    let lists;
    if (!isEmptyString(searchResultState.queryText)) {
      lists = searchResultState.searchData;
    } else {
      lists = result.participants;
    }
    if (lists.length > 0) {
      return (
        <div spacing={0} alignItems="center" className={classes.stickyHeader}>
          <div className={classNames(classes.column, classes.headerColumn)}>
            <JText gray bold>
              Person Info
            </JText>
          </div>
          <div
            className={classNames(classes.column, classes.secondHeaderColumn)}
          >
            <JText gray bold>
              Email
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
              Last updated
            </JText>
          </div>
        </div>
      );
    }
    return '';
  };

  return (
    <>
      <Container padding={false}>
        <div className={classes.root}>
          <Form>
            <GridContainer
              direction="column"
              spacing={1}
              className={classes.ContentContainer}
            >
              <GridItem>
                <GridContainer direction="row" noWrap>
                  <GridItem className={classes.Input}>
                    {searchPaxComponent}
                  </GridItem>
                  <GridItem>{sortButton}</GridItem>
                </GridContainer>
              </GridItem>
              <GridItem>{contactLists()}</GridItem>
              <GridItem>{showLoadMore()}</GridItem>
            </GridContainer>
          </Form>
        </div>
      </Container>
      {paxScreen()}
      {noPersonDataRedirectScreen()}
    </>
  );
}

Contacts.propTypes = {
  orgId: PropTypes.number,
  resaga: PropTypes.object,
  itemPerPage: PropTypes.number,
};

export default withResaga(CONFIG)(React.memo(Contacts));

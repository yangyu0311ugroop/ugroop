import React from 'react';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import withResaga from 'resaga';
import Loading from 'react-loading';
import { useSelector } from 'react-redux';
import Button from '../../../../../../../../../../../../../viewComponents/Button';
import { makeSingleSelect } from '../../../../../../../../../../../../../datastore/selectUtility';
import { NODE_STORE_RESELECTORS } from '../../../../../../../../../../../../../datastore/nodeStore/selectorsViaConnect';
import { VARIANTS } from '../../../../../../../../../../../../../variantsConstants';
import { makeStyles } from '../../../../../../../../../../../../../components/material-ui';
import GridContainer from '../../../../../../../../../../../../../components/GridContainer';
import GridItem from '../../../../../../../../../../../../../components/GridItem';
import Icon from '../../../../../../../../../../../../../ugcomponents/Icon';
import { NameUtility } from '../../../../../../../../../../../../../utils/displayNameUtility';
import {
  CLONE_PARTICIPANT,
  GET_TEMPLATE_DETAIL,
  NODE_API,
  TEMPLATE_API,
} from '../../../../../../../../../../../../../apis/constants';
import { PORTAL_HELPERS } from '../../../../../../../../../../../../Portal/helpers';
import RenderAvatar from '../../../../../../../../../../../../../smartComponents/Messenger/components/ChannelDetail/components/renderAvatar';
import JText from '../../../../../../../../../../../../../components/JText';
import Form from '../../../../../../../../../../../../../ugcomponents/Form';
import { isEmptyString } from '../../../../../../../../../../../../../utils/stringAdditions';
import { Span } from '../../../../../../../../../../../../../viewComponents/Typography';
import { MOMENT_HELPERS } from '../../../../../../../../../../../../../utils/helpers/moment';
import Popper from '../../../../../../../../../../../../../components/Popper';
import MenuItem from '../../../../../../../../../../../../../components/Popper/components/MenuItem';
import { TEMPLATE_API_HELPERS } from '../../../../../../../../../../../../../apis/components/Template/helpers';
import SnackbarHelper from '../../../../../../../../../../../../../ugcomponents/SnackBar/helpers';
import { useParticipantRequest } from '../../../../../../../../../../../../../hooks/useParticipantRequestHook';
import FindPaxSearch from './findPaxSearch';
import ParticipantSortButton from './participantSortButton';
/* eslint-disable no-param-reassign */

const styles = () => ({
  List: {
    border: '1px solid #d9dddd',
  },
  row: {
    height: '50px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 15px',
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
    width: 260,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 10,
  },
  AddParticipantButton: {
    width: 300,
    borderTop: '1px solid #d9dddd',
    padding: 10,
  },
  LastUpdateStyle: {
    textAlign: 'left',
  },
  LoadingStyle: {
    alignItems: 'center',
  },
  rowButton: {
    width: 190,
    minWidth: 190,
  },
  textPosition: {
    textAlign: 'left',
    paddingLeft: 5,
  },
});

const useStyles = makeStyles(styles);
const itemPPage = 30;
export function AddParticipantFromContact(props) {
  const { templateId, paxLabel, itemPerPage } = props;
  const items = itemPerPage || itemPPage;
  const orgId = useSelector(store =>
    makeSingleSelect(NODE_STORE_RESELECTORS.selectNodeAttribute)(store, {
      id: templateId,
      attribute: 'customData.organisationId',
    }),
  );
  const {
    result,
    setResult,
    personQueryResult,
    state,
    error,
    setState,
    pageInfo,
  } = useParticipantRequest({
    orgId,
    itemsPerPage: items,
  });
  const classes = useStyles();
  const { addParticipant, resaga } = props;
  const setQueryLoading = value => {
    setState(draft => {
      draft.loading = value;
    });
  };
  const {
    searchPaxComponent,
    searchResultState,
    setSearchResult,
  } = FindPaxSearch({
    orgId,
    setQueryLoading,
  });
  // eslint-disable-next-line react/prop-types
  const moreOptionsButton = (participant, name) => ({ openMenu: om }) => (
    <GridContainer spacing={1} noWrap alignItems="center">
      <GridItem>{RenderAvatar(null, name, false)}</GridItem>
      <GridItem>
        <Button
          noPadding
          noMargin
          variant={VARIANTS.BORDERLESS}
          onClick={om}
          className={classes.rowButton}
          data-testid="paxRowButton"
        >
          <GridContainer spacing={0} direction="column" alignItems="left">
            <GridItem
              className={classes.textPosition}
              data-testid="nameDisplay"
            >
              <JText black bold>
                {NameUtility.userDisplayName({
                  firstName: participant.node.firstname,
                  lastName: participant.node.lastname,
                  knownAs: name,
                })}
              </JText>
            </GridItem>
            <GridItem className={classes.textPosition}>
              <JText gray ellipsis sm>
                {participant.node.email}
              </JText>
            </GridItem>
            <GridItem className={classes.textPosition}>
              {displayPhone(participant)}
            </GridItem>
            <GridItem className={classes.textPosition}>
              <JText gray ellipsis xs>
                last updated:{' '}
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
        </Button>
      </GridItem>
      <GridItem>
        <Button
          dense
          noMargin
          size="extraSmall"
          color="inline"
          onClick={om}
          data-testid="moreOptions"
        >
          <Icon icon="lnr-ellipsis" size="small" />
        </Button>
      </GridItem>
    </GridContainer>
  );

  const handleClose = close => {
    setSearchResult(draft => {
      draft.queryText = '';
      draft.searchData = [];
    });
    close();
  };

  const onPopoverExit = () => {
    setSearchResult(draft => {
      draft.queryText = '';
      draft.searchData = [];
    });
  };

  const cloneSuccess = closeMenu => response => {
    props.resaga.dispatchTo(TEMPLATE_API, GET_TEMPLATE_DETAIL, {
      payload: { id: templateId },
    });
    TEMPLATE_API_HELPERS.getParticipants(
      { id: templateId, ids: [response.participantNodeClone.parentNodeId] },
      { resaga },
    );
    if (closeMenu) {
      closeMenu();
    }
  };

  const cloneError = errorResponse => {
    SnackbarHelper.openErrorSnackbar(JSON.stringify(errorResponse), resaga);
  };

  const cloneParticipant = (participant, closeMenu) => () => {
    const clickParticipant = participant;
    resaga.dispatchTo(NODE_API, CLONE_PARTICIPANT, {
      payload: {
        id: clickParticipant.node.parentnodeid,
        data: {
          templateId,
        },
      },
      onSuccess: cloneSuccess(closeMenu),
      onError: cloneError,
    });
  };

  const viewDetail = (closeMenu, closeParentMenu, participant) => () => {
    if (participant && participant.node.email) {
      PORTAL_HELPERS.openParticipantList(
        {
          orgId,
          email: participant.node.email,
          tourId: templateId,
        },
        { resaga },
      );
    }
    closeMenu();
    closeParentMenu();
  };

  const addParticipantRequest = (
    closeMenu,
    closeParentMenu,
    participant,
  ) => () => {
    cloneParticipant(participant)();
    if (closeMenu) {
      closeMenu();
    }
    if (closeParentMenu) {
      closeParentMenu();
    }
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
      <GridItem>
        <MenuItem
          key="Add"
          onClick={addParticipantRequest(
            closeMenu,
            closeParentMenu,
            participant,
          )}
        >
          Add
        </MenuItem>
      </GridItem>
    </GridContainer>
  );

  const displayPhone = participant => {
    if (participant.node && participant.node.phone) {
      return (
        <JText gray ellipsis xs>
          Phone: {participant.node.phone}
        </JText>
      );
    }
    return null;
  };
  // eslint-disable-next-line react/prop-types
  const Row = closeMenu => ({ index, style }) => {
    const rowData =
      searchResultState.searchData.length > 0
        ? searchResultState.searchData[index]
        : result.participants[index];
    const participant = rowData;
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
            key={index}
            data-testid="paxRow"
          >
            <GridItem className={classes.row}>
              <Popper
                renderButton={moreOptionsButton(participant, name)}
                halfPadding
                disableFullScreen
              >
                {RowMoreOptions(participant, closeMenu)}
              </Popper>
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
        display: state.loadingMore ? 'block' : 'none',
        width: 300,
      }}
    >
      <Loading type="bubbles" height="30px" width="30px" />
    </div>
  );

  const contactLists = closeMenu => {
    if (error) {
      return (
        <JText warning>Oops, something went wrong, please try it again.</JText>
      );
    }
    if (state.loading) {
      return (
        <Loading
          type="bubbles"
          height="30px"
          width="30px"
          className={classes.LoadingStyle}
        />
      );
    }
    let lists = [];
    if (!isEmptyString(searchResultState.queryText)) {
      lists = searchResultState.searchData;
    } else {
      lists = result.participants;
    }
    if (lists.length > 0) {
      return (
        <>
          <List
            className={classes.List}
            itemCount={lists.length}
            itemSize={75}
            height={320}
            width={300}
          >
            {Row(closeMenu)}
          </List>
          {displayLoadMore()}
        </>
      );
    }
    return <JText bold>Found no data</JText>;
  };

  const addParticipantAction = close => event => {
    addParticipant(event);
    handleClose(close);
  };

  const addParticipantManually = closeMenu => (
    <div className={classes.AddParticipantButton}>
      <Span>
        Cannot find {paxLabel} in your Organisation?
        <Button
          noMargin
          noPadding
          color="base"
          variant={VARIANTS.INLINE}
          onClick={addParticipantAction(closeMenu)}
          data-testid="addParticipantManuallyButton"
        >
          Add {paxLabel}
        </Button>
      </Span>
    </div>
  );

  const loadMoreAction = () => {
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
    disableFullScreen: true,
  });

  // eslint-disable-next-line react/prop-types
  const AddPax = ({ openMenu }) => (
    <Button
      size="extraSmall"
      color="primary"
      dense
      onClick={openMenu}
      data-testid="AddPax"
    >
      Add {paxLabel}
    </Button>
  );

  // eslint-disable-next-line no-unused-vars,react/prop-types
  const AddPaxContent = ({ closeMenu }) => (
    <Form>
      <GridContainer
        direction="column"
        spacing={0}
        justify="center"
        alignItems="center"
      >
        <GridItem>
          <GridContainer spacing={0} alignItems="center">
            <GridItem className={classes.Input}>{searchPaxComponent}</GridItem>
            <GridItem>{sortButton}</GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>{contactLists(closeMenu)}</GridItem>
        <GridItem>{showLoadMore()}</GridItem>
        <GridItem>{addParticipantManually(closeMenu)}</GridItem>
      </GridContainer>
    </Form>
  );

  if (orgId) {
    return (
      <>
        <Popper
          noPadding
          renderButton={AddPax}
          disableFullScreen
          onExit={onPopoverExit}
        >
          {AddPaxContent}
        </Popper>
      </>
    );
  }
  return (
    <Button size="extraSmall" color="primary" dense onClick={addParticipant}>
      Add {paxLabel}
    </Button>
  );
}

AddParticipantFromContact.propTypes = {
  addParticipant: PropTypes.func,
  templateId: PropTypes.number,
  paxLabel: PropTypes.string,
  resaga: PropTypes.object,
  itemPerPage: PropTypes.number,
};

AddParticipantFromContact.defaultProps = {
  paxLabel: 'Pax',
};

export default React.memo(
  withResaga({
    setValue: {
      ...PORTAL_HELPERS.setValue,
      ...SET_VALUE,
    },
  })(AddParticipantFromContact),
);

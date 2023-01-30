/*
 *
 * ManageTemplate
 *
 */
import { withStyles } from '@material-ui/core/styles';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import JText from 'components/JText';
import { AbilityResolver } from 'apis/components/Ability';
import { ability } from 'apis/components/Ability/ability';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import NodeNormalisers from 'apis/components/Node/normalisers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { getChatStreamId } from 'utils/stringAdditions';
import { getUA } from 'react-device-detect';
import innerHeight from 'ios-inner-height';
import {
  BATCH_RECENT_ACTIVITY,
  FETCH_EVENTS,
  FIND_ORGANISATION_ID,
  FOLDER_API,
  GET_ORG_MEMBERS,
  GET_ORGANISATION,
  GET_PARENT_OF_FOLDER,
  GET_PEOPLE,
  GET_TEMPLATE_DETAIL,
  GET_TEMPLATE_TAB_DETAIL,
  INIT_TEMPLATE_SETTINGS,
  NODE_API,
  ORGANISATION_API,
  TEMPLATE_API,
  TEMPLATE_TAB_API,
  UPDATE_NODE,
  GET_TRANSFER_NODE,
} from 'apis/constants';
import { URL_HELPERS } from 'appConstants';
import { DATASTORE_UTILS } from 'datastore';
import { NODE_SCHEMA } from 'datastore/nodeStore/schema';
import { normalize } from 'normalizr';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import dotProps from 'dot-prop-immutable';
import { debounce, get, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import VisibleChildren from 'smartComponents/Node/logics/VisibleChildren';
import { LoadingText } from 'ugcomponents/Progress';
import UGSnackBar from 'ugcomponents/SnackBar/component/UGSnackBar';
import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';
import 'url-search-params-polyfill';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import upsertHelpers, { ARRAY_MODE } from 'utils/helpers/upsertStore';
import { parseQueryParam } from 'utils/helpers/url';
import {
  PARTICIPANT_LINKEE,
  REACTION,
  REACTIONS,
  TAB_GALLERY,
  TAB_OTHER,
  TEMPLATE,
} from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import ErrorBoundary from 'viewComponents/ErrorBoundary';
import { P } from 'viewComponents/Typography';
import TransferTourOwner from 'containers/Templates/Modals/TransferTourOwner';
import withCustomerSubscriptionCheck from 'ugcomponents/CustomerSubscriptions/hoc/withCustomerSubscriptionCheck';
import ReactResizeDetector from 'react-resize-detector';
import { Helmet } from 'react-helmet';
import SeatsCalculation from './components/SeatsCalculation';
import Messenger from './components/Messager';
import MessengerHeader from './components/Messager/messengerHeader';
import Container from '../../../components/Container';

import { TEMPLATE_API_EVENT_UTILS } from '../../../apis/components/Template/utils/events';

import { withFirebase } from '../../../lib/firebase';
import { snackBarType } from '../../../utils/constant';
import Icon from '../../../viewComponents/Icon';
import TourConnection from '../Modals/TourConnection';
import ParticipantPeople from './components/ParticipantPeople';
import TemplateContent from './components/TemplateContent';
import TemplateHeader from './components/TemplateHeader';
import {
  CONFIG,
  TEMPLATE_ID_CONFIG,
  FEATURE_TOUR_CONFIG,
} from './defines/config';
import style from './style';
import StreamChatQueryChannels from '../../StreamChat/streamChatQueryChannels';
import { isNumber } from '../../../utils/numberAdditions';

export const recentActivityIds = id => (ids = []) => {
  const removeId =
    ids.indexOf(id) !== -1 ? dotProps.delete(ids, ids.indexOf(id)) : ids;

  return [id, ...removeId];
};
export const recentActivities = id =>
  DATASTORE_UTILS.upsertObject({
    [id]: { updatedat: new Date().toISOString() },
  });

export class TemplateManagement extends PureComponent {
  state = {
    showLiveUpdateBox: false,
    loading: false,
    height: -1,
    isNewTour: false,
  };

  componentWillMount = () => {
    const { classes, setBackground } = this.props;
    LOGIC_HELPERS.ifFunction(setBackground, ['grey']);
    this.template = TEMPLATE;
    this.anchorOrigin = {
      vertical: 'top',
      horizontal: 'right',
    };
    this.anchorOriginMobile = {
      vertical: 'top',
      horizontal: 'center',
    };
    this.messagingProps = { rootClassName: classes.messaging };
    this.navBarHeight = 49;
  };

  componentDidMount = () => {
    const id = this.tourIdFromURL(this.props);
    this.sort = { id: 1 };
    this.options = { watch: true, state: true, limit: 30 };
    if (id) {
      this.fetchData(id, null, true);
    }
    this.cbRef = React.createRef();

    this.setState({ isNewTour: false });
  };

  componentWillReceiveProps = nextProps => {
    const { refresh } = this.props;
    const nextSearchName = get(nextProps, 'location.search', '');
    const prevSearchName = get(this.props, 'location.search', '');

    const id = this.tourIdFromURL(this.props);
    const nextId = this.tourIdFromURL(nextProps);

    if (id !== nextId || refresh !== nextProps.refresh) {
      this.handleFetchData(nextId, id);
    }

    if (nextSearchName !== prevSearchName) {
      this.openDiscussionDrawFromQueryString(nextSearchName, nextId);
    }

    this.setState({ isNewTour: nextProps.editable });
  };

  componentWillUnmount = () => {
    this.resetData();
    const tourId = this.tourId();
    this.props.firebase.unsubscribeTourLiveUpdate(tourId);
  };

  tourIdFromURL = ({ match }) =>
    Number.parseInt(get(match, 'params.id', 0), 10);

  dayIdFromURL = props => {
    const search = props.location.search;
    const parsedSearch = parseQueryParam(search);
    return Number.parseInt(get(parsedSearch, 'selectedDay', 0), 10);
  };

  handleFetchData = (id, prevId) => {
    this.setState({ loading: true });
    if (!this.debouncedFetchData) {
      this.debouncedFetchData = debounce(this.fetchData, 500);
    }
    // will debounce
    this.debouncedFetchData(id, prevId, true);
  };

  onCloseTransferModal = () =>
    this.props.resaga.setValue({
      transferDialog: false,
    });

  onSuccessFetchData = (id, prevId) => ({ templates }) => {
    const { match } = this.props;
    const idFromURL = Number.parseInt(get(match, 'params.id', 0), 10);

    if (id !== idFromURL) {
      this.props.firebase.unsubscribeTourLiveUpdate(id);
    }
    if (id !== prevId) {
      this.props.firebase.unsubscribeTourLiveUpdate(prevId);
      this.props.firebase.subscribeTourLiveUpdate(
        this.props.userId,
        id,
        this.handleLiveUpdate(id, this.props.userId),
      );
    }

    const currentSearchName = get(this.props, 'location.search', '');

    const templateSettings = get(templates, `${id}.templatesettings`, []);
    if (isEmpty(templateSettings)) {
      this.props.resaga.dispatchTo(TEMPLATE_API, INIT_TEMPLATE_SETTINGS, {
        payload: { id },
      });
    }
    this.openDiscussionDrawFromQueryString(currentSearchName, id);

    this.props.resaga.dispatchTo(TEMPLATE_API, FIND_ORGANISATION_ID, {
      payload: { id },
      onSuccess: this.fetchOrgInfo,
    });

    this.props.resaga.dispatchTo(FOLDER_API, GET_PARENT_OF_FOLDER, {
      payload: id,
    });

    this.props.resaga.dispatchTo(NODE_API, GET_TRANSFER_NODE, {
      payload: { id },
    });
  };

  tourId = (props = this.props) => props.id;

  updateRecentTours = idParam => {
    const id = Number.parseInt(idParam, 10);

    this.props.resaga.setValue({
      recentActivityIds: recentActivityIds(id),
      recentActivities: recentActivities(id),
    });
  };

  getOrgSuccess = ({ preferenceData = {} }) => {
    const arrVal = Object.values(preferenceData);
    let paxLabel = null;
    if (Array.isArray(arrVal) && arrVal.length > 0) {
      paxLabel = get(arrVal[0], 'paxLabel');
    }
    return this.props.resaga.setValue({ paxLabel });
  };

  getPeopleSuccess = data => {
    if (this.cbRef) {
      this.cbRef.current.getPeopleSuccess(data.raw);
    }
  };

  fetchOrgInfo = ({ id, node }) => {
    const nodeId = this.tourId();
    const { organisationIds } = this.props;

    // ignore result from old request
    if (id !== nodeId) return null;

    const organisationId = get(node, 'calculated.organisationId', -1);
    const { orgId } = this.props;

    if (organisationId !== orgId && ability.can('update', this.template)) {
      // update node
      this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
        payload: {
          nodeId,
          node: { type: TEMPLATE, customData: { organisationId } },
        },
      });
    }

    if (organisationId > 0 && organisationIds.indexOf(organisationId) !== -1) {
      this.props.resaga.dispatchTo(ORGANISATION_API, GET_ORG_MEMBERS, {
        payload: { id: organisationId },
      });
      return this.props.resaga.dispatchTo(ORGANISATION_API, GET_ORGANISATION, {
        payload: { id: organisationId },
        onSuccess: this.getOrgSuccess,
      });
    }
    this.props.resaga.setValue({ paxLabel: null });

    return true;
  };

  fetchData = (id = this.tourId(), prevId, requireEventData = false) => {
    const selectedId = this.dayIdFromURL(this.props);
    this.props.resaga.setValue({
      layoutRecheck: undefined,
      idData: id,
      selectedId: LOGIC_HELPERS.ifElse(selectedId > 0, selectedId, -1),
      selectedOverviewType: 'ITINERARY',
    });
    this.setState({ loading: false });

    if (!id) return null;

    this.props.resaga.dispatchTo(TEMPLATE_API, GET_TEMPLATE_DETAIL, {
      payload: { id },
      onSuccess: this.onSuccessFetchData(id, prevId, requireEventData),
      onError: this.fetchError,
    });
    this.props.resaga.dispatchTo(TEMPLATE_API, BATCH_RECENT_ACTIVITY, {
      payload: { id },
    });
    this.props.resaga.dispatchTo(TEMPLATE_API, GET_PEOPLE, {
      payload: { id },
    });
    if (requireEventData) {
      this.fetchEvents(id, id)();
    }
    return this.updateRecentTours(id);
  };

  resetData = () => {
    this.props.resaga.setValue({
      idData: null,
      editable: this.state.isNewTour,
      selectedId: -1,
      selectedOverviewType: null,
    });
  };

  fetchEvents = (id, treeQueryId) => () => {
    this.props.resaga.dispatchTo(TEMPLATE_API, FETCH_EVENTS, {
      payload: { templateId: id },
      onSuccess: this.handleGetTreeSuccess(treeQueryId),
    });
  };

  fetchError = () => {
    const { history } = this.props;

    // TODO: temporary solution, go back to my tours page if something wrong (currently 401)
    SnackbarHelpers.openErrorSnackbar(
      'You are not authorized to access this tour',
      this.props.resaga,
    );
    return history.push(URL_HELPERS.myTours());
  };

  openDiscussionDrawFromQueryString(queryString, tourId) {
    const query = new URLSearchParams(queryString);
    const drawId = query.get('drawer');
    const feedbackId = query.get('discussion');

    if (drawId && feedbackId) {
      const drawIdNum = Number.parseInt(drawId, 10);
      const feedbackIdNum = Number.parseInt(feedbackId, 10);
      const nodeStore = drawIdNum === tourId ? 'templates' : 'days';
      this.props.resaga.setValue({
        discussionDrawerNodeId: drawIdNum,
        discussionDrawerNodeStore: nodeStore,
        discussionDrawerSelectedFeedback: feedbackIdNum,
      });
    }
  }

  refreshTourData = () => {
    this.setState({ showLiveUpdateBox: false });

    this.props.resaga.setValue({ refresh: Date.now() });
  };

  closeSnackBar = (event, reason) => {
    if (reason === 'clickaway') return;
    this.setState({ showLiveUpdateBox: false });
  };

  handleGetTreeSuccess = parentId => () => {
    NODE_API_HELPERS.getTreeAndTimes({ id: parentId }, this.props);
  };

  shallLiveUpdate = (fromUserId, userId) => {
    if (isNumber(fromUserId)) {
      return !(fromUserId === userId);
    }
    return true;
  };

  handleLiveUpdate = (id, userId) => data => {
    const roles = ['participant', 'interestedperson'];
    const fromUserId = data.response.userId;
    const liveUpdate = this.shallLiveUpdate(fromUserId, userId);
    if (data.response.userAgent !== getUA || liveUpdate) {
      // if (data.response.userAgent !== getUA || true) {
      // two cases, those in the contributor list do not need to click refresh.
      if (
        data.response.method === 'tourInvitation' ||
        data.response.method === 'addOwnRole'
      ) {
        const tourId = this.tourId();
        this.props.resaga.dispatchTo(TEMPLATE_API, GET_PEOPLE, {
          payload: { id: tourId },
          onSuccess: this.getPeopleSuccess,
        });
      } else if (data.response.method === 'acceptTourInvitation') {
        const tourId = this.tourId();
        this.props.resaga.dispatchTo(TEMPLATE_API, GET_PEOPLE, {
          payload: { id: tourId },
          onSuccess: this.getPeopleSuccess,
        });

        let userNodeId;
        const userNodes = get(data, 'response.userNodes', []);

        for (let i = 0; i < userNodes.length; i += 1) {
          const userNode = userNodes[i];

          if (userNode.role === PARTICIPANT_LINKEE) {
            userNodeId = userNode.nodeId;
            break;
          }
        }

        if (userNodeId) {
          TEMPLATE_API_HELPERS.getParticipants(
            { id: tourId, ids: [userNodeId] },
            this.props,
          );
        }
      } else if (data.response.method === 'declineTourInvitation') {
        const tourId = this.tourId();
        this.props.resaga.dispatchTo(TEMPLATE_API, GET_PEOPLE, {
          payload: { id: tourId },
          onSuccess: this.getPeopleSuccess,
        });
      } else if (data.response.method === 'Node.updateNode') {
        if (roles.includes(data.response.type)) {
          const childKey = NODE_STORE_HELPERS.getChildKey(data.response.type);
          NODE_API_HELPERS.getNode(
            { id: data.response.id, type: data.response.type, childKey },
            this.props,
          );
        } else {
          const updatedNode = data.response;
          this.props.resaga.setValue({
            nodes: upsertHelpers.deepMerge(
              {
                [updatedNode.id]: updatedNode,
              },
              ARRAY_MODE.SET,
            ),
          });
        }
      } else if (
        data.response.method === 'Node.createChild' &&
        roles.includes(data.response.type)
      ) {
        const tourId = this.tourId();
        this.props.resaga.dispatchTo(TEMPLATE_API, GET_TEMPLATE_DETAIL, {
          payload: { id: tourId },
        });
        const ids = [data.response.id];
        if (ids && ids.length > 0) {
          TEMPLATE_API_HELPERS.getParticipants({ id: tourId, ids }, this.props);
        }
      } else if (data.response.method === 'Pub.pubCreateInterest') {
        const userNodes = get(data, 'response.result', []); // the path is from server.
        const ids = userNodes.map(o => o.id);
        const tourId = this.tourId();
        this.props.resaga.dispatchTo(TEMPLATE_API, GET_TEMPLATE_DETAIL, {
          payload: { id: tourId },
        });
        if (ids && ids.length > 0) {
          TEMPLATE_API_HELPERS.getParticipants({ id: tourId, ids }, this.props);
        }
      } else if (data.response.method === 'addImagesInGallerySuccess') {
        const galleryId = data.response.galleryId;
        this.props.resaga.dispatchTo(
          TEMPLATE_TAB_API,
          GET_TEMPLATE_TAB_DETAIL,
          {
            payload: { tab: { id: galleryId, type: TAB_GALLERY } },
          },
        );
      } else if (data.response.method === 'Node.deleteLink') {
        const result = data.response.result;
        // TODO: Extract the logic somewhere
        if (result.linkType === REACTION) {
          this.props.resaga.setValue({
            nodes: DATASTORE_UTILS.removeItemsInArrayById(
              result.id,
              REACTIONS,
              result.linkId,
            ),
            links: DATASTORE_UTILS.removeObjectById(result.linkId),
          });
        }
      } else if (data.response.method === 'Node.createLink') {
        const result = data.response.result;
        // TODO: Extract the logic somewhere
        if (result.type === REACTION) {
          const { entities, result: linkId } = normalize(
            result,
            NODE_SCHEMA.link,
          );
          const link = entities.link;
          const linkObj = link[linkId];
          const nextNodeId = linkObj.nextNodeId;
          const prevNodeId = linkObj.prevNodeId;
          this.props.resaga.setValue({
            links: DATASTORE_UTILS.upsertObject(link),
            nodes: compose(
              DATASTORE_UTILS.upsertArray(`${nextNodeId}.${REACTIONS}`, linkId),
              DATASTORE_UTILS.upsertArray(`${prevNodeId}.${REACTIONS}`, linkId),
            ),
            linkRefresh: MOMENT_HELPERS.getNow(),
          });
        }
      } else if (
        data.response.method === 'Template.createEvent' ||
        data.response.method === 'InternalWebhook.createEvent'
      ) {
        this.props.resaga.dispatchTo(TEMPLATE_API, GET_TEMPLATE_DETAIL, {
          payload: {
            id: this.tourId(),
          },
          onSuccess: this.fetchEvents(id, data.response.tabNodeId),
        });
      } else if (data.response.method === 'Template.deleteEvent') {
        TEMPLATE_API_EVENT_UTILS.deleteEvent(this.props)(
          {},
          { templateId: id, id: data.response.id },
        );
      } else if (
        ['Node.createNextNode'].indexOf(data.response.method) !== -1 &&
        data.response.type === TAB_OTHER
      ) {
        this.props.resaga.setValue({ refresh: Date.now() });
      } else if (['Node.deleteChildren'].indexOf(data.response.method) !== -1) {
        const deleteNode = NodeNormalisers.deleteNode(null, {
          keyPath: `${data.response.parentNodeId}.children`,
          nodeId: data.response.id,
        });
        this.props.resaga.setValue(deleteNode);
      } else {
        this.setState({ showLiveUpdateBox: id });
      }
    }
  };

  renderSnackBarIcon = () => {
    const { classes } = this.props;

    return <Icon size="small" icon="warning" className={classes.lineHeight} />;
  };

  renderSnackContent = () => {
    const { classes, smDown } = this.props;
    if (smDown) {
      return (
        <JText italic md gray>
          This tour has been updated
          {'. '}
          <JText link onClick={this.refreshTourData}>
            Refresh.
          </JText>
        </JText>
      );
    }
    return (
      <div className={classes.flex}>
        <P className={classes.updatedTextContainer}>
          This tour has been updated:
        </P>
        <Button
          variant="inline"
          color="base"
          size="extraSmall"
          onClick={this.refreshTourData}
          className={classes.lineHeight}
        >
          Refresh
        </Button>
      </div>
    );
  };

  onResize = () => {
    // eslint-disable-next-line no-restricted-globals
    const height = innerHeight();
    this.setState({
      height: height - this.navBarHeight,
    });
  };

  renderChatComponent = () => {
    const { location, cognitoUserId, userEmail } = this.props;
    const { height } = this.state;
    const { search } = location;
    const parsedQuery = parseQueryParam(search);

    let chatComponent = <React.Fragment />;
    const isMessengerOpen = parsedQuery && parsedQuery.messenger === 'true';
    if (isMessengerOpen) {
      chatComponent = (
        <Container padding={false} isPublic={false}>
          <Messenger
            templateId={this.tourId()}
            members={[getChatStreamId(userEmail, cognitoUserId)]}
            sort={this.sort}
            mobileSort={this.mobileSort}
            height={height}
          />
        </Container>
      );
    }
    return chatComponent;
  };

  renderTemplateHeader = id => {
    const { location } = this.props;
    const { search } = location;
    const parsedQuery = parseQueryParam(search);
    const isMessengerOpen = parsedQuery && parsedQuery.messenger === 'true';
    if (isMessengerOpen) {
      return <MessengerHeader id={id} />;
    }
    return <TemplateHeader id={id} />;
  };

  // Only pass templateId to children
  render = () => {
    const {
      location,
      orgId,
      error,
      classes,
      transferDialog,
      tourTitle,
      smDown,
    } = this.props;
    const { search } = location;
    const parsedQuery = parseQueryParam(search);
    const isMessengerOpen = parsedQuery && parsedQuery.messenger === 'true';

    let organisationId = orgId;
    if (!orgId) {
      organisationId = -1;
    }

    const id = this.tourId();

    if (!id) {
      return <LoadingText />;
    }
    if (error) {
      return <div>Error occurred: {JSON.stringify(error)}</div>;
    }

    return (
      <ErrorBoundary>
        <div
          className={isMessengerOpen ? classes.chatMessengerOpen : classes.root}
        >
          <Helmet
            title={`${tourTitle}`}
            meta={[
              { name: 'description', content: 'Description of Current Tour' },
            ]}
          />
          <ReactResizeDetector
            handleWidth
            handleHeight
            onResize={this.onResize}
          />
          <SeatsCalculation templateId={id} ref={this.cbRef} />
          <StreamChatQueryChannels
            templateId={id}
            sort={this.sort}
            options={this.options}
          />
          <AbilityResolver nodeId={id} orgId={organisationId} />
          <VisibleChildren id={id} />
          {this.renderTemplateHeader(id)}
          {this.renderChatComponent()}
          <TemplateContent
            id={id}
            location={location}
            loading={this.state.loading}
          />
          <TourConnection />
          <ParticipantPeople id={id} />
          <UGSnackBar
            messagingProps={this.messagingProps}
            text={this.renderSnackContent()}
            isRevealed={this.state.showLiveUpdateBox === id}
            time={null}
            icon={this.renderSnackBarIcon()}
            type={snackBarType.OUTLINE}
            anchorOrigin={LOGIC_HELPERS.ifElse(
              smDown,
              this.anchorOriginMobile,
              this.anchorOrigin,
            )}
            onClose={this.closeSnackBar}
          />
          <TransferTourOwner
            id={id}
            open={transferDialog}
            onClose={this.onCloseTransferModal}
          />
        </div>
      </ErrorBoundary>
    );
  };
}

TemplateManagement.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object,
  smDown: PropTypes.bool,

  // parent value
  setBackground: PropTypes.func,
  // resaga value
  orgId: PropTypes.number,
  organisationIds: PropTypes.array,
  error: PropTypes.any,
  firebase: PropTypes.object,
  userId: PropTypes.number,
  refresh: PropTypes.number,
  cognitoUserId: PropTypes.number,
  userEmail: PropTypes.string,
  transferDialog: PropTypes.bool,
  tourTitle: PropTypes.string,
  editable: PropTypes.bool,
};

TemplateManagement.defaultProps = {
  error: '',
  userId: 0,
  orgId: null,
  transferDialog: false,
};

export default compose(
  withStyles(style, { name: 'TemplateManagement' }),
  withRouter,
  withFirebase,
  resaga(TEMPLATE_ID_CONFIG),
  resaga(FEATURE_TOUR_CONFIG),
  withCustomerSubscriptionCheck,
  resaga(CONFIG),
  withSMDown,
)(TemplateManagement);

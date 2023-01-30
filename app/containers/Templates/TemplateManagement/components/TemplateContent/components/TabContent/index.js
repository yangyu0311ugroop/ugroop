import { withStyles } from '@material-ui/core/styles';
import { ability } from 'apis/components/Ability/ability';
import { PUB_API_HELPERS } from 'apis/components/Pub/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import {
  GET_PUB_TEMPLATE_TAB,
  GET_TEMPLATE_TAB_DETAIL,
  PUB_API,
  TEMPLATE_TAB_API,
} from 'apis/constants';
import classnames from 'classnames';

import Container from 'components/Container';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import EventContainer from 'containers/Templates/TemplateManagement/components/EventContainer';
import EditTab from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabHeader/components/EditTab';
import templateHelper from 'datastore/templateManagementStore/helpers/template';
import { last } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import TabGallery from 'smartComponents/Node/types/TabGallery';
import TabTimeline from 'smartComponents/Node/types/TabTimeline';
import MapView from 'smartComponents/Node/types/TabTimeline/components/MapView';
import Icon from 'ugcomponents/Icon';
import LoadingText from 'ugcomponents/Progress/LoadingText';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ARRAY_MODE } from 'utils/helpers/upsertStore';
import { parseQueryParam, stringifyParam } from 'utils/helpers/url';
import { TAB_GALLERY, TAB_OTHER, TAB_TIMELINE } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import TabCardView from './components/TabCardView';
import TabContentWrapper from './components/TabContentWrapper';
import TabCustom from './components/TabCustom/index';
import TabItineraryView from './components/TabItineraryView';
import TabRiskAssessment from './components/TabRiskAssessment';
import TabRoomList from './components/TabRoomList';
import { CONFIG } from './config';

const styles = {
  subtitle: {
    fontWeight: 400,
    color: '#607D8B',
  },

  emptyCard: {
    padding: '55px 0 70px',
  },

  offsetSpacing: {
    padding: 8,
    overflowX: 'hidden',
  },
};

export class TabContent extends Component {
  state = {
    error: {},
    firstTimeFetch: true,
  };

  componentWillMount = () => {
    this.props.resaga.setValue({ tabId: this.props.tabId });

    this.dialogProps = {
      template: 'add',
      dialogTitle: 'Create a tab',
      headlineTitle: 'Create a tab',
      headlineIcon: 'lnr-new-tab',
      headlineText: 'Please provide a name for your new tab',
    };
  };

  componentDidMount = () => this.handleFetchTab();

  componentWillReceiveProps = nextProps => {
    this.tabShouldReload(nextProps);
  };

  componentWillUnmount = () => {
    clearTimeout(this.fetching);
  };

  tabShouldReload = nextProps => {
    if (nextProps.templateId !== this.props.templateId) {
      this.setState({ firstTimeFetch: true });
    }
    if (nextProps.tabId !== this.props.tabId) {
      this.handleFetchTab(nextProps);

      this.props.resaga.setValue({
        tabId: nextProps.tabId,
      });
    }
  };

  handleFetchTab = (
    { tabId, type, templateId, isPublic, hashkey } = this.props,
  ) => {
    this.handleTreeTimes();
    if (!tabId || !type) {
      this.openTab();
    } else {
      const api = isPublic ? PUB_API : TEMPLATE_TAB_API;
      const request = isPublic ? GET_PUB_TEMPLATE_TAB : GET_TEMPLATE_TAB_DETAIL;
      this.setState({ fetching: true });
      this.props.resaga.dispatchTo(api, request, {
        payload: {
          tab: { id: tabId, type },
          id: tabId,
          hashkey,
          templateId,
        },
        onSuccess: this.fetchSuccess,
        onError: this.fetchError,
      });
    }
  };

  resetFirstTimeFetch = () => this.setState({ firstTimeFetch: false });

  openTab = (index = 0) => {
    const { fetching, firstTimeFetch } = this.state;
    const {
      history,
      pathname,
      location,
      isPublic,
      hashkey,
      loading,
    } = this.props;
    const { search } = location;

    const parsedQuery = parseQueryParam(search);
    parsedQuery.tab = index;
    const stringQuery = stringifyParam(parsedQuery);
    const url = isPublic
      ? `/public/template/${hashkey}?tab=0`
      : `${pathname}?${stringQuery}`;

    if (fetching || firstTimeFetch)
      this.setState({ firstTimeFetch: false, fetching: false });

    // TODO: Improve the solution
    setTimeout(this.resetFirstTimeFetch, 2000);
    if (loading) return history.push(url);
    return null;
  };

  fetchSuccess = () => {
    const { templateId, type, hashkey, isPublic } = this.props;

    this.setState({ error: {}, fetching: false, firstTimeFetch: false });
    // TODO: Find a way to move this to TabTimeLine?
    if (type === TAB_TIMELINE && !isPublic) {
      TEMPLATE_API_HELPERS.fetchEvents({ templateId, isPublic }, this.props);
    } else if (type === TAB_TIMELINE && isPublic) {
      PUB_API_HELPERS.getTreeAndTimes(
        { hashkey, idUpsertMode: ARRAY_MODE.SET },
        this.props,
      );
      PUB_API_HELPERS.fetchEvents({ hashkey }, this.props);
    }
  };

  handleTreeTimeTimeout = () => {
    const { layout } = this.props;
    if (!layout) {
      this.props.resaga.setValue({ layoutRecheck: Date.now() });
    }
  };

  handleTreeTimes = () => {
    this.fetching = setTimeout(this.handleTreeTimeTimeout, 50);
  };

  fetchError = (error, { type }) => {
    const { templateId, activeTab } = this.props;

    if (type === 'tabother') {
      // remove from tabIds array
      this.props.resaga.setValue({
        templates: templateHelper.removeTabId(templateId, activeTab),
      });
    }

    this.openTab();
  };

  addNewTab = () => {
    const { templateId, ids } = this.props;

    const parentId = last(ids);

    PORTAL_HELPERS.openAddTab(
      {
        parentId,
        templateId,
      },
      this.props,
    );
  };

  closeDialog = key => {
    this.setState({ [key]: false });
  };

  selectNewTab = () => {
    const { history, location } = this.props;
    const { pathname } = location;

    this.props.resaga.setValue({
      editable: true,
    });

    return history.push(`${pathname}?tab=0`);
  };

  renderNoTab = () => {
    const { creating, classes, templateId, ids } = this.props;
    const { addTab } = this.state;

    const parentId = last(ids);

    return (
      <>
        <GridContainer
          card
          direction="column"
          alignItems="center"
          dashed
          className={classes.emptyCard}
        >
          <GridItem>
            <Icon icon="lnr-new-tab" size="large" color="grey" />
          </GridItem>
          {ability.can('create', TAB_OTHER) ? (
            <>
              <GridItem>
                <div className={classes.subtitle}>
                  Create a tab to start adding and organising sections
                </div>
              </GridItem>
              <GridItem>
                <Button
                  color="primary"
                  size="xs"
                  weight="bold"
                  onClick={this.addNewTab}
                  loading={creating}
                >
                  <GridContainer alignItems="center">
                    <GridItem>
                      <Icon size="normal" icon="lnr-plus" />
                    </GridItem>
                    <GridItem>Create a tab</GridItem>
                  </GridContainer>
                </Button>
              </GridItem>
            </>
          ) : (
            <GridItem>
              <div className={classes.subtitle}>There are no content yet</div>
            </GridItem>
          )}
        </GridContainer>

        <EditTab
          parentId={parentId}
          templateId={templateId}
          open={addTab}
          onClose={this.closeDialog}
          onSuccess={this.selectNewTab}
          dialogProps={this.dialogProps}
        />
      </>
    );
  };

  renderContent = () => {
    const {
      tabId,
      templateId,
      layout,
      // resaga value
      isFetching,
      isPublic,
      hashkey,
      type,
    } = this.props;
    const { error } = this.state;

    let tabContent = this.renderNoTab();
    if (type === TAB_TIMELINE) {
      const tabProps = { templateId, tabId, isPublic, hashkey };

      switch (layout) {
        case 'card':
          tabContent = <TabCardView {...tabProps} />;
          break;
        case 'map':
          tabContent = (
            <MapView templateId={templateId} id={tabId} isPublic={isPublic} />
          );
          break;
        case 'timeline':
          tabContent = <TabItineraryView {...tabProps} />;
          break;
        case 'risk':
          tabContent = <TabRiskAssessment {...tabProps} />;
          break;
        case 'room':
          tabContent = <TabRoomList {...tabProps} />;
          break;
        // case DAY:
        //   tabContent = <TabDayView templateId={templateId} id={tabId} />;
        //   break;
        default:
          tabContent = <TabTimeline {...tabProps} layout={layout} />;
          break;
      }
    } else if (type === TAB_OTHER) {
      tabContent = (
        <TabCustom
          id={tabId}
          templateId={templateId}
          fetching={isFetching}
          serverError={error.message}
          showInsertSection
          showOverview
          tabPrint
          isPublic={isPublic}
        />
      );
    } else if (type === TAB_GALLERY) {
      tabContent = (
        <TabGallery
          id={tabId}
          templateId={templateId}
          variant={TAB_GALLERY}
          hashkey={hashkey}
          isPublic={isPublic}
        />
      );
    }
    return tabContent;
  };

  render = () => {
    const { classes, smDown, isPublic, location } = this.props;
    const { firstTimeFetch } = this.state;

    const { search } = location;

    const parsedQuery = parseQueryParam(search);
    if (parsedQuery && parsedQuery.messenger === 'true' && !isPublic) {
      return null;
    }

    if (firstTimeFetch) {
      return (
        <TabContentWrapper>
          <Container padding={false}>
            <GridContainer card>
              <GridItem>
                <LoadingText text="Just a moment while we put everything together" />
              </GridItem>
            </GridContainer>
          </Container>
        </TabContentWrapper>
      );
    }

    return (
      <TabContentWrapper>
        <Container padding={false}>
          <div
            className={classnames(
              LOGIC_HELPERS.ifElse(smDown, classes.offsetSpacing),
            )}
          >
            {this.renderContent()}
          </div>
          <EventContainer />
        </Container>
      </TabContentWrapper>
    );
  };
}

TabContent.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // withRouter props
  history: PropTypes.object.isRequired,
  location: PropTypes.object,

  // from parent
  tabId: PropTypes.number,
  templateId: PropTypes.number,
  activeTab: PropTypes.number,
  pathname: PropTypes.string,
  hashkey: PropTypes.string,
  isPublic: PropTypes.bool,
  loading: PropTypes.bool,

  // resaga value
  type: PropTypes.string,
  layout: PropTypes.string,
  displayDate: PropTypes.string,
  isFetching: PropTypes.bool,
  shareDialog: PropTypes.bool,
  creating: PropTypes.bool,
  ids: PropTypes.array,
  userId: PropTypes.number,
  userEmail: PropTypes.string,
};

TabContent.defaultProps = {
  location: {},
  loading: false,

  // resaga value
  activeTab: 0,
  layout: '',
  pathname: '',
  templateId: 0,
  isFetching: false,
  shareDialog: false,
  ids: [],
};

export default compose(
  withStyles(styles, { name: 'TabContent' }),
  withRouter,
  withSMDown,
  resaga(CONFIG),
)(withRouter(TabContent));

import React, { PureComponent } from 'react';
import 'url-search-params-polyfill';
import PropTypes from 'prop-types';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import Icon from 'ugcomponents/Icon/index';
import { get } from 'lodash';
import { ARRAY_MODE } from 'utils/helpers/upsertStore';
import { parseQueryParam } from 'utils/helpers/url';
import {
  TEMPLATE_API,
  GET_PEOPLE,
  PUB_API,
  GET_PUB_TEMPLATE_PEOPLE,
  GET_PUB_TEMPLATE_HEADER,
  GET_TEMPLATE_DETAIL,
  TEMPLATE_TAB_API,
  BATCH_GET_TEMPLATE_TAB_DETAIL,
  BATCH_GET_PUB_TEMPLATE_TAB,
  ORGANISATION_API,
  GET_ORGANISATION,
} from 'apis/constants';
import { PUBLIC } from 'smartComponents/Node/types/TabOther/components/TabAccess/constants';
import { PUB_API_HELPERS } from 'apis/components/Pub/helpers';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import resaga from 'resaga';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { excludePrivate } from 'utils/tourValidations';
import { REDIRECT } from 'utils/pageRedirect';
import { HTTP_STATUS_CODE } from 'utils/http-constant';
import PublicFooter from 'ugcomponents/PublicFooter';
import TourPrintHeader from './Components/TourPrintHeader';
import TourContent from './Components/TourContent';
import TourFooter from './Components/TourFooter';
import { CONFIG, CUSTOM_TABS_CONFIG } from './config';
import styles from './styles';

export class PrintTour extends PureComponent {
  componentDidMount = () => {
    this.fetchData();
  };

  isVisible = shareWith => !shareWith || shareWith === PUBLIC;

  fetchData = () => {
    const id = get(this, 'props.match.params.id', 0);
    const hashkey = get(this, 'props.match.params.hashkey', 0);
    if (hashkey) {
      this.props.resaga.dispatchTo(PUB_API, GET_PUB_TEMPLATE_HEADER, {
        payload: {
          hashkey,
        },
        onSuccess: this.fetchSuccess,
      });
    } else if (id) {
      this.props.resaga.dispatchTo(TEMPLATE_API, GET_TEMPLATE_DETAIL, {
        payload: {
          id,
        },
        onSuccess: this.fetchSuccess,
      });
    }
  };

  fetchTabSuccess = ({ result }) => {
    const { templateId, orgId } = this.props;
    const parentId = get(result, '0') || templateId;

    const hashkey = get(this, 'props.match.params.hashkey', 0);
    const id = templateId || Number(get(this, 'props.match.params.id', 0));
    const tabToPrint = this.getTabToPrintId();
    if (tabToPrint) {
      this.props.resaga.dispatchTo(ORGANISATION_API, GET_ORGANISATION, {
        payload: {
          id: orgId,
        },
      });
      this.props.resaga.dispatchTo(TEMPLATE_API, GET_PEOPLE, {
        payload: { id },
      });
      return;
    }
    if (hashkey) {
      PUB_API_HELPERS.getTreeAndTimes(
        { hashkey, idUpsertMode: ARRAY_MODE.SET },
        this.props,
      );
      PUB_API_HELPERS.fetchEvents({ hashkey }, this.props);
      this.props.resaga.dispatchTo(PUB_API, GET_PUB_TEMPLATE_PEOPLE, {
        payload: { hashkey },
      });
    } else {
      this.props.resaga.dispatchTo(ORGANISATION_API, GET_ORGANISATION, {
        payload: {
          id: orgId,
        },
      });
      // No need to fetch event if to print only tab
      NODE_API_HELPERS.getTreeAndTimes(
        { id: parentId, idUpsertMode: ARRAY_MODE.SET },
        this.props,
      );
      TEMPLATE_API_HELPERS.fetchEvents({ templateId }, this.props);
      this.props.resaga.dispatchTo(TEMPLATE_API, GET_PEOPLE, {
        payload: { id },
      });
    }
  };

  fetchSuccess = normalisedResults => {
    const tab = normalisedResults.tabs;
    const { userId } = this.props;
    const tabToPrint = this.getTabToPrintId();
    const tabItem = tab[Object.keys(tab)[0]];
    this.props.resaga.setValue({
      idData: normalisedResults.id,
      tabsData: tab,
      photosData: normalisedResults.photos,
      templatesData: normalisedResults.templates,
      tabId: tabItem.id,
    });
    const hashkey = get(this, 'props.match.params.hashkey', 0);
    const tabUserId = hashkey ? -1 : userId;
    const filteredTabs = excludePrivate(tabUserId, tab, true, tabToPrint);

    const items = Object.values(filteredTabs);
    const filteredIds = Object.keys(filteredTabs);
    this.props.resaga.setValue({ tabCustom: filteredIds });
    if (hashkey) {
      this.props.resaga.dispatchTo(PUB_API, BATCH_GET_PUB_TEMPLATE_TAB, {
        payload: {
          hashkey,
          items,
        },
        onSuccess: this.fetchTabSuccess,
      });
    } else {
      this.props.resaga.dispatchTo(
        TEMPLATE_TAB_API,
        BATCH_GET_TEMPLATE_TAB_DETAIL,
        {
          payload: {
            tabs: items,
          },
          onSuccess: this.fetchTabSuccess,
        },
      );
    }
  };

  fetchError = err => {
    const browserHistory = this.props.history;
    if (
      err.response.error.statusCode ===
        HTTP_STATUS_CODE.STATUS_RESOURCE_NOT_FOUND ||
      err.response.error.statusCode === HTTP_STATUS_CODE.STATUS_UNAUTHORIZED
    ) {
      browserHistory.push(REDIRECT.STATUS_RESOURCE_NOT_FOUND);
    }
  };

  renderLoading = () => (
    <GridItem>
      <Icon icon="lnr-sync" /> Loading...
    </GridItem>
  );

  getTabToPrintId = () => {
    const queryParm = get(this, 'props.location.search', null);
    if (!queryParm) return null;
    const parsedSearch = parseQueryParam(queryParm);
    if (parsedSearch) {
      const tabId = get(parsedSearch, 'tabId');
      if (tabId) return Number(tabId);
    }
    return null;
  };

  renderHeader = () => {
    let hasRegister = false;
    const { days, createdBy, templateId } = this.props;
    const hashkey = get(this, 'props.match.params.hashkey', '');
    const id = templateId || Number(get(this, 'props.match.params.id', 0));

    if (hashkey) {
      const search = get(this, 'props.location.search', null);
      const searchObj = parseQueryParam(search);
      const { reg } = searchObj;
      hasRegister = !!reg;
    }

    const dayIndex = Object.keys(days).length;
    return (
      <GridItem>
        <TourPrintHeader
          templateId={id}
          dayIndex={dayIndex}
          hasRegister={hasRegister}
          createdById={createdBy}
          hashkey={hashkey}
        />
      </GridItem>
    );
  };

  renderDayContent = () => {
    const { tabId, templateId, shareWithTimeLine } = this.props;
    if (!this.isVisible(shareWithTimeLine)) return null;
    const id = templateId || Number(get(this, 'props.match.params.id', 0));
    return (
      <GridItem>
        <TourContent tabId={tabId} templateId={id} />
      </GridItem>
    );
  };

  renderContentTab = () => (
    <GridItem className={this.props.classes.item}>
      {this.renderHeader()}
      {this.renderFooter(true)}
      {this.renderTourFooterButton()}
    </GridItem>
  );

  renderContent = tabToPrint => {
    const { classes } = this.props;
    if (tabToPrint) return this.renderContentTab();
    return (
      <GridItem className={classes.item}>
        {this.renderHeader()}
        {this.renderDayContent()}
        {this.renderFooter()}
        {this.renderTourFooterButton()}
      </GridItem>
    );
  };

  renderFooter = tabPrintOnly => {
    const { relatedIds, tabIds, tabOCustomIds } = this.props;
    const customTab = Object.keys(tabOCustomIds);
    const ids = tabIds.filter(tab => customTab.includes(tab.toString()));

    return (
      <GridItem>
        <TourFooter
          tabIds={ids}
          relatedIds={relatedIds}
          tabPrintOnly={tabPrintOnly}
        />
      </GridItem>
    );
  };

  renderTourFooterButton = () => {
    const { classes } = this.props;
    return (
      <GridItem className={classes.grow}>
        <PublicFooter />
      </GridItem>
    );
  };

  render() {
    const { classes } = this.props;
    const hashkey = get(this, 'props.match.params.hashkey', '');
    let tabToPrint = null;
    let fetching;
    if (hashkey) {
      fetching = this.props.isFetchingTemplateWithHashkey;
    } else {
      fetching = this.props.isFetchingTemplate;
      tabToPrint = this.getTabToPrintId();
    }
    if (!fetching) {
      if (hashkey) {
        fetching = this.props.isFetchTemplateTabWithHashkey;
      } else {
        fetching = this.props.isFetchingTemplateTab;
      }
    }
    const content = fetching
      ? this.renderLoading()
      : this.renderContent(tabToPrint);
    return (
      <GridContainer
        direction="column"
        className={classes.container}
        spacing={0}
      >
        {content}
      </GridContainer>
    );
  }
}

PrintTour.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  resaga: PropTypes.object,
  // resaga
  userId: PropTypes.number,
  templateId: PropTypes.number,
  tabId: PropTypes.number,
  days: PropTypes.object,
  createdBy: PropTypes.number,
  tabOCustomIds: PropTypes.object,
  tabIds: PropTypes.array,
  isFetchingTemplateWithHashkey: PropTypes.bool,
  isFetchingTemplate: PropTypes.bool,
  isFetchTemplateTabWithHashkey: PropTypes.bool,
  isFetchingTemplateTab: PropTypes.bool,
  relatedIds: PropTypes.array,
  shareWithTimeLine: PropTypes.string,
  orgId: PropTypes.number,
};

PrintTour.defaultProps = {
  templateId: 0,
  tabId: 0,
  days: {},
  createdBy: 0,
  tabOCustomIds: {},
  userId: -1,
  tabIds: [],
};

export default compose(
  withStyles(styles, { name: 'PrintTour' }),
  resaga(CONFIG),
  resaga(CUSTOM_TABS_CONFIG),
)(PrintTour);

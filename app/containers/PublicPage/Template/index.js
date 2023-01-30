import {
  GET_PUB_TEMPLATE_PEOPLE,
  PUB_API,
  GET_PUB_TEMPLATE_HEADER,
  GET_PUB_TEMPLATE_EVENTS,
} from 'apis/constants';
import React, { PureComponent } from 'react';
import 'url-search-params-polyfill';
import PropTypes from 'prop-types';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import { get } from 'lodash';
import resaga, { reducer } from 'resaga';
import { compose } from 'redux';
import { REDIRECT } from 'utils/pageRedirect';
import { withStyles } from '@material-ui/core/styles';
import injectReducer from 'utils/injectReducer';
import VisibleChildren from 'smartComponents/Node/logics/VisibleChildren';
import {
  CONFIG,
  TEMPLATE_CONFIG,
  PUBLIC_TEMPLATE,
  FETCH_TEMPLATE,
  TAB_GALLERY,
} from './config';
import PublicTabPage from './components/PubTemplateTabs';
import PubTemplateHeader from './components/PubTemplateHeader';
import styles from './styles';

export class PublicTemplatePageIndex extends PureComponent {
  componentDidMount = () => this.fetchData();

  componentWillReceiveProps = nextProps => {
    if (nextProps.currentQueryDayId !== this.props.currentQueryDayId) {
      const { location, history, timelineIndex } = this.props;
      const url = `${location.pathname}?tab=${timelineIndex}&dayId=${
        nextProps.currentQueryDayId
      }`;
      history.push(url);
    }
  };

  fetchData = () => {
    const hashkey = get(this, 'props.match.params.hashkey', 0);
    if (hashkey) {
      this.props.resaga.dispatchTo(PUB_API, GET_PUB_TEMPLATE_HEADER, {
        payload: { hashkey },
        onError: this.fetchError,
      });
      this.props.resaga.dispatchTo(PUB_API, GET_PUB_TEMPLATE_PEOPLE, {
        payload: { hashkey },
      });
      this.props.resaga.dispatchTo(PUB_API, GET_PUB_TEMPLATE_EVENTS, {
        payload: { hashkey },
      });
    }
  };

  fetchError = () => {
    const browserHistory = this.props.history;
    browserHistory.push(REDIRECT.STATUS_RESOURCE_NOT_FOUND);
  };

  render() {
    const { classes, createdBy, templateId, location } = this.props;
    const isLoading = this.props.resaga.isLoading(FETCH_TEMPLATE);
    const hashkey = get(this, 'props.match.params.hashkey', 0);
    const { search } = location;
    const params = new URLSearchParams(search);
    const activeTab = parseInt(params.get('tab'), 10) || 0;
    let currentDayId = -1;
    if (activeTab === 0) {
      currentDayId = parseInt(params.get('dayId'), 10) || -1;
    }
    let content = 'Loading';
    if (!templateId) return content;
    if (!isLoading) {
      content = (
        <PublicTabPage
          hashkey={hashkey}
          templateId={templateId}
          activeTabIndex={activeTab}
          currentQueryDayId={currentDayId}
        />
      );
    }
    return (
      <React.Fragment>
        <VisibleChildren id={templateId} />

        <GridContainer spacing={0} direction="column">
          <GridItem xs>
            <PubTemplateHeader templateId={templateId} createdBy={createdBy} />
          </GridItem>
          <GridItem className={classes.content}>{content}</GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
}

PublicTemplatePageIndex.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  resaga: PropTypes.object,
  location: PropTypes.object,
  // resaga
  createdBy: PropTypes.number,
  templateId: PropTypes.number,
  currentQueryDayId: PropTypes.number,
  timelineIndex: PropTypes.number,
};

PublicTemplatePageIndex.defaultProps = {
  location: { pathname: '' },
  templateId: 0,
  timelineIndex: 0,
};

const templateManagementReducer = injectReducer({
  key: PUBLIC_TEMPLATE,
  reducer: reducer(PUBLIC_TEMPLATE),
});
const tabGalleryReducer = injectReducer({
  key: TAB_GALLERY,
  reducer: reducer(TAB_GALLERY),
});
export default compose(
  templateManagementReducer,
  tabGalleryReducer,
  withStyles(styles, { name: 'PublicTemplate' }),
  resaga(TEMPLATE_CONFIG),
  resaga(CONFIG),
)(PublicTemplatePageIndex);

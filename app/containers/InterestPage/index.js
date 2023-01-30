import React, { PureComponent } from 'react';
import 'url-search-params-polyfill';
import PropTypes from 'prop-types';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import { withRouter } from 'react-router-dom';
import Icon from 'ugcomponents/Icon/index';
import resaga from 'resaga';
import { get } from 'lodash';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import {
  BATCH_GET_PUB_TEMPLATE_TAB,
  GET_PUB_TEMPLATE_HEADER,
  GET_PUB_TEMPLATE_PEOPLE,
  PUB_API,
} from 'apis/constants';
import Container from 'components/Container';
import { REDIRECT } from 'utils/pageRedirect';
import { getTabTimeLine } from 'utils/tourValidations';
import { PUB_API_HELPERS } from 'apis/components/Pub/helpers';
import PublicFooter from 'ugcomponents/PublicFooter';
import Description from 'smartComponents/Node/parts/Description';
import TourHeader from './components/TourHeader';
import TourForm from './components/TourForm';
import TourDetail from './components/TourDetail';
import { CONFIG, CONFIG2 } from './config';
import styles from './styles';
import { DO_NOTHING } from '../../appConstants';

export class InterestPage extends PureComponent {
  componentDidMount = () => {
    this.fetchData();
  };

  getHashkey = () => get(this, 'props.match.params.hashkey', 0);

  fetchData = () => {
    const hashkey = this.getHashkey();
    if (hashkey) {
      this.props.resaga.dispatchTo(PUB_API, GET_PUB_TEMPLATE_HEADER, {
        payload: {
          hashkey,
        },
        onSuccess: this.fetchSuccess,
        onError: this.fetchError,
      });
      this.props.resaga.dispatchTo(PUB_API, GET_PUB_TEMPLATE_PEOPLE, {
        payload: { hashkey },
      });
    }
  };

  fetchSuccess = normalisedResults => {
    const id = get(normalisedResults, 'id', 0);
    const disableRYI = get(
      normalisedResults,
      `templates.${id}.disableRYI`,
      false,
    );
    if (disableRYI) {
      const browserHistory = this.props.history;
      return browserHistory.push(REDIRECT.STATUS_RESOURCE_NOT_FOUND);
    }
    const tab = normalisedResults.tabs;
    const filteredTabs = getTabTimeLine(tab); // only need tabTimeLine
    const items = Object.values(filteredTabs);
    const tabId = Object.keys(filteredTabs)[0];
    const hashkey = this.getHashkey();

    this.props.resaga.setValue({ tabId });

    if (hashkey) {
      this.props.resaga.dispatchTo(PUB_API, BATCH_GET_PUB_TEMPLATE_TAB, {
        payload: { hashkey, items },
        onSuccess: this.fetchTabSuccess,
      });
    }
    return DO_NOTHING;
  };

  fetchError = () => {
    const { history } = this.props;
    history.push(REDIRECT.STATUS_RESOURCE_NOT_FOUND);
  };

  fetchTabSuccess = () => {
    const hashkey = this.getHashkey();

    if (hashkey) {
      PUB_API_HELPERS.getTreeAndTimes({ hashkey }, this.props);
    }
  };

  renderLoading = () => (
    <GridItem>
      <Icon icon="lnr-sync" /> Loading...
    </GridItem>
  );

  renderHeader = () => {
    const { templateId } = this.props;

    return (
      <GridItem md={12}>
        <TourHeader templateId={templateId} />
      </GridItem>
    );
  };

  renderTourDetail = () => {
    const { tabId, templateId } = this.props;

    return (
      <GridItem>
        <TourDetail templateId={templateId} tabId={tabId} />
      </GridItem>
    );
  };

  renderTourForm = () => {
    const { templateId } = this.props;
    const hashkey = this.getHashkey();
    return (
      <GridItem>
        <TourForm templateId={templateId} hashkey={hashkey} />
      </GridItem>
    );
  };

  renderTourContent = () => {
    const { classes } = this.props;

    return (
      <GridItem className={classes.content}>
        <Container padding={false} reading>
          <GridContainer direction="column">
            {this.renderTourDetail()}
            {this.renderTourDescription()}
            {this.renderTourForm()}
          </GridContainer>
        </Container>
      </GridItem>
    );
  };

  renderTourDescription = () => {
    const { templateId } = this.props;
    return (
      <Description
        id={templateId}
        showHeader={false}
        showEmpty={false}
        renderSeeMore={false}
        isCollapeSeeMore={false}
      >
        {this.renderDescription}
      </Description>
    );
  };

  renderDescription = ({ content }) =>
    content && (
      <GridItem>
        <GridContainer card direction="column" spacing={0}>
          <GridItem>{content}</GridItem>
        </GridContainer>
      </GridItem>
    );

  renderContent = () => (
    <React.Fragment>
      {this.renderHeader()}
      {this.renderTourContent()}
      {this.renderTourFooterButton()}
    </React.Fragment>
  );

  renderTourFooterButton = () => {
    const { classes } = this.props;
    return (
      <GridItem className={classes.footer}>
        <PublicFooter />
      </GridItem>
    );
  };

  render() {
    const { classes, isFetchingTemplate } = this.props;
    const content = isFetchingTemplate
      ? this.renderLoading()
      : this.renderContent();

    return (
      <GridContainer
        spacing={0}
        direction="column"
        className={classes.container}
      >
        {content}
      </GridContainer>
    );
  }
}

InterestPage.propTypes = {
  // hoc
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object,

  // resaga
  templateId: PropTypes.number,
  isFetchingTemplate: PropTypes.bool,
  tabId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

InterestPage.defaultProps = {
  tabId: 0,
  templateId: 0,
  isFetchingTemplate: false,
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'InterestPage' }),
  resaga(CONFIG),
  resaga(CONFIG2),
)(InterestPage);

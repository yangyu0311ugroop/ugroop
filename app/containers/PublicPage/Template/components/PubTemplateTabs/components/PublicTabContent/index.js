import React, { PureComponent } from 'react';
import resaga, { reducer } from 'resaga';
import PropTypes from 'prop-types';
import { withStyles } from 'components/material-ui';
import { compose } from 'redux';
import { ARRAY_MODE } from 'utils/helpers/upsertStore';
import injectReducer from 'utils/injectReducer';
import {
  TEMPLATE_API,
  GET_PEOPLE,
  GET_PUB_TEMPLATE_PEOPLE,
  PUB_API,
  GET_PUB_TEMPLATE_TAB,
} from 'apis/constants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PUB_API_HELPERS } from 'apis/components/Pub/helpers';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import Days from './components/Days';
import TabCustom from './components/TabCustom';
import TabGallery from './components/TabGallery';
import TabContentWrapper from './components/TabContentWrapper';
import { CONFIG, FETCH_PUB_TAB, PUB_TAB_CONTENT } from './config';
import styles from './styles';

export class PublicTabContent extends PureComponent {
  componentDidMount = () => {
    this.fetchData(this.props.tabId);
  };

  componentWillReceiveProps = nextProps => {
    const nextTabId = this.getTabId(nextProps.tabId, nextProps.tabs);
    const currentTabId = this.getTabId(this.props.tabId, this.props.tabs);

    if (nextTabId !== currentTabId) {
      this.props.resaga.setValue({ tabId: nextTabId });
      this.fetchData(nextTabId);
    }
    this.props.resaga.analyse(nextProps, {
      [FETCH_PUB_TAB]: { onSuccess: this.fetchSuccess },
    });
  };

  getTabId = (tabId, tabs) =>
    LOGIC_HELPERS.ifElse(tabId === -1, tabs[0], tabId);

  fetchData = tabId => {
    const { hashkey, tabs, templateId } = this.props;
    const id = LOGIC_HELPERS.ifElse(tabId === -1, tabs[0], tabId);
    if (hashkey && id && id !== -1) {
      // this.props.resaga.dispatch({ id: tabId, hashkey }, FETCH_PUB_TAB);
      this.props.resaga.dispatchTo(PUB_API, GET_PUB_TEMPLATE_TAB, {
        payload: {
          id,
          hashkey,
          templateId,
        },
        onSuccess: this.fetchSuccess,
      });
    }
  };

  fetchSuccess = () => {
    const { hashkey, templateId } = this.props;

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
      NODE_API_HELPERS.getTreeAndTimes(
        { id: templateId, idUpsertMode: ARRAY_MODE.SET },
        this.props,
      );
      TEMPLATE_API_HELPERS.fetchEvents({ templateId }, this.props);
      this.props.resaga.dispatchTo(TEMPLATE_API, GET_PEOPLE, {
        payload: { id: templateId },
      });
    }
  };

  render = () => {
    const {
      tab,
      tabId,
      sectionIds,
      currentQueryDayId,
      templateId,
    } = this.props;
    let tabContent = 'no data';

    if (tab) {
      if (tab.type === 'tabtimeline') {
        tabContent = (
          <Days tabId={tabId} currentQueryDayId={currentQueryDayId} />
        );
      } else if (
        tab.customData &&
        !tab.customData.private &&
        tab.type === 'tabother'
      ) {
        tabContent = <TabCustom id={tabId} sectionIds={sectionIds} />;
      } else if (tab.type === 'tabgallery') {
        tabContent = <TabGallery id={tabId} templateId={templateId} />;
      }
    }

    return <TabContentWrapper>{tabContent}</TabContentWrapper>;
  };
}

PublicTabContent.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  // from parent
  hashkey: PropTypes.string,
  tabId: PropTypes.number,
  templateId: PropTypes.number,
  sectionIds: PropTypes.array,
  currentQueryDayId: PropTypes.number,
  tabs: PropTypes.array,
  // resaga value
  tab: PropTypes.object,
};

PublicTabContent.defaultProps = {
  hashkey: '',
  // resaga value
  tab: null,
  tabId: 0,
  templateId: 0,
  sectionIds: [],
  tabs: [],
};

const tabReducer = injectReducer({
  key: PUB_TAB_CONTENT,
  reducer: reducer(PUB_TAB_CONTENT),
});
export default compose(
  withStyles(styles, { name: 'PublicTabContent' }),
  tabReducer,
  resaga(CONFIG),
)(PublicTabContent);

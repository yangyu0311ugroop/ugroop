import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import resaga from 'resaga';
import TourStatus from 'smartComponents/Node/logics/TourStatus';
import CalculatePeopleCount from 'smartComponents/Node/logics/CalculatePeopleCount';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { parseQueryParam } from 'utils/helpers/url';
import { TAB_OTHER } from 'utils/modelConstants';
import { ability } from 'apis/components/Ability/ability';
import TabContent from './components/TabContent';
import { CONFIG, FIRST_LAST_IDS_CONFIG } from './config';

export class TemplateContent extends PureComponent {
  state = {
    isStillCalculating: true,
  };

  componentDidMount() {
    if (this.props.subscriptionTourSeats) {
      this.props.resaga.setValue({
        subscriptionSeats: this.props.subscriptionTourSeats,
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.id && this.props.id !== prevProps.id) {
      this.props.resaga.setValue({
        subscriptionSeats: this.props.subscriptionTourSeats,
      });
    }
  }

  handleSuccess = () => this.setState({ isStillCalculating: false });

  canExecuteTab = () => ability.can('execute', TAB_OTHER);

  tabId = props => {
    const {
      location,
      visibleChildren,
      hiddenIds,
      privateIds,
      peopleTabId,
      loading,
    } = props;

    const { search } = location;
    const parsedQuery = parseQueryParam(search);

    let tabId;
    let activeTab;

    if (parsedQuery.tabId || parsedQuery.participant) {
      if (
        !parsedQuery.tabId &&
        parsedQuery.participant &&
        !loading &&
        !!this.props.peopleTabId
      ) {
        tabId = peopleTabId || parseInt(parsedQuery.tabId, 10);
      } else {
        tabId = parseInt(parsedQuery.tabId, 10);
      }

      const ids = [
        ...visibleChildren,
        ...hiddenIds,
        ...LOGIC_HELPERS.ifElse(this.canExecuteTab(), privateIds, []),
      ];
      if (!ids.includes(tabId)) {
        if (ids.length > 0) {
          // go to the first available tab if query string doesnt exists
          tabId = ids[0];
          activeTab = tabId;
        } else {
          // Otherwise show empty
          tabId = 0;
        }
      }
    } else {
      activeTab = parseInt(parsedQuery.tab || 0, 10);
      tabId = visibleChildren[activeTab];
    }
    return { activeTab, tabId };
  };

  render = () => {
    const { id, location, timelineId, loading } = this.props;

    const { pathname, search } = location;
    const { tabId, activeTab } = this.tabId(this.props);
    const { isStillCalculating } = this.state;
    const parsedQuery = parseQueryParam(search);

    if (parsedQuery && parsedQuery.messenger === 'true') {
      return null;
    }

    return (
      <div>
        <TourStatus
          id={timelineId}
          templateId={id}
          onSuccess={this.handleSuccess}
        />
        <CalculatePeopleCount id={id} />

        {!isStillCalculating && (
          <TabContent
            loading={loading}
            tabId={tabId}
            activeTab={activeTab}
            pathname={pathname}
            templateId={id}
          />
        )}
      </div>
    );
  };
}

TemplateContent.propTypes = {
  // hoc
  resaga: PropTypes.object,
  // from parent
  location: PropTypes.object,
  id: PropTypes.number.isRequired, // template id

  // from resaga value
  // visibleChildren: PropTypes.array,
  timelineId: PropTypes.number,
  // firstDayId: PropTypes.number,
  // lastDayId: PropTypes.number,
  loading: PropTypes.bool,
  subscriptionTourSeats: PropTypes.number,
  peopleTabId: PropTypes.number,
};

TemplateContent.defaultProps = {
  location: {},
  // eslint-disable-next-line react/default-props-match-prop-types
  visibleChildren: [], // we need this

  // eslint-disable-next-line react/default-props-match-prop-types
  hiddenIds: [],
  // eslint-disable-next-line react/default-props-match-prop-types
  privateIds: [],
  loading: false,
  peopleTabId: null,
};

export default compose(
  withRouter,
  resaga(CONFIG),
  resaga(FIRST_LAST_IDS_CONFIG),
)(TemplateContent);

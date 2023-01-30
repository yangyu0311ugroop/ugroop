import { CREATE_NEXT_NODE, NODE_API } from 'apis/constants';
import { URL_HELPERS } from 'appConstants';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { withRouter } from 'react-router-dom';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TAB_OTHER, TAB_PEOPLE } from 'utils/modelConstants';
import { DATASTORE_UTILS } from 'datastore';

import { CONFIG_0, CONFIG_1, CONFIG_2 } from './config';

export class PeopleTabRedirect extends PureComponent {
  getPeopleTabUri = () => {
    const { peopleTabIndex, templateId, peopleTabId } = this.props;
    const query = LOGIC_HELPERS.ifElse(
      peopleTabIndex > -1,
      `?tab=${peopleTabIndex}`,
      `?tabId=${peopleTabId}`,
    );
    return `${URL_HELPERS.tours(templateId)}${query}`;
  };

  handleCreateTabSuccess = ({ peopleView }) => ({ node }) => {
    const { calculatedVisibleChildren, history, templateId } = this.props;
    const peopleTabIndex = calculatedVisibleChildren.length;

    this.props.resaga.setValue({
      calculatedVisibleChildren: DATASTORE_UTILS.upsertArray('', node.id),
      calculatedPeopleTab: node.id,
      peopleView,
    });

    return history.push(
      `${URL_HELPERS.tours(templateId)}?tab=${peopleTabIndex}`,
    );
  };

  handlePeopleRedirect = ({ peopleView, filterView = {} }) => () => {
    const {
      peopleTabIndex,
      history,
      calculatedVisibleChildren,
      templateId,
      peopleTabId,
      nodeChildren,
      redirect,
    } = this.props;

    const doesPeopleTabExist =
      nodeChildren.indexOf(peopleTabId) > -1 || peopleTabIndex > -1;

    // create new tab other
    if (doesPeopleTabExist) {
      if (!redirect) {
        return this.props.resaga.setValue({ peopleView, ...filterView });
      }
      this.props.resaga.setValue({ peopleView, ...filterView });
      return history.push(this.getPeopleTabUri());
    }

    const node = {
      customData: {
        subtype: TAB_PEOPLE,
      },
      type: TAB_OTHER,
      content: 'People',
    };
    const parentId =
      calculatedVisibleChildren[calculatedVisibleChildren.length - 1];

    return this.props.resaga.dispatchTo(NODE_API, CREATE_NEXT_NODE, {
      payload: {
        nodeId: parentId,
        node,
        templateId,
      },
      onSuccess: this.handleCreateTabSuccess({ peopleView }),
    });
  };

  render = () => {
    const { children } = this.props;

    const props = {
      handlePeopleRedirect: this.handlePeopleRedirect,
    };

    return children(props);
  };
}

PeopleTabRedirect.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  // parent props
  children: PropTypes.func,
  redirect: PropTypes.bool,

  // resaga props
  templateId: PropTypes.number,
  peopleTabIndex: PropTypes.number,
  calculatedVisibleChildren: PropTypes.array,
  nodeChildren: PropTypes.array,
  peopleTabId: PropTypes.number,
};

PeopleTabRedirect.defaultProps = {
  templateId: 0,
  peopleTabIndex: -1,
  calculatedVisibleChildren: [],
  nodeChildren: [],
  peopleTabId: 0,
  redirect: true,
};

export default compose(
  withRouter,
  resaga(CONFIG_0),
  resaga(CONFIG_1),
  resaga(CONFIG_2),
)(PeopleTabRedirect);

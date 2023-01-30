import { FOLDER_API, GET_PARENT_OF_FOLDER } from 'apis/constants';
import { MY_TOURS, SHARED_TOURS, URL_HELPERS } from 'appConstants';
import { FOLDER_NAME } from 'containers/Templates/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import datastoreUtils from 'datastore/utils';
import first from 'lodash/first';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import { Content } from 'smartComponents/Node/parts';
import Breadcrumb from 'ugcomponents/Breadcrumbs';
import { parseQueryParam } from 'utils/helpers/url';
import { createResagaSubscriber } from 'utils/subscribe';
import { CONFIG, GET_ORG_ID_CONFIG, ITEM_CONFIG } from './config';

const ResagaSubscriber = createResagaSubscriber(ITEM_CONFIG);
export class BreadcrumbContainer extends PureComponent {
  state = {
    breadcrumbItems: [],
    error: false,
  };

  componentDidMount = () => {
    const parsedQ = parseQueryParam(this.props.location.search);
    if (parsedQ.current) {
      this.fetchParents(parsedQ.current);
    } else if (this.props.folderId > 0) {
      this.fetchParents(this.props.folderId);
    }
  };

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.folderId !== this.props.folderId &&
      nextProps.folderId !== 0
    ) {
      this.setState({
        error: false,
      });
      this.fetchParents(nextProps.folderId);
    }
  };

  onUpdate = index => props => {
    const isFirstItem = index === 0;

    if (isFirstItem) this.setBaseUrl(props);

    const breadcrumbObject = {
      id: props.id,
      label: !props.name ? MY_TOURS : props.name,
      url: this.getItemUrl(props.id, index),
      status: props.status,
    };

    this.items = isFirstItem
      ? [breadcrumbObject]
      : [...this.items, breadcrumbObject];
    const newItems = datastoreUtils.upsertObjIntoArray(
      breadcrumbObject,
      this.items,
      { id: props.id },
    );
    this.setState({
      breadcrumbItems: newItems,
    });

    if (index === this.props.items.length - 1) {
      this.forceUpdate();
    }
  };

  onError = () => {
    this.setState({
      error: true,
    });
  };

  // Possible to change once organisation shared tours is introduced.
  // The adjustments for it might probably need changes in front and back
  setBaseUrl = props => {
    const name = get(props, 'name', '');
    const nodeId = get(props, 'id', -1);

    if (nodeId === this.props.rootNodeId) {
      this.baseUrl = URL_HELPERS.tours();
      return;
    }

    if (name === SHARED_TOURS) {
      this.baseUrl = URL_HELPERS.sharedTours();
      return;
    }

    const orgId = this.getOrgId();
    this.baseUrl = URL_HELPERS.orgTours(orgId);
  };

  getOrgId = () => this.props.orgIdFromUrl || this.props.orgIdFromNode;

  getItemUrl = (id, index) => {
    const query = index === 0 ? '' : `?current=${id}`;

    return `${this.baseUrl}${query}`;
  };

  getPropsNeeded = () => {
    const {
      showLastItem,
      showAllActive,
      showOnlyFirstItem,
      renderText,
      darkMode,
    } = this.props;
    const onlyDisplayRoot = this.shouldDisplayOnlyRootItem();

    return {
      showLastItem,
      showAllActive,
      showOnlyFirstItem,
      onlyDisplayRoot,
      items: this.state.breadcrumbItems,
      renderText,
      darkMode,
    };
  };

  getBreadcrumbList = () =>
    this.props.items.map((id, index) => this.renderItem(id, index));

  items = [];

  fetchParents = folderId => {
    this.props.resaga.dispatchTo(FOLDER_API, GET_PARENT_OF_FOLDER, {
      payload: folderId,
      onError: this.onError,
    });
  };

  baseUrl = '';

  shouldDisplayOnlyRootItem = () => {
    const firstItem = first(this.state.breadcrumbItems);
    switch (get(firstItem, 'label')) {
      case FOLDER_NAME.SHARED_TOURS: {
        return true;
      }
      default: {
        return false;
      }
    }
  };

  renderItem = (id, index) => {
    // This is to handle items (like shared tours) where id is undefined.
    // This way, the console error will not appear.
    const key = id || -1;
    return (
      <ResagaSubscriber key={key} id={id} subscribe={this.onUpdate(index)} />
    );
  };

  renderText = ({ id, label }) => {
    // Show personal workspace or my tours itself
    if (id) {
      return <Content id={id} mapping={NODE_STORE_HELPERS.translateContent} />;
    }

    // Show shared tours or ordinary node
    return label;
  };

  render = () => {
    const props = this.getPropsNeeded();
    if (this.state.error) return null;
    return (
      <React.Fragment>
        <Breadcrumb {...props} renderText={this.renderText} />
        {this.getBreadcrumbList()}
      </React.Fragment>
    );
  };
}

BreadcrumbContainer.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

  // parent props
  folderId: PropTypes.number.isRequired,
  addonParam: PropTypes.string,
  showLastItem: PropTypes.bool,
  showAllActive: PropTypes.bool,
  showFirstItem: PropTypes.bool,
  showOnlyFirstItem: PropTypes.bool,
  darkMode: PropTypes.bool,
  renderText: PropTypes.func,

  // resaga props
  items: PropTypes.array,
  orgId: PropTypes.number,
  orgIdFromNode: PropTypes.number,
  orgIdFromUrl: PropTypes.number,
  rootNodeId: PropTypes.number,
};

BreadcrumbContainer.defaultProps = {
  items: [],
  addonParam: '',
  showLastItem: false,
  showAllActive: false,
  showFirstItem: false,
  showOnlyFirstItem: false,
  orgId: 0,
  orgIdFromUrl: 0,
  orgIdFromNode: 0,
  rootNodeId: 0,
};

export default compose(
  withRouter,
  resaga(GET_ORG_ID_CONFIG),
  resaga(CONFIG),
)(BreadcrumbContainer);

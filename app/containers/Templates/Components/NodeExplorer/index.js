import {
  FOLDER_API,
  GET_FOLDER_CHILDREN_WITH_PAGINATION,
} from 'apis/constants';
import { DEFAULT_CURRENT_ROUTE } from 'appConstants';
import Container from 'components/Container';
import TemplateBody from 'containers/Templates/Components/NodeExplorer/components/Body';

import TemplateHeader from 'containers/Templates/Components/NodeExplorer/components/Header';
import {
  DEFAULT_SORT_FIELD,
  DEFAULT_LIMIT,
  DEFAULT_SORT_ORDER,
} from 'containers/Templates/constants';
import PropTypes from 'prop-types';
/**
 * Created by paulcedrick on 6/15/17.
 */
import React, { PureComponent, Fragment } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import { parseQueryParam, stringifyParam } from 'utils/helpers/url';
import injectReducer from 'utils/injectReducer';
import { isEmptyString } from 'utils/stringAdditions';
import Breadcrumbs from 'containers/Templates/Components/TemplateBreadcrumbs';
import { H4 } from 'viewComponents/Typography';
import { withRouter } from 'react-router-dom';

import { CONFIG, CONFIG_FOLDER_ID, MY_TEMPLATE_PAGE } from './config';
import { MY_TEMPLATE_VIEWSTORE } from './constants';

export class NodeExplorer extends PureComponent {
  static propTypes = {
    // parent
    currentRoute: PropTypes.string,
    organisationId: PropTypes.number,

    // hoc
    resaga: PropTypes.object,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    folderTreeIds: PropTypes.array,

    // resaga
    id: PropTypes.number,
    rootNodeId: PropTypes.number,
    sortOrder: PropTypes.string,
    sortField: PropTypes.string,
    isFetchingInitialContent: PropTypes.bool,

    maxSize: PropTypes.bool,
    padding: PropTypes.bool,
    showHeader: PropTypes.bool,
    showBreadcrumbs: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    currentRoute: DEFAULT_CURRENT_ROUTE,
    id: 0,
    rootNodeId: 0,
    sortOrder: '',
    sortField: '',
    folderTreeIds: [],
    isFetchingInitialContent: false,

    maxSize: false,
    padding: true,
    showHeader: true,
    showBreadcrumbs: false,
  };

  state = {
    error: false,
  };

  componentDidMount = () => {
    this.props.resaga.setValue({
      folderFormOpen: false,
      folderTreeIds: this.props.folderTreeIds,
      organisationId: this.props.organisationId,
    });
    const params = parseQueryParam(this.props.location.search);
    this.onInitSortQuery(params);

    const parsedPageCount = parseInt(params.page, 10);
    const pageCount = Number.isNaN(parsedPageCount) ? 0 : parsedPageCount;
    const limit = DEFAULT_LIMIT * (pageCount + 1);
    if (params.current) {
      this.onFetchTemplates(params.current, limit);
    } else {
      this.onFetchTemplates(undefined, limit);
    }
  };

  componentWillReceiveProps = nextProps => {
    const { location: nextPropLocation } = nextProps;
    const { location: currLocation, organisationId } = this.props;
    const nextLocationParsed = parseQueryParam(nextPropLocation.search);
    const currLocationParsed = parseQueryParam(currLocation.search);
    if (nextLocationParsed.current !== currLocationParsed.current) {
      this.onFetchTemplates(nextLocationParsed.current);
    }

    if (
      nextLocationParsed.sortOrder !== currLocationParsed.sortOrder ||
      nextLocationParsed.sortField !== currLocationParsed.sortField
    ) {
      this.onInitSortQuery(nextLocationParsed);
    }

    if (organisationId !== nextProps.organisationId) {
      this.props.resaga.setValue({
        organisationId: nextProps.organisationId,
      });
    }
  };

  componentWillUnmount = () => {
    this.props.resaga.setValue({
      sortOrder: '',
      sortField: '',
      layout: '',
      isAddTemplateModalOpen: false,
      folderFormOpen: false,
    });
  };

  // Region - Sorting
  onInitSortQuery = queryParam => {
    const { sortOrder, sortField, location, history } = this.props;
    const copyQueryParam = queryParam;
    if (this.isSortQueryExist(queryParam) && !this.isSortReduxValExist()) {
      this.props.resaga.setValue({
        sortOrder: queryParam.sortOrder,
        sortField: queryParam.sortField,
      });
    } else if (
      !this.isSortQueryExist(queryParam) &&
      this.isSortReduxValExist()
    ) {
      copyQueryParam.sortOrder = sortOrder;
      copyQueryParam.sortField = sortField;
      const param = stringifyParam(copyQueryParam);

      history.replace(`${location.pathname}?${param}`);
    } else if (
      this.isSortReduxValExist() &&
      this.isSortQueryExist(queryParam)
    ) {
      this.props.resaga.setValue({
        sortOrder: queryParam.sortOrder,
        sortField: queryParam.sortField,
      });
    } else {
      copyQueryParam.sortField = DEFAULT_SORT_FIELD;
      copyQueryParam.sortOrder = DEFAULT_SORT_ORDER;
      this.props.resaga.setValue({
        sortOrder: DEFAULT_SORT_ORDER,
        sortField: DEFAULT_SORT_FIELD,
      });
    }
  };
  // End Region - Sorting

  onFetchTemplates = (id = this.props.rootNodeId, limit) => {
    // I should reset the folderFormOpen value in the redux store so that
    // when user visited a new folder, folder form will is not opened
    const { sortOrder, sortField } = this.getSortValue();

    this.setState({ error: false });
    this.props.resaga.setValue({
      folderFormOpen: false,
    });
    this.props.resaga.setValue({
      bId: id,
      customBreadcrumbId: id,
      isFetchingInitialContent: true,
    });

    this.props.resaga.dispatchTo(
      FOLDER_API,
      GET_FOLDER_CHILDREN_WITH_PAGINATION,
      {
        payload: {
          id,
          sortOrder,
          sortField,
          limit,
        },
        onSuccess: this.onFetchTemplateSuccess,
        onError: this.onFetchTemplateError,
      },
    );
  };

  onFetchTemplateError = () => {
    this.props.resaga.setValue({ id: 0 });
    this.setState({ error: true });
  };

  onFetchTemplateSuccess = result => {
    this.props.resaga.setValue({
      currResultCount: result.count,
      id: result.nodeId,
      isFetchingInitialContent: false,
    });
  };

  getSortValue = () => {
    const parsedSearch = parseQueryParam(this.props.location.search);
    let sortField = this.props.sortField;
    let sortOrder = this.props.sortOrder;

    if (
      isEmptyString(this.props.sortOrder) &&
      isEmptyString(this.props.sortField)
    ) {
      sortField = parsedSearch.sortField
        ? parsedSearch.sortField
        : DEFAULT_SORT_FIELD;
      sortOrder = parsedSearch.sortOrder
        ? parsedSearch.sortOrder
        : DEFAULT_SORT_ORDER;
    }

    return { sortField, sortOrder };
  };

  // Region - Sorting helper functions
  isSortReduxValExist = () =>
    !isEmptyString(this.props.sortField) &&
    !isEmptyString(this.props.sortOrder);

  isSortQueryExist = queryParam =>
    !isEmptyString(queryParam.sortField) &&
    !isEmptyString(queryParam.sortOrder);
  // End Region - Sorting helper functions

  renderHeader = () => {
    const { id, currentRoute, showHeader, organisationId } = this.props;
    if (!showHeader) {
      return null;
    }

    return (
      <Fragment>
        <TemplateHeader
          isFetchFolderChildrenLoading={this.props.isFetchingInitialContent}
          folderId={id}
          currentRoute={currentRoute}
          organisationId={organisationId}
          showBreadCrumbs={!organisationId}
        />
      </Fragment>
    );
  };

  renderBreadcrumbs = () => {
    const { id, currentRoute, showBreadcrumbs, rootNodeId } = this.props;

    if (!showBreadcrumbs || rootNodeId === id) {
      return null;
    }

    return (
      <Breadcrumbs
        rootUrl={`${currentRoute}?current=`}
        folderId={id}
        showLastItem
        showOneItem
      />
    );
  };

  render = () => {
    const { id, currentRoute, maxSize, padding, className } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <Container maxSize={maxSize} padding={padding} className={className}>
          <H4 error>Access denied</H4>
        </Container>
      );
    }

    return (
      <Container maxSize={maxSize} padding={padding} className={className}>
        {this.renderHeader()}
        {this.renderBreadcrumbs()}
        <TemplateBody folderId={id} currentRoute={currentRoute} />
      </Container>
    );
  };
}

const myTemplateReducer = injectReducer({
  key: MY_TEMPLATE_PAGE,
  reducer: reducer(MY_TEMPLATE_PAGE),
});

const myTemplateViewStore = injectReducer({
  key: MY_TEMPLATE_VIEWSTORE,
  reducer: reducer(MY_TEMPLATE_VIEWSTORE),
});

export default compose(
  withRouter,
  myTemplateViewStore,
  myTemplateReducer,
  resaga(CONFIG_FOLDER_ID),
  resaga(CONFIG),
)(NodeExplorer);

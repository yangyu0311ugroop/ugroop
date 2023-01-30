import {
  GET_ROLES,
  USER_API,
  NODE_SHARE_API,
  GET_SHARED_TEMPLATES,
} from 'apis/constants';
import { SHARED_TEMPLATES_DATASTORE, URL_HELPERS } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import GridView from 'containers/Templates/Components/GridView';
import ListView from 'containers/Templates/Components/ListView';
import { parseQueryParam, stringifyParam } from 'utils/helpers/url';
import { isEmptyString } from 'utils/stringAdditions';
import Role from 'smartComponents/Person/components/TourRoles/parts/Role';
import { VARIANTS } from 'variantsConstants';
import { H3, H5 } from 'viewComponents/Typography';
import { DATASTORE_UTILS } from 'datastore';
import { FOLDER_QUERY_PARAM } from 'containers/Templates/constants';
import ShowMore from './components/ShowMore';
import { CONFIG } from './config';
import styles from './styles';

export class TemplateView extends PureComponent {
  state = {
    isFetching: true,
  };

  componentDidMount = () => {
    this.setState({
      isFetching: true,
    });
    const { sortOrder, sortField } = this.getSortValue();
    const page = this.getPageCount();
    this.props.resaga.dispatchTo(NODE_SHARE_API, GET_SHARED_TEMPLATES, {
      payload: {
        pageSelected: this.props.pageSelected,
        sortOrder,
        sortField,
        offset: 0,
        page,
      },
      onSuccess: this.onFetchSuccess(sortField, sortOrder),
    });
    this.props.resaga.dispatchTo(USER_API, GET_ROLES, {
      payload: {
        userId: this.props.userId,
      },
    });
  };

  onSortChange = (sorting, sortField) => {
    const sortOrder = sortField !== this.props.sortField ? 'asc' : sorting;
    const page = this.getPageCount();
    this.props.resaga.dispatchTo(NODE_SHARE_API, GET_SHARED_TEMPLATES, {
      payload: {
        offset: 0,
        sortOrder,
        sortField,
        page,
        pageSelected: this.props.pageSelected,
      },
      onSuccess: this.onSortFetchSuccess,
    });
  };

  onSortFetchSuccess = (result, payload) => {
    this.onSortChangeQuery(payload.sortField, payload.sortOrder);
    this.props.resaga.setValue({
      id: result.id,
      folder: result.folder,
      children: result.children,
      sortField: payload.sortField,
      sortOrder: payload.sortOrder,
      people: DATASTORE_UTILS.upsertObject(result.person),
    });
  };

  onSortChangeQuery = (sortField, sortOrder) => {
    const parsedSearch = parseQueryParam(this.props.search);
    const { location } = this.props;
    parsedSearch.sortOrder = sortOrder;
    parsedSearch.sortField = sortField;
    const param = stringifyParam(parsedSearch);
    this.props.history.replace(`${location.pathname}?${param}`);
  };

  onInitSortQuery = queryParam => {
    const { sortOrder, sortField, location, history } = this.props;
    const pathname = location.pathname;
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
      history.replace(`${pathname}?${param}`);
    } else if (
      this.isSortReduxValExist() &&
      this.isSortQueryExist(queryParam)
    ) {
      this.props.resaga.setValue({
        sortOrder: queryParam.sortOrder,
        sortField: queryParam.sortField,
      });
    } else {
      copyQueryParam.sortField = 'content';
      copyQueryParam.sortOrder = 'asc';
      const param = stringifyParam(copyQueryParam);
      history.replace(`${pathname}?${param}`);
      this.props.resaga.setValue({
        sortOrder: 'asc',
        sortField: 'content',
      });
    }
  };

  onFetchSuccess = (sortField, sortOrder) => result => {
    this.setState({
      isFetching: false,
    });
    const currResultCount = result.children
      ? Object.keys(result.children).length
      : 0;
    this.props.resaga.setValue({
      id: result.id,
      folder: result.folder,
      children: result.children,
      sortField,
      sortOrder,
      currResultCount,
      people: DATASTORE_UTILS.upsertObject(result.person),
    });
  };

  getSortValue = () => {
    const parsedSearch = parseQueryParam(this.props.search);
    let sortField = this.props.sortField;
    let sortOrder = this.props.sortOrder;

    if (
      isEmptyString(this.props.sortOrder) &&
      isEmptyString(this.props.sortField)
    ) {
      sortField = parsedSearch.sortField ? parsedSearch.sortField : 'content';
      sortOrder = parsedSearch.sortOrder ? parsedSearch.sortOrder : 'asc';
    }

    return { sortField, sortOrder };
  };

  getPageCount = () => {
    const parsedSearch = parseQueryParam(this.props.search);
    return parsedSearch.page ? parseInt(parsedSearch.page, 10) : 0;
  };

  isSortReduxValExist = () =>
    !isEmptyString(this.props.sortField) &&
    !isEmptyString(this.props.sortOrder);

  isSortQueryExist = queryParam =>
    !isEmptyString(queryParam.sortField) &&
    !isEmptyString(queryParam.sortOrder);

  renderBlankslate = () => {
    const { classes, pageSelected } = this.props;
    const message =
      pageSelected === 'shareByMe'
        ? 'Tours that you shared to others will be shown here'
        : 'Tours that are shared by others will be shown here';

    return (
      <div className={classes.blankslate}>
        <H5 className={classes.subheading}>{message}</H5>
        <H3 className={classes.heading}>There are no Shared Tours yet</H3>
      </div>
    );
  };

  renderActions = ({ id }) => {
    const { pageSelected } = this.props;

    if (pageSelected === 'shareByMe') {
      return null;
    }

    return <Role variant={VARIANTS.SUBTITLE_TEXT} id={id} />;
  };

  render = () => {
    const {
      folderChildrenArray,
      view,
      sortField,
      sortOrder,
      switchLoading,
      pageSelected,
    } = this.props;

    const pageFetching = this.state.isFetching || switchLoading;

    if (pageFetching) {
      return <p>Loading...</p>;
    }

    if (this.props.folderChildrenArray.length <= 0) {
      return this.renderBlankslate();
    }

    const templateQueryParam = {
      folder: FOLDER_QUERY_PARAM.SHARED_TOURS,
    };
    const stringifiedParam = stringifyParam(templateQueryParam);

    let layout = (
      <GridView
        templateQueryParam={stringifiedParam}
        dataStore={SHARED_TEMPLATES_DATASTORE}
        baseUrl={URL_HELPERS.tours()}
        sortedIds={folderChildrenArray}
        showActions={pageSelected !== 'shareByMe'}
        renderPagination={<ShowMore isFetching={pageFetching} />}
        renderActions={this.renderActions}
      >
        <div />
      </GridView>
    );

    if (view === 'list') {
      layout = (
        <ListView
          sortedIds={folderChildrenArray}
          baseUrl={URL_HELPERS.tours()}
          onSortChange={this.onSortChange}
          sortFieldValue={sortField}
          sortOrderValue={sortOrder}
          showActions={false}
          renderPagination={<ShowMore isFetching={pageFetching} />}
          templateQueryParam={stringifiedParam}
        />
      );
    }

    return <div>{layout}</div>;
  };
}

TemplateView.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // parent props

  // resaga props
  folderChildrenArray: PropTypes.array,
  view: PropTypes.string,
  sortField: PropTypes.string,
  sortOrder: PropTypes.string,
  search: PropTypes.string,
  pageSelected: PropTypes.string,
  switchLoading: PropTypes.bool,
  userId: PropTypes.number,
};

TemplateView.defaultProps = {
  folderChildrenArray: [],
  view: '',
  sortField: '',
  sortOrder: '',
  search: '',
  pageSelected: 'shareByMe',
  switchLoading: false,
  userId: 0,
};

export default compose(
  withStyles(styles, { name: 'TemplateView' }),
  resaga(CONFIG),
  withRouter,
)(TemplateView);

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import ItemHelper from 'datastore/myTemplateListStore/helpers/item';
import resaga from 'resaga';
import { withRouter } from 'react-router-dom';
import TemplateShowMore from 'containers/Templates/Components/TemplateShowMore';
import { parseQueryParam, stringifyParam } from 'utils/helpers/url';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from 'containers/Templates/constants';
import { DATASTORE_UTILS } from 'datastore';
import { NODE_SHARE_API, GET_SHARED_TEMPLATES } from 'apis/constants';
import { CONFIG } from './config';
import styles from './styles';

export class ShowMore extends PureComponent {
  state = {
    offset: DEFAULT_OFFSET,
  };

  componentDidMount = () => {
    const currPageCount = this.getPageCount();
    this.setPageCount(currPageCount);
    if (!Number.isNaN(currPageCount) && currPageCount > 0) {
      const offset = currPageCount * DEFAULT_LIMIT;
      this.setState({ offset });
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.pageSelected !== this.props.pageSelected) {
      this.resetOffset(nextProps);
    }
  };

  onPaginateSuccess = result => {
    if (result.children) {
      this.updateUri();
      this.setState({
        offset: this.getNextPage(),
      });
      this.props.resaga.setValue({
        currResultCount: Object.keys(result.children).length,
      });
      this.updateList(result);
    } else {
      this.props.resaga.setValue({
        currResultCount: 0,
      });
    }
  };

  onClick = () => {
    const { sortOrder, sortField, pageSelected } = this.props;
    this.props.resaga.dispatchTo(NODE_SHARE_API, GET_SHARED_TEMPLATES, {
      payload: {
        offset: this.getNextPage(),
        pageSelected,
        sortOrder,
        sortField,
      },
      onSuccess: this.onPaginateSuccess,
    });
  };

  getNextPage = () => this.state.offset + DEFAULT_LIMIT;

  setPageCount = (pageCount = 0) => {
    if (Number.isNaN(pageCount) || pageCount <= 0) {
      this.pageCount = 0;
    } else {
      this.pageCount = pageCount;
    }
  };

  getPageCount = () => {
    const { search } = this.props;
    const currQuery = parseQueryParam(search);
    return parseInt(currQuery.page, 10);
  };

  resetOffset = () => {
    this.setState({
      offset: DEFAULT_OFFSET,
    });
    this.pageCount = 0;
  };

  updateList = result => {
    const { folderId } = this.props;
    this.props.resaga.setValue({
      folder: ItemHelper.appendItem(
        folderId,
        result.folder[result.id].children,
      ),
      children: ItemHelper.appendChildren(result.children),
      people: DATASTORE_UTILS.upsertObject(result.person),
    });
  };

  updateUri = () => {
    const { location, search } = this.props;
    const currQuery = parseQueryParam(search);
    this.pageCount += 1;
    currQuery.page = this.pageCount;
    this.props.history.replace(
      `${location.pathname}?${stringifyParam(currQuery)}`,
    );
  };

  render = () => (
    <TemplateShowMore
      onClick={this.onClick}
      fetchLength={this.props.currResultCount}
      fetchLimit={DEFAULT_LIMIT}
      isFetching={this.props.isSharedFetchLoading}
    />
  );
}

ShowMore.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

  // parent props

  // resaga props
  sortOrder: PropTypes.string,
  sortField: PropTypes.string,
  folderId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pageSelected: PropTypes.string,
  search: PropTypes.string,
  currResultCount: PropTypes.number,
  isSharedFetchLoading: PropTypes.bool,
};

ShowMore.defaultProps = {
  sortOrder: 'asc',
  sortField: 'content',
  folderId: 0,
  pageSelected: 'shareToMe',
  search: '',
  currResultCount: 0,
  isSharedFetchLoading: false,
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'ShowMore' }),
  resaga(CONFIG),
)(ShowMore);

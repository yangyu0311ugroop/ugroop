import { withStyles } from '@material-ui/core/styles';
import { FOLDER_FETCH_TYPES } from 'apis/components/Folder/constants';
import {
  FOLDER_API,
  GET_FOLDER_CHILDREN_WITH_PAGINATION,
} from 'apis/constants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { parseQueryParam, stringifyParam } from 'utils/helpers/url';
import ShowMoreBtn from 'containers/Templates/Components/TemplateShowMore/index';
import { withRouter } from 'react-router-dom';

import { DEFAULT_OFFSET, DEFAULT_LIMIT } from 'containers/Templates/constants';
import { CONFIG, FOLDER_ID_CONFIG } from './config';
import styles from './styles';

export class MyTemplateShowMore extends PureComponent {
  state = {
    offset: DEFAULT_OFFSET,
    isFetching: false,
  };

  componentDidMount = () => {
    this.setPageCount();
    if (this.pageCount > 0) {
      const { location } = this.props;
      const query = parseQueryParam(location.search);
      const pageCount = parseInt(query.page, 10);
      this.setState({ offset: pageCount * DEFAULT_LIMIT });
    }
  };

  onFetchMultipleSuccess = () => {
    this.setState({
      isFetching: false,
    });
  };

  onPaginateSuccess = result => {
    const currResultCount = result.count;
    if (result.count > 0) {
      this.updatePageCount();
      this.setState({
        offset: this.getNextPage(),
        isFetching: false,
      });
      this.props.resaga.setValue({
        currResultCount,
      });
    } else {
      this.props.resaga.setValue({
        currResultCount,
      });
      this.setState({
        isFetching: false,
      });
    }
  };

  onClick = () => {
    const { folderId, sortOrder, sortField } = this.props;
    this.setState({
      isFetching: true,
    });
    this.props.resaga.dispatchTo(
      FOLDER_API,
      GET_FOLDER_CHILDREN_WITH_PAGINATION,
      {
        payload: {
          id: folderId,
          offset: this.getNextPage(),
          sortOrder,
          sortField,
          fetchType: FOLDER_FETCH_TYPES.PAGINATION,
        },
        onSuccess: this.onPaginateSuccess,
      },
    );
  };

  getNextPage = () => this.state.offset + DEFAULT_LIMIT;

  setPageCount = () => {
    const { search } = this.props.location;
    const currQuery = parseQueryParam(search);
    if (currQuery.page) {
      const page = parseInt(currQuery.page, 10);
      if (Number.isNaN(page) || page <= 0) {
        this.pageCount = 0;
      } else {
        this.pageCount = page;
      }
    } else {
      this.pageCount = 0;
    }
  };

  updateUri = (pageCount, parsedQuery) => {
    const { pathname } = this.props.location;
    const currQuery = { ...parsedQuery };
    currQuery.page = pageCount;
    this.props.history.replace(`${pathname}?${stringifyParam(currQuery)}`);
  };

  updatePageCount = () => {
    const { search } = this.props.location;
    const currQuery = parseQueryParam(search);

    this.pageCount += 1;
    this.updateUri(this.pageCount, currQuery);
  };

  render = () => (
    <ShowMoreBtn
      onClick={this.onClick}
      fetchLength={this.props.currResultCount}
      fetchLimit={DEFAULT_LIMIT}
      isFetching={this.state.isFetching}
    />
  );
}

MyTemplateShowMore.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  // parent props

  // resaga props
  folderId: PropTypes.number,
  sortOrder: PropTypes.string,
  sortField: PropTypes.string,
  currResultCount: PropTypes.number,
};

MyTemplateShowMore.defaultProps = {
  folderId: 0,
  sortOrder: '',
  sortField: '',
  currResultCount: 0,
};

export default compose(
  withStyles(styles, { name: 'MyTemplateShowMore' }),
  resaga(FOLDER_ID_CONFIG),
  resaga(CONFIG),
)(withRouter(MyTemplateShowMore));

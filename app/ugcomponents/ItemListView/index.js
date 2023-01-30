/**
 * Created by Yang on 13/7/17.
 */
/*
 *  UIItemListView is basically a Material List Wrapper.
 *  It's easy to generate array of items. You shall use it may data is relatively small.
 * */
import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

export class UIItemListView extends React.PureComponent {
  tableView() {
    const viewDelegate = this.props.viewDelegate;
    const listItems = [];
    const totalRows = viewDelegate.numberOfRow();
    for (let row = 0; row < totalRows; row += 1) {
      const eachCell = viewDelegate.itemCellView(row);
      listItems.push(eachCell);
    }
    if (this.props.noULWrap) {
      return listItems;
    }
    return <List className={this.props.className}>{listItems}</List>;
  }

  render() {
    return this.tableView();
  }
}

UIItemListView.propTypes = {
  className: PropTypes.string,
  viewDelegate: PropTypes.object.isRequired,
  noULWrap: PropTypes.bool,
};

UIItemListView.defaultProps = {};

export default UIItemListView;

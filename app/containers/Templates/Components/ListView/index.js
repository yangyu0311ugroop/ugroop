import { withStyles } from '@material-ui/core/styles';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import { URL_CHECKER } from 'utils/helpers/url';
import { VARIANTS } from 'variantsConstants';
import { compose } from 'redux';
import resaga from 'resaga';
import Node from 'smartComponents/Node';
import TableCellForm from './components/EditableForm';
import styles from './styles';
import {
  CONFIG,
  CONFIG_ORG_MEMBERS,
  CONFIG_USER_ORGANISATIONS,
  ROOT_NODE_IDS_CONFIG,
} from './config';
import { DO_NOTHING } from '../../../../appConstants';
/* eslint-disable no-param-reassign,no-return-assign */
export function ListView(props) {
  const checkValue = val => val === 0;

  const isOnMyTours = () => {
    const { location } = props;
    const pathname = get(location, 'pathname', null);

    const returned = LOGIC_HELPERS.ifElse(
      URL_CHECKER.isOnMyToursPage(pathname),
      true,
      false,
    );
    return returned;
  };

  /**
   * To filter checked items local state
   * @param {Array} newItems
   */

  const onCheckboxChecked = () => DO_NOTHING;

  const renderItems = () => {
    const {
      memberIds,
      rootNodeIds,
      sortedIds, // eslint-disable-line
      folderIds,
    } = props;
    const hasNoRootNodeIds = rootNodeIds.every(checkValue);

    return sortedIds.map(id => {
      const checkboxProps = {
        onChange: onCheckboxChecked(),
        value: id.toString(),
        checked: '',
      };

      return (
        <Node
          key={id}
          id={id}
          variant={VARIANTS.LIST_ITEM}
          checkboxProps={checkboxProps}
          baseUrl={props.baseUrl}
          currentRoute={props.currentRoute}
          memberIds={memberIds}
          hasNoRootNodeIds={hasNoRootNodeIds}
          isOnMyTours={isOnMyTours()}
          parentFolderIds={folderIds}
        />
      );
    });
  };

  const {
    addMode,
    onKeyPress,
    onClose,
    onChange,
    onSave,
    formVal,
    classes,
  } = props;

  const tableItems = renderItems();
  const form = addMode ? (
    <TableCellForm
      onSave={onSave}
      onChange={onChange}
      onClose={onClose}
      onKeyPress={onKeyPress}
      value={formVal}
    />
  ) : (
    <div />
  );

  return (
    <div className={classes.container}>
      <div className={classes.tableContainer}>
        {form}
        {tableItems}
      </div>
      {props.renderPagination}
    </div>
  );
}

ListView.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  location: PropTypes.object,

  // parent props
  addMode: PropTypes.bool,
  onKeyPress: PropTypes.func,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  formVal: PropTypes.string,
  baseUrl: PropTypes.string.isRequired,
  renderPagination: PropTypes.node,
  currentRoute: PropTypes.string,
  folderIds: PropTypes.array,

  // resaga props
  memberIds: PropTypes.array,
  rootNodeIds: PropTypes.array,
  sortedIds: PropTypes.array,
};

ListView.defaultProps = {
  onKeyPress: null,
  onClose: null,
  onChange: null,
  onSave: null,
  addMode: false,
  formVal: '',
  renderPagination: '',
  folderIds: [],
  sortedIds: [],
};

export default compose(
  withStyles(styles, { name: 'ListView' }),
  withRouter,
  resaga(CONFIG),
  resaga(CONFIG_USER_ORGANISATIONS),
  resaga(CONFIG_ORG_MEMBERS),
  resaga(ROOT_NODE_IDS_CONFIG),
)(React.memo(ListView));

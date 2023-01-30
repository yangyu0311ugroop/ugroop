import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from 'ugcomponents/Icon';
import { SORT_HELPERS } from 'utils/sorter';
import _ from 'lodash';

import TView from '@material-ui/lab/TreeView';
import TvItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { ListItemIcon } from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { isEmptyString } from 'utils/stringAdditions';
import toString from 'lodash/toString';
import styles from './styles';

export class TreeView extends PureComponent {
  state = {
    opened: [],
  };

  componentDidMount = () => {
    if (this.props.isOpenedFirstLevel) {
      this.setState({ opened: this.props.defaultExpanded });
    }
  };

  onReset = () =>
    this.setState({
      opened: [],
    });

  onSelect = (itemId, itemTitle) => () => {
    this.props.onSelect(itemId, itemTitle, {
      reset: this.onReset,
    });
  };

  renderIcon = (item, params) =>
    LOGIC_HELPERS.ifFunction(
      this.props.renderIcon,
      [
        item.id,
        classNames(
          params.classes.folderIcon,
          params.isSelected && params.classes.isWhite,
          { [params.classes.withMarginLeft]: params.hasChildren },
        ),
      ],
      isEmptyString(params.icon) ? (
        ''
      ) : (
        <ListItemIcon>
          <Icon
            icon={params.icon}
            className={classNames(
              params.classes.folderIcon,
              params.isSelected && params.classes.isWhite,
              { [params.classes.withMarginLeft]: params.hasChildren },
            )}
            size="normal"
          />
        </ListItemIcon>
      ),
    );

  StyledTreeItem = props => {
    const { labelText, nodeId, onClick } = props;
    const { classes } = this.props;
    return (
      <TvItem
        label={<div className={classes.labelRoot}>{labelText}</div>}
        nodeId={nodeId}
        onLabelClick={this.onLabelClick({ onClick, nodeId })}
        onIconClick={onClick}
        key={nodeId}
      >
        {props.childrenList}
      </TvItem>
    );
  };

  renderItem = (item, level = 0) => {
    let childrenList = '';
    const hasChildren = item.children && item.children.length > 0;
    if (hasChildren) {
      const newArr = _.sortBy(
        item.children,
        SORT_HELPERS.sortObjectValue('content'),
      );
      childrenList = newArr.map(childItem =>
        this.renderItem(childItem, level + 1),
      );
    }
    return this.StyledTreeItem({
      nodeId: toString(item.id),
      labelText: LOGIC_HELPERS.ifFunction(
        this.props.renderItem,
        [item.id],
        item.content,
      ),
      onClick: this.onSelect(item.id, item.content),
      childrenList,
    });
  };

  onLabelClick = ({ onClick, nodeId }) => ev => {
    const { opened } = this.state;
    if (opened.includes(nodeId)) {
      ev.preventDefault();
    }
    onClick();
  };

  onNodeToggle = (a, nodes) => {
    a.preventDefault();
    this.setState({ opened: nodes });
  };

  getDefaultSelected = () => {
    const { defaultExpanded } = this.props;
    return Array.isArray(defaultExpanded) ? defaultExpanded.map(String) : [];
  };

  render = () => {
    const { classes, items } = this.props;
    const defaultIds = this.getDefaultSelected();

    return (
      <div className={classes.root}>
        <TView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          defaultSelected={defaultIds}
          defaultExpanded={defaultIds}
          onNodeToggle={this.onNodeToggle}
        >
          {items.map(item => this.renderItem(item))}
        </TView>
      </div>
    );
  };
}

export const defaultFunc = () => {};

TreeView.propTypes = {
  classes: PropTypes.object.isRequired,
  /**
   * Items to be displayed
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      children: PropTypes.array,
    }),
  ),
  renderIcon: PropTypes.func,
  /**
   * Event fired when a particular part is highlighted
   */
  onSelect: PropTypes.func,
  /**
   * String used for icon
   */
  // icon: PropTypes.string,
  isOpenedFirstLevel: PropTypes.bool,
  // rootNodeId: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  // selected: PropTypes.number,
  // disabledFolderId: PropTypes.number,
  renderItem: PropTypes.func,
  defaultExpanded: PropTypes.array,
};

TreeView.defaultProps = {
  items: [],
  onSelect: defaultFunc,
  // icon: 'folder',
  isOpenedFirstLevel: false,
  defaultExpanded: [],
  // rootNodeId: 0,
  // selected: -1,
  // disabledFolderId: -1,
  renderItem: null,
};

export default withStyles(styles, { name: 'TreeView' })(TreeView);

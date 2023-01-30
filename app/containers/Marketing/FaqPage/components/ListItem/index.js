import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
// import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core/List';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Description from 'containers/Marketing/Components/Description';
import stylesheet from './style';

export class FAQListItem extends PureComponent {
  state = {
    open: false,
  };

  onClick = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  };

  render = () => {
    const { classes, children, itemTitle } = this.props;
    let listItemClassname = classes.listItem;

    if (this.state.open) {
      listItemClassname += ` ${classes.listItemSelected}`;
    }

    return (
      <div>
        <ListItem
          onClick={this.onClick}
          button
          className={`${listItemClassname}`}
        >
          <ListItemIcon>
            {this.state.open ? (
              <RemoveIcon className={classes.icon} />
            ) : (
              <AddIcon className={classes.icon} />
            )}
          </ListItemIcon>
          <ListItemText
            className={classes.listItemText}
            inset
            primary={itemTitle}
          />
        </ListItem>
        <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
          <ListItem className={`${classes.listItem}`}>
            <Description className={classes.listItemContent} size={14}>
              {children}
            </Description>
          </ListItem>
        </Collapse>
      </div>
    );
  };
}

FAQListItem.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  itemTitle: PropTypes.node,
};
FAQListItem.defaultProps = {};

export default withStyles(stylesheet, { name: 'FAQListItem' })(FAQListItem);

import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import UGLink from 'components/Link';
import Popover from '@material-ui/core/Popover';
import Button from 'ugcomponents/Buttons/Button';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import styles from './styles';

export class BreadcrumbDropdown extends PureComponent {
  state = {
    anchorEl: null,
  };

  onOpenPopover = event => this.setState({ anchorEl: event.currentTarget });

  onClose = () => this.setState({ anchorEl: null });

  render = () => {
    const { classes, items, renderText } = this.props;
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        <Button
          disableRipple
          className={classes.btn}
          onClick={this.onOpenPopover}
        >
          ...
        </Button>
        <Icon className={classes.icon} icon="chevron-right" />
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.onClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <div>
            {items.map(item => (
              <UGLink key={item.url} className={classes.link} to={item.url}>
                {LOGIC_HELPERS.ifFunction(renderText, [item], item.label)}
              </UGLink>
            ))}
          </div>
        </Popover>
      </React.Fragment>
    );
  };
}

BreadcrumbDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  renderText: PropTypes.func,
};

BreadcrumbDropdown.defaultProps = {
  renderText: null,
};

export default withStyles(styles, { name: 'BreadcrumbDropdown' })(
  BreadcrumbDropdown,
);

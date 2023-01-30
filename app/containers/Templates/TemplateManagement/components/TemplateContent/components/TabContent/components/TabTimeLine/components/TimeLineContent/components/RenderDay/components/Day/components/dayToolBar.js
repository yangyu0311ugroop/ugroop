import { FLAT_BUTTON } from 'appConstants';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
/**
 * Created by Yang on 28/9/2017.
 */
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import IconButton from 'ugcomponents/Buttons/IconButton';
import Icon from 'ugcomponents/Icon';
import CircularProgress from 'ugcomponents/Progress/CircularProgress';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import { CONFIG } from './defines/toolBarConfig';
import { dayToolBarStyle } from './style';

export class DayToolBar extends PureComponent {
  state = {
    deleting: false,
  };

  toggleEdit = e => {
    e.preventDefault();
    LOGIC_HELPERS.ifFunction(this.props.toolBarFunc.toggleEdit);
  };

  editModeButtons = () => {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          tooltip="Save Changes"
          variant={FLAT_BUTTON}
          type="submit"
          color="primary"
        >
          <Icon icon="lnr-check" />
        </IconButton>

        <IconButton
          onClick={this.toggleEdit}
          tooltip="Cancel"
          variant={FLAT_BUTTON}
        >
          <Icon icon="lnr-cross2" />
        </IconButton>
      </div>
    );
  };

  render = () => {
    const { editor } = this.props;
    let content = null;
    if (editor) {
      content = this.editModeButtons();
    } else if (this.state.deleting) {
      content = <CircularProgress className="glyphicon" size={20} />;
    }
    return content;
  };
}

DayToolBar.propTypes = {
  classes: PropTypes.object.isRequired,

  toolBarFunc: PropTypes.object,
  editor: PropTypes.bool,
  // RESAGA VALUE
};

DayToolBar.defaultProps = {
  toolBarFunc: {},
};

export default compose(
  withStyles(dayToolBarStyle, { name: 'DayToolBar' }),
  resaga(CONFIG),
)(DayToolBar);

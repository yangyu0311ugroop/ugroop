import { DO_NOTHING } from 'appConstants';
import H4 from 'components/H4';
import H5 from 'components/H5';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M, injectIntl } from 'react-intl';
import HelpDialog from 'ugcomponents/HelpDialog';
import Icon from 'ugcomponents/Icon';
import m from './messages';
import styles from './styles';

export class HelpTab extends PureComponent {
  text = this.props.intl.formatMessage;

  handleClose = () => {
    const { onClose } = this.props;

    if (onClose) return onClose('helpTab');

    return DO_NOTHING;
  };

  render = () => {
    const { classes, open } = this.props;

    return (
      <HelpDialog
        open={open}
        onClose={this.handleClose}
        dialogTitle={this.text(m.faq)}
      >
        <div className={classes.help}>
          <H4>
            <M {...m.fewIdeas} />
            <span>
              <Icon icon="plus" />
            </span>
            <M {...m.tabToCreate} />
          </H4>
        </div>
        <div className={classes.help}>
          <H5>1</H5>
          <H4>
            <M {...m.dragAndDrop} />
          </H4>
        </div>
        <div className={classes.help}>
          <H5>2</H5>
          <H4>
            <M {...m.changeName} />
          </H4>
        </div>
        <div className={classes.help}>
          <H5>3</H5>
          <H4>
            <M {...m.deleteTab} />
          </H4>
        </div>
      </HelpDialog>
    );
  };
}

HelpTab.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }),

  // parent props
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

HelpTab.defaultProps = {
  open: false,
};

export default withStyles(styles, { name: 'HelpTab' })(injectIntl(HelpTab));

import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { Fade } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon/index';
import { CONFIG } from './config';
import styles from './styles';

export class Buttons extends PureComponent {
  showSubmitButton = () => {
    const {
      invited,
      shared,
      me,
      owner,
      pending,
      accepted,
      fromOtherOrg,
    } = this.props;

    const isOwner = me === owner && (pending || accepted);

    return !(
      invited ||
      shared ||
      isOwner ||
      pending ||
      accepted ||
      fromOtherOrg
    );
  };

  showResetButton = () => {
    const { fetching, sending, exist } = this.props;

    const loading = fetching || sending;

    return exist && !loading;
  };

  handleReset = () => {
    const { onReset } = this.props;

    if (onReset) onReset();
  };

  renderSubmitButton = () => {
    const { fetching, exist, disabled, sending } = this.props;
    const loading = fetching || sending;
    const button = exist ? 'Send invitation' : 'Find';
    return (
      this.showSubmitButton() && (
        <GridItem>
          <Button
            type="submit"
            dense
            size="small"
            color="primary"
            loading={loading}
            disabled={disabled}
          >
            {button}
          </Button>
        </GridItem>
      )
    );
  };

  renderResetText = () => {
    const { pending, accepted, shared, fromOtherOrg, invited } = this.props;

    return invited || shared || pending || accepted || fromOtherOrg
      ? 'Invite someone else'
      : 'Cancel';
  };

  renderResetButton = () =>
    this.showResetButton() && (
      <GridItem>
        <Button dense size="small" variant="outline" onClick={this.handleReset}>
          {this.renderResetText()}
        </Button>
      </GridItem>
    );

  render = () => {
    const { classes, shared } = this.props;

    const submitButton = this.renderSubmitButton();
    const resetButton = this.renderResetButton();

    return (
      <GridContainer alignItems="center">
        {submitButton}
        {resetButton}

        <Fade in={shared}>
          <GridItem>
            <span className={classes.success}>
              <Icon size="small" icon="lnr-check" paddingRight />
              Invitation sent successfully!
            </span>
          </GridItem>
        </Fade>
      </GridContainer>
    );
  };
}

Buttons.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  shared: PropTypes.bool,
  invited: PropTypes.bool,
  onReset: PropTypes.func,
  // resaga props
  me: PropTypes.number,
  owner: PropTypes.number,
  fetching: PropTypes.bool,
  sending: PropTypes.bool,
  pending: PropTypes.bool,
  accepted: PropTypes.bool,
  exist: PropTypes.bool,
  fromOtherOrg: PropTypes.bool,
  disabled: PropTypes.bool,
};

Buttons.defaultProps = {
  me: 0,
  owner: 0,
  shared: false,
  invited: false,
  fetching: false,
  sending: false,
  pending: false,
  accepted: false,
  exist: false,
  fromOtherOrg: false,
};

export default compose(
  withStyles(styles, { name: 'Buttons' }),
  resaga(CONFIG),
)(Buttons);

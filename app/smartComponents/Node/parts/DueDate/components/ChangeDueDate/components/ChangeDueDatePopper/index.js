import { DO_NOTHING } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import {
  ClickAwayListener,
  Popper,
  withStyles,
} from 'components/material-ui/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'ugcomponents/Buttons/Button/index';
import { InlineButton } from 'ugcomponents/Buttons/index';
import Icon from 'ugcomponents/Icon/index';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class ChangeDueDatePopper extends PureComponent {
  state = {
    closeOnClickAway: true,
  };

  componentWillUnmount = () => {
    clearTimeout(this.closeOnclickAway);
  };

  closeOnClickAway = closeOnClickAway => {
    this.closeOnclickAway = setTimeout(
      () => this.setState({ closeOnClickAway }),
      0,
    );
  };

  stopPropagation = event =>
    event && event.stopPropagation && event.stopPropagation();

  handleClose = event => {
    const { onClose } = this.props;
    const { closeOnClickAway } = this.state;

    if (onClose && closeOnClickAway) return onClose(event);

    return DO_NOTHING;
  };

  renderHeading = () => {
    const { classes, onClose, heading } = this.props;

    if (!heading) {
      return null;
    }

    return (
      <GridItem className={classes.heading}>
        <GridContainer alignItems="center" spacing={0}>
          <GridItem className={classnames(classes.grow, classes.headingText)}>
            {heading}
          </GridItem>
          <InlineButton
            color="default"
            onClick={onClose}
            className={classes.closeButton}
          >
            <Icon size="xsmall" icon="lnr-cross2" />
          </InlineButton>
        </GridContainer>
      </GridItem>
    );
  };

  renderFooter = () => {
    const { classes, footer, onClose } = this.props;

    if (!footer) {
      return null;
    }

    return (
      <GridItem className={classes.footer}>
        <GridContainer alignItems="center" spacing={0}>
          <GridItem className={classes.grow}>{footer}</GridItem>
          <GridItem>
            <Button inline size="xsmall" onClick={onClose}>
              Cancel
            </Button>
            <Button first inline type="submit" size="xsmall" color="green">
              Save
            </Button>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderDefault = () => {
    const { body } = this.props;

    const renderBody = LOGIC_HELPERS.ifElse(
      typeof body === 'function',
      LOGIC_HELPERS.ifFunction(body, [
        { closeOnClickAway: this.closeOnClickAway },
      ]),
      body,
    );

    return (
      <GridContainer
        direction="column"
        onClick={this.stopPropagation}
        spacing={0}
      >
        {this.renderHeading()}
        {renderBody}
        {this.renderFooter()}
      </GridContainer>
    );
  };

  render = () => {
    const { classes, anchorEl, onClose, placement } = this.props;

    return (
      <Popper
        noPadding
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        placement={placement}
        className={classes.root}
      >
        <ClickAwayListener onClickAway={this.handleClose}>
          {this.renderDefault()}
        </ClickAwayListener>
      </Popper>
    );
  };
}

ChangeDueDatePopper.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  anchorEl: PropTypes.object,
  placement: PropTypes.string,

  onClose: PropTypes.func,

  // rendering
  heading: PropTypes.any,
  body: PropTypes.any,
  footer: PropTypes.any,

  // resaga props
};

ChangeDueDatePopper.defaultProps = {
  anchorEl: {},
  placement: 'bottom-start',
};

export default compose(
  withStyles(styles, { name: 'ChangeDueDatePopper' }),
  resaga(CONFIG),
)(ChangeDueDatePopper);

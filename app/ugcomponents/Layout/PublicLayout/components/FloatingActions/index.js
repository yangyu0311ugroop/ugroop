import JText from 'components/JText';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'components/material-ui';
import Button from 'viewComponents/Button';
import Icon from 'viewComponents/Icon';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Box from '@material-ui/core/Box';
import style from './style';

export class FloatingActions extends PureComponent {
  state = {
    layout: 0,
    open: false,
  };

  componentWillMount = () => {
    const { history } = this.props;
    const { pathname } = history.location;
    const layout = pathname.includes('/public/template/2/') ? 1 : 0;
    this.setState({ layout });
  };

  onChange = layout => () => {
    this.onClose();
    this.setState({ layout });
    this.handleRedirect(layout);
  };

  onClose = () => {
    /* this.setState({ close: true });
    setTimeout(() => this.setState({ close: false }), 500); */
  };

  handleClick = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleRedirect = layout => {
    const { history } = this.props;
    const { pathname } = history.location;

    const index = layout ? 17 : 18;
    const baseURL = '/public/template';
    const prefixURL = layout ? `${baseURL}/2/` : baseURL;
    const redirectTo = `${prefixURL}${pathname.slice(index)}`;

    history.push(redirectTo);
  };

  redirectToRYI = () => {
    const { layout } = this.state;
    const { history } = this.props;
    const { pathname } = history.location;

    const index = layout ? 19 : 17;
    const baseURL = '/public/template';
    const hashkey = _.trim(pathname.slice(index), '/');
    const redirectTo = `${baseURL}/${hashkey}/interested`;

    history.push(redirectTo);
  };

  handleBlur = () => {
    setTimeout(() => this.setState({ open: false }), 500);
  };

  renderRYIButton = () => {
    const { classes, disableRYI } = this.props;
    const buttonContent = 'Register your interest';
    if (disableRYI) return null;

    return (
      <GridItem>
        <Button
          dense
          color="base"
          size="extraSmall"
          onClick={this.redirectToRYI}
        >
          <GridContainer alignItems="center" spacing={0} wrap="nowrap">
            <GridItem>
              <Icon icon="star" size="extraSmall" className={classes.textRYI} />
            </GridItem>
            <GridItem>
              <JText bolder md className={classes.textRYI}>
                {buttonContent}
              </JText>
            </GridItem>
          </GridContainer>
        </Button>
      </GridItem>
    );
  };

  renderLayoutSelector = () => {
    const { hideChangeLayout } = this.props;
    const { layout } = this.state;
    const nextLayoutTitle = layout ? 'layers' : 'printer';
    const nextLayoutTooltip = layout
      ? 'Change to Interactive Layout'
      : 'Change to Print Layout';
    const nextLayoutIndex = layout ? 0 : 1;
    if (hideChangeLayout) return null;

    return (
      <GridItem>
        <Button
          size="small"
          iconButton
          icon={nextLayoutTitle}
          dense
          noMargin
          square
          color="inline"
          tooltipProps={{
            title: nextLayoutTooltip,
          }}
          onClick={this.onChange(nextLayoutIndex)}
        />
      </GridItem>
    );
  };

  render() {
    const { classes, location } = this.props;
    const { pathname } = location;
    if (pathname.includes('/print/tour') || pathname.includes('/interested'))
      return null;
    return (
      <Box pl={1} pr={1}>
        <GridContainer
          className={classnames(classes.root)}
          onBlur={this.handleBlur}
          alignItems="center"
          wrap="nowrap"
        >
          {this.renderRYIButton()}
          {this.renderLayoutSelector()}
        </GridContainer>
      </Box>
    );
  }
}

FloatingActions.propTypes = {
  // hoc
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  disableRYI: PropTypes.bool,
  hideChangeLayout: PropTypes.bool,
};

FloatingActions.defaultProps = {};

export default compose(
  withRouter,
  withSMDown,
  withStyles(style, { name: 'FloatingActions' }),
)(FloatingActions);

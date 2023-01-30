import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import H1 from 'components/H1';
import H4 from 'components/H4';
import H5 from 'components/H5';
import Button from 'ugcomponents/Buttons/Button';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import UGLink from 'components/Link';
import { FormattedMessage as M } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import m from './messages';

export class ErrorPages extends PureComponent {
  handleGoBack = () => this.props.history.go(-1);

  render() {
    const { classes, type, error } = this.props;
    let key = `${type}${error}`;

    // Go Home
    let linkProps = { to: '/' };

    // Go Back
    if (error === '403') {
      key = error;
      linkProps = { to: '#', onClick: this.handleGoBack };
    }

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <H5 className={classes.title}>
            <M {...m[`${key}Title`]} />
          </H5>
          <H1 className={classes.code}>{error}</H1>
          <H4 className={classes.message}>
            <M {...m[`${key}Message`]} />
          </H4>
          <UGLink {...linkProps}>
            <Button className={classes.button} color="green">
              <M {...m[`${key}Button`]} />
            </Button>
          </UGLink>
        </div>
      </div>
    );
  }
}

ErrorPages.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  type: PropTypes.string,
  error: PropTypes.string,
};

ErrorPages.defaultProps = {
  error: '403',
  type: '',
  history: {},
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'ErrorPages' }),
)(ErrorPages);

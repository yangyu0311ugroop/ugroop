import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { Hidden } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M, injectIntl } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { SimpleRTE } from 'ugcomponents/Inputs';
import { Avatar, Name } from 'ugcomponents/Person';
import { H5 } from 'viewComponents/Typography';
import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class Transferee extends PureComponent {
  renderStatus = () => {
    if (this.props.userId) {
      return <M {...m.registeredText} />;
    }

    return <M {...m.unRegisteredText} />;
  };

  renderUserStatus = noGrid => {
    const { classes } = this.props;

    if (noGrid) return this.renderStatus();

    return (
      <GridItem>
        <span className={classes.userStatus}>{this.renderStatus()}</span>
      </GridItem>
    );
  };

  renderPersonalMessage = () => {
    const { classes, content } = this.props;

    if (!content) return null;

    return (
      <GridItem className={classes.messageRoot}>
        <Hidden smDown>
          <div className={classes.padding} />
        </Hidden>
        <H5 className={classes.h5}>Message: </H5>
        <SimpleRTE
          name="pm"
          value={content}
          className={classes.message}
          readOnly
        />
      </GridItem>
    );
  };

  renderContent = () => {
    const { classes, userId, email } = this.props;

    return (
      <GridContainer direction="column" className={classes.root} spacing={0}>
        <GridItem>
          <GridContainer alignItems="center">
            <Hidden smDown>
              <GridItem>
                <Avatar sm userId={userId} />
              </GridItem>
            </Hidden>
            <GridItem className={classes.grow}>
              <Name id={userId} email={email} />
              <div className={classes.status}>
                {this.renderUserStatus(true)}
              </div>
            </GridItem>
          </GridContainer>
        </GridItem>
        {this.renderPersonalMessage()}
      </GridContainer>
    );
  };

  render = () => this.renderContent();
}

Transferee.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  userId: PropTypes.number,
  // resaga props
  email: PropTypes.string,
  me: PropTypes.number,
  content: PropTypes.string,
};

Transferee.defaultProps = {
  email: '',
  me: 0,
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'Transferee' }),
  resaga(CONFIG),
)(Transferee);

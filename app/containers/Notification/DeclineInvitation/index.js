import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { compose } from 'redux';
import H3 from 'components/H3';
import H4 from 'components/H4';
import H6 from 'components/H6';
import Hr from 'components/Hr';
import Logo from 'ugcomponents/Logo';
import Form from 'ugcomponents/Form';
import { PENDING } from 'appConstants';
import UGLink from 'components/Link';
import { withRouter } from 'react-router-dom';
import GridItem from 'components/GridItem';
import Grid from 'components/GridContainer';
import Container from 'components/Container';
import { withStyles } from '@material-ui/core/styles';
import Button from 'ugcomponents/Buttons/Button';
import { TokenResolver } from 'ugcomponents/Notification';
import { Text } from 'ugcomponents/Inputs';
import { INVITATION_API, DECLINE_INVITATION } from 'apis/constants';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';
import { CONFIG } from './config';
import styles from './style';

export class DeclineInvitation extends PureComponent {
  state = {
    reasonSent: false,
  };

  onSuccess = notification => {
    const { status } = notification;

    if (status !== PENDING) {
      return this.setState({ error: 'This link is no longer active.' });
    }
    return this.setState({ success: true });
  };

  onHandleSubmit = ({ content }) => {
    const { tokenId } = this.props;
    this.props.resaga.dispatchTo(INVITATION_API, DECLINE_INVITATION, {
      payload: { tokenId, content },
      onSuccess: this.redirectToHome,
    });
  };

  redirectToHome = () => {
    this.setState({ reasonSent: true });
  };

  generateButtons = () => {
    const { classes, loading } = this.props;

    return (
      <div className={classes.buttonRoot}>
        <Button type="submit" className={classes.submit} disabled={loading}>
          <M {...m.sendMyReason} />
        </Button>
        <UGLink to="/">
          <Button className={classes.skip}>
            <M {...m.skip} />
          </Button>
        </UGLink>
      </div>
    );
  };

  generateFooterLinks = () => {
    const { classes } = this.props;
    const tempLink = '#';
    return (
      <div className={classes.footerContent}>
        <div className={classes.footerLinks}>
          <UGLink to="/privacy">
            <H6 className={classes.footerLinkText}>
              <M {...m.privacyPolicy} />
            </H6>
          </UGLink>
          <UGLink to={tempLink}>
            <H6 className={classes.footerLinkText}>
              <M {...m.contactUs} />
            </H6>
          </UGLink>
          <UGLink to="/terms-of-service">
            <H6 className={classes.footerLinkText}>
              <M {...m.termsOfService} />
            </H6>
          </UGLink>
        </div>
        <H6 className={classes.copyright}>
          <M {...m.copyright} />
        </H6>
      </div>
    );
  };

  renderForm = () => {
    const { reasonSent } = this.state;
    const { classes } = this.props;
    const label = <M {...m.enterReason} />;
    const body = reasonSent ? (
      <GridItem>
        <H4 className={classes.declineTitle}>
          <M {...m.successfullyDeclined} />
        </H4>

        <div className={classes.backToHomeRoot}>
          <UGLink to="/">
            <Button type="submit" className={classes.backToHomeButton}>
              <M {...m.goBackHome} />
            </Button>
          </UGLink>
        </div>
      </GridItem>
    ) : (
      <GridItem>
        <Form onValidSubmit={this.onHandleSubmit}>
          <Text type="text" name="content" value="" label={label} autoFocus />
          {this.generateButtons()}
        </Form>
      </GridItem>
    );
    return body;
  };

  renderLogo = () => {
    const { classes } = this.props;
    return (
      <GridItem className={classes.header}>
        <Logo tinting />
      </GridItem>
    );
  };

  renderBody = () => {
    const { classes } = this.props;
    const { reasonSent } = this.state;
    return (
      <GridItem className={classes.bodyGrid}>
        <Container>
          <Grid
            direction="column"
            justify="space-between"
            spacing={0}
            className={classes.container}
          >
            <GridItem>
              <Grid direction="column" spacing={0} className={classes.body}>
                <GridItem>
                  <H3 className={classes.declineTitle}>
                    <M {...m.invitationDecline} />
                  </H3>
                  <Hr className={classes.hr} />
                </GridItem>
                {this.renderForm()}
              </Grid>
            </GridItem>
            {!reasonSent && (
              <GridItem className={classes.bodyFooter}>
                <H6 className={classes.bodyFooterText}>
                  <M {...m.pleaseNote} />
                </H6>
              </GridItem>
            )}
          </Grid>
        </Container>
      </GridItem>
    );
  };

  renderFooter = () => {
    const { classes } = this.props;
    const infoAd = (
      <a href="mailto:info@ugroop.com.au">
        <b>info@ugroop.com.au</b>
      </a>
    );
    return (
      <GridItem className={classes.footer}>
        <Container>
          <Grid
            direction="column"
            justify="space-between"
            spacing={0}
            className={classes.container}
          >
            <GridItem>
              <H6>
                <M {...m.forInquiries} values={{ infoAd }} />
              </H6>
              <Hr className={classes.hr} />
              {this.generateFooterLinks()}
            </GridItem>
          </Grid>
        </Container>
      </GridItem>
    );
  };

  renderDeclineInvitation = () => {
    const { classes } = this.props;

    return (
      <Grid
        direction="column"
        justify="space-between"
        spacing={0}
        className={classes.root}
      >
        {this.renderLogo()}
        {this.renderBody()}
        {this.renderFooter()}
      </Grid>
    );
  };

  render() {
    const { error, success, reasonSent } = this.state;

    if (error) {
      return <H3>{error}</H3>;
    }

    if (success || reasonSent) {
      return this.renderDeclineInvitation();
    }

    return <TokenResolver onSuccess={this.onSuccess} />;
  }
}

DeclineInvitation.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  // resaga
  tokenId: PropTypes.string,
  loading: PropTypes.bool,
};

DeclineInvitation.defaultProps = {
  loading: false,
};

export default compose(
  withRouter,
  resaga(CONFIG),
  withStyles(styles, { name: 'DeclineNotification' }),
)(DeclineInvitation);

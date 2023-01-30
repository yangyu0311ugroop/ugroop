import { FEEDBACK_EMAIL, THE_DOT } from 'appConstants';
import Container from 'components/Container';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import UGLink from 'components/Link';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import PageLogo from 'ugcomponents/NaviBar/AdminNavBar/PageLogo';
import styles from './styles';

export class FooterLinks extends PureComponent {
  render = () => {
    const { classes } = this.props;

    const version = `Version ${process.env.APP_VERSION} Build ${
      process.env.BUILD_NUM
    }`;

    return (
      <GridContainer direction="column" spacing={0} className={classes.footer}>
        <GridItem>
          <Container maxSize padding>
            <GridContainer direction="column" spacing={2}>
              <GridItem>
                <PageLogo full md />
              </GridItem>

              <GridItem>
                <GridContainer alignItems="center">
                  <GridItem>
                    <UGLink to="/privacy" title="Privacy Policy">
                      <JText gray>Privacy</JText>
                    </UGLink>
                  </GridItem>
                  <GridItem className={classes.link}>{THE_DOT}</GridItem>
                  <GridItem>
                    <UGLink to="/terms-of-service" title="Terms of Service">
                      <JText gray>Terms</JText>
                    </UGLink>
                  </GridItem>
                  <GridItem className={classes.link}>{THE_DOT}</GridItem>
                  <GridItem>
                    <a href={`mailto:${FEEDBACK_EMAIL}`} title="Contact us">
                      <JText gray>Contact</JText>
                    </a>
                  </GridItem>
                </GridContainer>
              </GridItem>

              <GridItem title={version}>
                <JText gray nowrap={false}>
                  Copyright © 2016 - {new Date().getFullYear()} uGroop Pty Ltd.
                  All rights reserved.
                </JText>
              </GridItem>
            </GridContainer>
          </Container>
        </GridItem>
      </GridContainer>
    );
  };
}

FooterLinks.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

FooterLinks.defaultProps = {};

export default compose(withStyles(styles, { name: 'FooterLinks' }))(
  FooterLinks,
);

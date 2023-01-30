import { URL_HELPERS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import ScrollToTopOnMount from 'containers/PersonalSettings/components/ScrollToTopOnMount';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import ChangePasswordForm from 'smartComponents/Person/components/ChangePasswordForm';
import { CONFIG } from './config';
import styles from './styles';

export class Password extends PureComponent {
  handleDiscard = isChanged => () => {
    if (isChanged && !window.confirm('You will lose your data. Continue?')) {
      return null;
    }

    return this.goPersonalInfo();
  };

  goPersonalInfo = () =>
    URL_HELPERS.goToUrl(URL_HELPERS.personalInfo(), this.props)();

  render = () => {
    const { classes } = this.props;

    return (
      <>
        <ScrollToTopOnMount />

        <div className={classes.offsetGrid}>
          <GridContainer
            direction="column"
            spacing={2}
            className={classes.root}
          >
            <GridItem>
              <JText gray nowrap={false}>
                Choose a strong password and don{"'"}t reuse it for other
                accounts.
              </JText>
            </GridItem>

            <GridItem>
              <Hr half />
            </GridItem>

            <GridItem>
              <GridContainer
                card
                highlight
                cardPadding={4}
                direction="column"
                spacing={0}
              >
                <GridItem>
                  <ChangePasswordForm onDiscard={this.handleDiscard} />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </>
    );
  };
}

Password.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

Password.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Password' }),
  resaga(CONFIG),
)(Password);

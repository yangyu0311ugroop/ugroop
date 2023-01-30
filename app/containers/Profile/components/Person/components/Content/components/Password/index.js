import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Helmet } from 'react-helmet';
import { PAGE_HELMETS } from 'appConstants';
import ChangePasswordForm from 'smartComponents/Person/components/ChangePasswordForm';
import { H3 } from 'viewComponents/Typography';
import styles from './styles';
import { CONFIG } from './config';

export class Password extends PureComponent {
  render = () => {
    const { classes } = this.props;

    return (
      <GridContainer className={classes.root} card>
        <Helmet
          title={PAGE_HELMETS.CHANGE_PASSWORD}
          meta={[
            { name: 'description', content: 'Description of Change Password' },
          ]}
        />
        <GridItem xs={12}>
          <H3 noMargin>Change Password</H3>
        </GridItem>
        <GridItem xs={12}>
          <ChangePasswordForm />
        </GridItem>
      </GridContainer>
    );
  };
}

Password.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

Password.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Password' }),
  resaga(CONFIG),
)(Password);

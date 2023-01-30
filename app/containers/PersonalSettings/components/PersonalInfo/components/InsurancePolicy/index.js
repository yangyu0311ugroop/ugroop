import { withStyles } from 'components/material-ui';
import ScrollToTopOnMount from 'containers/PersonalSettings/components/ScrollToTopOnMount';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import InsurancePolicies from 'smartComponents/Person/parts/InsurancePolicies';
import { CONFIG } from './config';
import styles from './styles';
import { VARIANTS } from '../../../../../../variantsConstants';

export function InsurancePolicy(props) {
  const { classes, personId } = props;

  return (
    <>
      <ScrollToTopOnMount />
      <div className={classes.root}>
        <InsurancePolicies id={personId} variant={VARIANTS.CARD} />
      </div>
    </>
  );
}

InsurancePolicy.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // resaga: PropTypes.object.isRequired,

  // parent props
  personId: PropTypes.number,

  // resaga props
};

InsurancePolicy.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'InsurancePolicy' }),
  resaga(CONFIG),
)(React.memo(InsurancePolicy));

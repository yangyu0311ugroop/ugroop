import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';
import resaga from 'resaga';
import { withStyles } from 'components/material-ui';
import { CONFIG } from './config';
import style from './style';

/**
 * Returns border className describing calculated medical and dietary data (good for participant avatar).
 */
export class ConditionsBorderStyle extends React.PureComponent {
  render = () => {
    const {
      classes,
      children,
      calculatedMedicalSeverity,
      calculatedMedicalCount,
      calculatedDietaryCount,
    } = this.props;

    const className = classNames({
      [classes[`medical_${calculatedMedicalSeverity}`]]:
        !!calculatedMedicalCount && !calculatedDietaryCount,
      [classes.dietary]: !calculatedMedicalCount && !!calculatedDietaryCount,
      [classes[`medicalDietary_${calculatedMedicalSeverity}`]]:
        !!calculatedMedicalCount && !!calculatedDietaryCount,
      [classes.margin]: true,
    });

    return children(className);
  };
}

ConditionsBorderStyle.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.func.isRequired,

  // resaga value
  calculatedMedicalSeverity: PropTypes.string,
  calculatedMedicalCount: PropTypes.number,
  calculatedDietaryCount: PropTypes.number,
};

ConditionsBorderStyle.defaultProps = {
  calculatedMedicalSeverity: null,
  calculatedMedicalCount: null,
  calculatedDietaryCount: null,
};

export default compose(
  withStyles(style, {
    name: 'smartComponents/Node/logics/ConditionsBorderStyle',
  }),
  resaga(CONFIG),
)(ConditionsBorderStyle);

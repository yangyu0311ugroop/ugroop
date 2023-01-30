import React from 'react';
import PropTypes from 'prop-types';
import { MEDICAL_SEVERITIES } from 'utils/constants/people';
import { MEDICAL_SEVERITY_HELPERS } from 'utils/helpers/people';
import { withStyles } from 'components/material-ui';
import Icon from 'viewComponents/Icon';
import style from './style';

export class MedicalIcon extends React.PureComponent {
  render = () => {
    const { classes, severity, noMedical, ...rest } = this.props;
    return (
      <div className={classes.gridIcon}>
        <Icon
          icon="lnr-first-aid"
          className={classes[`${severity}Icon`]}
          title={MEDICAL_SEVERITY_HELPERS.renderSeverity(severity)}
          {...rest}
        />
        {noMedical && (
          <Icon
            icon="lnr-cross2"
            className={classes.cross}
            title="No medical conditions specified"
          />
        )}
      </div>
    );
  };
}

MedicalIcon.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  severity: PropTypes.string,
  noMedical: PropTypes.bool,
};

MedicalIcon.defaultProps = {
  severity: MEDICAL_SEVERITIES.mild,
};

export default withStyles(style, { name: 'viewComponents/People/MedicalIcon' })(
  MedicalIcon,
);

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { withStyles } from 'components/material-ui';
import CreateButton from 'viewComponents/CreateButton';
import { CONFIG } from './config';
import style from './style';
import { PORTAL_HELPERS } from '../../../../../../containers/Portal/helpers';

export class InsurancePolicyCreate extends React.PureComponent {
  handleValidSubmit = model => {
    const { id } = this.props;
    PERSON_DETAIL_HELPER.addInsurancePolicy(
      {
        personId: id,
        insurancePolicy: { ...model },
      },
      this.props,
    );
  };

  handleCreateClick = () => {
    PORTAL_HELPERS.showAddEditInsurance(
      {
        personId: this.props.id,
        canEdit: true,
        onSuccess: this.props.onSuccessCreate,
      },
      this.props,
    );
  };

  render = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CreateButton
          className={classes.createButton}
          title="Add Insurance Policy"
          onClick={this.handleCreateClick}
        />
      </React.Fragment>
    );
  };
}

InsurancePolicyCreate.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  resaga: PropTypes.object.isRequired,
  onSuccessCreate: PropTypes.func,

  // parent
  id: PropTypes.number,
};

InsurancePolicyCreate.defaultProps = {
  id: null,
};

export default compose(
  withStyles(style, { name: 'InsurancePolicyCreate' }),
  resaga(CONFIG),
)(InsurancePolicyCreate);

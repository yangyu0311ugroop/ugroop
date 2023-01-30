import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { ORGANISATION_API, PATCH_ORG } from 'apis/constants';

// parts
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import SchoolGender from 'smartComponents/Organisation/parts/Details/parts/SchoolGender';
import SchoolType from 'smartComponents/Organisation/parts/Details/parts/SchoolType';

// View Components
import Button from 'viewComponents/Button';
import Margin from 'viewComponents/Margin';
import Form from 'ugcomponents/Form';

import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';

import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class EditSchoolForm extends PureComponent {
  handleSubmitSuccess = () => {
    SnackbarHelpers.openSuccessSnackbar(
      'Successfully updated your information',
      this.props.resaga,
    );
  };

  handleSubmit = formData => {
    const { id, type } = this.props;
    this.props.resaga.dispatchTo(ORGANISATION_API, PATCH_ORG, {
      payload: {
        id,
        data: {
          type,
          details: formData,
        },
      },
      onSuccess: this.handleSubmitSuccess,
    });
  };

  render = () => {
    const { classes, detailsId, readOnly } = this.props;
    return (
      <Form
        onValidSubmit={this.handleSubmit}
        className={classes.root}
        showChangeRoutePrompt
      >
        <Margin bottom="lg">
          <SchoolType id={detailsId} variant={ORG_FIELD_VARIANTS.TEXT_FIELD} />
        </Margin>
        <Margin bottom="lg">
          <SchoolGender
            id={detailsId}
            variant={ORG_FIELD_VARIANTS.TEXT_FIELD}
          />
        </Margin>
        {!readOnly && (
          <GridContainer spacing={0} justify="flex-end">
            <GridItem>
              <Button color="primary" type="submit" size="small">
                <M {...m.submitBtn} />
              </Button>
            </GridItem>
          </GridContainer>
        )}
      </Form>
    );
  };
}

EditSchoolForm.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired,
  readOnly: PropTypes.bool,
  // resaga props
  detailsId: PropTypes.number,
  type: PropTypes.string,
};

EditSchoolForm.defaultProps = {
  detailsId: 0,
  type: '',
  readOnly: false,
};

export default compose(
  withStyles(styles, { name: 'EditSchoolForm' }),
  resaga(CONFIG),
)(EditSchoolForm);

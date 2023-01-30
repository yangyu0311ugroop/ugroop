import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { ORGANISATION_API, PATCH_ORG } from 'apis/constants';
import { DEFAULT } from 'appConstants';
// parts
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import CreatedDate from 'smartComponents/Organisation/parts/CreatedDate';
import Name from 'smartComponents/Organisation/parts/Name';

// View Components
import Button from 'ugcomponents/Buttons/Button';
import Margin from 'viewComponents/Margin';
import Form from 'ugcomponents/Form';
import InlineButton from 'ugcomponents/Buttons/InlineButton';
import Icon from 'ugcomponents/Icon';

import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';
import { CONFIG } from './config';
import styles from './styles';

export class EditHeaderForm extends PureComponent {
  state = {
    editing: false,
  };

  handleSubmitSuccess = () => {
    SnackbarHelpers.openSuccessSnackbar(
      'Successfully updated your information',
      this.props.resaga,
    );
    this.cancelEdit();
  };

  handleSubmit = formData => {
    const { id } = this.props;
    this.props.resaga.dispatchTo(ORGANISATION_API, PATCH_ORG, {
      payload: {
        id,
        data: {
          ...formData,
        },
      },
      onSuccess: this.handleSubmitSuccess,
    });
  };

  startEdit = () => {
    const { readOnly } = this.props;
    if (!readOnly) {
      this.setState({ editing: true });
    }
  };

  cancelEdit = () => {
    this.setState({ editing: false });
  };

  editView = () => {
    const { classes } = this.props;
    return (
      <GridContainer spacing={0} direction="column">
        <GridItem xs={11} className={classes.heading}>
          <Name id={this.props.id} variant={ORG_FIELD_VARIANTS.TEXT_FIELD} />
        </GridItem>
        <GridItem className={classes.editFormBtn} xs={11}>
          <Button first inline type="submit" size="xsmall" color="green">
            Save
          </Button>
          <Button inline size="xsmall" onClick={this.cancelEdit}>
            Cancel
          </Button>
        </GridItem>
      </GridContainer>
    );
  };

  readView = () => {
    const { classes, id } = this.props;
    return (
      <GridContainer
        alignItems="center"
        spacing={0}
        onClick={this.startEdit}
        className={classes.hover}
      >
        <GridItem xs={11}>
          <Name id={this.props.id} variant={DEFAULT} />
          <CreatedDate id={id} className={classes.createAt} variant={DEFAULT} />
        </GridItem>
        <GridItem xs={1}>
          <InlineButton color="primary" className={classes.iconHidden}>
            <Icon icon="lnr-pencil3" size="small" />
          </InlineButton>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { classes } = this.props;
    const renderHeader = this.state.editing ? this.editView() : this.readView();
    return (
      <Form onValidSubmit={this.handleSubmit} className={classes.root}>
        <Margin bottom="lg">{renderHeader}</Margin>
      </Form>
    );
  };
}

EditHeaderForm.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired,
  readOnly: PropTypes.bool,

  // resaga props
};

EditHeaderForm.defaultProps = {
  readOnly: false,
};

export default compose(
  withStyles(styles, { name: 'EditHeaderForm' }),
  resaga(CONFIG),
)(EditHeaderForm);

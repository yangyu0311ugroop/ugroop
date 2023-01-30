import { withStyles } from '@material-ui/core/styles';
import { DEFAULT } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import Form from 'ugcomponents/Form';
import CopyNumberButton from 'smartComponents/Inputs/PhoneTextField/components/ActionButtons/components/CopyNumberButton';
import DialNumberButton from 'smartComponents/Inputs/PhoneTextField/components/ActionButtons/components/DialNumberButton';

// parts
import IsDefault from 'smartComponents/Phone/parts/IsDefault';
import Number from 'smartComponents/Phone/parts/Number';
import Type from 'smartComponents/Phone/parts/Type';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

// view
import CardPhone from 'ugcomponents/Card/PhoneCard';
import Dialog from 'ugcomponents/Dialog';
import Button from 'viewComponents/Button';

import { CONFIG } from './config';
import styles from './styles';
import PhoneEditForm from '../EditPhoneForm';
import Icon from '../../../../ugcomponents/Icon';

export const emptyFunction = () => {};
export class Phone extends PureComponent {
  state = {
    openDialog: false,
  };

  editTooltip = {
    title: 'Edit',
    placement: 'top',
  };

  deleteTooltip = {
    title: 'Delete',
    placement: 'top',
  };

  openDialog = () => this.setState({ openDialog: true });

  closeDialog = () => this.setState({ openDialog: false });

  handleDelete = () => {
    this.props.phoneCUD.destroy(this.handleDeleteSuccess);
  };

  handleDeleteSuccess = () => {
    this.closeDialog();
  };

  handleEdit = () => {
    this.props.resaga.setValue({
      editable: true,
    });
  };

  renderActions = () => {
    const { showActions } = this.props;

    return showActions ? (
      <GridContainer spacing={3} alignItems="center">
        <GridItem>
          <Button
            tooltipProps={this.editTooltip}
            type="submit"
            iconButton
            variant={VARIANTS.INLINE}
            icon="register"
            size="small"
            color="gray"
            onClick={this.handleEdit}
          />
        </GridItem>
        <GridItem>
          <Button
            tooltipProps={this.deleteTooltip}
            type="submit"
            iconButton
            variant={VARIANTS.INLINE}
            icon="trash2"
            size="small"
            color="gray"
            onClick={this.openDialog}
          />
        </GridItem>
      </GridContainer>
    ) : (
      ''
    );
  };

  renderPhoneView = () => {
    const { id } = this.props;
    return (
      <CardPhone
        number={
          <React.Fragment>
            <IsDefault id={id} />
            <Form>
              <Number variant={VARIANTS.TEXT_FIELD} disabled readOnly id={id} />
            </Form>
          </React.Fragment>
        }
        type={<Type id={id} />}
        actions={this.renderActions()}
      />
    );
  };

  renderPhoneActions = obj => {
    const { classes, variant } = this.props;
    const noContainer = VARIANTS.ICON === variant;
    return obj.value ? (
      <React.Fragment>
        <GridItem className={!noContainer && classes.buttonContainer}>
          <CopyNumberButton color="primary" value={obj.value} />
        </GridItem>
        <GridItem className={!noContainer && classes.buttonContainer}>
          <DialNumberButton color="primary" value={obj.value} />
        </GridItem>
      </React.Fragment>
    ) : null;
  };

  renderFieldsOnly = () => {
    const { id } = this.props;
    return (
      <React.Fragment>
        <Form>
          <GridContainer direction="row">
            <GridItem>
              <Number variant={VARIANTS.TEXT_FIELD} disabled readOnly id={id} />
            </GridItem>
            <Number variant={VARIANTS.RENDER_PROP} readOnly id={id}>
              {this.renderPhoneActions}
            </Number>
            <IsDefault id={id} variant={VARIANTS.BADGE} />
          </GridContainer>
        </Form>
      </React.Fragment>
    );
  };

  renderPhoneForm = () => {
    const { id, isForCreating } = this.props;
    return (
      <PhoneEditForm
        isCreateForm={isForCreating}
        id={id}
        phoneCUD={this.props.phoneCUD}
        variant={VARIANTS.CARD_FORM}
        onCreateSuccess={this.props.onCreateSuccess}
        onCancelCreate={this.props.onCancelCreate}
      />
    );
  };

  renderPhoneCard = () => {
    const { editable, isForCreating } = this.props;
    const view =
      editable || isForCreating
        ? this.renderPhoneForm()
        : this.renderPhoneView();
    return (
      <React.Fragment>
        {view}
        <Dialog
          headlineTitle={
            <Number variant={VARIANTS.INLINE_TEXT} id={this.props.id} />
          }
          type="phone"
          template="delete"
          confirmFunc={this.handleDelete}
          open={this.state.openDialog}
          cancelFunc={this.closeDialog}
        />
      </React.Fragment>
    );
  };

  renderTextWithIcon = () => {
    const { id, classes, withAction } = this.props;
    return (
      <GridContainer wrap="nowrap" spacing={0} alignItems="center">
        <GridItem>
          <Icon icon="lnr-telephone" size="small" className={classes.icon} />
        </GridItem>
        <GridItem>
          <Number variant={VARIANTS.INLINE_TEXT} id={id} readOnly />
        </GridItem>
        {withAction && (
          <GridItem className={classes.minimise}>
            <GridContainer spacing={0} wrap="nowrap">
              <Number variant={VARIANTS.RENDER_PROP} readOnly id={id}>
                {this.renderPhoneActions}
              </Number>
            </GridContainer>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderTextOnly = () => {
    const { id, component } = this.props;
    return (
      <Number
        variant={VARIANTS.INLINE_TEXT}
        component={component}
        id={id}
        readOnly
      />
    );
  };

  renderDefault = () => this.renderPhoneCard();

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.CARD]: this.renderPhoneCard,
      [VARIANTS.FIELDS_ONLY]: this.renderFieldsOnly,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.ICON]: this.renderTextWithIcon,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Phone.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  showActions: PropTypes.bool,
  phoneCUD: PropTypes.object.isRequired,
  // I'll disable it for the sake that it will appear
  // in auto complete when adding props
  // eslint-disable-next-line
  userId: PropTypes.number,
  isForCreating: PropTypes.bool,
  onCreateSuccess: PropTypes.func,
  onCancelCreate: PropTypes.func,
  variant: PropTypes.string,
  component: PropTypes.any,
  withAction: PropTypes.bool,
  // resaga props
  editable: PropTypes.bool,
};

Phone.defaultProps = {
  id: 0,
  showActions: true,
  editable: false,
  userId: 0,
  isForCreating: false,
  onCreateSuccess: emptyFunction,
  onCancelCreate: emptyFunction,
};

export default compose(
  withStyles(styles, { name: 'Phone' }),
  resaga(CONFIG),
)(Phone);

import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from 'components/Dialog/UGDialogAction';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import CountryCode from 'smartComponents/Person/components/Passports/parts/CountryCode';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PassportCard from 'ugcomponents/Card/PassportCard';
import IsDefault from 'smartComponents/Person/components/Passports/parts/IsDefault';
import Form from 'ugcomponents/Form';
import Margin from 'viewComponents/Margin';
import Photo from 'smartComponents/Person/components/Passports/parts/Photo';

// hoc
import { withPassportCUD } from 'smartComponents/Person/components/Passports/hoc';

// view components
import Button from 'viewComponents/Button';
import DialogForm, { Title } from 'ugcomponents/DialogForm/Complex';

import ViewLayout from './components/ViewLayout';
import EditForm from './components/EditForm';
import { CONFIG } from './config';
import styles from './styles';

export const anonFunc = () => {};

export class Passport extends PureComponent {
  handleClose = () => this.props.passportCUD.closeEdit();

  handleSubmit = () =>
    this.props.forCreate
      ? this.props.passportCUD.store({
          onSuccess: this.props.createSuccess,
        })
      : this.props.passportCUD.update();

  renderDialogHeader = ({ renderCloseButton }) => (
    <GridContainer>
      <GridItem xs={11} md={11}>
        <Title
          heading={<Margin top="sm">Edit Passport</Margin>}
          headingBackground="Passport"
        />
      </GridItem>
      <GridItem xs={1} md={1}>
        <DialogActions>{renderCloseButton()}</DialogActions>
      </GridItem>
    </GridContainer>
  );

  renderEditAction = () => (
    <GridContainer alignItems="flex-start">
      <GridItem>
        <Button
          dense
          icon="check"
          iconButton
          color="primary"
          size="small"
          type="submit"
          disabled={this.props.isUpdateCreateLoading}
          loading={this.props.isUpdateCreateLoading}
        />
      </GridItem>
      <GridItem>
        <Button
          dense
          icon="cross"
          iconButton
          color="gray"
          size="small"
          variant={VARIANTS.OUTLINE}
          onClick={this.handleClose}
          disabled={this.props.isUpdateCreateLoading}
        />
      </GridItem>
    </GridContainer>
  );

  renderViewAction = () => (
    <GridContainer alignItems="flex-start">
      <GridItem>
        <Button
          dense
          icon={LOGIC_HELPERS.ifElse(this.props.isDefault, 'cross', 'check')}
          iconButton
          color="gray"
          size="small"
          title={LOGIC_HELPERS.ifElse(
            this.props.isDefault,
            'Unset as primary',
            'Set as primary',
          )}
          variant={VARIANTS.OUTLINE}
          onClick={this.props.passportCUD.setIsPrimary(!this.props.isDefault)}
        />
      </GridItem>
      <GridItem>
        <Button
          dense
          icon="register"
          iconButton
          color="gray"
          size="small"
          title="Edit"
          variant={VARIANTS.OUTLINE}
          onClick={this.props.passportCUD.openEdit}
        />
      </GridItem>
      <GridItem>
        <Button
          dense
          icon="trash3"
          iconButton
          color="gray"
          size="small"
          title="Delete"
          variant={VARIANTS.OUTLINE}
          onClick={this.props.passportCUD.destroy}
        />
      </GridItem>
    </GridContainer>
  );

  renderViewPhoto = () => (
    <Margin top="sm" bottom="sm" className={this.props.classes.fullHeight}>
      <GridContainer
        alignItems="center"
        justify="center"
        className={this.props.classes.fullHeight}
      >
        <Photo
          size={IMAGE_SIZES_CONSTANTS.LANDSCAPE_MD}
          id={this.props.id}
          label="Passport page photo"
          fullWidth
          onUpload={PERSON_DETAIL_HELPER.updatePassportPhoto(this.props)}
          onDelete={PERSON_DETAIL_HELPER.updatePassportPhoto(this.props)}
        />
      </GridContainer>
    </Margin>
  );

  renderViewCard = () => (
    <React.Fragment>
      <DialogForm
        renderHeader={this.renderDialogHeader}
        onClose={this.handleClose}
        onCancel={this.handleClose}
        open={this.props.editable}
        size={SIZE_CONSTANTS.XXL}
        onValidSubmit={this.props.passportCUD.update()}
      >
        <EditForm
          hideIsDefault={false}
          withFormWrap={false}
          userId={this.props.userId}
          id={this.props.id}
        />
      </DialogForm>
      <PassportCard
        country={
          <CountryCode
            id={this.props.id}
            variant={VARIANTS.INLINE}
            userId={this.props.userId}
          />
        }
        isDefault={this.props.isDefault}
        actions={this.renderViewAction()}
        photo={this.renderViewPhoto()}
        content={
          <ViewLayout hidePhoto userId={this.props.userId} id={this.props.id} />
        }
      />
    </React.Fragment>
  );

  renderCardForm = () => (
    <Form onValidSubmit={this.handleSubmit()}>
      <PassportCard
        actions={this.renderEditAction()}
        primaryCheckbox={
          <IsDefault
            variant={VARIANTS.CHECKBOX_FIELD}
            disabled={this.props.passports.length === 0}
            id={this.props.id}
          />
        }
        content={
          <EditForm
            withFormWrap={false}
            forCreate={this.props.forCreate}
            userId={this.props.userId}
            size={SIZE_CONSTANTS.XXL}
            id={this.props.id}
          />
        }
      />
    </Form>
  );

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.CARD]: this.renderViewCard,
      [VARIANTS.CARD_FORM]: this.renderCardForm,
      [DEFAULT]: this.renderViewCard,
    });
  };
}

Passport.propTypes = {
  // hoc props
  passportCUD: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  id: PropTypes.number,
  forCreate: PropTypes.bool,
  createSuccess: PropTypes.func,
  userId: PropTypes.number,

  // resaga props
  editable: PropTypes.bool,
  isUpdateCreateLoading: PropTypes.bool,
  passports: PropTypes.array,
  isDefault: PropTypes.bool,
};

Passport.defaultProps = {
  variant: VARIANTS.CARD,
  id: 0,
  forCreate: false,
  editable: false,
  createSuccess: anonFunc,
  userId: 0,
  isUpdateCreateLoading: false,
  passports: [],
  isDefault: false,
};

export default compose(
  withPassportCUD,
  withStyles(styles, { name: 'Passport' }),
  resaga(CONFIG),
)(Passport);

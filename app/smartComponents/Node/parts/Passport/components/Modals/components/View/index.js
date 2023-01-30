import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import Hr from 'components/Hr';
import Dialog from 'components/Dialog';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogActions from 'components/Dialog/UGDialogAction';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import DeleteButton from 'viewComponents/DeleteButton';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';
import Ownership from 'smartComponents/Person/components/Passports/parts/Ownership';
import PassportDialogLayout from 'smartComponents/Person/components/Passports/components/Passport/components/DialogLayout';
import { CONFIG_1, CONFIG_2 } from './config';
import m from './messages';

export class ViewPassport extends React.PureComponent {
  getButtonProps = () => {
    if (!this.ButtonProps) {
      this.ButtonProps = {
        size: 'small',
        square: false,
      };
    }
    return this.ButtonProps;
  };

  handleDeleteClick = ({ onLoad, onClose }) => {
    const { id: passportId, personId, userId } = this.props;
    PERSON_DETAIL_HELPER.removePersonPassport(
      {
        passportId,
        personId,
        userId, // for store cleanup only
        onSuccess: this.handleDeleteSuccess({
          passportId,
          onLoad,
          onClose,
        }),
        onError: this.handleDeleteError({ onLoad }),
      },
      this.props,
    );
  };

  handleDeleteSuccess = ({ passportId, onLoad, onClose }) => () => {
    LOGIC_HELPERS.ifFunction(onLoad);
    LOGIC_HELPERS.ifFunction(onClose);
    LOGIC_HELPERS.ifFunction(this.props.onClose, [{ deletedId: passportId }]);
  };

  handleDeleteError = ({ onLoad }) => () => {
    LOGIC_HELPERS.ifFunction(onLoad);
  };

  handleSubmit = ({ model: passport, onSuccess, onError }) => {
    const { id: passportId, personId } = this.props;
    PERSON_DETAIL_HELPER.updatePersonPassport(
      {
        personId,
        passportId,
        passport,
        onSuccess,
        onError,
      },
      this.props,
    );
  };

  handleSubmitPhoto = (url, metaInfo) => {
    const { id: passportId, personId } = this.props;
    PERSON_DETAIL_HELPER.updatePersonPassportPhoto(
      {
        personId,
        passportId,
        url,
        metaInfo,
      },
      this.props,
    );
  };

  renderPart = (Component, variant, props = {}) => (
    <Component {...this.props} variant={variant} {...props} />
  );

  renderDeleteButton = () => {
    const { readOnly } = this.props;
    return (
      !readOnly && (
        <GridItem>
          <DeleteButton
            dialogTitle="Delete this Passport"
            headlineText="Are you sure you want to delete this Passport?"
            confirmButton="Delete Passport"
            onClick={this.handleDeleteClick}
            ButtonProps={this.getButtonProps()}
          />
        </GridItem>
      )
    );
  };

  renderActions = () => {
    const { personId } = this.props;
    return (
      <GridContainer wrap="nowrap" alignItems="center">
        <Ownership personId={personId} />
        <GridItem xs />
        {this.renderDeleteButton()}
      </GridContainer>
    );
  };

  renderHeadingBackground = () => <M {...m.headingBackground} />;

  renderTitle = () => {
    const { onClose } = this.props;
    return (
      <React.Fragment>
        <Title
          heading={<M {...m.heading} />}
          headingBackground={this.renderHeadingBackground()}
        />
        <CloseButton onClick={onClose} />
      </React.Fragment>
    );
  };

  renderContent = () => {
    const { id, readOnly } = this.props;
    return (
      <GridContainer direction="column">
        <PassportDialogLayout
          id={id}
          variant={VARIANTS.TEXT_WITH_LABEL}
          onSubmit={this.handleSubmit}
          onSubmitPhoto={this.handleSubmitPhoto}
          readOnly={readOnly}
        />
      </GridContainer>
    );
  };

  render = () => {
    const { open, onClose } = this.props;
    return (
      <React.Fragment>
        <Dialog open={open} onClose={onClose} fullWidth>
          <DialogTitle noPaddingBottom>{this.renderTitle()}</DialogTitle>
          <DialogContent>{this.renderContent()}</DialogContent>
          <Hr noMarginTop />
          <DialogActions noPaddingTop disableActionSpacing>
            {this.renderActions()}
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  };
}

ViewPassport.propTypes = {
  // parent
  id: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  readOnly: PropTypes.bool,

  // resaga value
  personId: PropTypes.number,
  userId: PropTypes.number,
};

ViewPassport.defaultProps = {
  id: null,
  open: false,
  onClose: () => {},
  readOnly: false,

  personId: null,
  userId: null,
};

export default compose(
  resaga(CONFIG_1),
  resaga(CONFIG_2),
)(ViewPassport);

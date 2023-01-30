import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import head from 'lodash/head';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { VARIANTS } from 'variantsConstants';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { DATASTORE_UTILS } from 'datastore';
import GridContainer from 'components/GridContainer';
import DialogForm, { Title } from 'ugcomponents/DialogForm/Complex';
import Ownership from 'smartComponents/Person/components/Passports/parts/Ownership';
import PassportDialogLayout from 'smartComponents/Person/components/Passports/components/Passport/components/DialogLayout';
import m from './messages';

export class CreatePassport extends React.PureComponent {
  state = {
    dispatching: false,
  };

  componentDidUpdate = prevProps => {
    if (!prevProps.open && this.props.open) this.handleOpen();
  };

  handleOpen = () => {
    this.setState({ dispatching: false });
  };

  handleCreateSuccess = ({ passports }) => {
    this.setState({ dispatching: false });
    this.props.onClose({
      createdId: head(DATASTORE_UTILS.getObjectIds(passports())),
    });
  };

  handleCreateError = () => {
    this.setState({ dispatching: false });
  };

  handleFormValidSubmit = ({ model: passport }) => {
    const { personId } = this.props;
    this.setState({ dispatching: true });
    PERSON_DETAIL_HELPER.addPersonPassport(
      {
        personId,
        passport,
        onSuccess: this.handleCreateSuccess,
        onError: this.handleCreateError,
      },
      this.props,
    );
  };

  renderPart = (Component, variant, props) => (
    <Component variant={variant} {...props} />
  );

  renderHeading = () => <M {...m.heading} />;

  renderHeadingBackground = () => <M {...m.headingBackground} />;

  renderSubheading = () => {
    const { personId } = this.props;
    return <Ownership futureTense personId={personId} />;
  };

  renderHeader = ({ renderCloseButton }) => (
    <React.Fragment>
      <Title
        heading={this.renderHeading()}
        headingBackground={this.renderHeadingBackground()}
        headingUnderline={false}
        renderSubheading={this.renderSubheading}
      />
      {renderCloseButton()}
    </React.Fragment>
  );

  renderSubmitButtonContent = () => <M {...m.submitButtonLabel} />;

  renderContent = () => (
    <GridContainer direction="column">
      <PassportDialogLayout variant={VARIANTS.TEXT_FIELD} />
    </GridContainer>
  );

  render = () => {
    const { open, onClose } = this.props;
    const { dispatching } = this.state;
    return (
      <DialogForm
        open={open}
        onClose={onClose}
        onCancel={onClose}
        renderHeader={this.renderHeader}
        onFormValidSubmit={this.handleFormValidSubmit}
        canSubmitForm={!dispatching}
        submitButtonContent={this.renderSubmitButtonContent()}
        fullWidth={false}
        size={SIZE_CONSTANTS.SM}
      >
        {this.renderContent()}
      </DialogForm>
    );
  };
}

CreatePassport.propTypes = {
  // parent
  open: PropTypes.bool,
  personId: PropTypes.number,
  onClose: PropTypes.func,
};

CreatePassport.defaultProps = {
  open: false,
  personId: null,
  onClose: () => {},
};

export default resaga()(CreatePassport);

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Popper from 'components/Popper';
import Editable, {
  EditableLabel,
  EditablePlaceholder,
} from 'viewComponents/Editable';
import Form from 'ugcomponents/Form';

export class EditableMenuForm extends React.PureComponent {
  state = {
    values: null,
    formValid: true,
  };

  getRestProps = () =>
    _.omit(this.props, [
      'children',
      'renderValue',
      'renderActions',
      'renderMenuSubmit',
      'onOpen',
      'onSubmit',
      'label',
      'readOnly',
      'placeholder',
      'readOnlyPlaceholder',
    ]);

  handlePopperRef = ref => {
    this.popper = ref;
  };

  handleEditableClick = ({ openMenu }) => event => {
    const { onOpen } = this.props;
    openMenu(event);
    onOpen();
  };

  handleFormChange = ({ currentValues }) => {
    this.setState({ values: currentValues });
  };

  handleFormValid = () => {
    this.setState({ formValid: true });
  };

  handleFormInvalid = () => {
    this.setState({ formValid: false });
  };

  handleFormValidSubmit = args => {
    const { onSubmit } = this.props;
    if (!this.popper) {
      onSubmit(args, {});
    } else {
      const { closeMenu } = this.popper;
      onSubmit(args, { closeMenu });
    }
  };

  renderPlaceholder = () => {
    const { readOnly, placeholder, readOnlyPlaceholder } = this.props;
    return (
      <EditablePlaceholder>
        {readOnly ? readOnlyPlaceholder : placeholder}
      </EditablePlaceholder>
    );
  };

  renderValue = () => {
    const { renderValue, renderActions } = this.props;
    const value = renderValue();

    if (!value) {
      return this.renderPlaceholder();
    }

    return renderActions ? (
      <GridContainer>
        <GridItem>{value}</GridItem>
        <GridItem>{renderActions()}</GridItem>
      </GridContainer>
    ) : (
      value
    );
  };

  renderButton = obj => {
    const { readOnly } = this.props;
    return (
      <Editable readOnly={readOnly} onClick={this.handleEditableClick(obj)}>
        {this.renderValue()}
      </Editable>
    );
  };

  renderMenu = state => obj => {
    const { children, renderMenuSubmit } = this.props;
    return (
      <GridContainer direction="column" spacing={0}>
        {LOGIC_HELPERS.ifFunction(children, [obj], children)}
        {renderMenuSubmit(state)}
      </GridContainer>
    );
  };

  render = () => {
    const { label } = this.props;
    return (
      <GridItem>
        <EditableLabel>{label}</EditableLabel>
        <Form
          onFormChange={this.handleFormChange}
          onValid={this.handleFormValid}
          onInvalid={this.handleFormInvalid}
          onFormValidSubmit={this.handleFormValidSubmit}
        >
          <Popper
            innerRef={this.handlePopperRef}
            placement="bottom-start"
            halfPadding
            disablePortal
            renderButton={this.renderButton}
            {...this.getRestProps()}
          >
            {this.renderMenu(this.state)}
          </Popper>
        </Form>
      </GridItem>
    );
  };
}

EditableMenuForm.propTypes = {
  // parent
  children: PropTypes.any,
  renderValue: PropTypes.func,
  renderActions: PropTypes.func,
  renderMenuSubmit: PropTypes.func,
  onOpen: PropTypes.func,
  onSubmit: PropTypes.func,
  label: PropTypes.any,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  readOnlyPlaceholder: PropTypes.string,
};

EditableMenuForm.defaultProps = {
  children: null,
  renderValue: value => value,
  renderActions: null,
  renderMenuSubmit: () => {},
  onOpen: () => {},
  onSubmit: () => {},
  label: '',
  readOnly: false,
  placeholder: 'Click to specify',
  readOnlyPlaceholder: 'None',
};

export default EditableMenuForm;

import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import ListItem from 'viewComponents/ListItem';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import Form from 'ugcomponents/Form';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import m from './messages';
import styles from './styles';

export class EditableForm extends PureComponent {
  state = {
    value: this.props.value,
    isValid: true,
    loading: false,
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  };

  onChange = value => this.setState({ value });

  onValid = () => this.setState({ isValid: true });

  onInvalid = () => this.setState({ isValid: false });

  onSave = ({ addFolderListView }) => {
    const { loading, value } = this.state;
    const { onSave } = this.props;

    if (!loading && value !== this.props.value) {
      this.setState({ loading: true });
      onSave(this.getData(addFolderListView));
    }
  };

  onSuccess = () => {
    this.setState({
      value: '',
      loading: false,
    });
  };

  onError = () => this.setState({ loading: false });

  onBtnClicked = () => {
    this.form.submitForm();
  };

  getData = content => ({
    form: {
      payload: {
        parentNodeId: this.props.folderId,
        content,
        type: 'folder',
      },
      onSuccess: this.onSuccess,
      onError: this.onError,
    },
  });

  createFormRef = ref => {
    this.form = ref;
  };

  renderButtons = () => {
    const { loading, value, isValid } = this.state;
    const { onClose } = this.props;

    const saveBtn =
      value !== this.props.value && isValid ? (
        <Button
          disabled={loading}
          loading={loading}
          onClick={this.onBtnClicked}
          variant={VARIANTS.BORDERLESS}
          size="extraSmall"
          iconButton
          icon="check"
          color="black"
        />
      ) : (
        ''
      );

    return (
      <React.Fragment>
        {saveBtn}
        <Button
          disabled={loading}
          onClick={onClose}
          variant={VARIANTS.BORDERLESS}
          size="extraSmall"
          iconButton
          icon="cross"
          color="black"
        />
      </React.Fragment>
    );
  };

  render = () => {
    const { classes, value, intl } = this.props;

    return (
      <Form
        onSubmit={this.onSave}
        onValid={this.onValid}
        onInvalid={this.onInvalid}
        ref={this.createFormRef}
      >
        <ListItem
          className={classes.item}
          icon="folder-plus"
          title={
            <TextField
              autoFocus
              onChange={this.onChange}
              className={classes.addTextField}
              InputProps={{ disableUnderline: true }}
              // https://material-ui-next.com/api/text-field/ <- not sure why it's error
              // eslint-disable-next-line react/jsx-no-duplicate-props
              inputProps={{ className: classes.input }}
              placeholder={intl.formatMessage(m.textfieldPlaceholder)}
              name="addFolderListView"
              required
              value={value}
              fullWidth
            />
          }
          action={this.renderButtons()}
        />
      </Form>
    );
  };
}

EditableForm.propTypes = {
  // hoc
  intl: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent
  value: PropTypes.string,
  folderId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

EditableForm.defaultProps = {
  value: '',
  folderId: 0,
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'EditableListForm' }),
)(EditableForm);

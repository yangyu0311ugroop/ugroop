import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
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

  onChange = value => {
    this.setState({
      value,
    });
  };

  onValid = () => {
    this.setState({ isValid: true });
  };

  onInvalid = () => {
    this.setState({ isValid: false });
  };

  onSave = ({ addFolderListView }) => {
    if (!this.state.loading && this.state.value !== this.props.value) {
      this.setState({
        loading: true,
      });
      this.props.onSave(this.getData(addFolderListView));
    }
  };

  onSuccess = () => {
    this.setState({
      value: '',
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
    });
  };

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

  render = () => {
    const { classes, onClose, value, intl } = this.props;

    const saveBtn =
      this.state.value !== value && this.state.isValid ? (
        <Button
          disabled={this.state.loading}
          loading={this.state.loading}
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
              value={this.props.value}
              fullWidth
            />
          }
          action={
            <React.Fragment>
              {saveBtn}
              <Button
                disabled={this.state.loading}
                onClick={onClose}
                variant={VARIANTS.BORDERLESS}
                size="extraSmall"
                iconButton
                icon="cross"
                color="black"
              />
            </React.Fragment>
          }
        />
      </Form>
    );
  };
}

EditableForm.propTypes = {
  folderId: PropTypes.number,
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  value: PropTypes.string,
  intl: PropTypes.object.isRequired,
};

EditableForm.defaultProps = {
  value: '',
  folderId: 0,
};

export default injectIntl(
  withStyles(styles, { name: 'EditableForm' })(EditableForm),
);

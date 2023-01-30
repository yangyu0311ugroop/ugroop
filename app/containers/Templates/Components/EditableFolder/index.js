import { withStyles } from '@material-ui/core/styles';
import { InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import { compose } from 'redux';
import Loading from 'react-loading';

import Card from 'ugcomponents/Card';
import CardContent from 'ugcomponents/Card/UGCardContent';
import CardFooter from 'ugcomponents/Card/UGCardFooter';

import Form from 'ugcomponents/Form';
import TextField from 'ugcomponents/Inputs/ValidationTextField';

import IconButton from '@material-ui/core/IconButton';
import Icon from 'ugcomponents/Icon';

import m from './messages';
import styles from './styles';

export class EditableFolder extends PureComponent {
  state = {
    name: this.props.initContent,
    loading: false,
    isValid: false,
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.initContent !== this.props.initContent) {
      this.setState({
        name: nextProps.initContent,
      });
    }
  };

  onSubmit = ({ folderName }) => {
    if (
      !this.state.loading &&
      this.state.isValid &&
      this.props.initContent !== folderName
    ) {
      this.setState({
        loading: true,
      });
      const form = {
        payload: {
          type: 'folder',
          content: folderName,
          parentNodeId: this.props.currFolderId,
        },
        onSuccess: this.onAddSuccess,
      };
      this.props.onSubmit({ form });
    }
  };

  onValid = () => {
    this.setState({
      isValid: true,
    });
  };

  onInvalid = () => {
    this.setState({
      isValid: false,
    });
  };

  onAddSuccess = () => {
    this.setState({
      loading: false,
      name: '',
    });
  };

  onChange = name => {
    this.setState({
      name,
    });
  };

  onCancel = () => {
    this.props.onCancel();
    this.setState({
      name: '',
    });
  };

  render = () => {
    const { classes, intl } = this.props;
    const { loading } = this.state;

    const InputProps = {
      className: classes.input,
      endAdornment: loading ? (
        <InputAdornment position="end">
          <Loading type="spin" height={16} width={16} color="#000000" />
        </InputAdornment>
      ) : (
        ''
      ),
    };

    const InputLabelProps = {
      FormLabelClasses: {
        root: classNames(classes.textLabel, classes.textLabelColor),
        focused: classes.textLabelColor,
      },
    };

    const saveBtnContent = this.state.loading ? (
      <Loading type="spin" height={16} width={16} color="#000000" />
    ) : (
      <Icon icon="check" />
    );

    const saveBtn =
      this.state.isValid && this.state.name !== this.props.initContent ? (
        <IconButton
          disabled={this.state.loading}
          type="submit"
          className={classNames(classes.btn, classes.btnPrimary)}
          disableRipple
        >
          {saveBtnContent}
        </IconButton>
      ) : (
        ''
      );

    return (
      <Card className={classNames(classes.root, classes.border)}>
        <div className={classes.overshadow1} />
        <div className={classes.overshadow2} />
        <Form
          onSubmit={this.onSubmit}
          onValid={this.onValid}
          onInvalid={this.onInvalid}
        >
          <CardContent className={classes.content}>
            <TextField
              fullWidth
              autoFocus
              disabled={loading}
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
              value={this.state.name}
              InputProps={InputProps}
              InputLabelProps={InputLabelProps}
              name="folderName"
              label={intl.formatMessage(m.txtLabel)}
              placeholder={intl.formatMessage(m.txtPlaceholder)}
              validations="minLength:1"
              required
            />
          </CardContent>
          <CardFooter className={classes.footer}>
            {saveBtn}
            <IconButton
              onClick={this.onCancel}
              className={classes.btn}
              disableRipple
            >
              <Icon icon="cross" />
            </IconButton>
          </CardFooter>
        </Form>
      </Card>
    );
  };
}

EditableFolder.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initContent: PropTypes.string,

  // resaga props
  currFolderId: PropTypes.number,
};

EditableFolder.defaultProps = {
  currFolderId: 0,
  initContent: '',
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'EditableFolder' }),
)(EditableFolder);

import Collapse from '@material-ui/core/Collapse';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { DEFAULT, UNMATCHED_PWD } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Form, { TextField } from 'ugcomponents/Form';
import helper from 'ugcomponents/SnackBar/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import JButton from 'viewComponents/Button/variants/JButton';
import Margin from 'viewComponents/Margin';
import { CHANGE_PWD, USER_API } from '../../../../apis/constants';
import { CONFIG } from './config';
import { MATCH_PASSWORD, PASSWORD } from './defines/Inputs';
import {
  INCORRECT_PASSWORD,
  INCORRECT_USER_PASSWORD,
} from './defines/serverErrors';
import styles from './styles';

export class ChangePasswordForm extends PureComponent {
  state = {
    showNewPassword: false,
    showRetypePassword: false,
    showCurrentPassword: false,
    serverError: '',
  };

  validPassword = values => {
    const { password, confirmedPassword } = values;
    return password === confirmedPassword;
  };

  changePwdSuccess = resetForm => () => {
    this.setState({ serverError: '' });
    helper.openSuccessSnackbar(
      'Success! Your Password has been changed!',
      this.props.resaga,
    );
    resetForm();
  };

  changePwdFailed = err => {
    this.setState({ serverError: err.msg });
    let msg = err.msg;
    if (err.msg === INCORRECT_USER_PASSWORD) {
      msg = INCORRECT_PASSWORD;
    }
    helper.openErrorSnackbar(msg, this.props.resaga);
  };

  handleValidSubmit = (data, resetForm) => {
    const { currentPassword, password } = data;
    this.props.resaga.dispatchTo(USER_API, CHANGE_PWD, {
      payload: {
        oldPassword: currentPassword,
        newPassword: password,
      },
      onSuccess: this.changePwdSuccess(resetForm),
      onError: this.changePwdFailed,
    });
  };

  handleClick = targetState => () => {
    this.setState(prevState => ({
      [targetState]: !prevState[targetState],
    }));
  };

  renderFields = () => {
    const newPasswordIcon = this.state.showNewPassword ? 'eye-crossed' : 'eye';
    const retypePasswordIcon = this.state.showRetypePassword
      ? 'eye-crossed'
      : 'eye';
    const currentPasswordIcon = this.state.showCurrentPassword
      ? 'eye-crossed'
      : 'eye';
    const currInputProps = {
      endAdornment: (
        <InputAdornment position="end">
          <Button
            onClick={this.handleClick('showCurrentPassword')}
            color="gray"
            size="small"
            icon={currentPasswordIcon}
            iconButton
            variant={VARIANTS.BORDERLESS}
            tabIndex={-1}
          />
        </InputAdornment>
      ),
      type: this.state.showCurrentPassword ? 'text' : 'password',
    };
    const newInputProps = {
      endAdornment: (
        <InputAdornment position="end">
          <Button
            onClick={this.handleClick('showNewPassword')}
            color="gray"
            size="small"
            icon={newPasswordIcon}
            iconButton
            variant={VARIANTS.BORDERLESS}
            tabIndex={-1}
          />
        </InputAdornment>
      ),
      type: this.state.showNewPassword ? 'text' : 'password',
    };
    const retypeInputProps = {
      endAdornment: (
        <InputAdornment position="end">
          <Button
            onClick={this.handleClick('showRetypePassword')}
            color="gray"
            size="small"
            icon={retypePasswordIcon}
            iconButton
            variant={VARIANTS.BORDERLESS}
            tabIndex={-1}
          />
        </InputAdornment>
      ),
      type: this.state.showRetypePassword ? 'text' : 'password',
    };

    return (
      <React.Fragment>
        <Margin bottom="lg" top="lg">
          <TextField
            id="currentPassword"
            label="Current Password"
            name="currentPassword"
            fullWidth
            InputProps={currInputProps}
          />
        </Margin>
        <Margin bottom="lg">
          <TextField {...PASSWORD} fullWidth InputProps={newInputProps} />
        </Margin>
        <Margin bottom="lg">
          <TextField
            {...MATCH_PASSWORD}
            fullWidth
            InputProps={retypeInputProps}
            debounceMs={10}
            validations={{
              matchPassword: this.validPassword,
            }}
            validationError={UNMATCHED_PWD}
            rules={['matchedPassword']}
          />
        </Margin>
      </React.Fragment>
    );
  };

  handleChange = (_, isChanged) => {
    this.setState({ isChanged });

    if (isChanged) {
      this.setState({ serverError: '' });
    }
  };

  renderWithForm = () => {
    const { onDiscard } = this.props;
    const { serverError, isChanged } = this.state;

    const isLoading = this.props.isLoading;
    return (
      <Form onValidSubmit={this.handleValidSubmit} onChange={this.handleChange}>
        <GridContainer direction="column" spacing={2}>
          <GridItem>{this.renderFields()}</GridItem>

          <Collapse in={!!serverError}>
            <GridItem>
              <Alert severity="error">{serverError}</Alert>
            </GridItem>
          </Collapse>

          <GridItem>
            <GridContainer alignItems="center">
              <GridItem xs />
              {onDiscard && (
                <GridItem>
                  <JButton padding="lg" bold onClick={onDiscard(isChanged)}>
                    {LOGIC_HELPERS.ifElse(isChanged, 'Cancel', 'Go back')}
                  </JButton>
                </GridItem>
              )}
              <GridItem>
                {isChanged && (
                  <JButton
                    disabled={isLoading}
                    bg="green"
                    padding="lg"
                    bold
                    type="submit"
                  >
                    Save
                  </JButton>
                )}
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </Form>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.FIELDS_ONLY]: this.renderFields,
      [DEFAULT]: this.renderWithForm,
    });
  };
}

ChangePasswordForm.propTypes = {
  // hoc props
  resetForm: PropTypes.func,
  isLoading: PropTypes.bool,
  // parent props
  variant: PropTypes.string,
  onDiscard: PropTypes.func,

  // resaga props
  resaga: PropTypes.object,
};

ChangePasswordForm.defaultProps = {
  variant: '',
  resaga: {},
};

export default compose(
  withStyles(styles, { name: 'ChangePasswordForm' }),
  resaga(CONFIG),
)(ChangePasswordForm);

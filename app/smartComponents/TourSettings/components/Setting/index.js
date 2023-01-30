import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { compose } from 'redux';
import { DEFAULT } from 'appConstants';
import EditableSelectForm from 'smartComponents/Editables/SelectForm';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { SwitchField } from 'viewComponents/Inputs';
import { TourSettingsLabel } from 'viewComponents/TourSettings';
import { withStyles } from '@material-ui/core';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import isFunction from 'lodash/isFunction';
import { VARIANTS } from 'variantsConstants';
import { EditableTextForm } from 'smartComponents/Editables';
import { CONFIG } from './config';
import styles from './styles';

export class TourSetting extends React.PureComponent {
  state = {
    loading: false,
  };

  upsertSetting = (value, onSuccess, onError) => {
    const { id, settingId, settingKey: key } = this.props;
    this.setState({ loading: true });
    TEMPLATE_API_HELPERS.upsertSetting(
      {
        id,
        settingId,
        key,
        value,
        onSuccess: this.handleUpdateSuccess(onSuccess),
        onError: this.handleUpdateError(onError),
      },
      this.props,
    );
  };

  handleUpdateSuccess = onSuccess => data => {
    this.setState({ loading: false });
    if (isFunction(onSuccess)) {
      onSuccess(data);
    }
  };

  handleUpdateError = onError => data => {
    this.setState({ loading: false });
    if (isFunction(onError)) {
      onError(data);
    }
  };

  handleSwitchChange = value => {
    this.upsertSetting(LOGIC_HELPERS.ifElse(value, '1', '0'));
  };

  handleLogicalSwitchChange = () => {
    const { value } = this.props;
    this.upsertSetting(LOGIC_HELPERS.ifElse(value === '0', '1', '0'));
  };

  renderLabel = () => {
    const { label } = this.props;
    return <TourSettingsLabel>{label}</TourSettingsLabel>;
  };

  handleSubmit = ({ model, onSuccess, onError }) => {
    const { setting } = model;
    return this.upsertSetting(setting, onSuccess, onError);
  };

  renderSwitch = () => {
    const { value, label, classes } = this.props;
    const { loading } = this.state;
    return (
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem className={classes.grow}>
          <GridContainer
            direction="row"
            alignItems="center"
            justify="flex-start"
            spacing={0}
          >
            <GridItem>
              <JText bold gray sm uppercase>
                {label}
              </JText>
            </GridItem>
            <GridItem xs>
              <GridContainer justify="flex-end" alignItems="center">
                <GridItem>
                  <SwitchField
                    value={value === '1'}
                    onChange={this.handleSwitchChange}
                    disabled={loading}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderProp = () => {
    const { children, value, withAction } = this.props;
    if (isFunction(children)) {
      if (withAction) {
        return children(value, this.handleLogicalSwitchChange);
      }
      return children(value);
    }
    return value;
  };

  renderValue = () => {
    const { value } = this.props;
    return (
      <JText bold gray textRight>
        {value}
      </JText>
    );
  };

  renderEditable = () => {
    const {
      value,
      readOnly,
      required,
      label,
      placeholder,
      textComponent,
      options,
      select,
      classes,
      renderValue,
    } = this.props;

    const FormComponent = select ? EditableSelectForm : EditableTextForm;

    return (
      <GridContainer alignItems="center" justify="space-between">
        <GridItem>
          <JText bold gray sm uppercase>
            {label}
          </JText>
        </GridItem>
        <GridItem xs={!select}>
          <FormComponent
            name="setting"
            value={value}
            TextComponent={textComponent}
            placeholder={placeholder}
            required={required}
            onSubmit={this.handleSubmit}
            readOnly={readOnly}
            fullWidth
            textClassName={classes.editableText}
            editableClass={classes.editableText}
            options={options}
            renderValue={renderValue}
          />
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [VARIANTS.EDITABLE]: this.renderEditable,
      [DEFAULT]: this.renderSwitch,
    });
  };
}

TourSetting.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  label: PropTypes.any,
  settingKey: PropTypes.string,
  children: PropTypes.func,
  withAction: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  select: PropTypes.bool,
  placeholder: PropTypes.string,
  textComponent: PropTypes.node,
  options: PropTypes.array,
  renderValue: PropTypes.any,

  // resaga value
  settingId: PropTypes.number,
  value: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

TourSetting.defaultProps = {
  id: null,
  variant: null,
  label: null,
  settingKey: null,
  options: [],

  settingId: 0,
  value: null,
};

export default compose(
  withStyles(styles, { name: 'TourSetting' }),
  resaga(CONFIG),
)(TourSetting);

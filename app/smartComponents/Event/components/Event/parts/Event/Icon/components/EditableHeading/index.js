/**
 * Created by stephenkarpinskyj on 12/7/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import GridItem from 'components/GridItem';
import { EventIcon } from 'viewComponents/Event';
import { EditableSelect } from 'smartComponents/Editables';
import iconUtils from '../../utils';
import { CONFIG } from './config';

export class IconEditableHeading extends React.PureComponent {
  componentDidUpdate = prevProps => {
    if (
      prevProps.formType !== this.props.formType ||
      prevProps.formSubtype !== this.props.formSubtype
    ) {
      this.handleTypeChange();
    }
  };

  getValue = () => {
    const { formValue, value, type } = this.props;
    const isCreating = type === '';
    return isCreating ? formValue || value : value;
  };

  getProp = (formValue, value) => (formValue === undefined ? value : formValue);

  getCurrentValue = () => {
    const { formValue, value } = this.props;
    return this.getProp(formValue, value);
  };

  getType = () => {
    const { formType, type } = this.props;
    return this.getProp(formType, type);
  };

  getSubtype = () => {
    const { formSubtype, subtype } = this.props;
    return this.getProp(formSubtype, subtype);
  };

  handleTypeChange = () => {
    const { value } = this.props;
    this.icon.setValue(value);
    this.icon.props.onChange(value);
  };

  handleChange = value => {
    this.props.resaga.setValue({ formValue: value });
    this.props.onChange(value);
  };

  handleIconRef = ref => {
    this.icon = ref;
  };

  makeOptions = () =>
    iconUtils.makeIconOptions(this.getType(), this.getSubtype());

  renderValue = () => (
    <EventIcon
      type={this.getType()}
      subtype={this.getSubtype()}
      iconOverride={this.getCurrentValue()}
      size="base"
    />
  );

  render = () => {
    const { name, SelectProps } = this.props;
    return (
      <GridItem>
        <EditableSelect
          value={this.getValue()}
          name={name}
          options={this.makeOptions()}
          renderValue={this.renderValue}
          onChange={this.handleChange}
          SelectProps={{ ...SelectProps, ref: this.handleIconRef }}
        />
      </GridItem>
    );
  };
}

IconEditableHeading.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  subtype: PropTypes.string,
  onChange: PropTypes.func,
  SelectProps: PropTypes.object,

  // resaga value
  formType: PropTypes.string,
  formSubtype: PropTypes.string,
  formValue: PropTypes.string,
};

IconEditableHeading.defaultProps = {
  value: '',
  type: '',
  subtype: '',
  onChange: () => {},
  SelectProps: {},

  formType: undefined,
  formSubtype: undefined,
  formValue: undefined,
};

export default compose(resaga(CONFIG))(IconEditableHeading);

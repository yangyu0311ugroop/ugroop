/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { withStyles } from 'components/material-ui';
import GridItem from 'components/GridItem';
import { EventHeading } from 'viewComponents/Event/components/Heading';
import { EditableSelect } from 'smartComponents/Editables';
import typeUtils from '../../utils';
import { CONFIG } from './config';
import style from './style';

export class TypeEditableHeading extends React.PureComponent {
  state = {
    value: '',
  };

  getSelectProps = () => {
    if (!this.SelectProps) {
      const { classes } = this.props;
      this.SelectProps = {
        MenuProps: {
          classes: { paper: classes.selectMenuPaper },
        },
      };
    }
    return this.SelectProps;
  };

  getValue = () => {
    const { value, formValue } = this.props;
    return this.state.value || (formValue === undefined ? value : formValue);
  };

  handleChange = value => {
    const subtype = EVENT_HELPERS.getFirstEventSubtypeConstants(value).type;
    this.props.resaga.setValue({ formValue: value, formSubtype: subtype });
    this.setState({ value });
    this.props.onChange(value);
  };

  handleClose = () => {
    const value = this.state.value || this.props.value;
    const subtype = EVENT_HELPERS.getFirstEventSubtypeConstants(value).type;
    this.props.resaga.setValue({ formValue: value, formSubtype: subtype });
    this.props.onClose();
  };

  renderValue = value => {
    const { name } = EVENT_HELPERS.getEventTypeConstants(value);
    return <EventHeading>{name}</EventHeading>;
  };

  render = () => {
    const {
      classes,
      value,
      name,
      open,
      onChange,
      onClose,
      ...rest
    } = this.props;
    return (
      <GridItem>
        <EditableSelect
          value={this.getValue()}
          name={name}
          open={open}
          options={typeUtils.renderTypeOptions()}
          renderValue={this.renderValue}
          onChange={this.handleChange}
          onClose={this.handleClose}
          SelectProps={this.getSelectProps()}
          {...rest}
        />
      </GridItem>
    );
  };
}

TypeEditableHeading.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  open: PropTypes.bool,
  onChange: PropTypes.func,
  onClose: PropTypes.func,

  // resaga value
  formValue: PropTypes.string,
};

TypeEditableHeading.defaultProps = {
  value: '',
  open: false,
  onChange: () => {},
  onClose: () => {},

  formValue: undefined,
};

export default compose(
  withStyles(style, { name: 'smartComponents/Event/Type/EditableHeading' }),
  resaga(CONFIG),
)(TypeEditableHeading);

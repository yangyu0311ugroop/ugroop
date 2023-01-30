/**
 * Created by stephenkarpinskyj on 12/7/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { withStyles } from 'components/material-ui';
import GridItem from 'components/GridItem';
import { EventHeading } from 'viewComponents/Event';
import { EditableSelect } from 'smartComponents/Editables';
import subtypeUtils from '../../utils';
import { CONFIG } from './config';
import style from './style';

export class SubtypeEditableHeading extends React.PureComponent {
  getValue = (formValue, value) =>
    formValue === undefined ? value : formValue;

  getType = () => {
    const { formType, type } = this.props;
    return this.getValue(formType, type);
  };

  getSubtype = () => {
    const { formValue, value } = this.props;
    return this.getValue(formValue, value);
  };

  handleChange = value => {
    this.props.resaga.setValue({ formValue: value });
    this.props.onChange(value);
  };

  handleClose = () => {
    const value = this.getSubtype();
    this.props.resaga.setValue({ formValue: value });
    this.props.onClose(value);
  };

  makeOptions = () => {
    const { filterOptions } = this.props;

    return subtypeUtils.makeSubtypeOptions(this.getType(), filterOptions);
  };

  renderValue = value => {
    const { name } = EVENT_HELPERS.getEventSubtypeConstants(
      this.getType(),
      value,
    );
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
      viewEditOpen,
      ...rest
    } = this.props;

    const currentValue = this.getSubtype();

    return (
      <GridItem>
        <EditableSelect
          value={value}
          name={name}
          open={open}
          options={this.makeOptions()}
          renderValue={this.renderValue}
          onChange={this.handleChange}
          onClose={this.handleClose}
          SelectProps={{
            currentValue,
            MenuProps: {
              classes: { paper: classes.selectMenuPaper },
            },
          }}
          {...rest}
        />
      </GridItem>
    );
  };
}

SubtypeEditableHeading.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  open: PropTypes.bool,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  filterOptions: PropTypes.func,

  // resaga value
  formValue: PropTypes.string,
  formType: PropTypes.string,
  viewEditOpen: PropTypes.bool,
};

SubtypeEditableHeading.defaultProps = {
  type: '',
  value: '',
  open: false,
  onChange: () => {},
  onClose: () => {},

  formValue: undefined,
  formType: undefined,
  viewEditOpen: false,
};

export default compose(
  withStyles(style, { name: 'smartComponents/Event/Subtype/EditableHeading' }),
  resaga(CONFIG),
)(SubtypeEditableHeading);

/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withFormsy } from 'formsy-react';

import RichTextEditor from 'ugcomponents/RichTextEditor';

export class RichTextField extends PureComponent {
  isDisabled = () => this.props.isFormDisabled() || this.props.disabled;

  handleChange = value => {
    this.props.setValue(value);
  };

  render = () => {
    const { id, editing, value, richTextProps } = this.props;
    const disabled = this.isDisabled();
    return (
      <div>
        <RichTextEditor
          readOnly={!editing}
          initContent={value}
          toolBarId={`RichTextField-${id}`}
          onChange={this.handleChange}
          disabled={disabled}
          {...richTextProps}
        />
      </div>
    );
  };
}

RichTextField.propTypes = {
  // hoc
  setValue: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.func.isRequired,

  // parent
  id: PropTypes.string,
  name: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  editing: PropTypes.bool, // TODO: Rename this to readOnly to make this component less confusing?
  disabled: PropTypes.bool,
  value: PropTypes.string,
  richTextProps: PropTypes.object,
};

RichTextField.defaultProps = {
  id: 'id',
  name: 'description',
  editing: false,
  disabled: false,
  value: '',
  richTextProps: {},
};

export default compose(withFormsy)(RichTextField);

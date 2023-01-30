/**
 * Created by stephenkarpinskyj on 20/4/18.
 */

import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'ugcomponents/Buttons/IconButton';
import Icon from 'ugcomponents/Icon';

/**
 * Renders tail of a field table row.
 */
export class FieldTableRowTail extends React.PureComponent {
  renderRemoveButton = () => {
    const { onRemove, removeButtonProps } = this.props;
    return (
      <IconButton tooltip="Remove" onClick={onRemove} {...removeButtonProps}>
        <Icon icon="lnr-trash2" />
      </IconButton>
    );
  };

  render = () => this.renderRemoveButton();
}

FieldTableRowTail.propTypes = {
  // parent
  onRemove: PropTypes.func,
  removeButtonProps: PropTypes.object,
};

FieldTableRowTail.defaultProps = {
  onRemove: null,
  removeButtonProps: {},
};

export default FieldTableRowTail;

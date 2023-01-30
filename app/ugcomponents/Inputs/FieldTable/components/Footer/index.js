/**
 * Created by stephenkarpinskyj on 20/4/18.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Button from 'ugcomponents/Buttons/Button';

/**
 * Renders footer of a field table.
 */
export class FieldTableFooter extends React.PureComponent {
  render = () => {
    const { onAdd, addButtonProps, addButtonContent } = this.props;
    return (
      <Button onClick={onAdd} {...addButtonProps}>
        {addButtonContent}
      </Button>
    );
  };
}

FieldTableFooter.propTypes = {
  // parent
  onAdd: PropTypes.func,
  addButtonProps: PropTypes.object,
  addButtonContent: PropTypes.any,
};

FieldTableFooter.defaultProps = {
  onAdd: null,
  addButtonProps: {
    dense: true,
    outline: 'outLineGrey',
  },
  addButtonContent: 'Add New',
};

export default FieldTableFooter;

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'components/material-ui';
import { PopperMenuItem } from 'components/Popper';
import P from 'viewComponents/Typography';
import style from './style';

export class EditableMenuItemClear extends React.PureComponent {
  render = () => {
    const { children, ...rest } = this.props;
    return (
      <PopperMenuItem icon="lnr-broom" {...rest}>
        <P dense fontStyle="italic">
          {children}
        </P>
      </PopperMenuItem>
    );
  };
}

EditableMenuItemClear.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
};

EditableMenuItemClear.defaultProps = {
  children: null,
};

export default withStyles(style, {
  name: 'viewComponents/Editable/MenuItemClear',
})(EditableMenuItemClear);

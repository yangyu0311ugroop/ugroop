import React from 'react';
import PropTypes from 'prop-types';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';

export class EditableAction extends React.PureComponent {
  handleClick = ev => {
    const { onClick } = this.props;
    ev.stopPropagation();
    onClick(ev);
  };

  render = () => {
    const { onClick, ...rest } = this.props;
    return <Button dense iconButton onClick={this.handleClick} {...rest} />;
  };
}

EditableAction.propTypes = {
  // parent
  icon: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

EditableAction.defaultProps = {
  icon: 'lnr-eye',
  variant: VARIANTS.OUTLINE,
  color: 'gray',
  size: 'extraSmall',
  title: 'View Details',
  onClick: () => {},
};

export default EditableAction;

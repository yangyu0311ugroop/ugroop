import React from 'react';
import PropTypes from 'prop-types';
import { VARIANTS } from 'variantsConstants';
import { withStyles } from 'components/material-ui';
import Button from 'viewComponents/Button';
import style from './style';

export class CreateButton extends React.PureComponent {
  render = () => {
    const { classes, ...rest } = this.props;
    return (
      <Button
        className={classes.root}
        iconButton
        size="extraSmall"
        color="black"
        dense
        {...rest}
      />
    );
  };
}

CreateButton.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  variant: PropTypes.string,
  title: PropTypes.any,
  icon: PropTypes.string,
};

CreateButton.defaultProps = {
  variant: VARIANTS.OUTLINE,
  title: 'Add',
  icon: 'lnr-plus',
};

export default withStyles(style, { name: 'viewComponents/Create' })(
  CreateButton,
);

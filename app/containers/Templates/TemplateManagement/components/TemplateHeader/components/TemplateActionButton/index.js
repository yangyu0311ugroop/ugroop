import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from 'ugcomponents/Buttons/Button';
import Tooltip from '@material-ui/core/Tooltip';

export const stylesheet = ({ colors }) => ({
  root: {
    borderRadius: '50%',
    height: '50px',
    width: '50px',
    minWidth: '50px',
    backgroundColor: colors.templateActionBtns,
    border: '1px solid rgba(255, 255, 255, 0.5)',
    '& > span:first-child': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

export const TemplateActionButton = ({
  classes,
  className,
  placement,
  children,
  tooltipText,
  ...props
}) => {
  if (tooltipText) {
    return (
      <Tooltip title={tooltipText} placement={placement}>
        <Button classes={classes} className={className} {...props}>
          {children}
        </Button>
      </Tooltip>
    );
  }

  return (
    <Button classes={classes} className={className} {...props}>
      {children}
    </Button>
  );
};

TemplateActionButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  placement: PropTypes.string,
  tooltipText: PropTypes.node,
};
TemplateActionButton.defaultProps = {
  tooltipText: undefined,
  placement: 'top',
};

export default withStyles(stylesheet, { name: 'TemplateActionButton' })(
  TemplateActionButton,
);

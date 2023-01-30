import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from 'viewComponents/Button/index';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/styles';
const styles = {
  popOver: {
    zIndex: 999,
  },
};

const useStyles = makeStyles(styles);

function PopOverButton({
  buttonLabel,
  options,
  buttonClick,
  menuClick,
  showPopover,
  color,
  size,
  disableIndex,
  variant,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  function handleClick(event) {
    if (showPopover) {
      handleToggle(event);
    } else {
      buttonClick();
    }
  }

  function handleMenuItemClick(event, index) {
    setSelectedIndex(index);
    if (menuClick) {
      menuClick();
    }
  }

  const open = Boolean(anchorEl);
  function handleToggle(event) {
    if (anchorEl) {
      setAnchorEl(null);
    }
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Grid container>
      <Grid item xs={12} align="center">
        <Button
          color={color}
          size={size}
          onClick={handleClick}
          variant={variant}
          buttonText
        >
          {buttonLabel}
          {showPopover ? <ArrowDropDownIcon /> : <div />}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorEl}
          transition
          disablePortal
          className={classes.popOver}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Paper id="menu-list-grow">
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList>
                {options.map((option, index) => (
                  <MenuItem
                    key={option}
                    disabled={index === disableIndex}
                    selected={index === selectedIndex}
                    onClick={event => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>
      </Grid>
    </Grid>
  );
}

PopOverButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  showPopover: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.string,
  options: PropTypes.array,
  disableIndex: PropTypes.number,
  variant: PropTypes.string,
  buttonClick: PropTypes.func,
  menuClick: PropTypes.func,
};

export default PopOverButton;

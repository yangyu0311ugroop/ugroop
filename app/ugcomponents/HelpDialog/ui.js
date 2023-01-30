import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage as TEXT } from 'react-intl';
import Dialog from 'ugcomponents/Dialog';
import Img from 'components/Img';
import Logo from 'shareAssets/logo-solo-cool.png';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon';
import { H3 } from 'viewComponents/Typography';
import m from './messages';
import styles from './styles';

const generateHelpContent = (dialogTitle, classes, onClose, children) => (
  <div className={classes.root}>
    <div className={classes.title}>
      <GridContainer
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={0}
      >
        <GridItem>
          <GridContainer
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.noTextWrap}
            noWrap
          >
            <GridItem>
              <Img src={Logo} className={classes.logo} alt="uGroop" />
            </GridItem>
            <GridItem>
              <H3 dense weight="bold">
                {dialogTitle}
              </H3>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <Button
            size="extraSmall"
            color="gray"
            onClick={onClose}
            className={classes.closeDialogButton}
          >
            <Icon icon="lnr-cross2" size="xsmall" />
          </Button>
        </GridItem>
      </GridContainer>
    </div>
    {children}
    <Button
      onClick={onClose}
      className={classes.closeBtn}
      data-testid="helpCloseButton"
    >
      <TEXT {...m.confirmBtn} />
    </Button>
  </div>
);

export const HelpDialogUI = ({
  open,
  onClose,
  classes,
  dialogTitle,
  children,
  className,
}) => (
  <div className={className}>
    <Dialog
      template="custom"
      open={open}
      customClassnames={{
        dialog: classes.paper,
      }}
      customChildren={{
        dialog: generateHelpContent(dialogTitle, classes, onClose, children),
      }}
      muiDialogProps={{ onClose }}
    />
  </div>
);

HelpDialogUI.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

HelpDialogUI.defaultProps = {
  open: false,
  children: [],
  className: '',
};

export default withStyles(styles)(HelpDialogUI);

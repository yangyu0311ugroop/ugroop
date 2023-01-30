import { Slide } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import JDialog from 'ugcomponents/JDialog';
import Button from 'viewComponents/Button';
import { withRouter } from 'react-router-dom';
import { CONFIG } from './config';
import styles from './styles';
import JText from '../../../../components/JText';

export const HelpDialog = memo(props => {
  const { data, classes, smDown } = props;
  const { message, linkUrl } = data;
  const handleCloseDialog = () => PORTAL_HELPERS.close(props);

  const portalSm = {
    // fullScreen: true,
    TransitionComponent: Slide,
    TransitionProps: { direction: 'up' },
  };

  const mobileProps = LOGIC_HELPERS.ifElse(smDown, portalSm, {});

  const actionButtons = () => (
    <GridContainer alignItems="center" justify="center" spacing={2}>
      <GridItem>
        <a href={linkUrl} target="_blank" className={classes.link}>
          <Button
            dense
            size="xs"
            color="black"
            variant="outline"
            onClick={handleCloseDialog}
            className={classes.buttonMore}
            data-testid="jdialog-learnMore"
          >
            Learn more
          </Button>
        </a>
      </GridItem>
    </GridContainer>
  );

  const renderContent = () => (
    <GridContainer direction="column" spacing={2}>
      <GridItem>
        <JText nowrap={false} lg>
          {message}
        </JText>
      </GridItem>
      <GridItem>{actionButtons()}</GridItem>
    </GridContainer>
  );

  return (
    <JDialog
      open
      onClose={handleCloseDialog}
      header={
        <JText xl bold>
          {data.header}
        </JText>
      }
      fullWidth
      fullScreen={false}
      contentClassName={classes.content}
      headerNoWrap
      headerContainerAlign="baseline"
      hideSubmitButton
      {...mobileProps}
    >
      {renderContent()}
    </JDialog>
  );
});

HelpDialog.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  smDown: PropTypes.bool,
  history: PropTypes.object,
  // parent props
  data: PropTypes.object,
  // resaga props
};

HelpDialog.defaultProps = {
  data: {},
};

export default compose(
  withStyles(styles, { name: 'HelpDialog' }),
  withRouter,
  withSMDown,
  resaga(CONFIG),
)(HelpDialog);

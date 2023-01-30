import { Hidden, LinearProgress } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import { THE_DOT } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Img from 'components/Img';
import JText from 'components/JText';
import humanizeDuration from 'humanize-duration';
import PropTypes from 'prop-types';
import React from 'react';
import logo from 'shareAssets/logo-solo.png';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { AWAITING_UPLOAD, DONE_UPLOAD, UPLOADING } from './constants';
import styles from './styles';

export const UploadProgressDialogUI = ({
  classes,
  filename,
  progress,
  remaining,
  dialogState,
}) =>
  dialogState !== AWAITING_UPLOAD && (
    <Dialog open disableBackdropClick disableEscapeKeyDown>
      <div className={classes.root}>
        <GridContainer direction="column">
          <GridItem className={classes.content}>
            <GridContainer alignItems="center" spacing={2} wrap="nowrap">
              <GridItem xs>
                <GridContainer direction="column">
                  <GridItem>
                    <JText sm bold uppercase gray spacing2>
                      Uploading file
                    </JText>
                  </GridItem>
                  <GridItem>
                    <GridContainer direction="column" spacing={0}>
                      <GridItem>
                        <JText bold ellipsis>
                          {filename}
                        </JText>
                      </GridItem>
                      <GridItem>
                        <JText gray>
                          <GridContainer alignItems="center">
                            <GridItem>
                              <JText success={progress === 100}>
                                {Math.round(progress)}%
                              </JText>
                            </GridItem>
                            {remaining > 0 && (
                              <>
                                <GridItem>{THE_DOT}</GridItem>
                                <GridItem>
                                  {humanizeDuration(remaining * 1000)} left
                                </GridItem>
                              </>
                            )}
                          </GridContainer>
                        </JText>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </GridItem>

              <Hidden smDown>
                <GridItem>
                  <Img src={logo} alt="uGroop" className={classes.logo} />
                </GridItem>
              </Hidden>
            </GridContainer>
          </GridItem>

          <GridItem>
            <LinearProgress
              id="upload-dialog-progress"
              variant="determinate"
              value={progress}
              classes={{
                root: classes.progressRoot,
                colorPrimary: classes.progressBackgroundColor,
                barColorPrimary: classes.progressColor,
                bar1Determinate: LOGIC_HELPERS.ifElse(
                  progress < 100,
                  classes.progressBarRushed,
                  classes.progressBarInstant,
                ),
              }}
            />
            <LinearProgress
              id="upload-dialog-progress"
              variant="determinate"
              value={progress}
              classes={{
                root: classes.pgRoot,
                colorPrimary: classes.pgBackgroundColor,
                barColorPrimary: classes.pgColor,
                bar1Determinate: LOGIC_HELPERS.ifElse(
                  progress < 100,
                  classes.progressBarRushed,
                  classes.progressBarInstant,
                ),
              }}
            />
          </GridItem>
        </GridContainer>
      </div>
    </Dialog>
  );

UploadProgressDialogUI.propTypes = {
  filename: PropTypes.string,
  progress: PropTypes.number,
  remaining: PropTypes.number,
  dialogState: PropTypes.oneOf([AWAITING_UPLOAD, UPLOADING, DONE_UPLOAD]),
  classes: PropTypes.object,
};

UploadProgressDialogUI.defaultProps = {
  classes: {},
  progress: 0,
  dialogState: AWAITING_UPLOAD,
};

export default withStyles(styles)(UploadProgressDialogUI);

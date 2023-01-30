import React from 'react';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import { FormattedMessage as TEXT, injectIntl } from 'react-intl';
import { H3, H4 } from 'viewComponents/Typography';
import Table, { TableCell, TableRow, TableBody } from 'viewComponents/Table';
import { withStyles } from '@material-ui/core/styles';
import JDialog from 'ugcomponents/JDialog';
import JText from 'components/JText';
import m from './messages';
import styles from './styles';

export const HelpTourConnections = ({ open, onClose, classes, intl }) => (
  <JDialog
    denseTitle
    headerNoWrap
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="sm"
    submitButton={
      <JText className={classes.fullWidth} onClick={onClose}>
        Got It
      </JText>
    }
    titleClassName={classes.title}
    header={
      <H3 dense weight="bold">
        {intl.formatMessage(m.tourConnectionsHelp)}
      </H3>
    }
  >
    <GridContainer direction="column">
      <GridItem>
        <H4 className={classes.h4}>
          <TEXT {...m.needOthers} />
        </H4>
        <H4 className={classes.h4}>
          <TEXT {...m.inviteThemViaEmail} />
        </H4>
        <H4 className={classes.h4}>
          <TEXT {...m.cancelAnInvitation} />
        </H4>
        <H4 className={classes.tourRoles}>
          <TEXT {...m.tourRoles} />
        </H4>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <GridContainer>
                  <GridItem>
                    <H4 dense weight="bold">
                      <TEXT {...m.organiserHeader} />
                    </H4>
                  </GridItem>
                  <GridItem>
                    <H4 className={classes.h4} dense>
                      <TEXT {...m.tourOrganiser} />
                    </H4>
                  </GridItem>
                </GridContainer>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <GridContainer>
                  <GridItem>
                    <H4 dense weight="bold">
                      <TEXT {...m.collaboratorHeader} />
                    </H4>
                  </GridItem>
                  <GridItem>
                    <H4 className={classes.h4} dense>
                      <TEXT {...m.tourCollaborator} />
                    </H4>
                  </GridItem>
                </GridContainer>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <GridContainer>
                  <GridItem>
                    <H4 dense weight="bold">
                      <TEXT {...m.viewerHeader} />
                    </H4>
                  </GridItem>
                  <GridItem>
                    <H4 className={classes.h4} dense>
                      <TEXT {...m.tourViewer} />
                    </H4>
                  </GridItem>
                </GridContainer>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </GridItem>
    </GridContainer>
  </JDialog>
);

HelpTourConnections.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }),
};

HelpTourConnections.defaultProps = {
  open: false,
};

export default withStyles(styles)(injectIntl(HelpTourConnections));

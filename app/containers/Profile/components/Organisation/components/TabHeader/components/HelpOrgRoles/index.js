import React from 'react';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import { FormattedMessage as TEXT, injectIntl } from 'react-intl';
import HelpDialog from 'ugcomponents/HelpDialog';
import { H4 } from 'viewComponents/Typography';
import Table, { TableCell, TableRow, TableBody } from 'viewComponents/Table';
import { withStyles } from '@material-ui/core/styles';
import m from './messages';
import styles from './styles';

export const HelpOrgRoles = ({ open, onClose, classes, intl }) => (
  <HelpDialog
    open={open}
    onClose={onClose}
    dialogTitle={intl.formatMessage(m.orgRoleHelp)}
  >
    <H4 className={classes.h4}>
      <TEXT {...m.description} />
    </H4>
    <H4 className={classes.orgRoles}>
      <TEXT {...m.orgRoles} />
    </H4>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <GridContainer>
              <GridItem>
                <H4 dense weight="bold">
                  <TEXT {...m.ownerHeader} />
                </H4>
              </GridItem>
              <GridItem>
                <H4 className={classes.h4} dense>
                  <TEXT {...m.owner} />
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
                  <TEXT {...m.adminHeader} />
                </H4>
              </GridItem>
              <GridItem>
                <H4 className={classes.h4} dense>
                  <TEXT {...m.admin} />
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
                  <TEXT {...m.memberHeader} />
                </H4>
              </GridItem>
              <GridItem>
                <H4 className={classes.h4} dense>
                  <TEXT {...m.member} />
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
                  <TEXT {...m.guestHeader} />
                </H4>
              </GridItem>
              <GridItem>
                <H4 className={classes.h4} dense>
                  <TEXT {...m.guest} />
                </H4>
              </GridItem>
            </GridContainer>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </HelpDialog>
);

HelpOrgRoles.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }),
};

HelpOrgRoles.defaultProps = {
  open: false,
};

export default withStyles(styles)(injectIntl(HelpOrgRoles));

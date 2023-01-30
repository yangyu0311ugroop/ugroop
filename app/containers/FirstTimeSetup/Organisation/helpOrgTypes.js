import React from 'react';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import { FormattedMessage as TEXT, injectIntl } from 'react-intl';
import HelpDialog from 'ugcomponents/HelpDialog';
import { H4 } from 'viewComponents/Typography';
import Table, { TableCell, TableRow, TableBody } from 'viewComponents/Table';
import { withStyles } from '@material-ui/core/styles';
import m from './defines/messages';
import styles from './styles';

export const HelpOrgTypes = ({ open, onClose, classes, intl }) => (
  <HelpDialog
    open={open}
    onClose={onClose}
    dialogTitle={intl.formatMessage(m.orgTypesHelp)}
  >
    <H4 className={classes.h4}>
      <TEXT {...m.description} />
    </H4>
    <H4 className={classes.orgTypes}>
      <TEXT {...m.orgTypes} />
    </H4>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <GridContainer>
              <GridItem>
                <H4 dense weight="bold">
                  <TEXT {...m.businessHeader} />
                </H4>
              </GridItem>
              <GridItem>
                <H4 className={classes.h4} dense>
                  <TEXT {...m.business} />
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
                  <TEXT {...m.clubHeader} />
                </H4>
              </GridItem>
              <GridItem>
                <H4 className={classes.h4} dense>
                  <TEXT {...m.club} />
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
                  <TEXT {...m.educationInstitutionHeader} />
                </H4>
              </GridItem>
              <GridItem>
                <H4 className={classes.h4} dense>
                  <TEXT {...m.educationInstitution} />
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
                  <TEXT {...m.inboundHeader} />
                </H4>
              </GridItem>
              <GridItem>
                <H4 className={classes.h4} dense>
                  <TEXT {...m.inbound} />
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
                  <TEXT {...m.miceHeader} />
                </H4>
              </GridItem>
              <GridItem>
                <H4 className={classes.h4} dense>
                  <TEXT {...m.mice} />
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
                  <TEXT {...m.outboundHeader} />
                </H4>
              </GridItem>
              <GridItem>
                <H4 className={classes.h4} dense>
                  <TEXT {...m.outbound} />
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
                  <TEXT {...m.privateOrgHeader} />
                </H4>
              </GridItem>
              <GridItem>
                <H4 className={classes.h4} dense>
                  <TEXT {...m.privateOrg} />
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
                  <TEXT {...m.tourOperatorOrgHeader} />
                </H4>
              </GridItem>
              <GridItem>
                <H4 className={classes.h4} dense>
                  <TEXT {...m.tourOperator} />
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
                  <TEXT {...m.travelOrganiserHeader} />
                </H4>
              </GridItem>
              <GridItem>
                <H4 className={classes.h4} dense>
                  <TEXT {...m.travelOrganiser} />
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
                  <TEXT {...m.travelAgentHeader} />
                </H4>
              </GridItem>
              <GridItem>
                <H4 className={classes.h4} dense>
                  <TEXT {...m.travelAgent} />
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
                  <TEXT {...m.tourProviderHeader} />
                </H4>
              </GridItem>
              <GridItem>
                <H4 className={classes.h4} dense>
                  <TEXT {...m.tourProvider} />
                </H4>
              </GridItem>
            </GridContainer>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </HelpDialog>
);

HelpOrgTypes.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }),
};

HelpOrgTypes.defaultProps = {
  open: false,
};

export default withStyles(styles)(injectIntl(HelpOrgTypes));

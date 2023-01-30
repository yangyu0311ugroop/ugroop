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

export const HelpTab = ({ open, onClose, classes, intl }) => {
  const samples = [m.s1, m.s2, m.s3, m.s4, m.s5, m.s6, m.s7, m.s8, m.s9, m.s10];
  const kPoints = [m.k1, m.k3, m.k4, m.k2];
  const listItm = (item, stl) => (
    <li className={stl}>
      <JText black halfPaddingLeft nowrap={false}>
        <TEXT {...item} />
      </JText>
    </li>
  );

  return (
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
          {intl.formatMessage(m.tabHelp)}
        </H3>
      }
    >
      <GridContainer direction="column" spacing={2}>
        <GridItem>
          {/* <H4 className={classes.h4}>
            <TEXT {...m.line1} />
          </H4> */}
          <JText black bolder nowrap={false}>
            <TEXT {...m.line1} />
          </JText>
        </GridItem>
        <GridItem>
          <H4 className={classes.headerLine}>
            <JText
              black
              bolder
              nowrap={false}
              color="white"
              className={classes.headerLine}
            >
              <TEXT {...m.examples} />
            </JText>
          </H4>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <GridContainer direction="column">
                    <GridItem>
                      <ul>{samples.map(itm => listItm(itm, classes.list))}</ul>
                    </GridItem>
                  </GridContainer>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </GridItem>
        <GridItem>
          {/* <H4 className={classes.headerLine}>
            <TEXT {...m.line2} />
          </H4> */}
          <H4 className={classes.headerLine}>
            <JText
              black
              bolder
              nowrap={false}
              color="white"
              className={classes.headerLine}
            >
              <TEXT {...m.line2} />
            </JText>
          </H4>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <GridContainer>
                    <GridItem>
                      <ul>
                        {kPoints.map(itm => listItm(itm, classes.listNum))}
                      </ul>
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
};

HelpTab.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }),
};

HelpTab.defaultProps = {
  open: false,
};

export default withStyles(styles)(injectIntl(HelpTab));

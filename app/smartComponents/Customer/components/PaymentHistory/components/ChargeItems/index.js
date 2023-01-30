import { DEFAULT, LIST, TEXT, LINK, ICON } from 'appConstants';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridItem from 'components/GridItem/index';
import Table, {
  TableHeader,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
} from 'viewComponents/Table';

// parts
import ChargeAmount from 'smartComponents/Customer/parts/Charges/ChargeAmount';
import ChargeDate from 'smartComponents/Customer/parts/Charges/ChargeDate';
import ChargePaymentMethod from 'smartComponents/Customer/parts/Charges/ChargePaymentMethod';
import ReceiptURL from 'smartComponents/Customer/parts/Charges/ReceiptURL';
import ChargeStatus from 'smartComponents/Customer/parts/Charges/ChargeStatus';

import { FormattedMessage as M } from 'react-intl';
import { Hidden } from '@material-ui/core';
import GridContainer from 'components/GridContainer';
import { useImmer } from 'use-immer';
import styles from './styles';
import m from './messages';
import { makeStyles } from '../../../../../../components/material-ui';
const useStyles = makeStyles(styles);
function ChargeItems(props) {
  const classes = useStyles();
  const { ids } = props;
  const [state, setState] = useImmer({
    headerTableProps: null,
  });
  const renderPart = (Component, passProps = {}) => (
    <GridItem>
      <Component {...passProps} />
    </GridItem>
  );

  const renderCellComponents = (renderItem, passProps = {}) => (
    <TableCell {...passProps}>{renderItem}</TableCell>
  );

  const renderCellComponentsMobile = (renderItem, passProps = {}) => (
    <TableHeadCell {...passProps}>{renderItem}</TableHeadCell>
  );

  const renderRowDesktop = id => (
    <TableRow>
      {renderCellComponents(renderPart(ChargeStatus, { id, variant: ICON }))}
      {renderCellComponents(id)}
      {renderCellComponents(renderPart(ChargeDate, { id, variant: TEXT }))}
      {renderCellComponents(
        renderPart(ChargePaymentMethod, { id, variant: TEXT }),
      )}
      {renderCellComponents(renderPart(ChargeAmount, { id, variant: TEXT }))}
      {renderCellComponents(renderPart(ReceiptURL, { id, variant: LINK }))}
    </TableRow>
  );

  const renderRowMobile = id => (
    <TableRow>
      <TableHeadCell padding="halfLeftRight" verticalAlign>
        <GridContainer
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          spacing={0}
          dense
        >
          <GridItem>
            <GridContainer
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <GridItem xs={10}>
                <div className={classnames('j-text-ellipsis', classes.rowId)}>
                  <span title={id}>{id}</span>
                </div>
              </GridItem>
              <GridItem xs={2}>
                <ChargeStatus id={id} variant={ICON} />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <span className={classes.rowLabel}>Date:</span>
            <div className={classes.chargeDate}>
              <ChargeDate id={id} variant={TEXT} />
            </div>
          </GridItem>
          <GridItem>
            <span className={classes.rowLabel}>Payment Method:</span>
            <div className={classes.chargePaymentMethod}>
              <ChargePaymentMethod id={id} variant={TEXT} />
            </div>
          </GridItem>
        </GridContainer>
      </TableHeadCell>
      <TableHeadCell padding="halfLeftRight" verticalAlign centeredText>
        <div className={classes.chargeAmount}>
          <ChargeAmount id={id} variant={TEXT} isEllipsis />
        </div>
      </TableHeadCell>
      <TableHeadCell padding="halfLeftRight" verticalAlign centeredText>
        <ReceiptURL id={id} variant={LINK} />
      </TableHeadCell>
    </TableRow>
  );

  const getHeaderTableProps = () => {
    if (!state.headerTableProps) {
      setState(draft => {
        // eslint-disable-next-line no-param-reassign
        draft.headerTableProps = {
          classes: { root: classes.header },
        };
      });
    }
    return state.headerTableProps;
  };

  const renderHeaderDesktop = () => (
    <TableHeader {...getHeaderTableProps()}>
      <TableRow>
        {renderCellComponents('')}
        {renderCellComponents(<M {...m.colNameId} />)}
        {renderCellComponents(<M {...m.colNameDate} />)}
        {renderCellComponents(<M {...m.colNamePaymentMethod} />)}
        {renderCellComponents(<M {...m.colNameAmount} />)}
        {renderCellComponents(<M {...m.colNameReceipt} />)}
      </TableRow>
    </TableHeader>
  );

  const renderHeaderMobile = () => (
    <TableHeader {...getHeaderTableProps()}>
      <TableRow>
        {renderCellComponentsMobile(<M {...m.colNameId} />, {
          padding: 'halfLeftRight',
        })}
        {renderCellComponentsMobile(<M {...m.colNameAmount} />, {
          padding: 'halfLeftRight',
          centeredText: true,
        })}
        {renderCellComponentsMobile(<M {...m.colNameReceipt} />, {
          padding: 'halfLeftRight',
          centeredText: true,
        })}
      </TableRow>
    </TableHeader>
  );

  const renderBodyDesktop = () => {
    const rows = ids.map(id => renderRowDesktop(id));
    return <TableBody> {rows} </TableBody>;
  };

  const renderBodyMobile = () => {
    const rows = ids.map(id => renderRowMobile(id));
    return <TableBody> {rows} </TableBody>;
  };

  const renderTableDesktop = () => (
    <Table>
      {renderHeaderDesktop()}
      {renderBodyDesktop()}
    </Table>
  );

  const renderTableMobile = () => (
    <Table>
      {renderHeaderMobile()}
      {renderBodyMobile()}
    </Table>
  );

  const renderList = () => {
    if (!ids) {
      return null;
    }

    return (
      <>
        <Hidden xsDown>{renderTableDesktop()}</Hidden>
        <Hidden smUp>{renderTableMobile()}</Hidden>
      </>
    );
  };

  const { variant } = props;

  // pass in your custom variant if you need a different UI rendering
  return LOGIC_HELPERS.switchCase(variant, {
    [LIST]: renderList,
    [DEFAULT]: renderList,
  });
}

ChargeItems.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  ids: PropTypes.array,
  variant: PropTypes.node,
  className: PropTypes.string,
  bold: PropTypes.bool,
  actionButtonPros: PropTypes.object,
};

ChargeItems.defaultProps = {
  variant: '',
  className: '',
  bold: true,
};

export default React.memo(ChargeItems);

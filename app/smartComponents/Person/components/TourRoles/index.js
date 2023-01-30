import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import Table, {
  TableHeader,
  TableBody,
  TableHeadCell,
  TableRow,
} from 'viewComponents/Table';
import Roles from './components/Roles';

import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class TourRoleTable extends PureComponent {
  renderRows = () =>
    this.props.ids.map(userNode => (
      <Roles key={userNode} variant={VARIANTS.TABLE} id={userNode} />
    ));

  renderTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell minWidth={SIZE_CONSTANTS.MD}>
            <M {...m.contentRoleHeader} />
          </TableHeadCell>
          <TableHeadCell minWidth={SIZE_CONSTANTS.MD}>
            <M {...m.roleDateHeader} />
          </TableHeadCell>
          <TableHeadCell minWidth={SIZE_CONSTANTS.MD}>
            <M {...m.dateRoleHeader} />
          </TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>{this.renderRows()}</TableBody>
    </Table>
  );

  renderDefault = () => this.renderTable();

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TABLE]: this.renderTable,
      [DEFAULT]: this.renderDefault,
    });
  };
}

TourRoleTable.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  ids: PropTypes.array,

  // resaga props
};

TourRoleTable.defaultProps = {
  variant: '',
  ids: [],
};

export default compose(
  withStyles(styles, { name: 'TourRoleTable' }),
  resaga(CONFIG),
)(TourRoleTable);

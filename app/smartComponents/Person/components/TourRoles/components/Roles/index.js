import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TableRow, TableCell } from 'viewComponents/Table';

import Content from '../../parts/Content';
import Date from '../../parts/Date';
import Role from '../../parts/Role';

import { CONFIG } from './config';
import styles from './styles';

export class Roles extends PureComponent {
  renderDefault = () => this.renderRow();

  renderRow = () => {
    const { id } = this.props;
    return (
      <TableRow>
        <TableCell>
          <Content id={id} />
        </TableCell>
        <TableCell>
          <Role id={id} />
        </TableCell>
        <TableCell>
          <Date id={id} />
        </TableCell>
      </TableRow>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TABLE]: this.renderRow,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Roles.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  id: PropTypes.number,

  // resaga props
};

Roles.defaultProps = {
  variant: '',
  id: 0,
};

export default compose(
  withStyles(styles, { name: 'Roles' }),
  resaga(CONFIG),
)(Roles);

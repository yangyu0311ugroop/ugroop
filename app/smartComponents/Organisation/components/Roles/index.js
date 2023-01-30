import { ASC, DEFAULT, DESC, USER_FIELDS } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Form from 'ugcomponents/Form';
import Table, {
  TableHeader,
  TableBody,
  TableHeadCell,
  TableRow,
} from 'viewComponents/Table';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import classnames from 'classnames';
import { Hidden } from '@material-ui/core';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import RoleItems from './components/RoleItems';

import { CONFIG, CONFIG_MY_PROFILE } from './config';
import m from './messages';
import styles from './styles';
import { ORGANISATION_ROLES_VARIANT } from './constants';
import SorterTable from './components/SorterTable';

const invertDirection = {
  asc: DESC,
  desc: ASC,
  columnNameActive: 'knownAs',
};

export class Roles extends PureComponent {
  state = {
    columnToSort: USER_FIELDS.KNOWN_AS,
    sortDirection: DESC,
    columnNameActive: USER_FIELDS.KNOWN_AS,
  };

  // getCanView = (ids, id, myRole) => ids.filter(items => items[1] === myRole);

  getIds = filtered => filtered.map(items => items[0]);

  /*
  canAccessSomething = () =>
    ability.can('execute', { type: FOLDER }) ||
    ability.can('execute', { type: TEMPLATE });
*/

  renderRows = isMobile => ({ sortedIds }) => {
    const { id } = this.props;
    return sortedIds.map(items => (
      <RoleItems
        variant={ORGANISATION_ROLES_VARIANT.TABLE}
        isMobile={isMobile}
        key={items}
        id={items}
        orgId={id}
      />
    ));
  };

  handleSort = columnName => () => {
    const { columnToSort, sortDirection } = this.state;
    const colSort = LOGIC_HELPERS.ifElse(
      columnToSort === columnName,
      invertDirection[sortDirection],
      ASC,
    );
    this.setState({ columnNameActive: columnName });
    this.setState({
      columnToSort: columnName,
      sortDirection: colSort,
    });
  };

  renderTableMobile = () => {
    // eslint-disable-next-line no-unused-vars
    const { ids, id, myRole } = this.props;
    const { columnNameActive } = this.state;
    /* const filtered = this.canAccessSomething()
      ? ids
      : this.getCanView(ids, id, myRole); */
    if (!ids) return '';

    const getIds = this.getIds(ids);
    return (
      <GridContainer direction="column" alignItems="center">
        <GridItem xs={12}>
          <Form>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeadCell padding="halfLeftRight">
                    <TableSortLabel
                      active={columnNameActive === USER_FIELDS.KNOWN_AS}
                      direction={this.state.sortDirection}
                      onClick={this.handleSort(USER_FIELDS.KNOWN_AS)}
                    >
                      <M {...m.name} />
                    </TableSortLabel>
                  </TableHeadCell>
                  <TableHeadCell padding="halfLeftRight" centeredText>
                    <M {...m.role} />
                  </TableHeadCell>
                  <TableHeadCell padding="halfLeftRight" />
                </TableRow>
              </TableHeader>
              <TableBody>
                <SorterTable
                  ids={getIds}
                  columnSortBy={this.state.columnToSort}
                  columnOrderBy={this.state.sortDirection}
                >
                  {this.renderRows(true)}
                </SorterTable>
              </TableBody>
            </Table>
          </Form>
        </GridItem>
      </GridContainer>
    );
  };

  renderTableDesktop = () => {
    // eslint-disable-next-line no-unused-vars
    const { ids, id, myRole, classes } = this.props;
    const { columnNameActive } = this.state;
    /* const filtered = this.canAccessSomething()
      ? ids
      : this.getCanView(ids, id, myRole); */
    // const filtered = ids;
    if (!ids) return '';

    const getIds = this.getIds(ids);
    return (
      <Form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeadCell padding="halfLeftRight">
                <TableSortLabel
                  active={columnNameActive === USER_FIELDS.KNOWN_AS}
                  direction={this.state.sortDirection}
                  onClick={this.handleSort(USER_FIELDS.KNOWN_AS)}
                >
                  <M {...m.name} />
                </TableSortLabel>
              </TableHeadCell>
              <TableHeadCell padding="halfLeftRight">
                <TableSortLabel
                  active={columnNameActive === USER_FIELDS.EMAIL}
                  direction={this.state.sortDirection}
                  onClick={this.handleSort(USER_FIELDS.EMAIL)}
                >
                  <div
                    className={classnames(
                      'j-text-ellipsis',
                      classes.tblHeaderEllipsis,
                    )}
                  >
                    <abbr
                      title={m.emailAddress.defaultMessage}
                      className={classes.noUnderline}
                    >
                      <M {...m.emailAddress} />
                    </abbr>
                  </div>
                </TableSortLabel>
              </TableHeadCell>
              <TableHeadCell padding="halfLeftRight">
                <TableSortLabel
                  active={columnNameActive === USER_FIELDS.CREATED_DATE}
                  direction={this.state.sortDirection}
                  onClick={this.handleSort(USER_FIELDS.CREATED_DATE)}
                >
                  <div
                    className={classnames(
                      'j-text-ellipsis',
                      classes.tblHeaderEllipsis,
                    )}
                  >
                    <abbr
                      title={m.memberSince.defaultMessage}
                      className={classes.noUnderline}
                    >
                      <M {...m.memberSince} />
                    </abbr>
                  </div>
                </TableSortLabel>
              </TableHeadCell>
              <TableHeadCell padding="halfLeftRight">
                <TableSortLabel
                  active={columnNameActive === USER_FIELDS.LASTSEEN_DATE}
                  direction={this.state.sortDirection}
                  onClick={this.handleSort(USER_FIELDS.LASTSEEN_DATE)}
                >
                  <div
                    className={classnames(
                      'j-text-ellipsis',
                      classes.tblHeaderEllipsis,
                    )}
                  >
                    <abbr
                      title={m.lastSeen.defaultMessage}
                      className={classes.noUnderline}
                    >
                      <M {...m.lastSeen} />
                    </abbr>
                  </div>
                </TableSortLabel>
              </TableHeadCell>
              <TableHeadCell padding="halfLeftRight">
                <div
                  className={classnames(
                    'j-text-ellipsis',
                    classes.tblHeaderEllipsis,
                  )}
                >
                  <M {...m.active} />
                </div>
              </TableHeadCell>
              <TableHeadCell padding="halfLeftRight" centeredText>
                <M {...m.role} />
              </TableHeadCell>
              <TableHeadCell />
            </TableRow>
          </TableHeader>
          <TableBody>
            <SorterTable
              ids={getIds}
              columnSortBy={this.state.columnToSort}
              columnOrderBy={this.state.sortDirection}
            >
              {this.renderRows(false)}
            </SorterTable>
          </TableBody>
        </Table>
      </Form>
    );
  };

  renderTable = () => (
    <>
      <Hidden xsDown>{this.renderTableDesktop()}</Hidden>
      <Hidden smUp>{this.renderTableMobile()}</Hidden>
    </>
  );

  renderDefault = () => this.renderTable();

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [ORGANISATION_ROLES_VARIANT.TABLE]: this.renderTable,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Roles.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // parent props
  id: PropTypes.number,
  ids: PropTypes.array,
  variant: PropTypes.oneOf(['table', '']),

  // resaga props
  myRole: PropTypes.string,
  me: PropTypes.number,
};

Roles.defaultProps = {
  id: 0,
  ids: [],
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'Roles' }),
  resaga(CONFIG_MY_PROFILE),
  resaga(CONFIG),
)(Roles);

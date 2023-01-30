import { DEFAULT, MENU_ITEM } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Icon from 'ugcomponents/Icon';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import Organisation from 'smartComponents/Organisation';
import UIKitButton from 'viewComponents/Button';
import isFunction from 'lodash/isFunction';
import KnownAs from 'smartComponents/Person/parts/KnownAs';

import Table, {
  TableHeader,
  TableBody,
  TableHeadCell,
  TableRow,
} from 'viewComponents/Table';

import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { Hidden } from '@material-ui/core';
import classNames from 'classnames';
import Roles from './components/Roles';

import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class OrgRoleTable extends PureComponent {
  state = {
    selectedOrgId: this.props.orgId,
    showAll: false,
  };

  renderRows = isMobile => {
    const { ids, redirectToUrl } = this.props;
    return ids.map(id => (
      <Roles
        variant={VARIANTS.TABLE}
        isMobile={isMobile}
        key={id}
        id={id}
        redirectToUrl={redirectToUrl}
      />
    ));
  };

  renderTableMobile = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell padding="halfLeftRight">
            <M {...m.orgTableHeader} />
          </TableHeadCell>
          <TableHeadCell padding="halfLeftRight" centeredText>
            <M {...m.roleTableHeader} />
          </TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>{this.renderRows(true)}</TableBody>
    </Table>
  );

  renderTableDesktop = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell minWidth={[SIZE_CONSTANTS.XXXS]}>
            <M {...m.orgTableHeader} />
          </TableHeadCell>
          <TableHeadCell minWidth={SIZE_CONSTANTS.XXXS}>
            <M {...m.roleTableHeader} />
          </TableHeadCell>
          <TableHeadCell minWidth={SIZE_CONSTANTS.XXXS}>
            <M {...m.createdAtTableHeader} />
          </TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>{this.renderRows(false)}</TableBody>
    </Table>
  );

  renderTable = () => (
    <>
      <Hidden xsDown>{this.renderTableDesktop()}</Hidden>
      <Hidden smUp>{this.renderTableMobile()}</Hidden>
    </>
  );

  onClickOrgMenu = id => e => {
    const { onClickMenu } = this.props;
    e.stopPropagation();
    this.setState({ selectedOrgId: id });
    if (isFunction(onClickMenu)) {
      return onClickMenu(id)();
    }
    return null;
  };

  renderDefault = () => this.renderTable();

  renderPersonal = (mobile = false, closeMenu) => {
    const { userId, onClickMenu, classes, selectedOrgId } = this.props;
    const content = (
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem>
          <KnownAs
            id={userId}
            variant={VARIANTS.STRING_ONLY}
            className="j-text-ellipsis"
          />
        </GridItem>
        <GridItem className={classes.noWrapSpace}>(Personal)</GridItem>
      </GridContainer>
    );
    if (mobile) {
      return (
        <GridItem>
          <MenuItem closeMenu={closeMenu} onClick={this.onClickOrgMenu(-1)}>
            {content}
          </MenuItem>
        </GridItem>
      );
    }
    return (
      <GridItem
        clickable
        onClick={onClickMenu(-1)}
        className={classNames(
          classes.personal,
          classes.listItemStyle,
          selectedOrgId === -1 && classes.selected,
        )}
      >
        {content}
      </GridItem>
    );
  };

  renderList = () => {
    const {
      ids,
      onClickMenu,
      orgId,
      showPersonal,
      showAvatar,
      maxRender,
      classes,
    } = this.props;
    const tours =
      !this.state.showAll && ids.length > maxRender
        ? ids.slice(0, maxRender)
        : ids;
    return (
      <GridContainer direction="column">
        {showPersonal && this.renderPersonal()}
        {tours
          .filter(id => id > 0)
          .map(id => (
            <Roles
              onClick={onClickMenu}
              variant={VARIANTS.LIST}
              key={id}
              id={id}
              defaultOrgid={orgId}
              showAvatar={showAvatar}
            />
          ))}
        <GridItem
          onClick={this.toggleShowAll}
          className={classNames(classes.showMore)}
        >
          {this.renderShowMore(maxRender, ids)}
        </GridItem>
      </GridContainer>
    );
  };

  toggleShowAll = () => {
    const { showAll } = this.state;
    this.setState({ showAll: !showAll });
  };

  renderShowMore = (max, ids) => {
    const { classes } = this.props;
    const { showAll } = this.state;
    const hidden = ids.length - max;
    if (hidden < 1) return null;
    if (showAll) return <span className={classes.showMoreText}>See less</span>;
    return (
      <span>
        {hidden} hidden. <span className={classes.showMoreText}>See more</span>
      </span>
    );
  };

  renderOrgMenu = () => (
    <GridItem>
      <Popper
        noPadding
        menuHeader="Organisations"
        renderButton={this.renderOrgButton}
        selectedOrgId={this.state.selectedOrgId}
      >
        {this.renderOrgMenuItem}
      </Popper>
    </GridItem>
  );

  renderValue = id =>
    LOGIC_HELPERS.ifElse(
      id === -1,
      <KnownAs
        id={this.props.userId}
        variant={VARIANTS.STRING_ONLY}
        className="j-text-ellipsis"
      />,
      <Organisation id={id} ellipsisClassName="j-text-ellipsis" />,
    );

  renderOrgButton = ({ openMenu }) => {
    const { selectedOrgId } = this.state;
    const { classes } = this.props;
    return (
      <UIKitButton
        size="extraSmall"
        variant="outline"
        color="black"
        noMargin
        onClick={openMenu}
        className={classes.button}
      >
        <GridContainer wrap="nowrap">
          <GridItem>
            {selectedOrgId && this.renderValue(selectedOrgId)}
            {LOGIC_HELPERS.ifElse(!selectedOrgId, 'Select Organisation')}
          </GridItem>
          <GridItem>
            <Icon icon="lnr-chevron-down" size="xsmall" />
          </GridItem>
        </GridContainer>
      </UIKitButton>
    );
  };

  renderListMenu = () => {
    const { ids, closeMenu, onClickMenu, orgId } = this.props;
    return (
      <GridContainer direction="column">
        {ids
          .filter(id => id > 0)
          .map(id => (
            <MenuItem closeMenu={closeMenu} onClick={this.onClickOrgMenu(id)}>
              <Roles
                onClick={onClickMenu}
                variant={VARIANTS.LIST}
                key={id}
                id={id}
                defaultOrgid={orgId}
              />
            </MenuItem>
          ))}
      </GridContainer>
    );
  };

  renderOrgMenuItem = ({ closeMenu }) => {
    const { ids, classes, showPersonal } = this.props;
    return (
      <GridContainer
        direction="column"
        spacing={0}
        className={classes.menu}
        wrap="nowrap"
      >
        {showPersonal && this.renderPersonal(true, closeMenu)}
        {ids.map(id => (
          <GridItem key={id}>
            <MenuItem closeMenu={closeMenu} onClick={this.onClickOrgMenu(id)}>
              <Organisation
                id={id}
                ellipsisClassName={classes.orgRolesEllipsis}
              />
            </MenuItem>
          </GridItem>
        ))}
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TABLE]: this.renderTable,
      [VARIANTS.LIST]: this.renderList,
      [MENU_ITEM]: this.renderOrgMenu,
      [VARIANTS.LIST_ITEM]: this.renderListMenu,
      [DEFAULT]: this.renderDefault,
    });
  };
}

OrgRoleTable.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  ids: PropTypes.array,
  variant: PropTypes.string,
  onClickMenu: PropTypes.func,
  orgId: PropTypes.number,
  simple: PropTypes.bool,
  closeMenu: PropTypes.func,
  redirectToUrl: PropTypes.func,
  showAvatar: PropTypes.bool,
  maxRender: PropTypes.number,
  // resaga props
  userId: PropTypes.number,
  showPersonal: PropTypes.bool,
  selectedOrgId: PropTypes.number,
};

OrgRoleTable.defaultProps = {
  ids: [],
  variant: '',
  maxRender: 8,
};

export default compose(
  withStyles(styles, { name: 'OrgRoleTable' }),
  resaga(CONFIG),
)(OrgRoleTable);

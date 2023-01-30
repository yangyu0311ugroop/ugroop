import { DEFAULT, URL_HELPERS } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TableRow, TableCell } from 'viewComponents/Table';
import UGLink from 'components/Link';
import GridItem from 'components/GridItem';
import classNames from 'classnames';
import GridContainer from 'components/GridContainer';
import isFunction from 'lodash/isFunction';
import { CONFIG } from './config';
import styles from './styles';

import Name from '../../parts/Name';
import Role from '../../parts/Role';
import CreatedAt from '../../parts/CreatedAt';
import OrganisationPhoto from '../../../../../Organisation/parts/Photo';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from '../../../../../File/types/Photo/constants';

export class Roles extends PureComponent {
  renderListItem = () => {
    const {
      id,
      classes,
      onClick,
      selectedOrgId,
      defaultOrgid,
      showAvatar,
    } = this.props;
    if (onClick) {
      return (
        <GridItem
          className={classNames(
            classes.listItemStyle,
            id === (selectedOrgId || defaultOrgid) && classes.selected,
          )}
          clickable
          onClick={onClick(id)}
        >
          <GridContainer
            noWrap
            alignItems="center"
            className={classNames(
              classes.container,
              id !== (selectedOrgId || defaultOrgid) && classes.contHover,
            )}
          >
            {showAvatar && (
              <GridItem className={classes.photo}>
                <div className={classes.photoBackground}>
                  <OrganisationPhoto
                    id={Number.parseInt(id, 10)}
                    shape={IMAGE_VARIANTS_CONSTANTS.SQUARE}
                    variant={VARIANTS.READ_ONLY}
                    size={IMAGE_SIZES_CONSTANTS.XXS}
                    component={GridItem}
                  />
                </div>
              </GridItem>
            )}

            <GridItem>
              <Name id={id} />
            </GridItem>
          </GridContainer>
        </GridItem>
      );
    }

    return (
      <GridItem
        className={classNames(
          classes.listItemStyle,
          selectedOrgId === id && classes.selected,
        )}
      >
        <UGLink to={URL_HELPERS.orgSettings(id)} className={classes.orgSetting}>
          <Name id={id} />
        </UGLink>
      </GridItem>
    );
  };

  renderRowMobile = () => {
    const { id, classes, redirectToUrl } = this.props;
    const url = isFunction(redirectToUrl)
      ? redirectToUrl(id)
      : URL_HELPERS.orgIndex(id);

    return (
      <TableRow>
        <TableCell padding="halfLeftRight">
          <GridContainer direction="column" alignItems="flex-start" spacing={0}>
            <GridItem>
              <UGLink to={url}>
                <Name id={id} className={classes.orgRoleClass} />
              </UGLink>
            </GridItem>
            <GridItem>
              <CreatedAt id={id} isTableMobile />
            </GridItem>
          </GridContainer>
        </TableCell>
        <TableCell padding="halfLeftRight" centeredText>
          <Role id={id} />
        </TableCell>
      </TableRow>
    );
  };

  renderRow = () => {
    const { id, classes, isMobile, redirectToUrl } = this.props;
    const url = isFunction(redirectToUrl)
      ? redirectToUrl(id)
      : URL_HELPERS.orgIndex(id);
    if (isMobile) {
      return this.renderRowMobile();
    }

    return (
      <TableRow>
        <TableCell>
          <UGLink to={url}>
            <Name id={id} className={classes.orgRoleClass} />
          </UGLink>
        </TableCell>
        <TableCell>
          <Role id={id} />
        </TableCell>
        <TableCell>
          <CreatedAt id={id} />
        </TableCell>
      </TableRow>
    );
  };

  renderDefault = () => this.renderRow();

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TABLE]: this.renderRow,
      [VARIANTS.LIST]: this.renderListItem,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Roles.propTypes = {
  // hoc props

  // parent props
  id: PropTypes.number,
  variant: PropTypes.string,
  classes: PropTypes.object,
  onClick: PropTypes.func,
  selectedOrgId: PropTypes.number,
  defaultOrgid: PropTypes.number,
  isMobile: PropTypes.bool,
  redirectToUrl: PropTypes.func,
  showAvatar: PropTypes.bool,

  // resaga props
};

Roles.defaultProps = {
  id: 0,
  variant: '',
  isMobile: false,
};

export default compose(
  withStyles(styles, { name: 'Roles' }),
  resaga(CONFIG),
)(Roles);

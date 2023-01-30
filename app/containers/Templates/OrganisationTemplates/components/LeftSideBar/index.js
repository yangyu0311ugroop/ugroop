import { URL_HELPERS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import UGLink from 'components/Link';
import { compose } from 'redux';
import resaga from 'resaga';
import { ability } from 'apis/components/Ability/ability';
import { TEMPLATE, FOLDER } from 'utils/modelConstants';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import RootNodeId from 'smartComponents/Organisation/parts/Members/parts/RootNodeId';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import AvatarById from 'ugcomponents/Person/AvatarById';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { parseQueryParam } from 'utils/helpers/url';
import { VARIANTS } from 'variantsConstants';
import { CONFIG } from './config';
import styles from './styles';

const COMMON_WORKSPACE = 'Organisation Folders';

export class LeftSideBar extends PureComponent {
  parseCurrent = () => {
    const { search } = this.props.location;

    const params = parseQueryParam(search);
    return Number.parseInt(params.current, 10);
  };

  hasOrgAccess = () => ability.can('update', TEMPLATE);

  hasOrgFolderAccess = () => ability.can('read', FOLDER);

  renderMemberLinks = () => {
    const { classes, members, userId, organisationId } = this.props;

    const current = this.parseCurrent();

    return members.map(id => (
      <GridContainer alignItems="center" key={id}>
        <GridItem>
          <AvatarById xxs imageSize={IMAGE_SIZES_CONSTANTS.XXXS} userId={id} />
        </GridItem>
        <GridItem>
          <GridContainer alignItems="center">
            <GridItem>
              <RootNodeId
                activePaddingClassName={classes.activePadding}
                current={current}
                id={id}
                orgId={organisationId}
                url={`${URL_HELPERS.orgTours(organisationId)}?current=`}
              >
                <KnownAs
                  organisationId={organisationId}
                  id={id}
                  variant={VARIANTS.STRING_ONLY}
                />
              </RootNodeId>
            </GridItem>
            {LOGIC_HELPERS.ifElse(userId === id, <GridItem>(You)</GridItem>)}
          </GridContainer>
        </GridItem>
      </GridContainer>
    ));
  };

  renderCommonWorkingSpace = () => {
    const { classes, location, id, organisationId } = this.props;

    const { pathname } = location;

    const current = this.parseCurrent();
    const active = <div className={classes.active}>{COMMON_WORKSPACE}</div>;

    const orgTourURL = URL_HELPERS.orgTours(organisationId);

    if (
      (pathname === orgTourURL || pathname === URL_HELPERS.tours()) &&
      !current
    ) {
      return active;
    }
    if (current === id) {
      return active;
    }

    return <UGLink to={orgTourURL}>{COMMON_WORKSPACE}</UGLink>;
  };

  renderShareOrg = () => {
    const { classes, organisationId } = this.props;
    const hasAccess = this.hasOrgAccess() || this.hasOrgFolderAccess();
    return (
      <div
        className={LOGIC_HELPERS.ifElse(
          hasAccess,
          classes.sectionRow,
          classes.active,
        )}
      >
        <UGLink to={URL_HELPERS.orgSharedTours(organisationId)}>
          Shared Tours
        </UGLink>
      </div>
    );
  };

  render = () => {
    const { classes } = this.props;

    return (
      <GridContainer direction="column" className={classes.root} spacing={4}>
        <GridItem className={classes.section}>
          <GridContainer alignItems="center" className={classes.sectionHeader}>
            <GridItem className={classes.grow}>
              <b>Workspaces</b>
            </GridItem>
          </GridContainer>
          {(this.hasOrgAccess() || this.hasOrgFolderAccess()) && (
            <div className={classes.sectionRow}>
              {this.renderCommonWorkingSpace()}
            </div>
          )}
          {this.renderShareOrg()}
        </GridItem>
      </GridContainer>
    );
  };
}

LeftSideBar.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,

  // resaga props
  userId: PropTypes.number,
  organisationId: PropTypes.number,
  members: PropTypes.array,
  search: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

LeftSideBar.defaultProps = {
  organisationId: 0,
  members: [],
};

export default compose(
  withStyles(styles, { name: 'LeftSideBar' }),
  withRouter,
  resaga(CONFIG),
)(LeftSideBar);

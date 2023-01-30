import { USER_ID_CONFIG } from 'apis/components/User/config';
import { URL_HELPERS } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Tooltip from 'viewComponents/Tooltip';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import TourCount from 'smartComponents/Organisation/parts/TourCount';
import OrganisationPhoto from 'smartComponents/Organisation/parts/Photo';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import PersonPhoto from 'smartComponents/Person/parts/Photo';
import Icon from 'ugcomponents/Icon';
import NavLink from 'ugcomponents/NavLink';
import { GUEST } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import { CONFIG } from './config';
import styles from './styles';

export class OrganisationList extends PureComponent {
  componentWillMount = () => {
    this.photoProps = {
      shape: IMAGE_VARIANTS_CONSTANTS.SQUARE,
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.XXS,
    };
  };

  toggleShowAll = () => {
    const { showAllOrganisations } = this.props;

    this.props.resaga.setValue({
      showAllOrganisations: !showAllOrganisations,
    });
  };

  isOrganisationActive = organisationId => match => {
    // if it's already matched, it's active
    if (match) {
      return true;
    }

    // in a tour page, highlight the organisation that the tour belongs to
    const { organisationIdFromNode } = this.props;

    return organisationIdFromNode === organisationId;
  };

  organisations = showMore => {
    const {
      orgUsers,
      organisations,
      maxRender,
      showAllOrganisations,
    } = this.props;

    const orgs = organisations.reduce((accu, id) => {
      const role = get(orgUsers, `${id}.role`);

      // do not show organisation if role is guest
      if (role === GUEST) return accu;

      return [...accu, id];
    }, []);

    if (showAllOrganisations || showMore) return orgs;

    const hidden = orgs.length - maxRender;
    if (hidden < 1) return orgs;

    return orgs.slice(0, maxRender);
  };

  renderTourCount = obj =>
    obj.count ? (
      <Tooltip
        title={`There ${obj.count === 1 ? 'is' : 'are'} ${obj.count} ${
          obj.count === 1 ? 'tour' : 'tours'
        } in this organisation`}
      >
        <GridItem className={this.props.classes.countGridItem}>
          {obj.count}
        </GridItem>
      </Tooltip>
    ) : null;

  renderPersonal = ({ className, alwaysShow = true } = {}) => {
    const { classes, userId } = this.props;

    return (
      <GridItem key="personal" className={classnames(classes.item, className)}>
        <NavLink
          fullWidth
          className={classes.link}
          to={URL_HELPERS.myTours('personal')}
          photo={<PersonPhoto id={userId} {...this.photoProps} />}
          heading={
            <GridContainer alignItems="center" wrap="nowrap">
              <GridItem>
                <KnownAs
                  id={userId}
                  variant={VARIANTS.STRING_ONLY}
                  className="j-text-ellipsis"
                />
              </GridItem>
              <GridItem className={classes.personalContainer}>
                (Personal)
              </GridItem>
              <TourCount id={-1} variant={VARIANTS.RENDER_PROP}>
                {this.renderTourCount}
              </TourCount>
            </GridContainer>
          }
          alwaysShow={alwaysShow}
          ellipsis
          ellipsisClassName={classes.ellipsisDiv}
        />
      </GridItem>
    );
  };

  renderOrganisation = (
    organisationId,
    { className, alwaysShow = true } = {},
  ) => {
    const { classes, organisations, excludeOrg, redirectToUrl } = this.props;
    const url = isFunction(redirectToUrl)
      ? redirectToUrl(organisationId)
      : URL_HELPERS.myTours(organisationId);

    if (excludeOrg.includes(organisationId)) return null;

    if (organisations.indexOf(organisationId) === -1 || organisationId === -1) {
      return this.renderPersonal({ className, alwaysShow });
    }

    return (
      <Fragment>
        <GridItem
          key={organisationId}
          className={classnames(classes.item, className)}
        >
          <NavLink
            to={url}
            className={classes.link}
            isActive={this.isOrganisationActive(organisationId)}
            photo={
              <OrganisationPhoto
                id={Number.parseInt(organisationId, 10)}
                {...this.photoProps}
                component={GridItem}
              />
            }
            heading={
              <TourCount
                id={Number.parseInt(organisationId, 10)}
                variant={VARIANTS.WITH_NAME}
              />
            }
            alwaysShow={alwaysShow}
            ellipsis
            ellipsisClassName={classes.ellipsisDiv}
            fullWidth
          />
        </GridItem>
      </Fragment>
    );
  };

  renderOrganisations = () => {
    const organisations = this.organisations();

    if (!organisations.length) {
      return null;
    }
    return organisations.map(this.renderOrganisation);
  };

  renderNewOrganisation = () => {
    const { classes, canCreate } = this.props;
    if (!canCreate) return null;

    return (
      <GridItem key="orgNew" className={classnames(classes.item)}>
        <NavLink
          to={URL_HELPERS.orgNew()}
          className={classes.link}
          photo={
            <div className={classes.newIcon}>
              <Icon size="small" icon="lnr-plus" />
            </div>
          }
          heading="New organisation"
          ellipsis
          ellipsisClassName={classes.ellipsisDiv}
        />
      </GridItem>
    );
  };

  renderShowAllOrganisations = hidden => {
    const { classes, showAllOrganisations } = this.props;

    if (showAllOrganisations)
      return <span className={classes.showMoreText}>See less</span>;

    return (
      <span>
        {hidden} hidden. <span className={classes.showMoreText}>See more</span>
      </span>
    );
  };

  renderShowMore = () => {
    const { classes, maxRender } = this.props;
    const organisations = this.organisations(true);

    const hidden = organisations.length - maxRender;
    if (hidden < 1) return null;

    return (
      <GridItem
        onClick={this.toggleShowAll}
        className={classnames(classes.showMore)}
      >
        {this.renderShowAllOrganisations(hidden)}
      </GridItem>
    );
  };

  render = () => {
    const { classes, children, userId, overlay } = this.props;
    const organisations = this.organisations();

    if (typeof children === 'function') {
      return children({ userId, organisations });
    }

    return (
      <GridContainer
        className={classnames(classes.root, { [classes.overlay]: overlay })}
      >
        <GridItem className={classes.grow}>
          <GridContainer direction="column">
            {this.renderOrganisations()}
            {this.renderNewOrganisation()}
            {this.renderShowMore()}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

OrganisationList.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  children: PropTypes.func,
  onClick: PropTypes.func,
  overlay: PropTypes.bool,
  maxRender: PropTypes.number,
  canCreate: PropTypes.bool,
  excludeOrg: PropTypes.array,
  redirectToUrl: PropTypes.func,

  // resaga props
  showAllOrganisations: PropTypes.bool,
  organisations: PropTypes.array,
  orgUsers: PropTypes.object,
  userId: PropTypes.number,
  organisationIdFromNode: PropTypes.number,

  // customisable props
  className: PropTypes.string,
  activeClassName: PropTypes.string,
};

OrganisationList.defaultProps = {
  maxRender: 8,
  organisations: [],
  orgUsers: {},
  overlay: false,
  canCreate: true,
  excludeOrg: [],
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'OrganisationList' }),
  resaga(USER_ID_CONFIG),
  resaga(CONFIG),
)(OrganisationList);

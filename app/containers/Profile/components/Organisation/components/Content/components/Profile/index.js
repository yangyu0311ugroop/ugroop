import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
// import { Helmet } from 'react-helmet';
import { URL_HELPERS } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ORGANISATION_SETTING } from 'utils/modelConstants';
import { ability } from 'apis/components/Ability/ability';
import { VARIANTS } from 'variantsConstants';
import { IMAGE_VARIANTS_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
// parts
import ProfilePhoto from 'smartComponents/Organisation/parts/Photo';
import { Route, Switch, withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import classnames from 'classnames';

import Name from 'smartComponents/Organisation/parts/Name';
import Address from 'smartComponents/Organisation/parts/Location/parts/Address';
import Type from 'smartComponents/Organisation/parts/Type';
import Website from 'smartComponents/Organisation/parts/Website';
// import CreatedDate from 'smartComponents/Organisation/parts/CreatedDate';

import JButton from 'viewComponents/Button/variants/JButton';
import Icon from 'ugcomponents/Icon';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
// input
import NameField from './components/Name';
import WebsiteField from './components/Website';
import AddressField from './components/Address';
import { CONFIG } from './config';
import styles from './styles';

const breadcrumbNameMap = {
  photo: 'Photo',
  name: 'Organisation Name',
  address: 'Address',
  'org-type': 'Organisation Type',
  website: 'Website',
  labels: 'Labels',
};

export class Profile extends PureComponent {
  renderBreadcrumbs = () => {
    const { location } = this.props;

    const pathnames = location.pathname.split('/');
    if (pathnames.length < 6) return null;

    const lastItem = pathnames.pop();
    const goBack = pathnames.join('/');

    return (
      <GridItem>
        <GridContainer alignItems="center" spacing={1} wrap="nowrap">
          <GridItem>
            <JButton onClick={URL_HELPERS.goToUrl(goBack, this.props)}>
              <Icon icon="lnr-arrow-left" size="normal" />
            </JButton>
          </GridItem>
          <GridItem>
            <JText dark xl>
              {breadcrumbNameMap[lastItem]}
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  hasAccess = () => ability.can('execute', ORGANISATION_SETTING);

  renderListItem = ({
    subnav,
    heading,
    content,
    body,
    extras = LOGIC_HELPERS.ifElse(
      this.hasAccess(),
      <Icon size="normal" icon="lnr-chevron-right" />,
      <Icon size="normal" icon="lnr-lock" />,
    ),
    divider = true,
  } = {}) => {
    const { classes, match, smDown } = this.props;

    return (
      <ListItem
        button={!!subnav && this.hasAccess()}
        onClick={LOGIC_HELPERS.ifElse(
          subnav,
          URL_HELPERS.goToUrl(`${match.url}/${subnav}`, this.props),
        )}
        divider={divider}
        className={classes.padding}
      >
        <GridContainer direction="column" spacing={1}>
          <GridItem>
            <GridContainer alignItems="center" wrap="nowrap">
              <GridItem className={classes.grow}>
                <GridContainer
                  direction={LOGIC_HELPERS.ifElse(smDown, 'column', 'row')}
                  spacing={0}
                >
                  {heading && (
                    <GridItem className={classnames(!smDown, classes.left)}>
                      <JText bold gray sm uppercase>
                        {heading}
                      </JText>
                    </GridItem>
                  )}
                  {content && <GridItem xs>{content}</GridItem>}
                </GridContainer>
              </GridItem>
              {extras && <GridItem>{extras}</GridItem>}
            </GridContainer>
          </GridItem>
          {body && <GridItem>{body}</GridItem>}
        </GridContainer>
      </ListItem>
    );
  };

  renderNameContent = () => (
    <GridContainer direction="column" spacing={1}>
      <GridItem>
        <JText bold dark nowrap={false}>
          <Name id={this.props.id} variant={VARIANTS.STRING_ONLY} />
        </JText>
      </GridItem>
    </GridContainer>
  );

  renderTypeContent = () => (
    <GridContainer direction="column" spacing={1}>
      <GridItem>
        <JText bold dark nowrap={false}>
          <Type
            id={this.props.id}
            variant={ORG_FIELD_VARIANTS.TEXT_ONLY}
            simple
          />
        </JText>
      </GridItem>
    </GridContainer>
  );

  renderWebsiteContent = () => (
    <GridContainer direction="column" spacing={1}>
      <GridItem>
        <JText bold dark nowrap={false}>
          <Website id={this.props.id} variant={VARIANTS.STRING_ONLY} />
        </JText>
      </GridItem>
    </GridContainer>
  );

  renderAddressContent = () => (
    <GridContainer direction="column" spacing={1}>
      <GridItem>
        <JText bold dark nowrap={false}>
          <Address id={this.props.locationId} variant={VARIANTS.STRING_ONLY} />
        </JText>
      </GridItem>
      <GridItem>
        <JText bold dark nowrap={false}>
          <Address
            id={this.props.locationId}
            variant={ORG_FIELD_VARIANTS.TEXT_READ_ONLY}
          />
        </JText>
      </GridItem>
    </GridContainer>
  );

  renderPhotoExtras = () => {
    const { smDown, id } = this.props;

    if (smDown) return null;

    return (
      <ProfilePhoto
        id={id}
        editable={this.hasAccess()}
        resizeSize={240}
        resizeSide="width"
        shape={IMAGE_VARIANTS_CONSTANTS.ROUND}
      />
    );
  };

  renderPhotoBody = () => {
    const { smDown, id } = this.props;

    if (!smDown) return null;

    return (
      <GridContainer alignItems="center" direction="column" spacing={0}>
        <GridItem>
          <ProfilePhoto
            id={id}
            editable={this.hasAccess()}
            resizeSize={240}
            resizeSide="width"
            shape={IMAGE_VARIANTS_CONSTANTS.ROUND}
          />
        </GridItem>
      </GridContainer>
    );
  };

  renderProfile = () => (
    <GridItem>
      <GridContainer card highlight direction="column" spacing={2}>
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <JText dark lg>
                Profile
              </JText>
            </GridItem>
            <GridItem>
              <JText gray nowrap={false}>
                Some info may be visible to other people using uGroop.
              </JText>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <List component="nav">
            {this.renderListItem({
              heading: 'Photo',
              content: (
                <JText gray nowrap={false}>
                  Let people know about your organisation by uploading a logo
                  for public links, emails and other communications.
                </JText>
              ),
              extras: this.renderPhotoExtras(),
              body: this.renderPhotoBody(),
            })}
            {this.renderListItem({
              subnav: 'name',
              heading: 'Organisation Name',
              content: this.renderNameContent(),
            })}
            {this.renderListItem({
              subnav: 'address',
              heading: 'Address',
              content: this.renderAddressContent(),
            })}
            {this.renderListItem({
              // subnav: 'org-type',
              heading: 'Organisation Type',
              content: this.renderTypeContent(),
              extras: <Icon size="normal" icon="lnr-lock" />,
            })}
            {this.renderListItem({
              subnav: 'website',
              heading: 'Website',
              content: this.renderWebsiteContent(),
            })}
          </List>
        </GridItem>
      </GridContainer>
    </GridItem>
  );

  renderOrgInfo = () => {
    const { classes } = this.props;

    return (
      <div className={classes.offsetGrid}>
        <GridContainer direction="column" spacing={4}>
          <GridItem>
            <GridContainer direction="column" spacing={0} alignItems="center">
              <GridItem>
                <JText xl dark>
                  Organisation Profile
                </JText>
              </GridItem>
              <GridItem className={classes.textCenter}>
                <JText gray nowrap={false}>
                  Keep your organisation details up to date
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
          {this.renderProfile()}
        </GridContainer>
      </div>
    );
  };

  renderName = routeProps => (
    <NameField
      {...routeProps}
      id={this.props.id}
      readOnly={!this.hasAccess()}
    />
  );

  renderAddress = routeProps => (
    <AddressField
      {...routeProps}
      id={this.props.id}
      locationId={this.props.locationId}
      readOnly={!this.hasAccess()}
    />
  );

  renderType = routeProps => (
    <Address
      id={this.props.id}
      variant={ORG_FIELD_VARIANTS.TEXT_ONLY}
      readOnly={!this.hasAccess()}
      {...routeProps}
    />
  );

  renderWebsite = routeProps => (
    <WebsiteField
      {...routeProps}
      id={this.props.id}
      readOnly={!this.hasAccess()}
    />
  );

  render = () => {
    const { classes, match } = this.props;
    return (
      <div className={classes.root}>
        <GridContainer direction="column" spacing={1}>
          {this.renderBreadcrumbs()}
          <GridItem>
            <Switch>
              <Route path={`${match.url}/name`} render={this.renderName} />
              <Route
                path={`${match.url}/address`}
                render={this.renderAddress}
              />
              <Route path={`${match.url}/org-type`} render={this.renderType} />
              <Route
                path={`${match.url}/webSite`}
                render={this.renderWebsite}
              />
              <Route path="*" render={this.renderOrgInfo} />
            </Switch>
          </GridItem>
        </GridContainer>
      </div>
    );
  };
}

Profile.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  id: PropTypes.number.isRequired,

  // resaga props
  orgName: PropTypes.string,
  locationId: PropTypes.number,
};

Profile.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Profile' }),
  withSMDown,
  withRouter,
  resaga(CONFIG),
)(Profile);

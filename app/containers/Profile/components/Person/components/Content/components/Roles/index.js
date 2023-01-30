import { withStyles } from '@material-ui/core/styles';
import { GET_ROLES, USER_API } from 'apis/constants';
import { PAGE_HELMETS, URL_HELPERS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import OrgRoles from 'smartComponents/Person/components/OrgRoles';
import Button from 'viewComponents/Button';
import uniq from 'lodash/uniq';
import JText from 'components/JText';
import { H5 } from 'viewComponents/Typography';
import Icon from 'ugcomponents/Icon';
import { CONFIG } from './config';
import styles from './styles';

export class Roles extends PureComponent {
  componentDidMount = () => {
    this.props.resaga.dispatchTo(USER_API, GET_ROLES, {
      payload: {
        userId: this.props.id,
      },
    });
  };

  goToCreateOrganisationPage = () => {
    const { history } = this.props;

    return history.push(URL_HELPERS.orgNew());
  };

  renderEmpty = ids => {
    const { classes } = this.props;
    if (ids.length) return null;
    return (
      <GridItem>
        <GridContainer
          direction="column"
          alignItems="center"
          justify="center"
          card
          highlight
          spacing={2}
        >
          <GridItem>
            <Icon icon="lnr-group-work" size="xl" color="gray" />
          </GridItem>
          <GridItem className={classes.title}>
            <H5 noMargin>You dont have an organisation yet</H5>
          </GridItem>
          <GridItem>
            <Button
              dense
              color="primary"
              size="extraSmall"
              onClick={this.goToCreateOrganisationPage}
            >
              <GridContainer alignItems="center">
                <GridItem>Create organisation</GridItem>
              </GridContainer>
            </Button>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderContent = ids => {
    if (!ids.length) return null;
    return (
      <GridItem>
        <GridContainer card highlight direction="column" spacing={2}>
          <GridItem>
            <Button
              dense
              color="primary"
              size="extraSmall"
              onClick={this.goToCreateOrganisationPage}
            >
              <GridContainer alignItems="center">
                <GridItem>Create new organisation</GridItem>
              </GridContainer>
            </Button>
          </GridItem>
          <GridItem>
            <OrgRoles ids={ids} redirectToUrl={URL_HELPERS.orgSettings} />
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderOrganisation = () => {
    const { classes, orgUserIds } = this.props;
    const ids = uniq(orgUserIds.filter(id => id > 0));
    return (
      <div className={classes.offsetGrid}>
        <GridContainer direction="column" spacing={4}>
          <GridItem>
            <GridContainer direction="column" spacing={0} alignItems="center">
              <GridItem>
                <JText xl dark>
                  My Organisations
                </JText>
              </GridItem>
              <GridItem className={classes.textCenter}>
                <JText gray nowrap={false}>
                  List of organisations that you are connected with.
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
          {this.renderEmpty(ids)}
          {this.renderContent(ids)}
        </GridContainer>
      </div>
    );
  };

  render = () => {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet
          title={PAGE_HELMETS.PERSON_ROLES}
          meta={[{ name: 'description', content: 'Description of Roles' }]}
        />
        {this.renderOrganisation()}
      </div>
    );
  };
}

Roles.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired,

  // resaga props
  orgUserIds: PropTypes.array,
};

Roles.defaultProps = {
  orgUserIds: [],
};

export default compose(
  withStyles(styles, { name: 'Roles' }),
  withRouter,
  resaga(CONFIG),
)(Roles);

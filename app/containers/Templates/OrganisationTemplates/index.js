import {
  GET_ORG_MEMBERS,
  GET_ORGANISATION,
  ORGANISATION_API,
  SETUP_TOUR,
} from 'apis/constants';
import { DO_NOTHING, TITLE, URL_HELPERS } from 'appConstants';
import classnames from 'classnames';
import Container from 'components/Container';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import NodeExplorer from 'containers/Templates/Components/NodeExplorer';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import UGLink from 'components/Link';
import { compose } from 'redux';
import resaga from 'resaga';
import { Helmet } from 'react-helmet';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import { VARIANTS } from 'variantsConstants';
import Name from 'smartComponents/Organisation/parts/Name';
import Photo from 'smartComponents/Organisation/parts/Photo';
import LoadingText from 'ugcomponents/Progress/LoadingText';
import { H4 } from 'viewComponents/Typography';
import LeftSideBar from './components/LeftSideBar';
import {
  CONFIG_ORGANISATION_ID,
  CONFIG_ORGANISATION_ROOT_NODE_ID,
} from './config';
import styles from './styles';
import withCustomerSubscriptionCheck from '../../../ugcomponents/CustomerSubscriptions/hoc/withCustomerSubscriptionCheck';

export function OrganisationTemplates(props) {
  const [error, setStateError] = useState(false);
  const { showExplorer } = props;
  useEffect(() => {
    if (props.id) {
      fetchOrgMembers(props.id);
    }
  }, []);

  useEffect(() => {
    const { id } = props;
    if (id) {
      fetchOrganisation(id);
    }
  }, [props.id]);

  const fetchOrgMembers = id => {
    props.resaga.dispatchTo(ORGANISATION_API, GET_ORG_MEMBERS, {
      payload: { id },
    });
  };

  const fetchOrganisation = id => {
    props.resaga.dispatchTo(ORGANISATION_API, GET_ORGANISATION, {
      payload: { id },
      onSuccess: handleGetOrganisationSuccess,
      onError: handleGetOrganisationError,
    });
  };

  const handleGetOrganisationSuccess = result => {
    const { origin } = result;

    const { rootNodeId } = origin;

    if (!rootNodeId) {
      return initOrganisationRootNodeId();
    }

    return DO_NOTHING;
  };

  const handleGetOrganisationError = () => {
    setStateError(true);
  };

  const initOrganisationRootNodeId = () => {
    const { id } = props;

    props.resaga.dispatchTo(ORGANISATION_API, SETUP_TOUR, {
      payload: { id },
    });
  };
  const {
    classes,
    id,
    rootNodeId,
    location,
    history,
    loading,
    showHeader,
  } = props;

  if (error) {
    return (
      <Container>
        <H4 error>Access denied</H4>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container>
        <LoadingText />
      </Container>
    );
  }

  if (!rootNodeId) {
    return null;
  }

  const renderHeader = (
    <React.Fragment>
      <GridItem>
        <GridContainer alignItems="center" spacing={2}>
          <Photo
            id={id}
            shape={IMAGE_VARIANTS_CONSTANTS.SQUARE}
            variant={VARIANTS.READ_ONLY}
            size={IMAGE_SIZES_CONSTANTS.NORMAL}
            component={GridItem}
          />
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <Name id={id} variant={TITLE} />
              </GridItem>
              <GridItem>
                <UGLink to={URL_HELPERS.orgSettings(id)}>
                  View organisation profile
                </UGLink>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>
        <hr />
      </GridItem>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Helmet
        title="Organisation Tours"
        meta={[{ name: 'description', content: 'Description of Org Tours' }]}
      />
      <Container>
        <GridContainer direction="column" className={classes.root} spacing={0}>
          {showHeader && renderHeader}
          <GridItem xs={12}>
            <GridContainer className={classes.body}>
              <GridItem xs={12} sm={3} className={classes.leftSideBar}>
                <LeftSideBar organisationId={id} id={rootNodeId} />
              </GridItem>
              {showExplorer && (
                <GridItem xs={12} sm={9} className={classnames(classes.grow)}>
                  <NodeExplorer
                    padding={false}
                    showBreadcrumbs
                    organisationId={id}
                    rootNodeId={rootNodeId}
                    currentRoute={location.pathname}
                    location={location}
                    history={history}
                    maxSize
                    className={classes.tourExplorer}
                  />
                </GridItem>
              )}
            </GridContainer>
          </GridItem>
        </GridContainer>
      </Container>
    </React.Fragment>
  );
}

OrganisationTemplates.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  showHeader: PropTypes.bool,
  showExplorer: PropTypes.bool,
  // parent props

  // resaga props
  id: PropTypes.number,
  rootNodeId: PropTypes.number,
  loading: PropTypes.bool,
};

OrganisationTemplates.defaultProps = {
  rootNodeId: 0,
  showHeader: true,
  showExplorer: true,
};

export default compose(
  resaga(CONFIG_ORGANISATION_ID),
  resaga(CONFIG_ORGANISATION_ROOT_NODE_ID),
  withStyles(styles, { name: 'OrganisationTemplates' }),
  withCustomerSubscriptionCheck,
)(React.memo(OrganisationTemplates));

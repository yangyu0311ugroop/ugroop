import { DO_NOTHING, PAGE_HELMETS } from 'appConstants';
import { FOLDER_API, GET_CHECKLISTS } from 'apis/constants';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { H4, H5 } from 'viewComponents/Typography';
import { AbilityResolver } from 'apis/components/Ability';
import { compose } from 'redux';
import resaga from 'resaga';
import { Helmet } from 'react-helmet';
import Container from 'components/Container';
import CheckGroups from 'smartComponents/Node/components/Checkgroups';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { Can } from 'apis/components/Ability/components/Can';
import { CHECKLIST } from 'utils/modelConstants';
import AddCheckGroup from 'containers/ChecklistsRoute/components/MyChecklists/components/AddCheckGroup';
import Sticky from 'react-stickynode';
import { Hidden } from '@material-ui/core';
import LoadingText from 'ugcomponents/Progress/LoadingText';
import Overview from 'smartComponents/Node/components/Checklists/components/Overview';
import { CONFIG_ORGANISATION_ID, CONFIG_ROOTNODE_ID, CONFIG } from './config';
import styles from './styles';
import withCustomerSubscriptionCheck from '../../../../ugcomponents/CustomerSubscriptions/hoc/withCustomerSubscriptionCheck';

export class Checklists extends PureComponent {
  state = {
    error: false,
    isLoading: true,
  };

  componentDidMount = () => {
    const { rootNodeId } = this.props;

    this.props.resaga.dispatchTo(FOLDER_API, GET_CHECKLISTS, {
      payload: { id: rootNodeId },
      onError: this.onFetchChecklistError,
      onSuccess: this.onFetchSuccess,
    });
  };

  onFetchSuccess = () => this.setState({ isLoading: false });

  onFetchChecklistError = () => {
    this.setState({ error: true, isLoading: false });
  };

  renderHeader = () => {
    const { classes, rootNodeId, parentChecklists } = this.props;
    if (!parentChecklists.length) {
      return '';
    }
    return (
      <Hidden smUp>
        <GridItem className={classes.header} xs={12}>
          <GridContainer
            alignItems="center"
            spacing={0}
            justify="space-between"
          >
            <GridItem wrap="nowrap">
              <H5 className={classes.headerFonts}> Organisation Checklists </H5>
            </GridItem>
            <GridItem>
              <Can do="create" on={{ type: CHECKLIST }}>
                <AddCheckGroup parentNodeId={rootNodeId} />
              </Can>
            </GridItem>
          </GridContainer>
        </GridItem>
      </Hidden>
    );
  };

  renderOverViewHeader = () => {
    const { classes, rootNodeId, parentChecklists } = this.props;
    if (!parentChecklists.length) {
      return '';
    }
    return (
      <GridItem xs={12}>
        <GridContainer alignItems="center" spacing={0} justify="space-between">
          <GridItem>
            <H5 className={classes.headerFonts}> Organisation Checklists </H5>
          </GridItem>
          <GridItem>
            <Can do="create" on={{ type: CHECKLIST }}>
              <AddCheckGroup parentNodeId={rootNodeId} simple />
            </Can>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderError = () => {
    const { classes } = this.props;
    return (
      <GridItem className={classes.error}>
        <H4 error>Access denied</H4>
      </GridItem>
    );
  };

  sideBar = () => {
    const { rootNodeId, classes } = this.props;
    return (
      <GridItem xs={3} className={classes.sideBar}>
        <Sticky top={60} bottomBoundary="#LayoutContent">
          <Overview
            parentNodeId={rootNodeId}
            renderHeader={this.renderOverViewHeader}
          />
        </Sticky>
      </GridItem>
    );
  };

  iconToggle = () => DO_NOTHING;

  render = () => {
    const {
      classes,
      rootNodeId,
      id,
      parentChecklists,
      expandedParentChecklistId,
    } = this.props;

    const { error, isLoading } = this.state;
    if (isLoading) {
      return (
        <Container>
          <LoadingText />
        </Container>
      );
    }
    return (
      <Container>
        <Helmet
          title={PAGE_HELMETS.ORGANISATION_CHECKLISTS}
          meta={[
            {
              name: 'description',
              content: 'Description of Organisation Checklists',
            },
          ]}
        />

        <AbilityResolver orgId={id} />
        <GridContainer direction="column" className={classes.root}>
          {this.renderHeader()}
          {!error && !isLoading && (
            <React.Fragment>
              <Hidden xsDown>
                <GridItem>
                  <GridContainer wrap="nowrap">
                    {!!parentChecklists.length && this.sideBar()}
                    <GridItem xs={9}>
                      <CheckGroups
                        parentNodeId={rootNodeId}
                        iconToggle={this.iconToggle}
                        selectedId={expandedParentChecklistId}
                        showOption
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </Hidden>
              <Hidden smUp>
                <GridItem>
                  <CheckGroups
                    parentNodeId={rootNodeId}
                    showOption
                    selectedId={expandedParentChecklistId}
                  />
                </GridItem>
              </Hidden>
            </React.Fragment>
          )}
          {error && this.renderError()}
        </GridContainer>
      </Container>
    );
  };
}

Checklists.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
  id: PropTypes.number,
  rootNodeId: PropTypes.number,
  parentChecklists: PropTypes.array,
  expandedParentChecklistId: PropTypes.number,
};

Checklists.defaultProps = {
  parentChecklists: [],
  id: 0,
};

export default compose(
  withStyles(styles, { name: 'Checklists' }),
  resaga(CONFIG_ORGANISATION_ID),
  withCustomerSubscriptionCheck,
  resaga(CONFIG_ROOTNODE_ID),
  resaga(CONFIG),
)(Checklists);

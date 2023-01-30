import { FOLDER_API, GET_CHECKLISTS } from 'apis/constants';
import Container from 'components/Container';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import { Can } from 'apis/components/Ability/components/Can';
import { CHECKLIST } from 'utils/modelConstants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import resaga from 'resaga';
import { DO_NOTHING, PAGE_HELMETS } from 'appConstants';
import CheckGroups from 'smartComponents/Node/components/Checkgroups';
import Overview from 'smartComponents/Node/components/Checklists/components/Overview';
import Sticky from 'react-stickynode';
import { H5 } from 'viewComponents/Typography';
import { Hidden } from '@material-ui/core';
import LoadingText from 'ugcomponents/Progress/LoadingText';
import AddCheckGroup from './components/AddCheckGroup';
import { CONFIG, PARENT_NODE_CONFIG } from './config';
import styles from './styles';
import withCustomerSubscriptionCheck from '../../../../ugcomponents/CustomerSubscriptions/hoc/withCustomerSubscriptionCheck';

export class MyChecklists extends PureComponent {
  state = {
    isLoading: true,
  };

  componentDidMount = () => {
    const { parentNodeId } = this.props;

    this.props.resaga.dispatchTo(FOLDER_API, GET_CHECKLISTS, {
      payload: { id: parentNodeId },
      onSuccess: this.onFetchSuccess,
      onError: this.onFetchSuccess,
    });
  };

  onFetchSuccess = () => this.setState({ isLoading: false });

  onFetchChecklistError = () => {
    this.setState({ isLoading: false });
  };

  renderHeader = () => {
    const { classes, parentNodeId, parentChecklists } = this.props;
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
            <GridItem>
              <H5 className={classes.headerFonts}> My Checklists </H5>
            </GridItem>
            <GridItem>
              <Can do="create" on={{ type: CHECKLIST }}>
                <AddCheckGroup parentNodeId={parentNodeId} />
              </Can>
            </GridItem>
          </GridContainer>
        </GridItem>
      </Hidden>
    );
  };

  renderOverViewHeader = () => {
    const { classes, parentNodeId, parentChecklists } = this.props;
    if (!parentChecklists.length) {
      return '';
    }
    return (
      <GridItem>
        <GridContainer alignItems="center" spacing={0} justify="space-between">
          <GridItem>
            <H5 className={classes.headerFonts}> My Checklists </H5>
          </GridItem>
          <GridItem>
            <Can do="create" on={{ type: CHECKLIST }}>
              <AddCheckGroup parentNodeId={parentNodeId} simple />
            </Can>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  sideBar = () => {
    const { parentNodeId, classes } = this.props;
    return (
      <GridItem xs={3} className={classes.sideBar}>
        <Sticky top={60} bottomBoundary="#LayoutContent">
          <Overview
            parentNodeId={parentNodeId}
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
      parentNodeId,
      parentChecklists,
      expandedParentChecklistId,
    } = this.props;
    const { isLoading } = this.state;
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
          title={PAGE_HELMETS.MY_CHECKLISTS}
          meta={[
            { name: 'description', content: 'Description of My Checklists' },
          ]}
        />
        <GridContainer direction="column" className={classes.root}>
          {this.renderHeader()}
          <React.Fragment>
            <Hidden xsDown>
              <GridItem>
                <GridContainer wrap="nowrap">
                  {!!parentChecklists.length && this.sideBar()}
                  <GridItem xs={9}>
                    <CheckGroups
                      parentNodeId={parentNodeId}
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
                  parentNodeId={parentNodeId}
                  showOption
                  selectedId={expandedParentChecklistId}
                />
              </GridItem>
            </Hidden>
          </React.Fragment>
        </GridContainer>
      </Container>
    );
  };
}

MyChecklists.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
  parentChecklists: PropTypes.array,
  parentNodeId: PropTypes.number,
  expandedParentChecklistId: PropTypes.number,
};

MyChecklists.defaultProps = {
  parentChecklists: [],
  parentNodeId: 0,
};

export default compose(
  withStyles(styles, { name: 'MyChecklists' }),
  withCustomerSubscriptionCheck,
  resaga(PARENT_NODE_CONFIG),
  resaga(CONFIG),
)(MyChecklists);

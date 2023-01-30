import {
  GET_RECENT_ACTIVITY,
  GET_TEMPLATE_FEATURED_LIST,
  TEMPLATE_API,
  USER_API,
} from 'apis/constants';
import { DO_NOTHING, FEATURED, RECENT, STARRED } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import List from 'containers/Dashboard/components/List';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Sticky from 'react-stickynode';
import { compose } from 'redux';
import resaga from 'resaga';
import NewTour from 'smartComponents/Node/components/NewTour';
import withRecent from 'smartComponents/Node/hoc/withRecent';
import withStars from 'smartComponents/Node/hoc/withStars';
import Icon from 'ugcomponents/Icon';
import { CONFIG } from './config';
import styles from './styles';

export class HomeMenu extends PureComponent {
  componentDidMount = () => {
    const { fetchRecent } = this.props;

    if (!fetchRecent) {
      return this.fetchRecent();
    }

    return this.fetchFeatured();
  };

  fetchRecent = () => {
    this.props.resaga.dispatchTo(USER_API, GET_RECENT_ACTIVITY, {
      onSuccess: this.fetchFeatured,
    });
  };

  fetchFeatured = () => {
    const { fetchFeatured } = this.props;

    if (!fetchFeatured) {
      return this.props.resaga.dispatchTo(
        TEMPLATE_API,
        GET_TEMPLATE_FEATURED_LIST,
        {},
      );
    }

    return DO_NOTHING;
  };

  featuredTours = () => {
    const { featuredTours } = this.props;

    return Object.keys(featuredTours);
  };

  render = () => {
    const { classes, stars, recent } = this.props;

    const featured = this.featuredTours();

    return (
      <GridItem className={classes.right}>
        <Sticky top="#stickyAppBar" bottomBoundary="#LayoutContent">
          <GridContainer direction="column">
            <List items={stars} first name={STARRED} />

            <List
              items={recent}
              first={!stars.length}
              name={RECENT}
              maxRender={8}
            />

            <List
              first={!stars.length && !recent.length}
              items={featured}
              name={FEATURED}
            />

            <GridItem>
              <div className={classnames(classes.heading)}>
                <GridContainer alignItems="center">
                  <GridItem>
                    <Icon color="success" size="normal" bold icon="lnr-link" />
                  </GridItem>
                  <GridItem>Useful Links</GridItem>
                </GridContainer>
              </div>
            </GridItem>
            <GridItem>
              <NewTour />
            </GridItem>
          </GridContainer>
        </Sticky>
      </GridItem>
    );
  };
}

HomeMenu.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
  featuredTours: PropTypes.object,
  fetchFeatured: PropTypes.bool,
  fetchRecent: PropTypes.bool,
  stars: PropTypes.array,
  recent: PropTypes.array,
};

HomeMenu.defaultProps = {
  featuredTours: {},
  stars: [],
  recent: [],
};

export default compose(
  withStyles(styles, { name: 'HomeMenu' }),
  resaga(CONFIG),
  withStars,
  withRecent,
)(HomeMenu);

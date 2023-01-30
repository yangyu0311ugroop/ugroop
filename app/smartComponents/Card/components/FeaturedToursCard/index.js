import Collapse from '@material-ui/core/Collapse';
import { USER_API_HELPERS } from 'apis/components/User/helpers';
import { GET_TEMPLATE_FEATURED_LIST, TEMPLATE_API } from 'apis/constants';
import { USER_PREFERENCE } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui/index';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { LoadingText } from 'ugcomponents/Progress';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Header from '../../parts/Header';
import TourLink from './components/TourLink';
import { CONFIG, USER_ID_CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class FeaturedToursCard extends PureComponent {
  componentDidMount = () => {
    this.props.resaga.dispatchTo(TEMPLATE_API, GET_TEMPLATE_FEATURED_LIST, {});
  };

  text = this.props.intl.formatMessage;

  renderHeader = () => {
    const { open, updateUserPreference, userId } = this.props;

    return (
      <Header
        renderIcon="lnr-papers"
        iconColor="blue"
        renderTitle={this.text(m.featuredTours)}
        onClickToggle={USER_API_HELPERS.updateUserPreference(
          this.props.resaga,
          USER_PREFERENCE.DASH_BOARD_FEATURED_TOURS,
          (!open).toString(),
          userId,
        )}
        expanded={open}
        isLoading={updateUserPreference}
      />
    );
  };

  renderEmpty = () => {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.empty}>{this.text(m.noFeaturedTours)}</div>
      </div>
    );
  };

  renderLoading = () => {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.empty}>
          <LoadingText />
        </div>
      </div>
    );
  };

  renderContent = () => {
    const {
      ellipsisClassName,
      fetchingFeaturedTours,
      featuredTours,
    } = this.props;

    const tourIds = _.sortBy(Object.keys(featuredTours));

    if (!tourIds.length) {
      if (fetchingFeaturedTours) {
        return this.renderLoading();
      }
      return this.renderEmpty();
    }

    return (
      <GridContainer direction="column">
        {tourIds.map(id => (
          <GridItem key={id}>
            <TourLink id={id} ellipsisClassName={ellipsisClassName} />
          </GridItem>
        ))}
      </GridContainer>
    );
  };

  render = () => {
    const { classes, fixHeight, open, showContent } = this.props;

    if (showContent) {
      return <GridItem>{this.renderContent()}</GridItem>;
    }

    return (
      <GridContainer direction="column" className={classes.root}>
        <GridItem>{this.renderHeader()}</GridItem>
        <Collapse in={open} transitionduration="auto" unmountOnExit>
          <GridItem
            className={classnames(
              classes.body,
              LOGIC_HELPERS.ifElse(fixHeight, classes.fixHeight),
            )}
          >
            {this.renderContent()}
          </GridItem>
        </Collapse>
      </GridContainer>
    );
  };
}

FeaturedToursCard.propTypes = {
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  intl: PropTypes.shape({ formatMessage: PropTypes.func.isRequired })
    .isRequired,

  // parent props
  fixHeight: PropTypes.bool,
  showContent: PropTypes.bool,
  fetchingFeaturedTours: PropTypes.bool,
  ellipsisClassName: PropTypes.string,

  // resaga props
  featuredTours: PropTypes.object,
  open: PropTypes.bool,
  updateUserPreference: PropTypes.bool,
  userId: PropTypes.number,
};

FeaturedToursCard.defaultProps = {
  open: true,
  userId: 0,
  updateUserPreference: false,
  featuredTours: {},
  fetchingFeaturedTours: false,
};

export default compose(
  withStyles(styles, { name: 'FeaturedToursCard' }),
  resaga(USER_ID_CONFIG),
  resaga(CONFIG),
  injectIntl,
)(FeaturedToursCard);

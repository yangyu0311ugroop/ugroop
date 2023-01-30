import { TOUR_ROLE } from 'apis/components/Ability/roles';
import Dialog from 'components/Dialog';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import DialogContent from 'components/Dialog/UGDialogContent';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Rating from 'smartComponents/Node/types/Rating';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { RatingField } from 'viewComponents/Inputs';
import pluralize from 'pluralize';
import P, { H2 } from 'viewComponents/Typography';
import {
  RateAverage,
  RateCount,
  NodeRole,
  FilterRatings,
} from 'smartComponents/Node/logics';
import Hr from 'components/Hr';

import RateBar from './components/RateBar';
import AddRating from '../AddRating';
import EditRating from '../EditRating';
import RatingFilter from './components/RatingFilter';
import { CONFIG, FILTER_RATINGS_CONFIG } from './config';
import styles from './styles';

export class RatingsDialog extends PureComponent {
  summaryBox = { xs: 0, md: 2 };

  renderAverage = () => {
    const { id } = this.props;

    return (
      <GridItem>
        <H2 dense>
          <RateAverage id={id}>{avg => `${avg.toFixed(1)}`}</RateAverage>
        </H2>
      </GridItem>
    );
  };

  renderRateStar = () => {
    const { id } = this.props;

    return (
      <GridItem>
        <RateAverage id={id}>
          {avg => <RatingField readOnly precision={0.1} value={avg} />}
        </RateAverage>
      </GridItem>
    );
  };

  renderRateBar = (rateValue, ratings) => count => (
    <RateBar value={rateValue} percentage={(count / ratings.length) * 100} />
  );

  renderRateBars = () => {
    const { ratings, id } = this.props;
    const rateBars = [5, 4, 3, 2, 1].map(rateValue => (
      <GridItem key={rateValue}>
        <RateCount id={id} rate={rateValue}>
          {this.renderRateBar(rateValue, ratings)}
        </RateCount>
      </GridItem>
    ));

    return (
      <GridContainer direction="column" spacing={0}>
        {rateBars}
      </GridContainer>
    );
  };

  renderRateSummary = () => {
    const { ratings } = this.props;
    return (
      <Box p={this.summaryBox}>
        <GridContainer direction="column" spacing={0} alignItems="center">
          {this.renderAverage()}
          {this.renderRateStar()}
          <GridItem>
            <P dense subtitle>
              {ratings.length} {pluralize('review', ratings.length)}
            </P>
          </GridItem>
        </GridContainer>
      </Box>
    );
  };

  renderButton = roles => {
    const { userRatingId, id, templateId } = this.props;

    if (
      !roles.includes(TOUR_ROLE.TOUR_PARTICIPANT) &&
      !roles.includes(TOUR_ROLE.TOUR_ORGANIZER) &&
      !roles.includes(TOUR_ROLE.TOUR_OWNER)
    )
      return null;

    if (!userRatingId)
      return (
        <GridContainer justify="center" spacing={0}>
          <GridItem>
            <AddRating id={id} templateId={templateId} />
          </GridItem>
        </GridContainer>
      );

    return (
      <GridItem>
        <GridContainer justify="center" spacing={0}>
          <GridItem>
            <EditRating id={userRatingId} parentNodeId={id} />
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderUserRating = () => {
    const { userRatingId, templateId, userId } = this.props;

    const rating = !userRatingId ? null : (
      <GridItem>
        <P dense>
          <Rating id={userRatingId} />
        </P>
      </GridItem>
    );

    return (
      <GridContainer direction="column" justify="center">
        {rating}
        <NodeRole userId={userId} nodeId={templateId} key={userRatingId}>
          {this.renderButton}
        </NodeRole>
      </GridContainer>
    );
  };

  renderRateReview = () => {
    const { classes, ratings } = this.props;

    return (
      <GridContainer direction="column" wrap="nowrap">
        <GridItem>
          <GridContainer alignItems="center">
            <GridItem>
              <JText bold black>
                Reviews
              </JText>
            </GridItem>
            {ratings.length > 0 && (
              <GridItem>
                <JText sm gray>
                  ({ratings.length})
                </JText>
              </GridItem>
            )}
          </GridContainer>
        </GridItem>

        <GridItem>
          <GridContainer alignItems="center" wrap="nowrap">
            <GridItem className={classes.grow}>
              {this.renderRateBars()}
            </GridItem>
            <GridItem>{this.renderRateSummary()}</GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderDialogHeader = () => {
    const { onClose } = this.props;

    return (
      <>
        <Title heading="Reviews" />
        <CloseButton onClick={onClose} />
        {this.renderRateReview()}
      </>
    );
  };

  renderFilterSection = filteredRatings => {
    const { ratings, id } = this.props;

    if (filteredRatings.length < 2) return null;

    return (
      <>
        <GridItem>
          <Hr noMarginBottom noMarginTop />
        </GridItem>
        <GridItem>
          <RatingFilter id={id} allRatingCount={ratings.length} />
        </GridItem>
      </>
    );
  };

  renderDialogContent = () => {
    const { userRatingId, filter, ratings } = this.props;

    const ratingItemIds = ratings.filter(ratingId => ratingId !== userRatingId);

    const ratingItems = (
      <FilterRatings ratings={ratingItemIds} filter={filter}>
        {items =>
          items.map(itemId => (
            <GridItem key={itemId}>
              <Rating id={itemId} />
            </GridItem>
          ))
        }
      </FilterRatings>
    );

    const ratingsSection = LOGIC_HELPERS.ifElse(
      ratingItemIds.length === 0,
      null,
      <GridItem>
        <GridContainer direction="column" spacing={1}>
          {ratingItems}
        </GridContainer>
      </GridItem>,
    );

    return (
      <>
        <GridContainer direction="column" wrap="nowrap">
          <GridItem>{this.renderUserRating()}</GridItem>
          {this.renderFilterSection(ratingItemIds)}
          {ratingsSection}
        </GridContainer>
      </>
    );
  };

  renderRateAverage = avg => (
    <JText dark sm bold paddingRight>
      {parseFloat(avg).toFixed(1)}
    </JText>
  );

  render = () => {
    const {
      id,
      onClose,
      open,
      simplify,
      badge,
      ratings,
      component: Component,
    } = this.props;

    if (badge) {
      if (!ratings.length) return null;

      return (
        <Component>
          <GridContainer alignItems="center" spacing={0} wrap="nowrap">
            <GridItem>
              <Icon
                bold
                size="xsmall"
                icon="lnr-star"
                color="star"
                paddingRight
              />
            </GridItem>
            <GridItem>
              <RateAverage id={id}>{this.renderRateAverage}</RateAverage>
            </GridItem>
          </GridContainer>
        </Component>
      );
    }

    if (simplify) {
      return (
        <GridContainer card direction="column">
          <GridItem>{this.renderRateReview()}</GridItem>
          <GridItem>{this.renderDialogContent()}</GridItem>
        </GridContainer>
      );
    }

    return (
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle noPaddingBottom>{this.renderDialogHeader()}</DialogTitle>
        <DialogContent halfPaddingTop>
          {this.renderDialogContent()}
        </DialogContent>
      </Dialog>
    );
  };
}

RatingsDialog.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  open: PropTypes.bool,
  simplify: PropTypes.bool,
  badge: PropTypes.bool,
  onClose: PropTypes.func,
  userRatingId: PropTypes.number,
  templateId: PropTypes.number,
  component: PropTypes.node,

  // resaga props
  ratings: PropTypes.array,
  userId: PropTypes.number,
  filter: PropTypes.string,
};

RatingsDialog.defaultProps = {
  open: false,
  ratings: [],
  userRatingId: 0,
  userId: 0,
  filter: 'latest',
  component: 'span',
};

export default compose(
  withStyles(styles, { name: 'RatingsDialog' }),
  resaga(CONFIG),
  resaga(FILTER_RATINGS_CONFIG),
)(RatingsDialog);

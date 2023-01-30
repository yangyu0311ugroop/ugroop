import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import RatingsDialog from 'smartComponents/Node/components/Ratings/components/RatingsDialog';

import RateSummary from '../RateSummary';
import { CONFIG } from './config';
import styles from './styles';

export class ShowRatingList extends PureComponent {
  state = {
    dialogOpen: false,
  };

  handleCloseDialog = () => this.setState({ dialogOpen: false });

  handleOpenDialog = () => this.setState({ dialogOpen: true });

  render = () => {
    const {
      id,
      userRatingIds,
      templateId,
      simplify,
      badge,
      component,
    } = this.props;
    const { dialogOpen } = this.state;

    if (simplify || badge) {
      return (
        <RatingsDialog
          id={id}
          userRatingIds={userRatingIds}
          templateId={templateId}
          simplify={simplify}
          badge={badge}
          component={component}
        />
      );
    }

    return (
      <>
        <Button
          dense
          noPadding
          size="extraSmall"
          variant={VARIANTS.INLINE}
          onClick={this.handleOpenDialog}
          color="inline"
        >
          <RateSummary id={id} />
        </Button>
        <RatingsDialog
          id={id}
          onClose={this.handleCloseDialog}
          open={dialogOpen}
          userRatingIds={userRatingIds}
          templateId={templateId}
        />
      </>
    );
  };
}

ShowRatingList.propTypes = {
  // hoc props

  // parent props
  id: PropTypes.number,
  userRatingIds: PropTypes.array,
  templateId: PropTypes.number,
  simplify: PropTypes.bool,
  badge: PropTypes.bool,
  component: PropTypes.node,

  // resaga props
};

ShowRatingList.defaultProps = {
  userRatingIds: [],
  component: 'span',
};

export default compose(
  withStyles(styles, { name: 'ShowRatingList' }),
  resaga(CONFIG),
)(ShowRatingList);

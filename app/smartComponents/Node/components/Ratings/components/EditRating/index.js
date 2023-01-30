import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import Box from '@material-ui/core/Box';
import Icon from 'viewComponents/Icon';

import EditRatingDialog from '../EditRatingDialog';
import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class EditRating extends PureComponent {
  state = {
    open: false,
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  filterRating = userRatingId => ratingId => userRatingId !== ratingId;

  render = () => {
    const { id, ratings, classes } = this.props;
    const { open } = this.state;

    const hasRatings = ratings.filter(this.filterRating(id)).length > 0;

    const spacing = LOGIC_HELPERS.ifElse(hasRatings, <Box pb={1} />, null);

    return (
      <>
        <Button
          dense
          size="xs"
          onClick={this.handleOpen}
          variant={VARIANTS.OUTLINE}
          color="black"
        >
          <GridContainer
            direction="row"
            alignItems="center"
            noWrap
            wrap="nowrap"
            className={classes.noWrap}
          >
            <GridItem>
              <Icon icon="pencil5" size="extraSmall" />
            </GridItem>
            <GridItem>
              <M {...m.button} />
            </GridItem>
          </GridContainer>
        </Button>
        <EditRatingDialog id={id} open={open} onClose={this.handleClose} />
        {spacing}
      </>
    );
  };
}

EditRating.propTypes = {
  // hoc props
  classes: PropTypes.object,

  // parent props
  id: PropTypes.number,

  // resaga props
  ratings: PropTypes.array,
};

EditRating.defaultProps = {
  id: 0,
  ratings: [],
};

export default compose(
  withStyles(styles, { name: 'EditRating' }),
  resaga(CONFIG),
)(EditRating);

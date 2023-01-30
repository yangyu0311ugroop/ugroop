import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { FormattedMessage as M } from 'react-intl';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import Box from '@material-ui/core/Box';
import Icon from 'viewComponents/Icon';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';

import { CONFIG } from 'smartComponents/Node/components/Ratings/components/AddRating/config';
import styles from 'smartComponents/Node/components/Ratings/components/AddRating/styles';

import AddRatingDialog from '../AddRatingDialog';
import m from './messages';

export class AddRating extends PureComponent {
  state = {
    dialogOpen: false,
  };

  handleOpenDialog = () => {
    this.setState({ dialogOpen: true });
  };

  handleCloseDialog = () => {
    this.setState({ dialogOpen: false });
  };

  render = () => {
    const { id, templateId, ratings, classes } = this.props;
    const { dialogOpen } = this.state;

    const spacing = LOGIC_HELPERS.ifElse(
      ratings.length > 1,
      null,
      <Box pb={1} />,
    );

    return (
      <>
        <Button
          dense
          size="extraSmall"
          color="white"
          variant={VARIANTS.OUTLINE}
          onClick={this.handleOpenDialog}
        >
          <GridContainer
            direction="row"
            alignItems="center"
            wrap="nowrap"
            className={classes.noWrap}
          >
            <GridItem>
              <Icon icon="pencil5" size="extraSmall" />
            </GridItem>
            <GridItem>
              <M {...m.btn} />
            </GridItem>
          </GridContainer>
        </Button>
        <AddRatingDialog
          templateId={templateId}
          parentNodeId={id}
          open={dialogOpen}
          onClose={this.handleCloseDialog}
        />
        {spacing}
      </>
    );
  };
}

AddRating.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  templateId: PropTypes.number,

  // resaga props
  ratings: PropTypes.array,
};

AddRating.defaultProps = {
  ratings: [],
};

export default compose(
  withStyles(styles, { name: 'AddRating' }),
  resaga(CONFIG),
)(AddRating);

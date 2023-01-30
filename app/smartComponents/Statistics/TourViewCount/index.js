import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import Icon from 'viewComponents/Icon';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import styles from './styles';

import ViewsSinceCreationCount from '../ViewsSinceCreationCount';
import { LOGIC_HELPERS } from '../../../utils/helpers/logic';

export const TourViewCount = memo(props => {
  const { id, history, classes, label } = props;

  const handleClick = () => {
    history.push(`/tours/${id}/statistics`);
  };

  return (
    <Button
      tooltipProps={{
        title: 'Public Link View Count',
      }}
      buttonTitle="Public link view count"
      variant={VARIANTS.INLINE}
      size="extraSmall"
      color="black"
      onClick={handleClick}
    >
      <GridContainer
        direction="row"
        wrap="nowrap"
        className={classes.noWrap}
        alignItems="center"
        justify="center"
      >
        <GridItem>
          {LOGIC_HELPERS.ifElse(
            label,
            label,
            <Icon icon="eye" size="extraSmall" color="dark" />,
          )}
        </GridItem>
        <GridItem>
          <ViewsSinceCreationCount variant={VARIANTS.VALUE_ONLY} id={id} />
        </GridItem>
      </GridContainer>
    </Button>
  );
});

TourViewCount.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  id: PropTypes.number,
  label: PropTypes.any,
};

export const StyledTourViewCount = compose(
  withStyles(styles, { name: 'TourViewCount' }),
)(TourViewCount);

export default withRouter(StyledTourViewCount);

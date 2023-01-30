import { RECENTLY_UPLOADED } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import FilterIdsByTourDate from 'smartComponents/Node/logics/FilterIdsByTourDate';
import { InlineButton } from 'ugcomponents/Buttons';
import Icon from 'ugcomponents/Icon';
import { first } from 'lodash';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { pluralizeText } from 'utils/stringAdditions';
import { CONFIG } from './config';
import styles from './styles';

export const MAX_PHOTOS = 15;

export class Badge extends PureComponent {
  openPreview = previewId => e => {
    e.stopPropagation();
    const { id } = this.props;

    return PORTAL_HELPERS.openPhotoPreview(
      {
        id,
        previewId,
        sortBy: RECENTLY_UPLOADED,
      },
      this.props,
    );
  };

  dayBadge = ids => {
    const { dayId } = this.props;
    return (
      <FilterIdsByTourDate ids={ids} dayId={dayId}>
        {this.renderBadgeButton}
      </FilterIdsByTourDate>
    );
  };

  renderBadge = (ids = []) => {
    const { classes } = this.props;
    return (
      <GridContainer alignItems="center" spacing={0} wrap="nowrap">
        <GridItem>
          <Icon icon="lnr-picture" size={this.props.size} />
        </GridItem>
        <GridItem>
          <div className={classes.iconBadge}>
            <span className={classes.textBadge}>{ids.length}</span>
          </div>
        </GridItem>
      </GridContainer>
    );
  };

  renderBadgeButton = ({ filteredIds = [] }) => {
    const { classes } = this.props;
    if (!filteredIds || filteredIds.length === 0) return null;

    return (
      <InlineButton
        offsetLeft
        offsetRight
        onClick={this.openPreview(first(filteredIds))}
        className={classes.actionButton}
        title={`${filteredIds.length} ${pluralizeText(
          'photo',
          filteredIds.length,
        )} uploaded on this day`}
      >
        {this.renderBadge(filteredIds)}
      </InlineButton>
    );
  };

  render = () => {
    const { children, filtered, classes, isDateSet } = this.props;
    if (!isDateSet) return null;

    return (
      <GridContainer wrap="nowrap" className={classes.badge}>
        <GridItem>
          {filtered
            ? this.dayBadge(children)
            : this.renderBadgeButton({ filteredIds: children })}
        </GridItem>
      </GridContainer>
    );
  };
}

Badge.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number, // tab id
  dayId: PropTypes.number,
  filtered: PropTypes.bool,
  size: PropTypes.string,

  // resaga props
  children: PropTypes.array,
  isDateSet: PropTypes.bool,
};

Badge.defaultProps = {
  children: [],
  filtered: false,
  size: 'xxsmall',
  isDateSet: false,
};

export default compose(
  withStyles(styles, { name: 'Badge' }),
  resaga(CONFIG),
)(Badge);

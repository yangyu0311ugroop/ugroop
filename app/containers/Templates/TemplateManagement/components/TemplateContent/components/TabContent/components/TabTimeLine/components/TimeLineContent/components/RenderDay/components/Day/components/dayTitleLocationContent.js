/**
 * Created by danlazo on 13/06/18.
 */

import { withStyles } from '@material-ui/core/styles';
import { ability } from 'apis/components/Ability/ability';
import { LINK } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { NODE_VIEW_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import resaga from 'resaga';
import Location from 'smartComponents/Node/parts/Location';
import Url from 'smartComponents/Node/parts/URL';
import { DAY } from 'utils/modelConstants';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const style = () => ({
  grow: {
    flex: 1,
  },
  dayTitle: {
    color: '#fe7a5c',
    wordBreak: 'break-word',
  },
  location: {
    paddingLeft: 0,
  },
  dayHeader: {},
  maxWidth: {
    maxWidth: 600,
  },
  suggestion: {
    border: '1px solid gainsboro',
    padding: 8,
    marginTop: 8,
    borderRadius: 4,
  },
  suggestionHeader: {
    color: 'grey',
  },
});

export class DayTitleLocationContent extends PureComponent {
  canEdit = () => Boolean(this.props.editable && ability.can('update', DAY));

  render = () => {
    const { classes, title, content, dayId } = this.props;

    return (
      <div className={classes.dayHeader}>
        <GridContainer direction="column" wrap="nowrap">
          {(this.canEdit() || content) && (
            <div className={classes.dayTitle}>{title}</div>
          )}
          <Location
            id={dayId}
            editable={this.canEdit()}
            component={GridItem}
            componentProps={{ className: classes.maxWidth }}
          />
          <Url
            variant={LINK}
            id={dayId}
            editable={this.canEdit()}
            viewingClassName={classes.urlStyles}
            component={GridItem}
          />
        </GridContainer>
      </div>
    );
  };
}

DayTitleLocationContent.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  // resaga: PropTypes.object.isRequired,

  // parent
  dayId: PropTypes.number,
  title: PropTypes.any,
  content: PropTypes.any,

  // resaga
  editable: PropTypes.bool,
};

DayTitleLocationContent.defaultProps = {};

export default resaga({
  value: {
    editable: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_VIEW_STORE_SELECTORS.editable,
      'editable',
    ),
  },
  setValue: {},
})(
  withStyles(style, { name: 'DayTitleLocationContent' })(
    DayTitleLocationContent,
  ),
);

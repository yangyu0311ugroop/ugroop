import { withStyles } from '@material-ui/core/styles';
/*
 *
 * TimeLineContent
 *
 */
import { ability } from 'apis/components/Ability/ability';
import { NODE_API, UPDATE_CHILD, GET_CHILDREN } from 'apis/constants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import H3 from 'components/H3';
import H5 from 'components/H5';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as FM } from 'react-intl';
import resaga from 'resaga';
import Button from 'ugcomponents/Buttons/Button';
import Icon from 'ugcomponents/Icon';
import { LoadingText } from 'ugcomponents/Progress';
import { DAY } from 'utils/modelConstants';
import { DEFAULT_SELECTDAY_INDEX } from '../../config';
import DragDropContext from './components/DragDropContext';
import DayContentMode from './components/RenderDay';
import { CONFIG } from './defines/config';
import m from './defines/message';
import style from './style';

export class TimeLineContent extends PureComponent {
  state = {};

  onCreate = () => {
    const { id, templateId } = this.props;

    this.props.resaga.dispatchTo(NODE_API, UPDATE_CHILD, {
      payload: {
        id: templateId,
        fk: id,
        payload: {
          customData: { duration: 1 },
        },
      },
      onSuccess: this.onSuccessUpdate,
    });
  };

  onSuccessUpdate = ({ payload }) => {
    this.props.resaga.dispatchTo(NODE_API, GET_CHILDREN, {
      payload: {
        id: payload.id,
      },
    });
  };

  renderEmpty = () => {
    const { classes, editable, isUpdatingNode, isGettingChildren } = this.props;
    const isLoading = isUpdatingNode || isGettingChildren;

    return (
      <GridContainer card direction="column" cardClassName={classes.card}>
        <GridItem>
          <GridContainer
            justify="space-between"
            alignItems="stretch"
            spacing={0}
          >
            <div className={classes.blankSlate}>
              <Icon icon="lnr-calendar-empty" size="xl" />
              <H3>
                <FM {...m.NoDayTitlePlaceHolder} />
              </H3>
              {editable && (
                <H5>
                  <FM {...m.NoDayDescriptionPlaceHolder} />
                </H5>
              )}

              {editable && (
                <Button
                  size="small"
                  color="green"
                  onClick={this.onCreate}
                  disabled={!ability.can('create', DAY)}
                  loading={isLoading}
                >
                  Add Day
                </Button>
              )}
            </div>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderDay = (dayId, index) => {
    const { id, editDayId, selectDayId, isPublic } = this.props;

    let selected;
    if (selectDayId !== DEFAULT_SELECTDAY_INDEX) {
      selected = dayId === this.props.selectDayId;
    }
    return (
      <DayContentMode
        tabId={id}
        key={dayId}
        index={index}
        dayId={dayId}
        selected={selected}
        willBeEdited={editDayId === dayId}
        isPublic={isPublic}
      />
    );
  };

  render = () => {
    const { fetching, dayIds, classes } = this.props;

    if (!dayIds || !dayIds.length) {
      if (fetching) {
        return (
          <GridContainer card direction="column" cardClassName={classes.card}>
            <GridItem>
              <LoadingText />
            </GridItem>
          </GridContainer>
        );
      }

      return this.renderEmpty();
    }

    return (
      <DragDropContext>
        <GridContainer direction="column" spacing={0}>
          {dayIds.map(this.renderDay)}

          <GridItem>
            <GridContainer
              alignItems="center"
              direction="column"
              spacing={0}
              className={classes.marginTop}
            >
              <GridItem>
                <JText gray sm bold uppercase spacing2>
                  End Of Itinerary
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </DragDropContext>
    );
  };
}

TimeLineContent.propTypes = {
  fetching: PropTypes.bool,
  editable: PropTypes.bool,

  // from parent
  id: PropTypes.number,
  templateId: PropTypes.number,
  isPublic: PropTypes.bool,

  // resaga value
  dayIds: PropTypes.array,
  resaga: PropTypes.object,
  classes: PropTypes.object.isRequired,
  editDayId: PropTypes.number,
  selectDayId: PropTypes.number,
  showSectionPlaceholder: PropTypes.bool,

  // isLoading
  isUpdatingNode: PropTypes.bool,
  isGettingChildren: PropTypes.bool,
};

TimeLineContent.defaultProps = {
  dayIds: [],
  editDayId: DEFAULT_SELECTDAY_INDEX,
};

export default withStyles(style, { name: 'TimeLineContent' })(
  resaga(TimeLineContent, CONFIG),
);

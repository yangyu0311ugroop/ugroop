import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import ActionButtons from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/RenderDay/components/Day/components/ActionButtons';
import PropTypes from 'prop-types';
/**
 * Created by Yang on 28/9/2017.
 */
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import DayDate from 'smartComponents/Node/types/Day/components/DayDate';
import classnames from 'classnames';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import { CONFIG, TEMPLATE_CONFIG } from './defines/headerConfig';

const style = {
  root: {
    paddingTop: 8,
    margin: '24px 0 0',
    width: '100%',
  },
  rootXS: {
    paddingTop: 8,
    margin: '0',
    width: '100%',
  },
  grow: {
    flex: 1,
  },
  mobileRoot: {
    marginBottom: 8,
  },
  flex: {
    display: 'flex',
  },
  headerFonts: {
    color: '#495873',
    margin: 0,
    fontWeight: 500,
  },
  dot: {
    padding: 0,
    margin: '0 8px',
    color: '#86A6EB',
  },
  paddingTop: {
    paddingTop: 8,
  },
  offsetLeft: {
    // marginLeft: -40,
  },
  today: {
    color: '#FF5722',
  },
  todayWeekDay: {
    color: '#4571ce',
  },
  editing: {
    fontStyle: 'italic',
  },
  overrideHdr: {
    marginTop: -12,
    paddingTop: 0,
  },
};

export class DayHeader extends PureComponent {
  renderActionButtons = () => {
    const {
      index,
      dayId,
      tabId,
      toggleEdit,
      isPublic,
      templateId,
      canEdit,
    } = this.props;

    if (!canEdit) return null;

    return (
      <GridItem>
        <ActionButtons
          index={index}
          id={dayId}
          templateId={templateId}
          tabId={tabId}
          isPublic={isPublic}
          toggleEdit={toggleEdit}
          noWrap
        />
      </GridItem>
    );
  };

  render = () => {
    const { classes, dayId, editing, layout, smDown } = this.props;

    return (
      <GridContainer
        alignItems="baseline"
        className={classnames(
          smDown ? classes.rootXS : classes.root,
          layout === 'day' && smDown && classes.overrideHdr,
        )}
        spacing={0}
        noWrap
      >
        <GridItem xs>
          <DayDate
            id={dayId}
            eventSchedule
            showDayIndex
            showToday
            fullDate={!editing}
          />
        </GridItem>
        <GridItem>{this.renderActionButtons()}</GridItem>
      </GridContainer>
    );
  };
}

DayHeader.propTypes = {
  dayId: PropTypes.number.isRequired,
  index: PropTypes.number,
  classes: PropTypes.object.isRequired,
  tabId: PropTypes.number,
  toggleEdit: PropTypes.func,
  isPublic: PropTypes.bool,
  canEdit: PropTypes.bool,
  editing: PropTypes.bool,
  layout: PropTypes.string,
  smDown: PropTypes.bool,

  // resaga value
  templateId: PropTypes.number,
};

DayHeader.defaultProps = {
  canEdit: true,
};

export default compose(
  withStyles(style, { name: 'DayHeader' }),
  resaga(TEMPLATE_CONFIG),
  resaga(CONFIG),
  withSMDown,
)(DayHeader);

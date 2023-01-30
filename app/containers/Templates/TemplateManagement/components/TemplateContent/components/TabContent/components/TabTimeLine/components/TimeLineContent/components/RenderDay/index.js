import { withStyles } from '@material-ui/core';
import { TEMPLATE_ID_CONFIG } from 'apis/components/Node/config';
import TabCustom from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabCustom';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Node from 'smartComponents/Node';
import { VARIANTS } from 'variantsConstants';
import Day from './components/Day';
import { CONFIG } from './defines/dayConfig';

const styles = {
  marginTop: {
    marginTop: 16,
  },

  checklistDay: {
    position: 'absolute',
    left: -47,
    top: 47,
  },

  relative: {
    position: 'relative',
  },

  checklists: {
    marginBottom: 8,
    border: '1px solid rgba(164, 172, 186, 0.5)',
    borderRadius: 4,
    overflow: 'hidden',
  },
};

export class RenderDay extends PureComponent {
  componentWillReceiveProps = nextProps => {
    const { dayId } = this.props;

    if (dayId !== nextProps.dayId) {
      this.props.resaga.setValue({
        editing: false,
      });
    }
  };

  componentWillUnmount = () => {
    const { editing } = this.props;

    if (editing) {
      this.props.resaga.setValue({
        editing: false,
      });
    }
  };

  canEdit = () => {
    const { editing } = this.props;

    return editing;
  };

  renderChildren = () => {
    const { classes, dayId, activityIds, isPublic } = this.props;

    if (activityIds && activityIds.length > 0) {
      return (
        <div className={classes.marginTop}>
          <TabCustom
            id={dayId}
            offset
            elevation={1}
            editing={this.canEdit()}
            isPublic={isPublic}
          />
        </div>
      );
    }

    // no more sections placeholder
    return null;
  };

  renderDay = () => {
    const {
      id,
      dayId,
      index,
      activityIds,
      photoId,
      hasContent,
      content,
      url,
      description,
      tabId,
      showEventDetail,
      marginLeft,
      isPublic,
      editing,
    } = this.props;

    let hasSections = false;
    if (activityIds && activityIds.length > 0) {
      hasSections = true;
    }

    return (
      <Day
        templateId={id}
        tabId={tabId}
        selected={this.props.selected}
        index={index}
        dayPhotoId={photoId[0]}
        dayId={dayId}
        onDelete={this.handleDelete}
        hasContent={hasContent}
        content={content}
        url={url}
        description={description}
        hasSections={hasSections}
        willBeEdited={this.props.willBeEdited}
        showEventDetail={showEventDetail}
        marginLeft={marginLeft}
        isPublic={isPublic}
        editing={editing}
      >
        {this.renderChildren()}
      </Day>
    );
  };

  render = () => {
    const { dayId } = this.props;
    return (
      <>
        {this.renderDay()}
        <Node id={dayId} key={dayId} variant={VARIANTS.LOGIC} />
      </>
    );
  };
}

RenderDay.propTypes = {
  resaga: PropTypes.object.isRequired,

  // hoc
  dayId: PropTypes.number.isRequired,
  index: PropTypes.number,
  selected: PropTypes.bool,
  willBeEdited: PropTypes.bool,
  showEventDetail: PropTypes.bool,
  marginLeft: PropTypes.bool,
  tabId: PropTypes.number,
  classes: PropTypes.object,

  // Parent
  isPublic: PropTypes.bool,

  // resaga
  id: PropTypes.number, // template id
  activityIds: PropTypes.array,
  photoId: PropTypes.any,
  hasContent: PropTypes.bool,
  editing: PropTypes.bool,
  content: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

RenderDay.defaultProps = {
  activityIds: [],
  photoId: [],
  willBeEdited: false,
};

export default compose(
  withStyles(styles, { name: 'RenderDay' }),
  resaga(TEMPLATE_ID_CONFIG),
  resaga(CONFIG),
)(RenderDay);

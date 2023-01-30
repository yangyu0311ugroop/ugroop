import { DEFAULT } from 'appConstants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { omit } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import {
  ACTIVITY,
  CHECKGROUP,
  CHECKITEM,
  CHECKLIST,
  DAY,
  FOLDER,
  FORM,
  INTERESTED_PERSON,
  PARTICIPANT,
  SEAT,
  TAB_GALLERY,
  TAB_OTHER,
  TEMPLATE,
  RATING,
  ROOM,
  GROUP,
} from 'utils/modelConstants';
import { CONFIG } from './config';
import {
  Activity,
  Checkgroup,
  Checkitem,
  Checklist,
  Day,
  Folder,
  Form,
  InterestedPerson,
  Participant,
  Seat,
  TabGallery,
  TabOther,
  Template,
  Rating,
  Room,
  Group,
} from './types';

// experiment Node Factory, if this file ever gets too big, we could move render node functions out of this file
export class Node extends PureComponent {
  ownProps = () => omit(this.props, ['resaga', 'type']);

  renderCheckgroup = () => <Checkgroup {...this.ownProps()} />;

  renderChecklist = () => <Checklist {...this.ownProps()} />;

  renderCheckitem = () => <Checkitem {...this.ownProps()} />;

  renderTemplate = () => <Template {...this.ownProps()} />;

  renderDay = () => <Day {...this.ownProps()} />;

  renderInterestedPerson = () => <InterestedPerson {...this.ownProps()} />;

  renderParticipant = () => <Participant {...this.ownProps()} />;

  renderTabOther = () => <TabOther {...this.ownProps()} />;

  renderTabGallery = () => <TabGallery {...this.ownProps()} />;

  renderActivity = () => <Activity {...this.ownProps()} />;

  renderForm = () => <Form {...this.ownProps()} />;

  renderFolder = () => <Folder {...this.ownProps()} />;

  renderSeat = () => <Seat {...this.ownProps()} />;

  renderRating = () => <Rating {...this.ownProps()} />;

  renderRoom = () => <Room {...this.ownProps()} />;

  renderGroup = () => <Group {...this.ownProps()} />;

  renderNotSupported = () => null;

  render = () => {
    const { id, type, ignore } = this.props;
    if (!id) {
      return null;
    }

    if (ignore.indexOf(type) !== -1) {
      NODE_STORE_HELPERS.removeChildId(id, this.props);
      return null;
    }

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(type, {
      [CHECKGROUP]: this.renderCheckgroup,
      [CHECKLIST]: this.renderChecklist,
      [CHECKITEM]: this.renderCheckitem,
      [TEMPLATE]: this.renderTemplate,
      [DAY]: this.renderDay,
      [INTERESTED_PERSON]: this.renderInterestedPerson,
      [PARTICIPANT]: this.renderParticipant,
      [ACTIVITY]: this.renderActivity,
      [FORM]: this.renderForm,
      [TAB_OTHER]: this.renderTabOther,
      [TAB_GALLERY]: this.renderTabGallery,
      [DEFAULT]: this.renderNotSupported,
      [FOLDER]: this.renderFolder,
      [SEAT]: this.renderSeat,
      [RATING]: this.renderRating,
      [GROUP]: this.renderGroup,
      [ROOM]: this.renderRoom,
    });
  };
}

Node.propTypes = {
  // parent props
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  variant: PropTypes.string,
  ignore: PropTypes.array,

  // resaga props
  type: PropTypes.string,
  isActionBtn: PropTypes.bool,
};

Node.defaultProps = {
  id: 0,
  variant: '',
  ignore: [],

  type: '',
};

export default compose(resaga(CONFIG))(Node);

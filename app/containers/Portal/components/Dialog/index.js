import {
  ADD_ROUTE,
  ADD_TOUR,
  PHOTO_PREVIEW,
  PROMPT,
  UPLOAD_PHOTOS,
  MANAGE_TABS,
  ADD_RISK,
  ADD_HAZARD,
  ADD_ROOM,
  CREATE_CHAT_CHANNEL,
  EDIT_CHAT_DESCRIPTION,
  ADD_PEOPLE_IN_CHANNEL,
  DATES_SELECT,
  HIDE_CHAT_DESCRIPTION,
  LEAVE_CHAT_DESCRIPTION,
  DELETE_CHAT_DESCRIPTION,
  POPPER_DIALOG,
  CLONE_TEMPLATE,
  VIEW_EVENT,
  ADD_ROOM_PAX,
  CREATE_TOUR_EMAIL,
  ADD_EVENT,
  PRINT_PDF_FORM,
  COPY_PARTICIPANT,
  PARTICIPANT_LIST,
  ADD_TAB,
  COPY_TAB_OTHER,
  HELP_DIALOG,
  SHOW_SYSTEM_UPDATE,
  ADD_EDIT_INSURANCE,
} from 'appConstants';
import AddTab from 'containers/Portal/components/AddTab';
import PhotoPreview from 'containers/Portal/components/PhotoPreview';
import Prompt from 'containers/Portal/components/Prompt';
import UploadPhotos from 'containers/Portal/components/UploadPhotos';
import AddRoute from 'containers/Portal/components/AddRoute';
import AddRisk from 'containers/Portal/components/AddRisk';
import AddHazard from 'containers/Portal/components/AddHazard';
import AddRoom from 'containers/Portal/components/AddRoom';
import AddTour from 'containers/Portal/components/AddTour';
import AddRoomPax from 'containers/Portal/components/AddRoomPax';
import ManageTabs from 'containers/Portal/components/ManageTabs';
import CreateChatChannel from 'containers/Portal/components/CreateChannel/createChannel';
import EditChannelDescription from 'containers/Portal/components/EditChannelDescription/editChannelDescription';
import AddPeopleInChannel from 'containers/Portal/components/AddPeopleInChannel';
import ViewEvent from 'containers/Portal/components/ViewEvent';
import AddEvent from 'containers/Portal/components/AddEvent';
import DatesSelect from 'containers/Portal/components/DatesSelect';
import PopperDialog from 'containers/Portal/components/PopperDialog';
import HideChannelDialog from 'containers/Portal/components/HideChannelDialog/hideChannelDialog';
import LeaveChannelDialog from 'containers/Portal/components/LeaveChannel/leaveChannel';
import DeleteChannelDialog from 'containers/Portal/components/DeleteChannel/deleteChannel';
import CloneMarketTemplate from 'containers/Portal/components/CloneMarketTemplate';
import CreateTourEmail from 'containers/Portal/components/CreateTourEmail/createTourEmail';
import PrintPdfForm from 'containers/Portal/components/PrintPdfForm';
import CopyParticipant from 'containers/Portal/components/CopyParticipant';
import ParticipantLists from 'containers/Portal/components/ParticipantList/participantLists';
import CopyTabOther from 'containers/Portal/components/CopyTabOther';
import HelpTab from 'containers/Portal/components/HelpDialog';
import ShowSystemUpdate from 'containers/Portal/components/ShowSystemUpdate';
import AddEditInsurance from 'containers/Portal/components/AddEditInsurance';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

export class Dialog extends PureComponent {
  component = type => {
    switch (type) {
      case PHOTO_PREVIEW:
        return PhotoPreview;
      case PROMPT:
        return Prompt;
      case UPLOAD_PHOTOS:
        return UploadPhotos;
      case ADD_ROUTE:
        return AddRoute;
      case ADD_RISK:
        return AddRisk;
      case ADD_HAZARD:
        return AddHazard;
      case MANAGE_TABS:
        return ManageTabs;
      case CREATE_CHAT_CHANNEL:
        return CreateChatChannel;
      case EDIT_CHAT_DESCRIPTION:
        return EditChannelDescription;
      case ADD_PEOPLE_IN_CHANNEL:
        return AddPeopleInChannel;
      case VIEW_EVENT:
        return ViewEvent;
      case ADD_TAB:
        return AddTab;
      case ADD_EVENT:
        return AddEvent;
      case DATES_SELECT:
        return DatesSelect;
      case HIDE_CHAT_DESCRIPTION:
        return HideChannelDialog;
      case LEAVE_CHAT_DESCRIPTION:
        return LeaveChannelDialog;
      case DELETE_CHAT_DESCRIPTION:
        return DeleteChannelDialog;
      case POPPER_DIALOG:
        return PopperDialog;
      case CLONE_TEMPLATE:
        return CloneMarketTemplate;
      case ADD_ROOM:
        return AddRoom;
      case ADD_TOUR:
        return AddTour;
      case ADD_ROOM_PAX:
        return AddRoomPax;
      case CREATE_TOUR_EMAIL:
        return CreateTourEmail;
      case PRINT_PDF_FORM:
        return PrintPdfForm;
      case COPY_PARTICIPANT:
        return CopyParticipant;
      case PARTICIPANT_LIST:
        return ParticipantLists;
      case COPY_TAB_OTHER:
        return CopyTabOther;
      case HELP_DIALOG:
        return HelpTab;
      case ADD_EDIT_INSURANCE:
        return AddEditInsurance;
      case SHOW_SYSTEM_UPDATE:
        return ShowSystemUpdate;
      default:
        return null;
    }
  };

  render = () => {
    const { dialogData, ...props } = this.props;
    const { type, ...data } = dialogData;
    if (!type) return null;

    const Component = this.component(type);

    if (!Component) return null;

    return <Component {...data} {...props} />;
  };
}

Dialog.propTypes = {
  // hoc props

  // parent props

  // resaga props
  dialogData: PropTypes.object,
};

Dialog.defaultProps = {
  dialogData: {},
};

export default compose(resaga(CONFIG))(Dialog);

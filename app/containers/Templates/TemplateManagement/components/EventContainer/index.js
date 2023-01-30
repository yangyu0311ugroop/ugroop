/**
 * Created by stephenkarpinskyj on 24/3/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';

import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import {
  EventCreate,
  EventView,
  EventEdit,
  FlightBookingCreate,
  FlightBookingView,
  FlightBookingEdit,
} from './components';
import { CONFIG } from './config';

export class EventContainer extends React.PureComponent {
  handleCloseEventCreate = () => {
    const { createDayId } = this.props;
    this.props.resaga.setValue({
      eventCreate: EVENT_STORE_HELPERS.setEventCreate(false, createDayId),
    });
  };

  handleCloseEventView = () => {
    const { viewId } = this.props;
    this.props.resaga.setValue({
      eventView: EVENT_STORE_HELPERS.setEventView(false, viewId),
    });
  };

  handleCloseEventEdit = () => {
    const { editId } = this.props;
    this.props.resaga.setValue({
      eventEdit: EVENT_STORE_HELPERS.setEventEdit(false, editId),
    });
  };

  handleCloseFlightBookingCreate = dataId => {
    const { flightBookingCreateHandler } = this.props;
    this.props.resaga.setValue({
      flightBookingCreate: EVENT_STORE_HELPERS.setFlightBookingCreate(false),
    });
    flightBookingCreateHandler(dataId ? dataId.toString() : dataId);
  };

  handleCloseFlightBookingView = () => {
    const { flightBookingViewId } = this.props;
    this.props.resaga.setValue({
      flightBookingView: EVENT_STORE_HELPERS.setFlightBookingView(
        false,
        flightBookingViewId,
      ),
    });
  };

  handleCloseFlightBookingEdit = () => {
    const { flightBookingEditId } = this.props;
    this.props.resaga.setValue({
      flightBookingEdit: EVENT_STORE_HELPERS.setFlightBookingEdit(
        false,
        flightBookingEditId,
      ),
    });
  };

  renderDialog = (Component, props) => <Component {...props} />;

  renderFlightBooking = () => {
    const {
      flightBookingCreateOpen,
      flightBookingCreateTime,
      flightBookingViewOpen,
      flightBookingViewId,
      flightBookingViewTime,
      flightBookingEditOpen,
      flightBookingEditId,
      flightBookingEditTime,
    } = this.props;
    return (
      <React.Fragment>
        {this.renderDialog(FlightBookingCreate, {
          open: flightBookingCreateOpen,
          time: flightBookingCreateTime,
          onClose: this.handleCloseFlightBookingCreate,
        })}
        {this.renderDialog(FlightBookingView, {
          open: flightBookingViewOpen,
          dataId: flightBookingViewId,
          time: flightBookingViewTime,
          onClose: this.handleCloseFlightBookingView,
        })}
        {this.renderDialog(FlightBookingEdit, {
          open: flightBookingEditOpen,
          dataId: flightBookingEditId,
          time: flightBookingEditTime,
          onClose: this.handleCloseFlightBookingEdit,
        })}
      </React.Fragment>
    );
  };

  renderEvent = () => {
    const {
      createOpen,
      createDayId,
      createTime,
      createOpenHandler,
      viewOpen,
      viewId,
      viewTime,
      editOpen,
      editId,
      editTime,
      ...props
    } = this.props;
    return (
      <React.Fragment>
        {this.renderDialog(EventCreate, {
          open: createOpen,
          dayId: createDayId,
          time: createTime,
          onOpen: createOpenHandler,
          onClose: this.handleCloseEventCreate,
          ...props,
        })}
        {this.renderDialog(EventView, {
          open: viewOpen,
          id: viewId,
          time: viewTime,
          onClose: this.handleCloseEventView,
        })}
        {this.renderDialog(EventEdit, {
          open: editOpen,
          id: editId,
          time: editTime,
          onClose: this.handleCloseEventEdit,
        })}
      </React.Fragment>
    );
  };

  render = () => (
    <React.Fragment>
      {this.renderEvent()}
      {this.renderFlightBooking()}
    </React.Fragment>
  );
}

EventContainer.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // resaga value
  createOpen: PropTypes.bool,
  createDayId: PropTypes.number,
  createTime: PropTypes.number,
  createOpenHandler: PropTypes.func,
  viewOpen: PropTypes.bool,
  viewId: PropTypes.number,
  viewTime: PropTypes.number,
  editOpen: PropTypes.bool,
  editId: PropTypes.number,
  editTime: PropTypes.number,
  flightBookingCreateOpen: PropTypes.bool,
  flightBookingCreateHandler: PropTypes.func,
  flightBookingCreateTime: PropTypes.number,
  flightBookingViewOpen: PropTypes.bool,
  flightBookingViewId: PropTypes.number,
  flightBookingViewTime: PropTypes.number,
  flightBookingEditOpen: PropTypes.bool,
  flightBookingEditId: PropTypes.number,
  flightBookingEditTime: PropTypes.number,
};

EventContainer.defaultProps = {
  createOpen: false,
  createDayId: null,
  viewOpen: false,
  viewId: null,
  editOpen: false,
  editId: null,
  flightBookingCreateOpen: false,
  flightBookingCreateHandler: () => {},
  flightBookingViewOpen: false,
  flightBookingViewId: null,
  flightBookingEditOpen: false,
  flightBookingEditId: null,
};

export default compose(resaga(CONFIG))(EventContainer);

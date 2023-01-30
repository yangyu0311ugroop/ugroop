import {
  INVOICE_API,
  GET_UPCOMING_INVOICE,
  GET_INVOICE,
  GET_INVOICE_INVOICE_LINE_ITEMS,
  GET_UPCOMING_INVOICE_LINE_ITEMS,
} from 'apis/constants';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import injectReducer from 'utils/injectReducer';

import dotProps from 'dot-prop-immutable';
import { CONFIG } from './config';

export class Invoice extends Component {
  componentWillReceiveProps = nextProps =>
    this.props.resaga.analyse(nextProps, {
      [GET_UPCOMING_INVOICE]: {
        onSuccess: this.getUpcomingInvoiceSuccess,
      },
      [GET_INVOICE]: {
        onSuccess: this.getInvoiceSuccess,
      },
      [GET_INVOICE_INVOICE_LINE_ITEMS]: {
        onSuccess: this.getInvoiceLineSuccess,
      },
      [GET_UPCOMING_INVOICE_LINE_ITEMS]: {
        onSuccess: this.getUpcomingInvoiceLineSuccess,
      },
    });

  setNewItems = (customerId, itemIds) => (invoice = {}) => {
    const newInvoice = dotProps.set(
      invoice,
      `${customerId}.lines.data`,
      itemIds,
    );
    return newInvoice;
  };

  getInvoiceLineSuccess = (data, payload) => {
    const query = JSON.parse(payload.query);
    this.props.resaga.setValue({
      currentInvoiceLineItem: data.currentInvoiceLineItem,
      currentInvoice: this.setNewItems(
        `${query.customer}_currentInvoice`,
        data.lineItemIds,
      ),
    });
  };

  getUpcomingInvoiceLineSuccess = (data, payload) => {
    const query = JSON.parse(decodeURIComponent(payload.query));
    this.props.resaga.setValue({
      invoiceLineItem: data.invoiceLineItem,
      invoice: this.setNewItems(
        `${query.customer}_upcomingInvoice`,
        data.lineItemIds,
      ),
    });
    this.props.resaga.setValue({
      previewInvoiceLoading: false,
    });
  };

  getUpcomingInvoiceSuccess = (data, payload) => {
    const query = JSON.parse(decodeURIComponent(payload.query));
    const key = `${query.customer}_upcomingInvoice`;
    if (data.invoice[key].lines.has_more) {
      query.limit = 50;
      this.props.resaga.dispatchTo(
        INVOICE_API,
        GET_UPCOMING_INVOICE_LINE_ITEMS,
        {
          payload: {
            query: encodeURIComponent(JSON.stringify(query)),
          },
        },
      );
    } else {
      this.props.resaga.setValue({
        previewInvoiceLoading: false,
      });
    }
    this.props.resaga.setValue(data);
  };

  getInvoiceSuccess = (data, payload) => {
    const query = JSON.parse(decodeURIComponent(payload.query));
    const key = `${query.customer}_currentInvoice`;
    if (data.currentInvoice[key].lines.has_more) {
      query.limit = 50;
      this.props.resaga.dispatchTo(
        INVOICE_API,
        GET_INVOICE_INVOICE_LINE_ITEMS,
        {
          payload: {
            query: JSON.stringify(query),
          },
        },
      );
    }
    this.props.resaga.setValue(data);
  };

  shouldComponentUpdate = () => false;

  render = () => false;
}

Invoice.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

Invoice.defaultProps = {};

export default compose(
  injectReducer({ key: INVOICE_API, reducer: reducer(INVOICE_API) }),
  resaga(CONFIG),
)(Invoice);

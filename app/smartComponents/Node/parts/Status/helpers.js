import { CLOSED, COMPLETED, CANCELLED } from 'appConstants';

const isClosed = status => status === CLOSED;

const isCompleted = status => status === COMPLETED;

const isCancelled = status => status === CANCELLED;

export const NODE_STATUS_HELPERS = {
  isClosed,
  isCompleted,
  isCancelled,
};

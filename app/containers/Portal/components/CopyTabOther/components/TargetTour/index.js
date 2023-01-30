import { withStyles } from 'components/material-ui';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  NODE_API,
  MOVE_NODE_AFTER,
  TEMPLATE_API,
  GET_TEMPLATE_DETAIL,
  CREATE_CLONE,
} from 'apis/constants';
import { TAB_ACTION } from 'appConstants';
import JText from 'components/JText';
import { ability } from 'apis/components/Ability/ability';
import {
  CHECKITEM,
  CHECKLIST,
  EVENT_ACCOMMODATIONS,
  EVENT_ACTIVTIES,
  EVENT_TRANSPORTATIONS,
  TAB_OTHER,
} from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import first from 'lodash/first';
import last from 'lodash/last';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import tabs from 'datastore/templateManagementStore/helpers/tabs';
import get from 'lodash/get';
import { CONFIG } from './config';
import styles from './styles';
import { PORTAL_HELPERS } from '../../../../helpers';

export class TargetTour extends PureComponent {
  state = {
    fetching: false,
    tourAdded: false,
    error: null,
    confirmDialogId: null,
  };

  handleError = () => {
    this.setState({
      fetching: false,
      error: 'You do not have enough access role to add tab',
    });
  };

  onCloneSuccess = targetTabIds => data => {
    const { cloneId } = data;
    if (!cloneId) return this.onCloneError(data);

    return this.moveTab({
      targetTabIds,
      tabToMove: cloneId,
      children: [],
      onSuccess: this.handleCopyMoveSuccess(targetTabIds),
      onError: this.onCloneError,
    })();
  };

  onCloneError = () => {
    this.setState({
      tourAdded: false,
      fetching: null,
      error: 'Clone tab failed',
    });
  };

  moveTab = ({
    targetTabIds,
    tabToMove,
    children,
    onSuccess,
    onError,
  }) => () => {
    const { onSelect, targetTourId } = this.props;
    const targetId = last(targetTabIds);
    if (!targetId) return this.handleError();
    onSelect(targetTourId);
    this.setState({ fetching: true });

    return this.props.resaga.dispatchTo(NODE_API, MOVE_NODE_AFTER, {
      payload: {
        id: targetId,
        toBeMovedId: tabToMove,
        tabId: tabToMove,
        children,
      },
      onSuccess,
      onError,
    });
  };

  copyTab = targetTabIds => () => {
    const { tabId, onSelect, targetTourId } = this.props;
    onSelect(targetTourId);
    this.setState({ fetching: true });

    const targetId = last(targetTabIds);
    if (!targetId) return this.onCloneError();

    return this.props.resaga.dispatchTo(NODE_API, CREATE_CLONE, {
      payload: {
        id: tabId,
        data: {
          ignoreTypes: [
            CHECKITEM,
            CHECKLIST,
            ...EVENT_ACCOMMODATIONS,
            ...EVENT_ACTIVTIES,
            ...EVENT_TRANSPORTATIONS,
          ],
          includeEvents: false,
        },
      },
      onSuccess: this.onCloneSuccess(targetTabIds),
      onError: this.onCloneError,
    });
  };

  getTourDetail = templateId => () => {
    this.setState({ fetching: true });
    this.props.resaga.dispatchTo(TEMPLATE_API, GET_TEMPLATE_DETAIL, {
      payload: { id: templateId },
      onSuccess: this.confirmAction,
      onError: this.handleError,
    });
  };

  cancelSelected = () => this.props.onSelect(null);

  onConfirm = targetTabIds => {
    const { action, tabId: tabToMove, sectionIds: children } = this.props;
    if (action === TAB_ACTION.MOVE)
      return this.moveTab({
        targetTabIds,
        tabToMove,
        children,
        onSuccess: this.handleMoveSuccess(targetTabIds),
        onError: this.handleError,
      });
    return this.copyTab(targetTabIds);
  };

  confirmAction = target => {
    const { templates, id } = target;
    const targetTabIds = get(templates, `${id}.children`);

    const { fetching } = this.state;
    this.setState({ fetching: false });

    const confirmDialogId = PORTAL_HELPERS.confirmDelete(
      {
        title: `${this.label()} Tab`,
        message: `Are you sure you want to  ${this.label()} this tab?`,
        onConfirm: this.onConfirm(targetTabIds),
        confirmButton: 'Continue',
        loading: fetching,
      },
      this.props,
    );

    this.setState({ confirmDialogId });
  };

  handleMoveSuccess = targetTabIds => () => {
    const {
      targetTourId,
      sourceTabIds,
      tabId,
      templateId,
      visibleTabIds,
      onSuccess,
    } = this.props;
    const { confirmDialogId } = this.state;
    const newSourceTabIds = sourceTabIds.filter(id => id !== tabId);
    const newTargetTabIds = [...targetTabIds, tabId];
    this.setState({ tourAdded: true, fetching: null });

    this.updateStore(templateId, newSourceTabIds);
    this.updateStore(targetTourId, newTargetTabIds);
    this.openLastTab(first(visibleTabIds));

    PORTAL_HELPERS.closePortal(confirmDialogId, this.props);

    onSuccess();
  };

  handleCopyMoveSuccess = targetTabIds => () => {
    const { targetTourId, tabId, onSuccess } = this.props;
    const { confirmDialogId } = this.state;
    const newTargetTabIds = [...targetTabIds, tabId];
    this.setState({ tourAdded: true, fetching: null });
    this.updateStore(targetTourId, newTargetTabIds);
    PORTAL_HELPERS.closePortal(confirmDialogId, this.props);
    onSuccess();
  };

  // cancelAdd = () => this.setState({ isAdding: false });

  renderAddError = () => {
    const { error } = this.state;
    if (!error) return null;
    return (
      <GridItem>
        <GridContainer direction="column">
          <GridItem>
            <JText md italic danger nowrap={false}>
              {error}
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  label = () =>
    LOGIC_HELPERS.ifElse(this.props.action === TAB_ACTION.COPY, 'Copy', 'Move');

  renderAddButton = () => {
    const { fetching, tourAdded, error } = this.state;
    const { classes, targetTourId, action, selected } = this.props;

    const btnDisabled =
      fetching ||
      tourAdded ||
      !!error ||
      (selected && selected !== targetTourId);

    if (tourAdded)
      return (
        <JText bold darkgreen sm uppercase>
          {' '}
          Tab successfully{' '}
          {LOGIC_HELPERS.ifElse(action === TAB_ACTION.COPY, 'copied', 'moved')}!
        </JText>
      );
    const Btn = LOGIC_HELPERS.ifElse(
      ability.can('execute', TAB_OTHER),
      <Button
        size="extraSmall"
        color={LOGIC_HELPERS.ifElse(btnDisabled, 'gray', 'primary')}
        dense
        onClick={this.getTourDetail(targetTourId)}
        disabled={btnDisabled}
        loading={fetching}
        className={classes.noWrapText}
      >
        {LOGIC_HELPERS.ifElse(tourAdded, 'Added', `${this.label()} Tab`)}
      </Button>,
      null,
    );
    return Btn;
  };

  openLastTab = id => {
    const { history, location } = this.props;
    const { pathname } = location;

    return history.push(`${pathname}?tabId=${id}`);
  };

  updateStore = (id, children) =>
    this.props.resaga.setValue({
      tabs: tabs.updateChildren(id, children),
    });

  render = () => {
    const { classes, selected, targetTourId, action } = this.props;
    return (
      <GridItem
        className={classnames(
          classes.tour,
          classes.tourGridCompressed,
          classes.relativeCompressed,
        )}
      >
        <GridContainer direction="column">
          <GridItem>
            <GridContainer noWrap>
              <GridItem className={classnames(classes.tour)}>
                <JText bold ellipsis>
                  {this.props.content}
                </JText>
              </GridItem>
              <GridItem>
                {(!selected ||
                  selected === targetTourId ||
                  action === TAB_ACTION.COPY) &&
                  this.renderAddButton()}
              </GridItem>
            </GridContainer>
          </GridItem>
          {this.renderAddError()}
        </GridContainer>
      </GridItem>
    );
  };
}

TargetTour.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

  // parent props
  tabId: PropTypes.number,
  // orgId: PropTypes.number,
  content: PropTypes.string,
  sectionIds: PropTypes.array,
  sourceTabIds: PropTypes.array,
  targetTourId: PropTypes.number,
  templateId: PropTypes.number,
  visibleTabIds: PropTypes.array,
  onSuccess: PropTypes.func,
  onSelect: PropTypes.func,
  selected: PropTypes.number,
  action: PropTypes.string,
  // resaga props
};

TargetTour.defaultProps = {
  visibleTabIds: [],
  action: 'move',
  sourceTabIds: [],
};

export default compose(
  withStyles(styles, { name: 'TargetTour' }),
  withRouter,
  resaga(CONFIG),
)(TargetTour);

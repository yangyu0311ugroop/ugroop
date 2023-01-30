import { NODE_API, UPDATE_NODE } from 'apis/constants';
import { CARD, CLOSED, NULL } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Can } from 'apis/components/Ability/components/Can';
import Checkitems from 'smartComponents/Node/components/Checklists/parts/Checkitems';
import Progress from 'smartComponents/Node/components/Checklists/parts/Progress';
import { CHECKLIST_HELPERS } from 'smartComponents/Node/components/Checklists/utils';
import Node from 'smartComponents/Node';
import TrailData from 'smartComponents/Node/logics/TrailData';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CHECKLIST } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import UIKitButton from 'viewComponents/Button';
import { AbilityResolver } from 'apis/components/Ability';
import DaySeparator from 'smartComponents/Card/parts/DaySeparator';
import { last as lastArr } from 'lodash';
import AddCheckitem from 'smartComponents/Node/components/Checklists/parts/AddCheckitem';

import { CONFIG } from 'smartComponents/Card/components/UpNextCard/components/Time/config';
import styles from 'smartComponents/Card/components/UpNextCard/components/Time/styles';

import ItemSeparator from './components/ItemSeparator';

export class Time extends PureComponent {
  state = {
    currentAbilityResolver: null,
  };

  primaryButtonProps = { variant: 'standard', color: 'primary' };

  outlineButtonProps = { variant: 'outline', color: 'black' };

  setAbilityResolver = id => {
    if (!id) return null;
    if (this.state.currentAbilityResolver) return null;
    this.setState({ currentAbilityResolver: id });
    return <AbilityResolver nodeId={id} />;
  };

  renderNode = props => ({ templateId, dayId }) => {
    const parentNodeId = dayId || templateId;
    return (
      <React.Fragment>
        {this.setAbilityResolver(templateId)}
        <Node
          isLast={props.last}
          index={props.index}
          renderBody={this.renderBody}
          renderFooter={this.renderButtons}
          onClick={this.onDayClick}
          key={props.nodeId}
          id={Number.parseInt(props.nodeId, 10)}
          variant={CARD}
          expanded
          showClosed
          time={props.id}
          parentNodeId={parentNodeId}
        />
      </React.Fragment>
    );
  };

  toggleNode = ({ id, status }) => () => {
    const { me } = this.props;

    const node = CHECKLIST_HELPERS.toggleStatus(
      { id, status, type: CHECKLIST },
      { me },
    );

    this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: { nodeId: id, node },
    });
  };

  onDayClick = id => {
    this.props.resaga.setValue({
      selectedId: id,
    });
  };

  renderButtons = ({ id, status }) => {
    const action = LOGIC_HELPERS.ifElse(
      status === CLOSED,
      'Reopen',
      'Mark as Completed',
    );
    const size = LOGIC_HELPERS.ifElse(status === CLOSED, 'xs', 'small');

    return (
      <GridContainer alignItems="center" spacing={0}>
        <Can do="create" on={CHECKLIST}>
          <GridItem xs={12}>
            <UIKitButton
              size={size}
              {...this.outlineButtonProps}
              dense
              onClick={this.toggleNode({ id, status })}
              tooltipProps={{
                title:
                  'Consider this checklist closed and view or reopen at any time.',
              }}
            >
              {action}
            </UIKitButton>
          </GridItem>
        </Can>
      </GridContainer>
    );
  };

  renderBody = (
    { id, checklists, expanded, selected },
    { showCompleted, showOutstanding },
    { toggleShowCompleted, toggleShowOutstanding },
  ) => {
    const { classes, id: anchorDate } = this.props;
    const variant = LOGIC_HELPERS.ifElse(!expanded, NULL);

    return (
      <Fragment>
        <Progress
          id={id}
          selected={selected}
          showCompleted={showCompleted}
          showOutstanding={showOutstanding}
          toggleShowCompleted={toggleShowCompleted}
          toggleShowOutstanding={toggleShowOutstanding}
          completedMessageClassName={classes.completedMessage}
        />
        <Checkitems
          variant={variant}
          parentNodeId={id}
          checklists={checklists}
          showCompleted={showCompleted}
          showOutstanding={showOutstanding}
          showPlaceholder
          showCompletedList
          showDelete
          showSecondary={false}
          anchorDate={anchorDate}
        />
        <AddCheckitem parentNodeId={id} lastNodeId={lastArr(checklists)} />
      </Fragment>
    );
  };

  render = () => {
    const { first, id, prevId, ids, last } = this.props;
    return (
      <>
        <DaySeparator
          first={first}
          last={last}
          createdAt={id}
          previousCreatedAt={prevId}
          isTextAlignLeft
        />
        {ids.map((nodeId, index) => (
          <React.Fragment key={nodeId}>
            <ItemSeparator
              createdAt={id}
              previousCreatedAt={prevId}
              index={index}
            />
            <TrailData id={nodeId}>
              {this.renderNode({ index, last, nodeId, id })}
            </TrailData>
            <Node id={Number.parseInt(nodeId, 10)} variant={VARIANTS.LOGIC} />
          </React.Fragment>
        ))}
      </>
    );
  };
}

Time.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.string.isRequired,
  prevId: PropTypes.string,
  ids: PropTypes.array,
  me: PropTypes.number,
  first: PropTypes.bool,
  last: PropTypes.bool,

  // resaga props
};

Time.defaultProps = {
  ids: [],
  prevId: '',
  me: 0,
  last: false,
};

export default compose(
  withStyles(styles, { name: 'Time' }),
  resaga(CONFIG),
)(Time);

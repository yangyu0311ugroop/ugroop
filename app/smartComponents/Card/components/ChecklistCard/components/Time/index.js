import { NODE_API, UPDATE_NODE } from 'apis/constants';
import { CARD, CLOSED, NULL } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui/index';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Can } from 'apis/components/Ability/components/Can';
import Checkitems from 'smartComponents/Node/components/Checklists/parts/Checkitems';
import Progress from 'smartComponents/Node/components/Checklists/parts/Progress';
import { CHECKLIST_HELPERS } from 'smartComponents/Node/components/Checklists/utils';
import Node from 'smartComponents/Node/index';
import TrailData from 'smartComponents/Node/logics/TrailData';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CHECKLIST } from 'utils/modelConstants';
import UIKitButton from 'viewComponents/Button';
import { AbilityResolver } from 'apis/components/Ability';
import DaySeparator from '../../../../parts/DaySeparator';
import { CONFIG } from './config';
import styles from './styles';

export class Time extends PureComponent {
  state = {
    currentAbilityResolver: null,
  };

  componentWillMount = () => {
    this.primaryButtonProps = { variant: 'standard', color: 'primary' };
    this.outlineButtonProps = { variant: 'outline', color: 'black' };
  };

  setTrail = id => {
    if (this.state.currentAbilityResolver) return null;
    return <TrailData id={id}>{this.renderTrailData}</TrailData>;
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

  renderButtons = ({ id, status }) => {
    const action = LOGIC_HELPERS.ifElse(status === CLOSED, 'Reopen', 'Close');

    return (
      <GridContainer alignItems="center">
        <Can do="create" on={CHECKLIST}>
          <GridItem>
            <UIKitButton
              size="small"
              {...this.outlineButtonProps}
              dense
              onClick={this.toggleNode({ id, status })}
            >
              {action} Checklist
            </UIKitButton>
            <br />
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
          showDelete={false}
          showSecondary={false}
          anchorDate={anchorDate}
        />
      </Fragment>
    );
  };

  renderTrailData = ({ templateId }) => <AbilityResolver nodeId={templateId} />;

  render = () => {
    const { classes, first, id, prevId, ids } = this.props;
    return (
      <div>
        <DaySeparator first={first} createdAt={id} previousCreatedAt={prevId} />
        {ids.map((nodeId, index) => (
          <React.Fragment>
            {this.setTrail(nodeId)}
            <Node
              className={classnames(
                index && classes.separator,
                !index && ids.length > 1 && classes.separatorFirst,
              )}
              index={index}
              renderBody={this.renderBody}
              renderFooter={this.renderButtons}
              key={nodeId}
              id={Number.parseInt(nodeId, 10)}
              variant={CARD}
              expanded
              showClosed
            />
          </React.Fragment>
        ))}
      </div>
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

  // resaga props
};

Time.defaultProps = {
  ids: [],
  prevId: '',
  me: 0,
};

export default compose(
  withStyles(styles, { name: 'Time' }),
  resaga(CONFIG),
)(Time);

import { SIMPLE_VIEW } from 'appConstants';
import { withStyles } from 'components/material-ui';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import React, { PureComponent } from 'react';
import Hr from 'components/Hr';
import { compose } from 'redux';
import resaga from 'resaga';
import { NODE_API, FIND_PARTICIPANT } from 'apis/constants';
import JText from 'components/JText';
import { ability } from 'apis/components/Ability/ability';
import Node from 'smartComponents/Node';
import { PARTICIPANT } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import omit from 'lodash/omit';
import classnames from 'classnames';
import { CONFIG } from './config';
import { MODEL_HELPERS } from './helpers';
import styles from './styles';
import { PERSON_DETAIL_HELPER } from '../../../../../../apis/components/PersonDetail/helpers';

export class TargetTour extends PureComponent {
  state = {
    fetching: false,
    tourAdded: false,
    onValidate: false,
    isAdding: false,
    error: null,
  };

  findPerson = ({ tourId }) => () => {
    this.setState({ onValidate: true, fetching: false });

    this.props.resaga.dispatchTo(NODE_API, FIND_PARTICIPANT, {
      payload: { id: tourId },
      onSuccess: this.personFindSuccess({ tourId }),
      onError: this.personFindError,
    });
  };

  personFindSuccess = ({ tourId }) => result => {
    const { participantModel } = this.props;
    this.setState({ onValidate: false, fetching: true });
    const data = get(result, 'nodes', []);

    const participant = MODEL_HELPERS.getParticipant(
      data,
      get(participantModel, 'customData', {}),
    );

    if (!participant.length) {
      return this.copyParticipant({ tourId })();
    }
    return this.setState({
      onValidate: false,
      fetching: false,
      isAdding: true,
    });
  };

  personFindError = () =>
    this.setState({
      onValidate: false,
      fetching: false,
      error: 'You do not have enough access role to add participant',
    });

  handleCreateError = () => {
    this.setState({
      fetching: false,
      isAdding: false,
      error: 'You do not have enough access role to add participant',
    });
  };

  copyParticipant = ({ tourId }) => () => {
    const { participantModel, orgId } = this.props;

    const { customData: data, status } = participantModel;
    const customData = MODEL_HELPERS.createModel({
      ...data,
      orgId: LOGIC_HELPERS.ifElse(orgId && orgId > 0, orgId),
    });
    const node = {
      type: PARTICIPANT,
      parentNodeId: tourId,
      status,
      customData,
    };

    return NODE_API_HELPERS.createNode(
      {
        parentNodeId: tourId,
        node,
        onSuccess: this.handleCreateSuccess,
        onError: this.handleCreateError,
      },
      this.props,
    );
  };

  handleCreateSuccess = ({ node }) => {
    const { personId, personModel } = this.props;

    if (node.id && personId && personModel) {
      let data = omit(personModel, [
        'nodeId',
        'id',
        'createdAt',
        'updatedAt',
        'phones',
        'medicals',
        'dietaries',
      ]);
      data = { nodeId: node.id, ...data };
      return PERSON_DETAIL_HELPER.createPerson(
        {
          data,
          onSuccess: this.handlePersonSuccess,
          onError: this.handleCreateError,
        },
        this.props,
      );
    }
    return this.setState({ tourAdded: true, fetching: null, isAdding: false });
  };

  handlePersonSuccess = () =>
    this.setState({ tourAdded: true, fetching: null, isAdding: false });

  cancelAdd = () => this.setState({ isAdding: false });

  renderAdding = () => {
    const { isAdding } = this.state;
    const { id } = this.props;
    if (!isAdding) return null;
    return (
      <GridItem>
        <GridContainer direction="column">
          <GridItem>
            <JText md italic gray bold nowrap={false}>
              Person already exists on this tour, to you still want to copy?
            </JText>
          </GridItem>
          <GridItem>
            <GridContainer noWrap>
              <GridItem>
                <Button
                  size="extraSmall"
                  color="primary"
                  dense
                  onClick={this.copyParticipant({ tourId: id })}
                >
                  Copy Participant
                </Button>
              </GridItem>
              <GridItem>
                <Button
                  size="extraSmall"
                  color="gray"
                  dense
                  onClick={this.cancelAdd}
                >
                  Cancel
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
          <Hr />
        </GridContainer>
      </GridItem>
    );
  };

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

  renderAddButton = id => {
    const { fetching, onValidate, tourAdded, isAdding, error } = this.state;
    const { classes } = this.props;
    const addParticipantBtn = LOGIC_HELPERS.ifElse(
      ability.can('execute', PARTICIPANT),
      <Button
        size="extraSmall"
        color={LOGIC_HELPERS.ifElse(tourAdded || !!error, 'gray', 'primary')}
        dense
        onClick={this.findPerson({ tourId: id })}
        disabled={fetching || tourAdded || onValidate || isAdding || !!error}
        loading={fetching}
        className={classes.noWrapText}
      >
        {LOGIC_HELPERS.ifElse(tourAdded, 'Added', 'Copy PAX')}
      </Button>,
      null,
    );
    return addParticipantBtn;
  };

  renderTour = id => {
    const { orgId } = this.props;
    return (
      <Node
        showOrganisation={orgId !== -1}
        id={id}
        key={id}
        variant={SIMPLE_VIEW}
        flexWidth
      />
    );
  };

  render = () => {
    const { id, classes } = this.props;
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
              {/* {this.renderTour(id)} */}
              <GridItem
                // className={classes.tour}
                className={classnames(classes.tour)}
              >
                <JText bold ellipsis>
                  {this.props.content}
                </JText>
              </GridItem>
              <GridItem>{this.renderAddButton(id)}</GridItem>
            </GridContainer>
          </GridItem>
          {this.renderAdding()}
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

  // parent props
  id: PropTypes.number,
  orgId: PropTypes.number,
  content: PropTypes.string,
  participantModel: PropTypes.object,
  personModel: PropTypes.object,
  personId: PropTypes.number,
  // resaga props
};

TargetTour.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'TargetTour' }),
  resaga(CONFIG),
)(TargetTour);

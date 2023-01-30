import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { CREATE_LINK, NODE_API } from 'apis/constants';
import { RELATIONSHIPS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { DATASTORE_UTILS } from 'datastore';
import { EditableForm } from 'smartComponents/Editables';
import Relationship from 'smartComponents/Links/parts/Relationship';
import FirstName from 'smartComponents/Node/parts/FirstName';
import LastName from 'smartComponents/Node/parts/LastName';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PARTICIPANT } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import Icon from 'viewComponents/Icon';
import P, { H6 } from 'viewComponents/Typography';
import { CONFIG } from './config';
import styles from './styles';

export class OldFollower extends PureComponent {
  state = {
    loading: false,
  };

  handleSubmitSuccess = ({ onSuccess }) => () => {
    const { participantId } = this.props;
    this.setState({ loading: false });
    this.props.resaga.setValue({
      oldFollowerId: 0,
      participants: DATASTORE_UTILS.removeItemsInArray(participantId),
    });
    onSuccess();
  };

  handleSubmitError = () => {
    this.setState({
      loading: false,
    });
  };

  handleCreateLink = ({ model, onSuccess }) => () => {
    const { id: nextNodeId, participantId: id } = this.props;

    const { relationship, otherRelationship } = model;
    this.setState({
      loading: true,
    });
    const actionContent = {
      relationship: LOGIC_HELPERS.ifElse(
        relationship === RELATIONSHIPS.OTHER,
        otherRelationship,
        relationship,
      ),
    };

    const action = 'guardian';

    this.props.resaga.dispatchTo(NODE_API, CREATE_LINK, {
      payload: {
        id,
        data: {
          actionContent,
          action,
          nextNodeId,
        },
        prevNodeChildKey: 'followers',
        nextNodeChildKey: 'participantLinks',
        upsertLinkId: true,
      },
      onSuccess: this.handleSubmitSuccess({ onSuccess }),
      onError: this.handleSubmitError,
    });
  };

  handleSubmit = args => {
    const { participantId: id, templateId } = this.props;
    const { onError } = args;

    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        node: { parentNodeId: templateId, type: PARTICIPANT },
        onSuccess: this.handleCreateLink(args),
        onError,
      },
      this.props,
    );
  };

  renderValue = () => {
    const { id } = this.props;

    return (
      <GridContainer alignItems="center">
        <GridItem>
          <Icon icon="user" size="extraSmall" />
        </GridItem>
        <GridItem>
          <GridContainer alignItems="center">
            <GridItem>
              <P weight="bold" dense>
                <FirstName id={id} variant={VARIANTS.TEXT_ONLY} />{' '}
                <LastName id={id} variant={VARIANTS.TEXT_ONLY} />
              </P>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderForm = () => (
    <GridItem>
      <Relationship />
    </GridItem>
  );

  render = () => {
    const { id } = this.props;
    const { loading } = this.state;

    return (
      <EditableForm
        isRow
        value={id}
        renderValue={this.renderValue}
        onSubmit={this.handleSubmit}
        popoverProps={{
          transformOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        }}
        loading={loading}
      >
        <GridContainer direction="column">
          <GridItem>
            <H6 dense weight="bold">
              Relationship Details
            </H6>
          </GridItem>
          <GridItem>{this.renderForm()}</GridItem>
        </GridContainer>
      </EditableForm>
    );
  };
}

OldFollower.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  participantId: PropTypes.number,

  // resaga props
  templateId: PropTypes.number,
};

OldFollower.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'OldFollower' }),
  resaga(CONFIG),
)(OldFollower);

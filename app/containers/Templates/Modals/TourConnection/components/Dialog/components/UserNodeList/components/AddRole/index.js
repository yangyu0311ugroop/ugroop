import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { compose } from 'redux';
import { VARIANTS } from 'variantsConstants';
import {
  PARTICIPANT,
  INTERESTED_LINKEE,
  PARTICIPANT_LINKEE,
  TOUR_CONTRIBUTOR,
} from 'utils/modelConstants';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { DATASTORE_UTILS } from 'datastore';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Button from 'viewComponents/Button';
import Icon from 'viewComponents/Icon';
import { H5 } from 'viewComponents/Typography';
import { helpers } from 'datastore/userStore/helpers';
import omit from 'lodash/omit';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIRMED } from 'appConstants';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { GET_PERSON, TEMPLATE_API } from 'apis/constants';
import {
  INTERESTED_PERSON_STATUSES,
  PARTICIPANT_STATUSES,
} from 'utils/constants/nodes';

import { withStyles } from '@material-ui/core/styles';
import m from './messages';
import { CONFIG_1, CONFIG_2, CONFIG_3, CONFIG_4 } from './config';
import styles from './styles';
import InviteByOrgUser, {
  ADD_CONTRIBUTOR_BUTTON,
} from '../../../../../../../ShareList/components/InviteByOrgUser';

export class AddRole extends React.PureComponent {
  state = {
    dispatching: false,
  };

  handleUpdateNodeSuccess = (_, { nodeId }) =>
    this.handleCreateNodeSuccess({ [nodeId]: nodeId });

  handleCreateNodeSuccess = node => {
    const { role, userId, templateId, orgId } = this.props;
    const nodeId = Object.keys(node)[0];
    const subNodes = {
      nodeId,
      role: LOGIC_HELPERS.ifElse(
        this.isParticipant(),
        PARTICIPANT_LINKEE,
        INTERESTED_LINKEE,
      ),
    };

    // Maintain template.calculated.participants (annoying)
    if (this.isParticipant()) {
      this.props.resaga.setValue({
        nodes: DATASTORE_UTILS.upsertArray(
          `${templateId}.calculated.participants`,
          DATASTORE_UTILS.getObjectIds(node),
        ),
      });
    }

    TEMPLATE_API_HELPERS.addRole(
      {
        id: templateId,
        userId,
        role,
        subNodes,
        organisationId: orgId,
        onSuccess: this.handleAddRoleSuccess,
        onError: this.handleCreateError,
      },
      this.props,
    );
  };

  addContributorRole = () => {
    const { templateId: id, customData } = this.props;
    const { email } = customData;
    if (email) {
      this.setState({ dispatching: true });
      this.props.resaga.dispatchTo(TEMPLATE_API, GET_PERSON, {
        payload: { email, id },
        onSuccess: this.getPersonSuccess,
      });
    }
  };

  addNonContributorRole = () => {
    const {
      customData,
      type,
      templateId: parentNodeId,
      childKey,
      pendingNodeId,
      status,
      orgId,
    } = this.props;

    if (pendingNodeId) {
      const expectedStatus = LOGIC_HELPERS.ifElse(
        this.isParticipant(),
        PARTICIPANT_STATUSES.confirmed,
        INTERESTED_PERSON_STATUSES.pending,
      );

      if (status !== expectedStatus) {
        NODE_API_HELPERS.updateNode(
          {
            nodeId: pendingNodeId,
            node: {
              type,
              status: expectedStatus,
            },
            onSuccess: this.handleUpdateNodeSuccess,
            onError: this.handleCreateError,
          },
          this.props,
        );
      } else {
        this.handleCreateNodeSuccess({ [pendingNodeId]: pendingNodeId });
      }
    } else {
      NODE_API_HELPERS.createNode(
        {
          parentNodeId,
          childKey,
          onSuccess: this.handleCreateNodeSuccess,
          onError: this.handleCreateError,
          fetchCalculated: true,
          node: {
            customData: {
              ...LOGIC_HELPERS.ifElse(
                type === PARTICIPANT,
                { ...customData, orgId },
                omit(customData, 'dob'),
              ),
            },
            type,
            status: LOGIC_HELPERS.ifElse(this.isParticipant(), CONFIRMED, ''),
          },
        },
        this.props,
      );
    }

    this.setState({ dispatching: true });
  };

  handleAddRoleSuccess = () => this.setState({ dispatching: false });

  isParticipant = () => this.props.type === PARTICIPANT;

  handleCreateError = () => {
    this.setState({ dispatching: false });
  };

  getPersonSuccess = (_, { email }) => {
    this.props.resaga.setValue({ inviteeEmail: email, inviteeToken: '' });
    return this.setState({ dispatching: false });
  };

  renderAddRoleButton = () => {
    const { role, type, classes, paxLabel, isTextCenter } = this.props;
    if (type === TOUR_CONTRIBUTOR)
      return (
        <InviteByOrgUser
          id={this.props.templateId}
          userId={this.props.userId}
          orgId={this.props.orgId}
          showAsRow
          variant={ADD_CONTRIBUTOR_BUTTON}
        />
      );

    return (
      <GridItem>
        <Button
          variant={VARIANTS.INLINE}
          color="primary"
          dense
          onClick={this.addNonContributorRole}
          loading={this.state.dispatching}
        >
          <GridContainer
            direction="row"
            alignItems={isTextCenter ? 'center' : 'justify'}
            className={classes.noWrap}
            wrap="nowrap"
          >
            <GridItem>
              <Icon icon="plus" size="extraSmall" bold color="success" />
            </GridItem>
            <GridItem>
              <H5 dense primary>
                <M
                  {...m.addPersonLabel}
                  values={{
                    role:
                      type === PARTICIPANT
                        ? paxLabel
                        : helpers.translateRole(role),
                  }}
                />
              </H5>
            </GridItem>
          </GridContainer>
        </Button>
      </GridItem>
    );
  };

  render = () => <React.Fragment>{this.renderAddRoleButton()}</React.Fragment>;
}

AddRole.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  // parent
  templateId: PropTypes.number,
  userId: PropTypes.number,
  role: PropTypes.string, // role to add
  type: PropTypes.string, // type to add
  childKey: PropTypes.string,

  // resaga value
  customData: PropTypes.object,
  pendingNodeId: PropTypes.number,
  inviteeId: PropTypes.number,
  status: PropTypes.string,
  orgId: PropTypes.number,
  paxLabel: PropTypes.string,
  isTextCenter: PropTypes.bool,
};

AddRole.defaultProps = {
  templateId: null,
  role: null,
  customData: {},
  pendingNodeId: null,
  inviteeId: 0,
  status: null,
  isTextCenter: false,
};

export default compose(
  withStyles(styles, { name: 'AddRole' }),
  resaga(CONFIG_1),
  resaga(CONFIG_2),
  resaga(CONFIG_3),
  resaga(CONFIG_4),
)(AddRole);

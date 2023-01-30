import { CREATE_LINK, NODE_API } from 'apis/constants';
import { RELATIONSHIPS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Guardian from 'smartComponents/Links/types/Guardian';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import Button from 'viewComponents/Button';
import CreateButton from 'viewComponents/CreateButton';
import PopoverForm from 'viewComponents/PopoverForm';
import { H6 } from 'viewComponents/Typography';

import { CONFIG, CONFIG_2, CONFIG_3 } from './config';
import styles from './styles';

export class Create extends PureComponent {
  state = {
    open: false,
    anchorEl: null,
    loading: false,
  };

  handleCreateClick = () => {
    this.setState({
      open: true,
    });
  };

  handleCreateClose = () => {
    this.setState({
      open: false,
    });
  };

  handleButtonRef = ref => {
    this.setState({
      anchorEl: ref,
    });
  };

  handleSubmitSuccess = () => {
    this.setState({ open: false, loading: false });
  };

  handleSubmitError = () => {
    this.setState({
      loading: false,
    });
  };

  handleValidSubmit = model => {
    const { id } = this.props;
    this.setState({
      loading: true,
    });
    const actionContent = {
      relationship: LOGIC_HELPERS.ifElse(
        model.relationship === RELATIONSHIPS.OTHER,
        model.otherRelationship,
        model.relationship,
      ),
    };
    const nextNodeId = model.followerId;
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
      onSuccess: this.handleSubmitSuccess,
      onError: this.handleSubmitError,
    });
  };

  renderFormHeading = () => (
    <H6 dense weight="bold">
      Add a follower to participant
    </H6>
  );

  renderFormContent = () => (
    <Guardian participantId={this.props.id} {...this.props} />
  );

  renderFormActions = () => (
    <GridContainer>
      <GridItem xs />
      <GridItem>
        <Button
          size="xs"
          color="black"
          variant="outline"
          disabled={this.state.loading}
          onClick={this.handleCreateClose}
        >
          Cancel
        </Button>
      </GridItem>
      <GridItem>
        <Button
          size="xs"
          color="primary"
          type="submit"
          disabled={this.state.loading}
        >
          Add
        </Button>
      </GridItem>
    </GridContainer>
  );

  renderForm = () => (
    <GridContainer direction="column">
      <GridItem>{this.renderFormHeading()}</GridItem>
      <GridItem>{this.renderFormContent()}</GridItem>
      <GridItem>{this.renderFormActions()}</GridItem>
    </GridContainer>
  );

  renderButton = () => {
    const { renderButton } = this.props;

    if (renderButton)
      return renderButton({
        buttonRef: this.handleButtonRef,
        onClick: this.handleCreateClick,
      });

    return (
      <CreateButton
        buttonRef={this.handleButtonRef}
        onClick={this.handleCreateClick}
      />
    );
  };

  render = () => {
    const { open, anchorEl, loading } = this.state;
    const { selectableFollowers } = this.props;

    if (selectableFollowers.length === 0) return null;

    return (
      <>
        {this.renderButton()}
        <PopoverForm
          onValidSubmit={this.handleValidSubmit}
          disabled={loading}
          popoverProps={{
            anchorEl,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          }}
          open={open}
          onClose={this.handleCreateClose}
        >
          {this.renderForm()}
        </PopoverForm>
      </>
    );
  };
}

Create.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  renderButton: PropTypes.func,

  // resaga props
  selectableFollowers: PropTypes.array,
};

Create.defaultProps = {
  selectableFollowers: [],
};

export default compose(
  withStyles(styles, { name: 'Create' }),
  resaga(CONFIG),
  resaga(CONFIG_2),
  resaga(CONFIG_3),
)(Create);

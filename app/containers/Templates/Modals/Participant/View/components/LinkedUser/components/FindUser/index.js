import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import _ from 'lodash';
import dotProp from 'dot-prop-immutable';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { TEMPLATE_API, GET_PERSON } from 'apis/constants';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Button from 'viewComponents/Button';
import Form from 'ugcomponents/Form';
import { Email } from 'smartComponents/Inputs';
import m from './messages';
import inputs from './inputs';
import { CONFIG } from './config';
import style from './style';

export class LinkedUserFindUser extends React.PureComponent {
  state = {
    loading: false,
    linkedUserEmail: '',
  };

  componentWillMount = () => {
    const { linkedUserEmail } = this.props;
    this.setState({ linkedUserEmail });
  };

  getValue = (viewValue, value) =>
    viewValue === undefined ? value : viewValue;

  getEmailValue = () => {
    const { email } = this.props;
    const { linkedUserEmail } = this.state;
    return this.getValue(linkedUserEmail, email);
  };

  getFirstToken = shares => {
    const { role } = this.props;
    const share = shares.find(s => s && s.role === role);
    return dotProp.get(share, 'notificationToken', null);
  };

  setLinkedUserEmail = linkedUserEmail => {
    this.props.resaga.setValue({ linkedUserEmail });
  };

  handleEmailChange = value => {
    const { debounceMs } = this.props;
    if (!this.setLinkedUserEmailDebounce) {
      this.setLinkedUserEmailDebounce = _.debounce(
        this.setLinkedUserEmail,
        debounceMs,
      );
    }
    this.setLinkedUserEmailDebounce(value);
  };

  updatePersonSuccess = ({ email }) => () => {
    const { templateId: id } = this.props;
    // this.props.resaga.setValue({ linkedUserEmail: email });

    return this.props.resaga.dispatchTo(TEMPLATE_API, GET_PERSON, {
      payload: { id, email },
      onSuccess: this.handleFindUserSuccess({ email }),
      onError: this.handleFindUserError,
    });
  };

  handleValidSubmit = ({ model }) => {
    const { templateId: id, updatePerson, personId } = this.props;
    const email = dotProp.get(model, inputs.email.name);
    if (updatePerson) {
      this.setState({ loading: true });
      return PERSON_DETAIL_HELPER.updatePerson(
        {
          person: { email },
          personId,
          onSuccess: this.updatePersonSuccess({ email }),
        },
        this.props,
      );
    }
    this.setState({ loading: true });

    return this.props.resaga.dispatchTo(TEMPLATE_API, GET_PERSON, {
      payload: { id, email },
      onSuccess: this.handleFindUserSuccess({ email }),
      onError: this.handleFindUserError,
    });
  };

  handleFindUserSuccess = ({ email }) => ({ inviteeId, share }) => {
    const { id: nodeId } = this.props;

    let model = {};
    model = dotProp.set(model, inputs.email.name, email);

    const shares = Object.values(share());
    const linkedUserToken = this.getFirstToken(shares);

    NODE_API_HELPERS.updateNode(
      {
        nodeId,
        ...model,
        onSuccess: this.handleNodeUpdateSuccess,
        onError: this.handleNodeUpdateError,
      },
      this.props,
    );
    this.props.resaga.setValue({
      linkedUserEmail: email,
      linkedUserId: inviteeId,
      linkedUserToken,
    });
  };

  handleFindUserError = () => {
    this.setState({ loading: false });
  };

  handleNodeUpdateSuccess = () => {
    this.setState({ loading: false });
    this.props.onNext();
  };

  handleNodeUpdateError = () => {
    this.setState({ loading: false });
  };

  renderEmailLabel = () => {
    const { firstName } = this.props;
    return firstName ? (
      <div className="j-text-ellipsis">
        <M {...m.emailLabelWithName} values={{ firstName }} />
      </div>
    ) : (
      <M {...m.emailLabel} />
    );
  };

  renderEmail = () => (
    <GridItem>
      <Email
        value={this.getEmailValue()}
        onChange={this.handleEmailChange}
        label={this.renderEmailLabel()}
        {...inputs.email}
      />
    </GridItem>
  );

  renderSubmitButton = () => {
    const { classes } = this.props;
    const { loading } = this.state;
    return (
      <GridItem>
        <Button
          className={classes.submitButton}
          type="submit"
          disabled={loading}
          dense
          size="extraSmall"
          weight="bold"
        >
          {loading ? (
            <M {...m.nextButtonLoadingLabel} />
          ) : (
            <M {...m.nextButtonLabel} />
          )}
        </Button>
      </GridItem>
    );
  };

  render = () => (
    <Form onFormValidSubmit={this.handleValidSubmit}>
      <GridContainer direction="column">
        {this.renderEmail()}
        <GridItem />
        {this.renderSubmitButton()}
      </GridContainer>
    </Form>
  );
}

LinkedUserFindUser.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent
  templateId: PropTypes.number,
  id: PropTypes.number,
  role: PropTypes.string,
  onNext: PropTypes.func,
  debounceMs: PropTypes.number,
  updatePerson: PropTypes.bool,
  personId: PropTypes.bool,

  // resaga value
  firstName: PropTypes.string,
  email: PropTypes.string,
  linkedUserEmail: PropTypes.string,
};

LinkedUserFindUser.defaultProps = {
  templateId: null,
  id: null,
  role: null,
  onNext: () => {},
  debounceMs: 100,

  firstName: '',
  email: '',
  linkedUserEmail: undefined,
  updatePerson: false,
};

export default compose(
  withStyles(style, {
    name: 'Templates/Modals/Participant/View/LinkedUser/FindUser',
  }),
  resaga(CONFIG),
)(LinkedUserFindUser);

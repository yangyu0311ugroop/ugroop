import React from 'react';
import { get } from 'lodash';
import { NOT_APPLICABLE } from 'appConstants';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { PARTICIPANT } from 'utils/modelConstants';
import { PUB_API_HELPERS, CONFIG } from 'apis/components/Pub/helpers';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'components/material-ui';
import Button from 'viewComponents/Button';
import { H1, H3, H5 } from 'viewComponents/Typography';
import { Select } from 'smartComponents/Inputs';
import Form from 'ugcomponents/Form';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import {
  Comment,
  FirstName,
  LastName,
  Content,
} from 'smartComponents/Node/parts';
import { InterestedPerson, Participant } from 'smartComponents/Node/types';
import { pluralizeText } from 'utils/stringAdditions';
import Icon from 'viewComponents/Icon';
import { StyledSimpleRTE } from 'ugcomponents/Inputs/SimpleRTE';
import { Hidden } from '@material-ui/core';
import styles from './styles';

export class TourForm extends React.PureComponent {
  state = {
    otherTravel: 1,
    selfTravel: false,
    firstName: '',
    lastName: '',
    emailState: '',
    loading: false,
    registered: false,
    isEmptyInterestLevel: null,
    isEmptySelfTravel: null,
  };

  handleSelfTravelChange = selfTravel => {
    let value;
    const { otherTravel } = this.state;

    if (selfTravel) {
      value = LOGIC_HELPERS.ifElse(otherTravel === 1, 0, otherTravel);
    } else {
      value = LOGIC_HELPERS.ifElse(otherTravel, otherTravel, 1);
    }
    this.setState({
      selfTravel,
      otherTravel: value,
      isEmptySelfTravel: selfTravel === '',
    });
  };

  handleInterestedPerson = propsInterestLevel => {
    this.setState({ isEmptyInterestLevel: propsInterestLevel });
  };

  handleAddOther = value => () => {
    const { selfTravel } = this.state;

    const otherTravel = LOGIC_HELPERS.ifElse(
      [selfTravel, value],
      value - 1,
      value,
    );

    if (!value && selfTravel) {
      this.handleSelfTravelChange(false);
    }

    this.setState({ otherTravel });
  };

  handleResetForm = resetForm => () => {
    this.setState({ registered: true });
    resetForm();
    this.setState({
      otherTravel: 1,
      selfTravel: false,
      loading: false,
      isEmptyInterestLevel: null,
      isEmptySelfTravel: null,
    });
  };

  handleOnError = () => this.setState({ loading: false });

  handleOnReturnRegister = () => this.setState({ registered: false });

  handleInvalidSubmit = data => {
    this.setState({
      isEmptyInterestLevel: data.node.customData.interestLevel === '',
      isEmptySelfTravel: data.selfTravel === '',
    });
  };

  handleSubmit = (model, resetForm) => {
    const { hashkey, orgId } = this.props;
    const { selfTravel } = this.state;
    const node = get(model, 'node.customData', {});
    let participant = get(model, PARTICIPANT, []);
    const {
      firstName,
      lastName,
      dob,
      personType,
      interestLevel,
      ...rest
    } = node;
    const email = node.email;
    const comment = node.comment;
    const phone = node.phone;
    if (selfTravel) {
      participant.unshift({
        customData: {
          firstName,
          lastName,
          email,
          comment,
          dob,
          personType,
          primary: true,
          phone,
        },
      });
    }

    participant = participant.map(({ customData }) => ({
      customData: { ...customData, orgId },
    }));

    this.setState({ loading: true });

    const filterInterestLevel =
      interestLevel === NOT_APPLICABLE ? '' : interestLevel;

    const data = Object.assign(
      {},
      {
        node: {
          customData: {
            firstName,
            lastName,
            interestLevel: filterInterestLevel,
            ...rest,
          },
        },
        participant,
        selfTravel,
      },
    );

    PUB_API_HELPERS.createInterest(
      {
        hashkey,
        data,
        onSuccess: this.handleResetForm(resetForm),
        onError: this.handleOnError,
      },
      this.props,
    );
  };

  handleCancel = () => {
    const { hashkey, history } = this.props;
    const redirectTo = `/public/template/${hashkey}`;

    history.push(redirectTo);
  };

  formChange = ({ previousValues, currentValues }) => {
    const prevFName = get(previousValues, 'node.customData.firstName', '');
    const prevLName = get(previousValues, 'node.customData.lastName', '');
    const prevEmail = get(previousValues, 'node.customData.email', '');
    const currFName = get(currentValues, 'node.customData.firstName', '');
    const currLName = get(currentValues, 'node.customData.lastName', '');
    const currEmail = get(currentValues, 'node.customData.email', '');
    if (prevFName !== currFName) {
      this.setState({ firstName: currFName });
    }

    if (prevLName !== currLName) {
      this.setState({ lastName: currLName });
    }

    if (prevEmail !== currEmail) {
      this.setState({ emailState: currEmail });
    }
  };

  renderPart = (Component, variant, props = {}) => (
    <Component variant={variant} {...props} />
  );

  renderFormButtons = () => {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <GridItem>
          <GridContainer spacing={0} classes={{ root: classes.actionsRoot }}>
            <GridItem>
              <Button
                type="submit"
                color="primary"
                className={classes.submitBtn}
                disabled={this.state.loading}
                loading={this.state.loading}
              >
                Submit
              </Button>
            </GridItem>
            <GridItem>
              <Button
                color="black"
                variant={VARIANTS.OUTLINE}
                onClick={this.handleCancel}
                disabled={this.state.loading}
              >
                Cancel
              </Button>
            </GridItem>
          </GridContainer>
        </GridItem>
      </React.Fragment>
    );
  };

  renderInterestForm = () => {
    const { classes } = this.props;
    const { isEmptyInterestLevel, isEmptySelfTravel } = this.state;
    const options = [
      { value: '', children: '' },
      { value: true, children: 'Yes' },
      { value: false, children: 'No' },
    ];
    return (
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <H1 weight="bold" className={classes.h1}>
              Register your interest!
            </H1>
          </GridItem>
          <GridItem>
            {this.renderPart(InterestedPerson, VARIANTS.FORM, {
              isPublic: true,
              extended: true,
              isEmptyInterestLevel,
              onChange: this.handleInterestedPerson,
            })}
          </GridItem>
          <GridItem>
            <Select
              value=""
              name="selfTravel"
              options={options}
              label="Are you travelling?"
              className={classes.selfTravel}
              required
              error={isEmptySelfTravel}
              onChange={this.handleSelfTravelChange}
            />
          </GridItem>
          {this.renderPart(Comment, VARIANTS.TEXT_FIELD)}
        </GridContainer>
      </GridItem>
    );
  };

  renderNameReadOnly = () => {
    const { classes } = this.props;
    const { firstName, lastName } = this.state;

    const nameKey = 'readOnly';

    return (
      <GridContainer className={classes.grow}>
        <GridItem md={6} xs={6}>
          {this.renderPart(FirstName, VARIANTS.TEXT_FIELD, {
            nameKey,
            readOnly: true,
            currentValue: firstName,
          })}
        </GridItem>
        <GridItem md={6} xs={6}>
          {this.renderPart(LastName, VARIANTS.TEXT_FIELD, {
            nameKey,
            readOnly: true,
            currentValue: lastName,
          })}
        </GridItem>
      </GridContainer>
    );
  };

  renderSelfTravel = () => {
    const { classes } = this.props;
    const { selfTravel, emailState } = this.state;
    if (!selfTravel) return null;

    return (
      <GridItem className={classes.travelItemRoot}>
        <GridContainer
          direction="column"
          spacing={0}
          className={classes.travelRoot}
        >
          <GridItem>
            <GridContainer spacing={0} className={classes.header}>
              <GridItem className={classes.headerNum}>
                <H3 dense weight="bold">
                  #1
                </H3>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>{this.renderNameReadOnly()}</GridItem>
          <GridItem>
            {this.renderPart(Participant, VARIANTS.FORM, {
              isPublic: true,
              noName: true,
              currentEmailValue: emailState,
            })}
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderOtherTravelSelect = () => {
    const { classes } = this.props;
    const { otherTravel, selfTravel } = this.state;

    const addBtns = [2, 3, 4, 5, 6].map(value => (
      <Button
        key={value}
        color="primary"
        variant={VARIANTS.OUTLINE}
        className={classes.travelBtn}
        onClick={this.handleAddOther(value)}
      >
        {`${value} ${pluralizeText('person', value)}`}
      </Button>
    ));
    const removeBtn = (
      <Button
        color="alert"
        variant={VARIANTS.OUTLINE}
        className={classes.travelBtn}
        onClick={this.handleAddOther(1)}
      >
        Reset to 1 people
      </Button>
    );

    const otherBtn = LOGIC_HELPERS.ifElse(
      [otherTravel, selfTravel],
      removeBtn,
      null,
      true,
    );

    return (
      <div className={classes.travelBtns}>
        {addBtns}
        {otherBtn}
      </div>
    );
  };

  renderParticipantFormItem = (key, index) => {
    const { classes } = this.props;
    const { selfTravel, isEmptyInterestLevel, isEmptySelfTravel } = this.state;

    const nameKey = `${PARTICIPANT}[${index}]`;
    const counter = LOGIC_HELPERS.ifElse(selfTravel, 1, 0);
    const headerNum = index + 1 + counter;

    return (
      <GridItem key={key} className={classes.travelItemRoot}>
        <GridContainer
          direction="column"
          spacing={0}
          className={classes.travelRoot}
        >
          <GridItem>
            <GridContainer spacing={0} className={classes.header}>
              <GridItem className={classes.headerNum}>
                <H3 dense weight="bold">{`#${headerNum}`}</H3>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            {this.renderPart(Participant, VARIANTS.FORM, {
              nameKey,
              isPublic: true,
              isEmptyInterestLevel,
              isEmptySelfTravel,
              isRYI: true,
            })}
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderParticipantForm = () => {
    const { classes } = this.props;
    const { otherTravel, selfTravel } = this.state;
    const header = "Who's Travelling?";

    return (
      <React.Fragment>
        <GridItem>
          <H3 weight="bold" className={classes.h1}>
            {header}
          </H3>
          {this.renderOtherTravelSelect()}
          {this.renderSelfTravel()}
          {selfTravel && otherTravel ? (
            <H3 weight="bold" className={classes.h1}>
              Another Person
            </H3>
          ) : null}
          {[...Array(otherTravel).keys()].map(this.renderParticipantFormItem)}
        </GridItem>
      </React.Fragment>
    );
  };

  renderRegister = () => (
    <Form
      onValidSubmit={this.handleSubmit}
      onFormChange={this.formChange}
      onInvalidSubmit={this.handleInvalidSubmit}
    >
      <GridContainer card direction="column" spacing={0}>
        {this.renderInterestForm()}
        {this.renderParticipantForm()}
        {this.renderFormButtons()}
      </GridContainer>
    </Form>
  );

  renderSuccessRegistered = () => {
    const { classes, templateId, hashkeyDescription } = this.props;
    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem md={12}>
          <GridContainer className={classes.containerGreen} spacing={0}>
            <GridContainer direction="column" alignItems="center" spacing={0}>
              <GridItem>
                <GridContainer
                  spacing={0}
                  className={classes.containerCircleWithLogo}
                >
                  <Hidden xsDown>
                    <GridItem className={classes.containerLogo}>
                      <Icon icon="lnr-thumbs-up" size="large" color="dark" />
                    </GridItem>
                  </Hidden>
                  <Hidden smUp>
                    <GridItem className={classes.containerXSLogo}>
                      <Icon icon="lnr-thumbs-up" size="large" color="dark" />
                    </GridItem>
                  </Hidden>
                </GridContainer>
              </GridItem>
              <GridItem>
                <GridContainer
                  direction="column"
                  alignItems="center"
                  spacing={0}
                  className={classes.containerBody}
                >
                  <GridItem>
                    <H5 className={classes.firstParagraph} noMargin>
                      You have successfully registered your interest to
                    </H5>
                  </GridItem>
                  <GridItem>
                    <Content
                      id={templateId}
                      className={classes.secondParagraph}
                    />
                  </GridItem>
                  <GridItem>
                    <H5 className={classes.firstParagraph}>
                      <StyledSimpleRTE readOnly value={hashkeyDescription} />
                    </H5>
                  </GridItem>
                  <GridItem>
                    <Button
                      onClick={this.handleOnReturnRegister}
                      variant={VARIANTS.INLINE}
                      dense
                    >
                      <H5 className={classes.secondParagraphNoMargin}>
                        Register someone else
                      </H5>
                    </Button>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { registered } = this.state;
    return !registered ? this.renderRegister() : this.renderSuccessRegistered();
  };
}

TourForm.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  templateId: PropTypes.number,
  hashkeyDescription: PropTypes.string,
  orgId: PropTypes.number,

  // parent
  hashkey: PropTypes.string.isRequired,
};

TourForm.defaultProps = {};

export default compose(
  withRouter,
  withStyles(styles, { name: 'TourForm' }),
  resaga(),
  resaga(CONFIG),
)(TourForm);

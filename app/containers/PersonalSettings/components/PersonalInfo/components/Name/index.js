import { Fade } from '@material-ui/core';
import { PATCH_PERSON_FACADE, PERSON_DETAIL_API } from 'apis/constants';
import { URL_HELPERS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import FText from 'components/Inputs/TextField/components/FilledInputs/components/FText';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import ScrollToTopOnMount from 'containers/PersonalSettings/components/ScrollToTopOnMount';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { isEmptyString } from 'utils/stringAdditions';
import JButton from 'viewComponents/Button/variants/JButton';
import { LoadingText } from 'ugcomponents/Progress';
import { CONFIG } from './config';
import styles from './styles';

export class Name extends PureComponent {
  state = {
    isChanged: false,
    knownAs: this.props.knownAs,
  };

  handleChange = (form, isChanged) => {
    this.setState({ isChanged });
    if (isChanged) {
      this.setState({ success: false });
    }
  };

  handleDiscard = () => {
    const { isChanged } = this.state;

    if (isChanged && !window.confirm('You will lose your data. Continue?')) {
      return null;
    }

    return this.goPersonalInfo();
  };

  goPersonalInfo = () =>
    URL_HELPERS.goToUrl(URL_HELPERS.personalInfo(), this.props)();

  trim = (value = '') => (!value ? '' : value.trim());

  handleValidSubmit = data => {
    const { userId } = this.props;
    const { isChanged } = this.state;

    if (!isChanged) return null;

    const trimmedData = {
      ...data,
      firstName: this.trim(data.firstName),
      middleName: this.trim(data.middleName),
      lastName: this.trim(data.lastName),
      knownAs: this.trim(data.knownAs),
    };

    const validatedData = LOGIC_HELPERS.ifElse(
      isEmptyString(trimmedData.knownAs),
      {
        ...trimmedData,
        knownAs: `${trimmedData.firstName} ${trimmedData.lastName}`,
      },
      trimmedData,
    );

    this.setState({ saving: true, knownAs: data.knownAs });

    return this.props.resaga.dispatchTo(
      PERSON_DETAIL_API,
      PATCH_PERSON_FACADE,
      {
        payload: {
          data: validatedData,
          userId,
        },
        onSuccess: this.handleSuccess,
        onError: this.handleOnError,
      },
    );
  };

  handleOnError = () => {
    this.setState({ saving: false, success: false });
  };

  closeSuccess = () => this.setState({ success: false, isChanged: false });

  handleSuccess = ({ result = {} }) => {
    this.setState({
      saving: false,
      success: true,
      isChanged: false,
      knownAs: result.knownAs,
    });
  };

  render = () => {
    const {
      classes,
      firstName,
      lastName,
      knownAs,
      middleName,
      loading,
    } = this.props;
    if (loading) return <LoadingText />;

    const { success, saving, isChanged } = this.state;
    return (
      <>
        <ScrollToTopOnMount />

        <Formsy
          onValidSubmit={this.handleValidSubmit}
          onChange={this.handleChange}
        >
          <div className={classes.offsetGrid}>
            <GridContainer
              direction="column"
              spacing={2}
              className={classes.root}
            >
              <GridItem>
                <JText gray nowrap={false}>
                  Changes to your name will be reflected across your uGroop
                  account.
                </JText>
              </GridItem>

              <GridItem>
                <Hr half />
              </GridItem>

              <GridItem>
                <GridContainer
                  card
                  highlight
                  cardPadding={4}
                  alignItems="center"
                  direction="column"
                  spacing={0}
                >
                  <GridItem>
                    <GridContainer
                      direction="column"
                      spacing={3}
                      className={classes.formWidth}
                    >
                      <GridItem>
                        <JText bold gray sm uppercase>
                          Change name
                        </JText>
                      </GridItem>
                      <GridItem>
                        <FText
                          value={firstName}
                          name="firstName"
                          label="First name"
                          placeholder="Enter first name"
                          required
                        />
                      </GridItem>
                      <GridItem>
                        <FText
                          value={middleName}
                          name="middleName"
                          label="Middle Name"
                          placeholder="Enter middle name"
                        />
                      </GridItem>
                      <GridItem>
                        <FText
                          value={lastName}
                          name="lastName"
                          label="Last name"
                          placeholder="Enter last name"
                          required
                        />
                      </GridItem>
                      <GridItem>
                        <FText
                          forceValue={this.state.knownAs}
                          value={knownAs}
                          name="knownAs"
                          label="Known as"
                          placeholder="Enter known as"
                          helperText="Change this if you prefer to be called by a different name"
                        />
                      </GridItem>

                      <GridItem>
                        <GridContainer alignItems="center">
                          <GridItem xs>
                            <Fade in={success}>
                              <GridContainer alignItems="center" wrap="nowrap">
                                <GridItem>
                                  <Icon
                                    size="normal"
                                    icon="lnr-checkmark-circle"
                                    color="success"
                                  />
                                </GridItem>
                                <GridItem>
                                  <JText success>Saved!</JText>
                                </GridItem>
                              </GridContainer>
                            </Fade>
                          </GridItem>
                          <GridItem>
                            <JButton
                              padding="lg"
                              bold
                              onClick={this.handleDiscard}
                            >
                              {LOGIC_HELPERS.ifElse(
                                isChanged,
                                'Cancel',
                                'Go back',
                              )}
                            </JButton>
                          </GridItem>
                          <GridItem>
                            {isChanged && (
                              <JButton
                                disabled={saving}
                                bg="green"
                                padding="lg"
                                bold
                                type="submit"
                              >
                                Save
                              </JButton>
                            )}
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
        </Formsy>
      </>
    );
  };
}

Name.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  userId: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  knownAs: PropTypes.string,

  // resaga props
  middleName: PropTypes.string,
  loading: PropTypes.bool,
};

Name.defaultProps = {
  firstName: '',
  lastName: '',
  knownAs: '',

  // resaga props
  middleName: '',
};

export default compose(
  withStyles(styles, { name: 'Name' }),
  resaga(CONFIG),
)(Name);

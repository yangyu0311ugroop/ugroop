import { Fade } from '@material-ui/core';
import { PATCH_PERSON_FACADE, PERSON_DETAIL_API } from 'apis/constants';
import { URL_HELPERS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import ScrollToTopOnMount from 'containers/PersonalSettings/components/ScrollToTopOnMount';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';

import PersonGender from 'smartComponents/Person/parts/Gender';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG } from './config';
import styles from './styles';

export class Gender extends PureComponent {
  state = {
    isChanged: false,
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

  handleValidSubmit = data => {
    const { userId } = this.props;
    const { isChanged } = this.state;

    if (!isChanged) return null;

    this.setState({ saving: true });

    return this.props.resaga.dispatchTo(
      PERSON_DETAIL_API,
      PATCH_PERSON_FACADE,
      {
        payload: {
          data,
          userId,
        },
        onSuccess: this.handleSuccess,
      },
    );
  };

  closeSuccess = () => this.setState({ success: false });

  handleSuccess = () => {
    this.setState({ saving: false, success: true });
    // this.goPersonalInfo();
  };

  render = () => {
    const { classes, userId } = this.props;
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
                  Indicating your gender lets us know how to refer to you.
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
                          Gender
                        </JText>
                      </GridItem>

                      <GridItem>
                        <PersonGender
                          id={userId}
                          variant={VARIANTS.RADIO_FIELD}
                          hideLabel
                          row
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

Gender.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  userId: PropTypes.number,

  // resaga props
};

Gender.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Gender' }),
  resaga(CONFIG),
)(Gender);

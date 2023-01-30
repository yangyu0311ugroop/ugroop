import { Fade } from '@material-ui/core';
import { ORGANISATION_API, PATCH_ORG } from 'apis/constants';
import { URL_HELPERS } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'components/Hr';
// import FText from 'components/Inputs/TextField/components/FilledInputs/components/FText';
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
import JButton from 'viewComponents/Button/variants/JButton';
import TimezoneInput from 'smartComponents/Organisation/parts/Preference/parts/Timezone';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import { CONFIG } from './config';
import styles from './styles';

export class Timezone extends PureComponent {
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

    return this.goOrgPreference();
  };

  goOrgPreference = () =>
    URL_HELPERS.goToUrl(URL_HELPERS.orgPreference(this.props.id), this.props)();

  handleValidSubmit = data => {
    const { id } = this.props;
    const { isChanged } = this.state;
    if (!isChanged) return null;

    this.setState({ saving: true });

    return this.props.resaga.dispatchTo(ORGANISATION_API, PATCH_ORG, {
      payload: {
        id,
        data: {
          preference: {
            timezone: data.timezone,
          },
        },
      },
      onSuccess: this.handleSuccess,
    });
  };

  closeSuccess = () => this.setState({ success: false });

  handleSuccess = () => {
    this.setState({ saving: false, success: true });
  };

  render = () => {
    const { classes, preferenceId, readOnly } = this.props;
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
                  Changes to your organisation timezone will be reflected across
                  your uGroop account.
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
                  <GridItem className={classes.fullWidth}>
                    <GridContainer
                      direction="column"
                      spacing={3}
                      className={classes.formWidth}
                    >
                      <GridItem>
                        <JText bold gray sm uppercase>
                          Change Home Timezone
                        </JText>
                      </GridItem>
                      <GridItem className={classes.fullWidth}>
                        <TimezoneInput
                          id={preferenceId}
                          variant={ORG_FIELD_VARIANTS.TEXT_FIELD}
                          //  handleChange={this.handleChangeLocation}
                          required
                          autoFocus
                          textFieldProps={{
                            disabled: readOnly,
                          }}
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
                            <JButton
                              disabled={saving || readOnly}
                              bg="green"
                              padding="lg"
                              bold
                              type="submit"
                            >
                              Save
                            </JButton>
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

Timezone.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  preferenceId: PropTypes.number,
  readOnly: PropTypes,
};

Timezone.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Timezone' }),
  resaga(CONFIG),
)(Timezone);

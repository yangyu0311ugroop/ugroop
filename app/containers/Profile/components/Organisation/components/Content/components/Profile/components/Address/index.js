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
import AddressInput from 'smartComponents/Organisation/parts/Location/parts/Address';
import { CONFIG } from './config';
import styles from './styles';
import { ORG_FIELD_VARIANTS } from '../../../../../../../../../../smartComponents/Organisation/constants';

export class Address extends PureComponent {
  state = {
    isChanged: false,
  };

  componentDidMount = () => {
    this.placeId = this.props.placeId;
  };

  handleChange = (form, isChanged) => {
    this.setState({ isChanged });

    if (isChanged) {
      this.setState({ success: false });
    }
  };

  handleChangeLocation = key => value => {
    if (key === 'placeId') {
      this.placeId = value;
      this.locationChanged = true;
    }
  };

  handleDiscard = () => {
    const { isChanged } = this.state;

    if (isChanged && !window.confirm('You will lose your data. Continue?')) {
      return null;
    }

    return this.goOrgInfo();
  };

  goOrgInfo = () =>
    URL_HELPERS.goToUrl(URL_HELPERS.orgInfo(this.props.id), this.props)();

  handleValidSubmit = data => {
    const { id, placeId } = this.props;
    const { isChanged } = this.state;
    // const placeIdChanged = this.placeId !== placeId;

    if (!isChanged) return null;

    this.setState({ saving: true });

    return this.props.resaga.dispatchTo(ORGANISATION_API, PATCH_ORG, {
      payload: {
        id,
        data: {
          location: {
            address: data.address,
            placeId: this.locationChanged ? this.placeId : placeId,
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
    const { classes, readOnly, locationId } = this.props;
    const { success, saving, isChanged } = this.state;
    console.log({ props: this.props });

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
                  Changes to your organisation address will be reflected across
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
                          Change Address
                        </JText>
                      </GridItem>
                      <GridItem className={classes.fullWidth}>
                        <AddressInput
                          id={locationId}
                          variant={ORG_FIELD_VARIANTS.TEXT_FIELD}
                          handleChange={this.handleChangeLocation}
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
                            {isChanged && (
                              <JButton
                                disabled={saving || readOnly}
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

Address.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  locationId: PropTypes.number,
  // locationId: PropTypes.number,
  readOnly: PropTypes,

  // resaga props
  placeId: PropTypes.string,
};

Address.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Address' }),
  resaga(CONFIG),
)(Address);

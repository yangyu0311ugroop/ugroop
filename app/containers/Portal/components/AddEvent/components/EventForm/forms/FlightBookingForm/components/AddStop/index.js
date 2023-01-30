import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { FilledVTextField } from 'components/Inputs/TextField/components/FilledInputs';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import IATASearchField from 'smartComponents/Inputs/IATASearchField';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG } from './config';
import styles from './styles';

export class AddStop extends PureComponent {
  state = {
    adding: false,
  };

  render = () => {
    const { classes, onChange, filters } = this.props;
    const { adding, stop } = this.state;

    let isInvalid;

    if (stop && filters.length) {
      for (let i = 0; i < filters.length; i += 1) {
        if (filters[i].iataCode === stop.iataCode) {
          isInvalid = true;
          break;
        }
      }
    }

    if (adding) {
      return (
        <GridItem>
          <div className={classes.addingDiv}>
            <GridContainer direction="column">
              <GridItem>
                <IATASearchField
                  name="temp.stop"
                  label="Connecting airport"
                  placeholder="Enter connecting airport"
                  component={FilledVTextField}
                  cityNameProps={{ name: 'temp.stopCityName' }}
                  iataCodeProps={{ name: 'temp.stopIataCode' }}
                  timeZoneIdProps={{ name: 'temp.stopTimeZoneId' }}
                  onChange={s => {
                    if (!s || !s.iataCode) {
                      return this.setState({
                        stop: null,
                      });
                    }

                    // s && s.iataCode && LOGIC_HELPERS.ifFunction(onChange, [s])
                    return this.setState({
                      stop: s,
                    });
                  }}
                />
              </GridItem>

              {isInvalid && (
                <GridItem>
                  <JText danger nowrap={false}>
                    Stop can{"'"}t be the same as origin or destination.
                  </JText>
                </GridItem>
              )}

              <GridItem>
                <GridContainer alignItems="center">
                  <GridItem xs />
                  <GridItem>
                    <JButton onClick={() => this.setState({ adding: false })}>
                      Cancel
                    </JButton>
                  </GridItem>
                  <GridItem>
                    <JButton
                      disabled={!stop || !stop.iataCode || isInvalid}
                      block
                      bg="blue"
                      padding="lg"
                      onClick={() => {
                        this.setState({ adding: false });
                        LOGIC_HELPERS.ifFunction(onChange, [stop]);
                      }}
                    >
                      Add stop
                    </JButton>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
        </GridItem>
      );
    }

    return (
      <GridItem>
        <JText
          noUnderlined
          link
          onClick={() => this.setState({ adding: true, stop: null })}
        >
          <Icon icon="lnr-plus-circle" size="xsmall" paddingRight /> Add stop
        </JText>
      </GridItem>
    );
  };
}

AddStop.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  filters: PropTypes.array,
  onChange: PropTypes.func,

  // resaga props
};

AddStop.defaultProps = {
  filters: [],
};

export default compose(
  withStyles(styles, { name: 'AddStop' }),
  resaga(CONFIG),
)(AddStop);

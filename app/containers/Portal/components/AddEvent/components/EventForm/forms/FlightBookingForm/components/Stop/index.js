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
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG } from './config';
import styles from './styles';

export class Stop extends PureComponent {
  state = {
    adding: false,
    stop: this.props.stop,
  };

  render = () => {
    const { classes, onChange, onRemove } = this.props;
    const { adding, stop } = this.state;

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
                  value={stop.airportName}
                  cityName={stop.cityName}
                  iataCode={stop.iataCode}
                  timeZoneId={stop.timeZoneId}
                  onChange={s =>
                    this.setState({
                      stop: s,
                    })
                  }
                />
              </GridItem>
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
                      block
                      bg="blue"
                      padding="lg"
                      onClick={() => {
                        this.setState({ adding: false });
                        LOGIC_HELPERS.ifFunction(onChange, [stop]);
                      }}
                    >
                      Save
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
        <div className={classes.connect}>
          <GridContainer direction="column" spacing={0}>
            <GridItem xs>
              Arrive <b>{stop.airportName}</b>
            </GridItem>
            <GridItem>
              <GridContainer alignItems="center" spacing={1} wrap="nowrap">
                <GridItem>
                  <JText
                    link
                    noUnderlined
                    onClick={() => this.setState({ adding: true })}
                  >
                    Change airport
                  </JText>
                </GridItem>
                <GridItem>
                  <JText danger onClick={onRemove}>
                    Remove
                  </JText>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </GridItem>
    );
  };
}

Stop.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  stop: PropTypes.object,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,

  // resaga props
};

Stop.defaultProps = {
  stop: {},
};

export default compose(
  withStyles(styles, { name: 'Stop' }),
  resaga(CONFIG),
)(Stop);

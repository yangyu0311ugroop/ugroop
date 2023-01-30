import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { isEmptyString } from 'utils/stringAdditions';
import { VARIANTS } from 'variantsConstants';
import Popover from '@material-ui/core/Popover';
import Card from 'ugcomponents/Card';
import Button from 'viewComponents/Button';
import Padding from 'viewComponents/Padding';

import P, { H4 } from 'viewComponents/Typography';
import {
  EventEndTime,
  EventStartTime,
  EventDistance,
} from 'smartComponents/Event/components/Event/parts';

import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { Checkbox } from 'ugcomponents/Inputs';
import omit from 'lodash/omit';

import { CONFIG } from './config';
import styles from './styles';
import m from './messages';

export class Locations extends PureComponent {
  state = {
    sameAsOrigin: false,
    helpEl: null,
    isSameAsOriginHelpOpened: false,
  };

  getFilteredProps = () =>
    omit(this.props, [
      'resaga',
      'pickupPlaceId',
      'pickupName',
      'pickupIcon',
      'dropoffPlaceId',
      'dropoffName',
      'dropoffIcon',
      'classes',
    ]);

  onSwap = () => {
    const { handleSwap } = this.props;
    handleSwap();
  };

  handleEditable = () => {
    const {
      readOnly,
      endLocationLabel,
      pickupName,
      dropoffName,
      startLocationLabel,
      StartComponent,
      EndComponent,
      classes,
    } = this.props;

    const endLabel = LOGIC_HELPERS.ifElse(
      isEmptyString(endLocationLabel),
      <M {...m.arriving} />,
      endLocationLabel,
    );

    const startLabel = LOGIC_HELPERS.ifElse(
      isEmptyString(startLocationLabel),
      <M {...m.departing} />,
      startLocationLabel,
    );

    const start = LOGIC_HELPERS.ifElse(
      [!isEmptyString(pickupName), !readOnly],
      <GridItem>
        {this.renderPart(StartComponent, { label: startLabel })}
        {this.renderPart(EventStartTime)}
      </GridItem>,
      null,
      true,
    );

    const end = LOGIC_HELPERS.ifElse(
      [!isEmptyString(dropoffName), !readOnly],
      <GridItem>
        {this.renderPart(EndComponent, { label: endLabel })}
        {this.renderPart(EventEndTime)}
      </GridItem>,
      null,
      true,
    );

    const swapButton =
      !isEmptyString(dropoffName) && !isEmptyString(pickupName) && !readOnly ? (
        <GridItem>
          <Button
            iconButton
            size="small"
            variant={VARIANTS.OUTLINE}
            color="primary"
            icon="lnr-tab"
            tooltipProps={{ title: 'Swap Locations' }}
            onClick={this.onSwap}
            className={classes.swapBtn}
          />
        </GridItem>
      ) : null;

    return (
      <React.Fragment>
        <GridItem>
          <GridContainer alignItems="center" justify="space-between">
            <GridItem>
              <GridContainer direction="column">
                {start}
                {end}
              </GridContainer>
            </GridItem>
            {swapButton}
          </GridContainer>
        </GridItem>
        {this.renderPart(EventDistance)}
      </React.Fragment>
    );
  };

  handleField = () => (
    <GridContainer alignItems="center" justify="center" spacing={3}>
      <GridItem xs={12}>{this.renderStartLocAndTimeField()}</GridItem>
      <GridItem xs={12}>{this.renderEndLocAndTimeField()}</GridItem>
    </GridContainer>
  );

  handleSameAsOriginClicked = () => {
    const { sameAsOrigin } = this.state;
    this.props.resaga.setValue({
      eventDropoff: {},
      formDropoff: {},
    });
    this.setState({ sameAsOrigin: !sameAsOrigin });
  };

  handlePopperHelperClicked = ev => {
    this.setState({
      isSameAsOriginHelpOpened: true,
      helpEl: ev.currentTarget,
    });
  };

  handlePopperClosed = () => {
    this.setState({ isSameAsOriginHelpOpened: false, helpEl: null });
  };

  renderEndLocAndTimeField = () => {
    const { endLocationLabel, EndComponent, classes } = this.props;
    const label = LOGIC_HELPERS.ifElse(
      isEmptyString(endLocationLabel),
      <M {...m.arriving} />,
      endLocationLabel,
    );

    return (
      <GridContainer justify="center">
        <GridItem xs={12} md={2} className={classes.locationTitle}>
          <H4 fontStyle="italic" weight="bold" dense>
            {label}
          </H4>
        </GridItem>
        <GridItem xs={12} md={10}>
          <GridContainer direction="column">
            {!this.state.sameAsOrigin ? (
              <React.Fragment>
                <GridItem>{this.renderPart(EndComponent, { label })}</GridItem>
              </React.Fragment>
            ) : null}
            <GridItem>{this.renderPart(EventEndTime)}</GridItem>
            <GridItem>
              <GridContainer>
                <GridItem>
                  <Checkbox
                    compact
                    label="Same as origin"
                    name="sameAsOrigin"
                    onChange={this.handleSameAsOriginClicked}
                  />
                </GridItem>
                <GridItem>
                  <Button
                    iconButton
                    icon="question-circle"
                    variant={VARIANTS.INLINE}
                    color="gray"
                    size="extraSmall"
                    dense
                    onClick={this.handlePopperHelperClicked}
                  />
                  <Popover
                    onClose={this.handlePopperClosed}
                    anchorEl={this.state.helpEl}
                    open={this.state.isSameAsOriginHelpOpened}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                  >
                    <Card>
                      <Padding left="sm" right="sm">
                        <P>
                          This will make the departing location same as the
                          arriving location. This is useful for instances where
                          a particular transportation will just tour you around
                          and return to where you started.
                        </P>
                      </Padding>
                    </Card>
                  </Popover>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderStartLocAndTimeField = () => {
    const { startLocationLabel, StartComponent, classes } = this.props;
    const label = LOGIC_HELPERS.ifElse(
      isEmptyString(startLocationLabel),
      <M {...m.departing} />,
      startLocationLabel,
    );

    return (
      <GridContainer justify="center">
        <GridItem xs={12} md={2} className={classes.locationTitle}>
          <H4 fontStyle="italic" weight="bold" dense>
            {label}
          </H4>
        </GridItem>
        <GridItem xs={12} md={10} className={classes.locationContainer}>
          <GridContainer direction="column">
            <GridItem>{this.renderPart(StartComponent, { label })}</GridItem>
            <GridItem>{this.renderPart(EventStartTime)}</GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderPart = (Component, props = {}) => (
    <Component {...this.getFilteredProps()} {...props} />
  );

  render = () => {
    const { variant } = this.props;

    return (
      <ForEachEventVariant
        variant={variant}
        renderField={this.handleField}
        renderDefault={this.handleEditable}
      />
    );
  };
}

Locations.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  startLocationLabel: PropTypes.node,
  endLocationLabel: PropTypes.node,
  handleSwap: PropTypes.func,

  pickupPlaceId: PropTypes.string,
  pickupName: PropTypes.string,
  pickupIcon: PropTypes.string,

  dropoffPlaceId: PropTypes.string,
  dropoffName: PropTypes.string,
  dropoffIcon: PropTypes.string,

  StartComponent: PropTypes.func,
  EndComponent: PropTypes.func,

  // resaga props
};

Locations.defaultProps = {
  readOnly: false,
  startLocationLabel: '',
  endLocationLabel: '',
};

export default compose(
  withStyles(styles, { name: 'Locations' }),
  resaga(CONFIG),
)(Locations);

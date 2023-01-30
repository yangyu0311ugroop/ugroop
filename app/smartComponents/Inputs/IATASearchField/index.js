/**
 * Created by stephenkarpinskyj on 30/7/18.
 */

import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { MenuItem, MenuList, Paper, withStyles } from 'components/material-ui';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import withIATA from 'smartComponents/IATA/withIATA';
import { Data, Text } from 'ugcomponents/Inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { capitalizeWords } from 'utils/stringAdditions';
import P, { H6 } from 'viewComponents/Typography';
import { withFirebase } from 'lib/firebase';

const style = {
  hidden: {
    display: 'none',
  },
  menuItem: {
    padding: 6,
  },
};

export class IATASearchField extends React.PureComponent {
  state = {
    textFieldValue: null,
    textFieldFocused: false,
    menuData: null,
    cityName: undefined,
    iataCode: undefined,
    timeZoneId: undefined,
  };

  getValue = key => {
    const s = this.state[key];
    return s === undefined ? this.props[key] : s;
  };

  getCityName = () => this.getValue('cityName');

  getIataCode = () => this.getValue('iataCode');

  getTimeZoneId = () => this.getValue('timeZoneId');

  parseAirportItems = items => {
    const validItems = _.filter(
      items,
      airport => !!airport && !!_.trim(airport.iata),
    );
    return _.take(validItems, 7);
  };

  handleApiResponse = res => {
    const { city, name, iata, timezone } = res;
    const merged = _.unionBy(city, name, iata, timezone, 'iata');

    this.setState({
      menuData: merged.length ? this.parseAirportItems(merged) : null,
    });
  };

  handleTextFieldBlur = event => {
    // HACK: Waits for menu item click to trigger, handle properly in reusable suggest component
    setTimeout(() => {
      this.setState({ textFieldFocused: false });
      this.props.onBlur(event);
    }, 200);
  };

  handleTextFieldFocus = () => {
    this.setState({ textFieldFocused: true });
  };

  handleTextFieldChange = fieldValue => {
    const { iata } = this.props;

    let value = fieldValue;

    if (typeof fieldValue === 'object') {
      value = fieldValue.target.value;
    }

    this.handleChange('', '', null);

    if (value) {
      const params = {
        field: 'all',
        value: capitalizeWords(value),
        operator: 'startswith',
      };
      iata.api(params, this.handleApiResponse);
    }

    this.setState({ textFieldValue: value });
  };

  handleMenuItemClick = data => () => {
    const { iata, tzzone } = data;

    if (this.input.setValue) {
      LOGIC_HELPERS.ifFunction(this.input.setValue, [
        this.renderAiportName(data),
      ]);
    }
    this.handleChange(iata, tzzone, data);
  };

  handleChange = (iataCode, timeZoneId, data) => {
    const cityName = this.renderCityName(data);

    this.setState({ iataCode, timeZoneId, cityName });

    this.props.onChange({
      airportName: this.renderAiportName(data),
      cityName,
      iataCode,
      timeZoneId,
      data,
    });
  };

  handleRef = key => ref => {
    this[key] = ref;
  };

  renderAiportName = data => {
    if (data) {
      const { name, iata } = data;
      return `${name} (${iata})`;
    }

    return '';
  };

  renderCityName = data => {
    if (data) {
      const { city, country } = data;
      return `${city}, ${country}`;
    }

    return '';
  };

  renderMenuItem = data => {
    const { classes } = this.props;
    return (
      <MenuItem
        className={classes.menuItem}
        key={data.iata}
        onClick={this.handleMenuItemClick(data)}
      >
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <P dense>{this.renderAiportName(data)}</P>
          </GridItem>
          <GridItem>
            <H6 dense>{this.renderCityName(data)}</H6>
          </GridItem>
        </GridContainer>
      </MenuItem>
    );
  };

  renderMenuItems = () => {
    const { menuData } = this.state;

    if (menuData) {
      return menuData.map(this.renderMenuItem);
    }

    return <MenuItem>No results</MenuItem>;
  };

  renderMenu = () => {
    const { classes } = this.props;
    const { textFieldValue, textFieldFocused } = this.state;
    const open = !!textFieldValue && !!textFieldFocused;
    const className = open ? null : classes.hidden;

    // TODO: Use popper once material ui is upgraded or wait for reusable suggest component
    return (
      <Paper className={className}>
        <MenuList className={classes.menuList}>
          {this.renderMenuItems()}
        </MenuList>
      </Paper>
    );
  };

  render = () => {
    const {
      classes,
      onChange,
      onBlur,
      cityName,
      cityNameProps,
      iataCode,
      iataCodeProps,
      timeZoneId,
      timeZoneIdProps,
      component: Component,
      ...rest
    } = this.props;
    return (
      <React.Fragment>
        <Component
          innerRef={this.handleRef('input')}
          onBlur={this.handleTextFieldBlur}
          onFocus={this.handleTextFieldFocus}
          onChange={this.handleTextFieldChange}
          {...rest}
        />
        {cityNameProps && (
          <Data
            value={cityName}
            currentValue={this.getCityName()}
            {...cityNameProps}
          />
        )}
        {iataCodeProps && (
          <Data
            value={iataCode}
            currentValue={this.getIataCode()}
            {...iataCodeProps}
          />
        )}
        {timeZoneIdProps && (
          <Data
            value={timeZoneId}
            currentValue={this.getTimeZoneId()}
            {...timeZoneIdProps}
          />
        )}
        {this.renderMenu()}
      </React.Fragment>
    );
  };
}

IATASearchField.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  iata: PropTypes.object.isRequired,

  // parent
  component: PropTypes.node,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  cityName: PropTypes.string,
  cityNameProps: PropTypes.object,
  iataCode: PropTypes.string,
  iataCodeProps: PropTypes.object,
  timeZoneId: PropTypes.string,
  timeZoneIdProps: PropTypes.object,

  autoComplete: PropTypes.string,
};

IATASearchField.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  cityName: '',
  cityNameProps: null,
  iataCode: '',
  iataCodeProps: null,
  timeZoneId: '',
  timeZoneIdProps: null,

  autoComplete: 'off',
  component: Text,
};

export default compose(
  withStyles(style, { name: 'smartComponents/Inputs/IATASearchField' }),
  withFirebase,
  withIATA(),
)(IATASearchField);

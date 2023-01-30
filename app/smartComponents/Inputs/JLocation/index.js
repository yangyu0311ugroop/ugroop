import TextField from '@material-ui/core/TextField';
import { THE_BIG_DOT } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Img from 'components/Img';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import Popper from 'components/Popper';
import get from 'lodash/get';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import GoogleLogo from 'shareAssets/powered_by_google_on_white.png';
import withFindDetail from 'smartComponents/Google/hoc/withFindDetail';
import withFindTimeZone from 'smartComponents/Google/hoc/withFindTimeZone';
import withPlacesAutocomplete from 'smartComponents/Google/hoc/withPlacesAutocomplete';
import Icon from 'ugcomponents/Icon';
import LoadingText from 'ugcomponents/Progress/LoadingText';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import styles from './styles';

export class JLocation extends PureComponent {
  state = {
    suggestions: [],
    selectedIndex: -1,
    loading: false,
    inputValue: this.props.defaultValue,
  };

  componentWillMount = () => {
    this.loadingInput = {
      endAdornment: <LoadingText />,
    };
  };

  componentDidMount = () => {
    const { isEditMode, defaultValue, types, findPlaces } = this.props;
    if (isEditMode) {
      this.findPlaceDetail();
    }

    if (defaultValue) {
      LOGIC_HELPERS.ifFunction(findPlaces, [
        {
          input: defaultValue,
          types,
        },
        this.fetchPlacesCallback,
      ]);
    }
  };

  componentWillReceiveProps = nextProps => {
    const { timestamp, findTimeZone } = this.props;
    const { geocode } = this.state;

    if (nextProps.timestamp !== timestamp && geocode) {
      const request = {
        ...geocode,
        timestamp: nextProps.timestamp,
      };

      findTimeZone(request, this.findTimeZoneCallback());
    }
  };

  handleClear = () => {
    const { onClear } = this.props;

    this.clearData();

    this.setState({ inputValue: '', suggestions: [] });

    LOGIC_HELPERS.ifFunction(onClear, []);

    if (this.input) {
      this.input.focus();
    }
  };

  handleRef = r => {
    this.input = r;
  };

  ownProps = () => ({
    ...omit(this.props, [
      'classes',
      // text field props
      'onFocus',
      'onBlur',
      'onKeyDown',
      // places api
      'findPlaces',
      'findDetail',
      'findTimeZone',
      // parent props
      'allowInput',
      'onSelect',
      'onChange',
      'onFetch',
    ]),
  });

  clearData = () => {
    const { allowInput } = this.props;
    const { selectedIndex } = this.state;

    // if user didn't select, clear the input value
    if (!allowInput && selectedIndex === -1) {
      this.setState({ inputValue: '' });
    }

    this.setState({
      loading: false,
    });
  };

  fetchPlaces = ({ openMenu } = {}) => event => {
    const { onChange, findPlaces, types } = this.props;

    const {
      target: { value: input },
    } = event;

    this.setState({
      selectedIndex: -1,
      inputValue: input,
      geocode: null,
    });

    LOGIC_HELPERS.ifFunction(onChange, [input]);
    LOGIC_HELPERS.ifFunction(openMenu, [event]);

    if (!input) {
      this.setState({
        suggestions: [],
        loading: false,
      });
    } else {
      this.setState({
        loading: true,
      });
    }

    LOGIC_HELPERS.ifFunction(findPlaces, [
      {
        input,
        types,
      },
      this.fetchPlacesCallback,
    ]);
  };

  fetchPlacesCallback = (results, status) => {
    // const { airport } = this.props;
    this.setState({ selectedIndex: -1, loading: false });

    if (status !== 'OK') {
      return this.setState({ suggestions: [], selectedIndex: -1 });
    }

    const suggestions = results.reduce(
      (
        accu,
        {
          place_id: placeId,
          structured_formatting: { main_text: main, secondary_text: secondary },
          distance_meters: distance,
          types,
        },
      ) =>
        accu.concat({
          placeId,
          name: main,
          address: secondary,
          distance,
          types,
        }),
      [],
    );

    return this.setState({ suggestions });
  };

  handleBlur = ({ closeMenu }) => event => {
    const { inputValue } = this.state;

    if (inputValue) return null;

    this.clearData();
    return LOGIC_HELPERS.ifFunction(closeMenu, [event]);
  };

  handleFocus = ({ openMenu }) => event => {
    // const { inputValue } = this.state;

    // if (inputValue) {
    //   this.fetchPlaces(inputValue);
    // }

    LOGIC_HELPERS.ifFunction(openMenu, [event]);
  };

  selectSuggestion = ({ closeMenu, index }) => event => {
    const { suggestions } = this.state;

    // select a place, find place detail
    if (index < suggestions.length) {
      this.findPlaceDetail(index);
    }

    LOGIC_HELPERS.ifFunction(closeMenu, [event]);
  };

  findPlaceDetail = index => {
    const { findDetail, onFetch, isEditMode } = this.props;
    const { suggestions } = this.state;

    if (isEditMode) {
      const { defaultValue, placeId } = this.props;

      this.setState({
        inputValue: defaultValue,
      });

      return findDetail({ placeId }, this.findDetailCallback());
    }

    if (index === -1) return null;

    const suggestion = suggestions[index];

    if (!suggestion) return null;

    this.setState({
      selectedIndex: index,
    });

    LOGIC_HELPERS.ifFunction(onFetch, [true]);

    const { placeId } = suggestion;

    // find place detail
    return findDetail({ placeId }, this.findDetailCallback(suggestion));
  };

  findDetailCallback = (suggestion = {}) => (place, status) => {
    const {
      findTimeZone,
      timestamp,
      onFetch,
      onSelect,
      useFormattedAddress,
      onChange,
    } = this.props;

    const lat = get(place, 'geometry.location.lat');
    const lng = get(place, 'geometry.location.lng');

    if (!place || status !== 'OK' || !lat || !lng) {
      LOGIC_HELPERS.ifFunction(onFetch, [false]);
      LOGIC_HELPERS.ifFunction(onSelect, [{ suggestion, place }]);
      return null;
    }

    const placeName = LOGIC_HELPERS.ifElse(
      useFormattedAddress,
      place.formatted_address,
      suggestion.name,
    );

    this.setState({
      inputValue: placeName,
    });

    LOGIC_HELPERS.ifFunction(onChange, [placeName]);

    const latitude = lat();
    const longitude = lng();

    const request = {
      latitude,
      longitude,
      timestamp,
    };

    this.setState({
      geocode: {
        latitude,
        longitude,
      },
    });

    return findTimeZone(
      request,
      this.findTimeZoneCallback({
        suggestion,
        place,
        geocode: {
          lat: latitude,
          lng: longitude,
        },
      }),
    );
  };

  findTimeZoneCallback = (params = {}) => timezone => {
    const { onSelect, onFetch } = this.props;

    LOGIC_HELPERS.ifFunction(onFetch, [false]);
    LOGIC_HELPERS.ifFunction(onSelect, [{ timezone, ...params }]);
  };

  handleKey = ({
    open,
    openMenu,
    closeMenu,
    selectedIndex,
    suggestions = [],
  } = {}) => event => {
    const { onKeyDown, allowInput } = this.props;

    LOGIC_HELPERS.ifFunction(onKeyDown, [event]);

    const maxIndex = LOGIC_HELPERS.ifElse(
      allowInput,
      suggestions.length,
      suggestions.length - 1,
    );

    // down
    if (event.key === 'ArrowUp') {
      event.preventDefault();

      if (!open) {
        LOGIC_HELPERS.ifFunction(openMenu, [event]);
      }

      return this.setState({
        selectedIndex: LOGIC_HELPERS.ifElse(
          selectedIndex > 0,
          selectedIndex - 1,
          maxIndex,
        ),
      });
    }

    // up
    if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (!open) {
        LOGIC_HELPERS.ifFunction(openMenu, [event]);
      }

      return this.setState({
        selectedIndex: LOGIC_HELPERS.ifElse(
          selectedIndex < maxIndex,
          selectedIndex + 1,
          0,
        ),
      });
    }

    // enter
    if (event.key === 'Enter') {
      event.preventDefault();

      return this.selectSuggestion({ closeMenu, index: selectedIndex })(event);
    }

    // esc
    if (event.key === 'Escape') {
      event.preventDefault();

      return open && LOGIC_HELPERS.ifFunction(closeMenu, [event]);
    }

    return true;
  };

  handleSelectManually = closeMenu => event => {
    const { onSelectManually } = this.props;

    LOGIC_HELPERS.ifFunction(onSelectManually, [event]);
    LOGIC_HELPERS.ifFunction(closeMenu, [event]);
  };

  renderSelectText = (inputValue, selected, closeMenu) => {
    const { classes, allowInput } = this.props;

    if (allowInput && inputValue) {
      return (
        <GridItem
          onClick={this.handleSelectManually(closeMenu)}
          className={classnames(
            classes.itemHover,
            LOGIC_HELPERS.ifElse(selected, classes.navigationItem),
            classes.borderTop,
          )}
        >
          <GridContainer
            alignItems="center"
            spacing={0}
            className={classnames(classes.item)}
            wrap="nowrap"
          >
            <GridItem>
              <JText nowrap gray>
                Just use&nbsp;
              </JText>
            </GridItem>
            <GridItem>
              <JText ellipsis bold>
                {inputValue}
              </JText>
            </GridItem>
          </GridContainer>
        </GridItem>
      );
    }

    return (
      <>
        There are no results for <i>{inputValue}</i>. Please enter city, region
        or country.
      </>
    );
  };

  renderIcons = types => (
    <>
      {types.indexOf('lodging') !== -1 && (
        <GridItem>
          <Icon size="xsmall" icon="lnr-bed" color="accommodation" />
        </GridItem>
      )}
      {types.indexOf('airport') !== -1 && (
        <GridItem>
          <Icon size="xsmall" icon="ug-departure3" color="transportation" />
        </GridItem>
      )}
      {types.indexOf('cafe') !== -1 ? (
        <GridItem>
          <Icon size="xsmall" icon="lnr-glass2" color="food" />
        </GridItem>
      ) : (
        (types.indexOf('food') !== -1 ||
          types.indexOf('restaurant') !== -1) && (
          <GridItem>
            <Icon size="xsmall" icon="lnr-dinner" color="food" />
          </GridItem>
        )
      )}
    </>
  );

  renderSuggestion = ({ closeMenu, selectedIndex }) => (
    { name, address, placeId, types = [] },
    index,
  ) => {
    const { classes } = this.props;

    return (
      <GridItem
        key={placeId}
        onClick={this.selectSuggestion({ closeMenu, index })}
        className={classnames(
          classes.itemHover,
          LOGIC_HELPERS.ifElse(index === selectedIndex, classes.navigationItem),
          LOGIC_HELPERS.ifElse(index > 0, classes.borderTop),
        )}
      >
        <GridContainer direction="column" spacing={0} className={classes.item}>
          <GridItem>
            <GridContainer alignItems="center" wrap="nowrap">
              <GridItem>
                <JText bold ellipsis>
                  {name}
                </JText>
              </GridItem>
              {this.renderIcons(types)}
            </GridContainer>
          </GridItem>

          <GridItem>
            <GridContainer alignItems="center" wrap="nowrap">
              {types.length > 0 && (
                <GridItem>
                  <JText nowrap sm gray capitalize>
                    {types[0].split('_').join(' ')}
                  </JText>
                </GridItem>
              )}

              <GridItem>
                <JText gray>{THE_BIG_DOT}</JText>
              </GridItem>

              <GridItem>
                <JText sm gray ellipsis>
                  {address}
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>

          <GridItem />
        </GridContainer>
      </GridItem>
    );
  };

  renderSuggestions = ({
    inputValue,
    closeMenu,
    suggestions,
    selectedIndex,
  }) => {
    const { allowInput } = this.props;

    return (
      <>
        {suggestions.map(this.renderSuggestion({ closeMenu, selectedIndex }))}
        {allowInput &&
          this.renderSelectText(
            inputValue,
            selectedIndex === suggestions.length,
            closeMenu,
          )}
      </>
    );
  };

  clearSelected = () => {
    const { clearData } = this.props;

    LOGIC_HELPERS.ifFunction(clearData);
    this.setState({ inputValue: '' });
  };

  renderButton = params => {
    const { textComponent: TextComponent } = this.props;

    return (
      <TextComponent
        value={params.inputValue}
        fullWidth
        onFocus={this.handleFocus(params)}
        onBlur={this.handleBlur(params)}
        onChange={this.fetchPlaces(params)}
        onKeyDown={this.handleKey(params)}
        InputProps={LOGIC_HELPERS.ifElse(params.loading, this.loadingInput)}
        inputRef={this.handleRef}
        helperText={LOGIC_HELPERS.ifElse(
          params.valueSelected,
          <GridContainer alignItems="center">
            <GridItem>
              <JText link onClick={this.clearSelected}>
                Clear place data
              </JText>
            </GridItem>
          </GridContainer>,
        )}
        {...this.ownProps()}
      />
    );
  };

  renderMenu = params => {
    const { classes } = this.props;

    return (
      <GridContainer direction="column">
        {this.renderSuggestions(params)}
        {params.inputValue && params.suggestions.length > 0 && (
          <GridItem>
            <GridContainer alignItems="center" className={classes.menuFooter}>
              <GridItem>
                <Img src={GoogleLogo} alt="Powered by Google" />
              </GridItem>
            </GridContainer>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  render = () => {
    const { classes, destinations, label, valueSelected } = this.props;
    const { inputValue, suggestions, loading, selectedIndex } = this.state;

    return (
      <Popper
        open={!!inputValue}
        placement="bottom-start"
        renderButton={this.renderButton}
        quarterPadding
        className={classes.popper}
        suggestions={suggestions}
        inputValue={inputValue}
        onExit={this.clearData}
        loading={loading}
        selectedIndex={selectedIndex}
        destinations={destinations}
        label={label}
        fullWidth
        disableFullScreen
        valueSelected={valueSelected}
      >
        {this.renderMenu}
      </Popper>
    );
  };
}

JLocation.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  findPlaces: PropTypes.func.isRequired,
  findDetail: PropTypes.func.isRequired,
  findTimeZone: PropTypes.func.isRequired,

  // parent props
  defaultValue: PropTypes.string,
  valueSelected: PropTypes.string,
  label: PropTypes.string,
  timestamp: PropTypes.number,
  destinations: PropTypes.array,
  types: PropTypes.array,
  onSelect: PropTypes.func,
  onClear: PropTypes.func,
  onSelectManually: PropTypes.func,
  onChange: PropTypes.func,
  onFetch: PropTypes.func,
  clearData: PropTypes.func,
  onKeyDown: PropTypes.func,
  allowInput: PropTypes.bool,
  fullWidth: PropTypes.bool,
  isEditMode: PropTypes.bool,
  useFormattedAddress: PropTypes.bool,
  placeId: PropTypes.string,
  textComponent: PropTypes.node,

  // resaga props
  geocode: PropTypes.object,
};

JLocation.defaultProps = {
  destinations: [],
  isEditMode: false,

  textComponent: TextField,
};

export default compose(
  withStyles(styles, { name: 'JLocation' }),
  withFindTimeZone,
  withFindDetail,
  withPlacesAutocomplete,
)(JLocation);

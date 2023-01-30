import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { CardHeader, CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import googleMapLoader from 'react-google-maps-loader';
import { compose } from 'redux';
import resaga from 'resaga';
import { get } from 'lodash';
import classnames from 'classnames';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { STRING_ADDITIONS } from 'utils/stringAdditions';
import momentHelpers from 'utils/helpers/moment';
import timeZoneHelpers from 'utils/helpers/timeZone';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import Hidden from '@material-ui/core/Hidden';
import { CACHE_PLACES_TIMEZONES_UTILS } from 'datastore/geocodeStore/utils';

import { CONFIG } from './config';
import styles from './styles';

export class PlaceDetail extends PureComponent {
  state = {
    loading: false,
  };

  componentDidMount = () => {
    // first load
    if (this.props.placeId) {
      this.fetchPlaceDetail(this.props.placeId);
    }
  };

  componentWillReceiveProps = nextProps => {
    // placeId changed
    if (!nextProps.placeId) {
      this.setState({ name: '', address: '' });
    } else if (nextProps.placeId !== this.props.placeId) {
      this.fetchPlaceDetail(nextProps.placeId);
    }
  };

  getGoogleDoW = dow => (dow === 0 ? 6 : dow - 1); // google Day of Week starts from Monday

  setLoading = loading => {
    const { onLoadingChange } = this.props;
    this.setState({ loading });
    onLoadingChange(loading);
  };

  initService = () => {
    const { googleMaps } = this.props;

    if (!googleMaps || !googleMaps.places) return null;

    this.service = new googleMaps.places.PlacesService(
      document.createElement('div'),
    );

    return this.service;
  };

  fetchPlaceDetail = placeId => {
    const { handleChange } = this.props;

    this.setLoading(true);

    if (handleChange) handleChange('placeId')(placeId);

    const cachedPlace = CACHE_PLACES_TIMEZONES_UTILS.getCachePlaces(placeId);
    const cacheTimezone = CACHE_PLACES_TIMEZONES_UTILS.getCacheTimezones(
      placeId,
    );

    // If place id is available on cached data then return;
    if (cachedPlace && cacheTimezone) {
      return this.fetchTimeZoneSuccess(cachedPlace)(null, cacheTimezone, true);
    }

    if (!this.service) this.initService();

    if (!this.service) return null;

    // call Google Places API
    // this one returns a Google-style callback (place, status) on success
    // not sure how to make it through resaga
    return this.service.getDetails(
      { placeId },
      this.fetchDetailSuccess(placeId),
    );
  };

  fetchDetailSuccess = placeId => (place, status) => {
    const { googleMaps } = this.props;

    if (status === googleMaps.places.PlacesServiceStatus.OK) {
      CACHE_PLACES_TIMEZONES_UTILS.cachePlaces(placeId, place);
      this.fetchPlaceTimeZone(place);
    } else {
      this.setLoading(false);
    }
  };

  fetchPlaceTimeZone = place => {
    const { geometry } = place;

    return timeZoneHelpers.fetchTimeZone(
      {
        latitude: geometry.location.lat(),
        longitude: geometry.location.lng(),
      },
      this.fetchTimeZoneSuccess(place),
    );
  };

  fetchTimeZoneSuccess = place => (error, result, fromCache = false) => {
    const { handleChange } = this.props;
    const geometry = get(place, 'geometry', null);
    const fullAddress = get(place, 'address_components', []);

    const countryArray = fullAddress.filter(
      address => !address.types.indexOf('country'),
    );
    const {
      short_name: countryShort,
      long_name: countryLong,
    } = countryArray[0] || { short_name: '', long_name: '' };

    // TODO: Handle error

    if (!error && result.status === 'OK') {
      const { timeZoneId } = result;
      const latitude = geometry ? geometry.location.lat() : 0;
      const longtitude = geometry ? geometry.location.lng() : 0;
      const {
        name,
        formatted_address: address,
        icon,
        website,
        url,
        international_phone_number: intlPhone,
        formatted_phone_number: phone,
        photos,
        place_id: placeId,
      } = place;

      if (!fromCache) {
        CACHE_PLACES_TIMEZONES_UTILS.cacheTimezones(placeId, result);
      }

      this.setState({
        name,
        address,
        icon,
        timeZoneId,
        website,
        url,
        phone: intlPhone || phone,
        photos,
      });
      if (handleChange) {
        handleChange('name')(name);
        handleChange('url')(url);
        handleChange('icon')(icon);
        handleChange('countryShort')(countryShort);
        handleChange('countryLong')(countryLong);
        handleChange('timeZoneId')(timeZoneId);
        handleChange('latitude')(latitude);
        handleChange('longtitude')(longtitude);
      }
    }

    this.setLoading(false);
  };

  handleClose = event => {
    const { onClose } = this.props;
    LOGIC_HELPERS.ifFunction(onClose, [event]);
  };

  handleMouseEnter = event => {
    const { onMouseEnter } = this.props;
    if (onMouseEnter) onMouseEnter(event);
  };

  handleMouseLeave = event => {
    const { onMouseLeave } = this.props;
    if (onMouseLeave) onMouseLeave(event);
  };

  renderImage = () => {
    const { classes } = this.props;
    const { name, photos } = this.state;

    let img;
    // if exist, get the first photo
    if (photos && photos.length) {
      img = photos[0].getUrl({ maxWidth: 400, maxHeight: 400 });
    }

    if (!img) return '';

    return <CardMedia className={classes.media} image={img} title={name} />;
  };

  renderWebsite = () => {
    const { website } = this.state;

    let shortenWebsite;
    if (website) {
      try {
        shortenWebsite = new URL(website).origin;
      } catch (e) {
        shortenWebsite = website;
      }
    }

    return shortenWebsite;
  };

  renderCurrentTime = time => {
    const { classes, hideCurrentTime } = this.props;
    if (hideCurrentTime) return null;
    const localTime = momentHelpers.renderCurrentDayDateTimeZone(time);
    return (
      !hideCurrentTime && (
        <GridItem>
          <GridContainer justify="space-between" direction="column" spacing={0}>
            <GridItem className={classes.label}>
              Date & Time at Location
            </GridItem>
            <GridItem className={classes.content}>{localTime}</GridItem>
          </GridContainer>
        </GridItem>
      )
    );
  };

  renderPhoneLink = phone => {
    const phoneNoWhiteSpace = STRING_ADDITIONS.removeWhitespace(phone);
    return <a href={`tel:${phoneNoWhiteSpace}`}>{phone}</a>;
  };

  handleViewMap = ev => {
    ev.stopPropagation();
  };

  renderDetail = timeMoment => {
    const { classes } = this.props;
    const { timeZoneId, website, phone, url } = this.state;

    const time = timeMoment.tz(timeZoneId);
    const shortenWebsite = this.renderWebsite();

    return (
      <GridContainer direction="column" className={classes.detail}>
        {this.renderCurrentTime(time)}

        {phone && (
          <GridItem>
            <GridContainer
              justify="space-between"
              direction="column"
              spacing={0}
            >
              <GridItem className={classes.label}>Phone Number</GridItem>
              <GridItem className={classes.content}>
                {this.renderPhoneLink(phone)}
              </GridItem>
            </GridContainer>
          </GridItem>
        )}

        {website && (
          <GridItem>
            <GridContainer
              justify="space-between"
              direction="column"
              spacing={0}
            >
              <GridItem className={classes.label}>Website</GridItem>
              <GridItem>
                <a href={website} target="_blank">
                  {shortenWebsite}
                </a>
              </GridItem>
            </GridContainer>
          </GridItem>
        )}

        {url && (
          <GridItem className={classes.alignRight}>
            <GridContainer spacing={0} alignItems="flex-end">
              <GridItem xs={6} />
              <GridItem xs={6}>
                <Button
                  dense
                  size="small"
                  href={url}
                  target="_blank"
                  onClick={this.handleViewMap}
                >
                  VIEW MAP
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  render = () => {
    const { classes, hide } = this.props;
    const { loading, icon, name, address } = this.state;

    if (hide) return <span />;

    if (loading) return <div>Loading..</div>;

    if (!name || !address) return <span />;

    const title = (
      <GridContainer alignItems="flex-start">
        <GridItem xs={11}>{name}</GridItem>
        <GridItem xs={1}>
          <Hidden mdUp>
            <Button
              onClick={this.handleClose}
              icon="cross"
              size="extraSmall"
              iconButton
              color="black"
              dense
              variant={VARIANTS.INLINE}
              className={classes.closeBtn}
            />
          </Hidden>
        </GridItem>
      </GridContainer>
    );

    return (
      <GridContainer
        className={classes.root}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <GridItem className={classes.zIndex}>
          <GridContainer className={classes.locationContainer} spacing={0}>
            <GridItem className={classnames(classes.grow, classes.borderRight)}>
              <CardHeader
                avatar={<img src={icon} alt={name} width="30" height="30" />}
                title={title}
                subheader={address}
                classes={{ title: classes.name, subheader: classes.address }}
              />
              {this.renderImage()}
            </GridItem>
            <GridItem className={classes.detailContainer}>
              {this.renderDetail(moment())}
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

PlaceDetail.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  googleMaps: PropTypes.object.isRequired,

  // parent props
  placeId: PropTypes.string,
  hide: PropTypes.bool,
  hideCurrentTime: PropTypes.bool,
  handleChange: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onLoadingChange: PropTypes.func,
  onClose: PropTypes.func,

  // resaga props
};

PlaceDetail.defaultProps = {
  placeId: '',
  hide: false,
  hideCurrentTime: false,
  onLoadingChange: () => {},
};

export default compose(
  withStyles(styles, { name: 'PlaceDetail' }),
  resaga(CONFIG),
)(
  googleMapLoader(PlaceDetail, {
    libraries: ['places'],
    key: process.env.GOOGLE_MAPS_API_KEY,
  }),
);

/**
 * Created by quando on 13/3/17.
 * based on Vince
 * Implementation of React Google Places Suggest component
 * ************************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import PlacesSuggest from 'react-google-places-suggest';
import googleMapLoader from 'react-google-maps-loader';
import SuggestItem from './components/SuggestItem';
import styles from './styles';
export const defaultFunc = () => {};
export class UGPlacesSuggest extends React.Component {
  state = {
    value: '',
  };

  componentWillMount = () => {
    this.suggestComponentRestrictions = {};
  };

  /**
   * only update this component when search value changed
   * @param _
   * @param value
   */
  shouldComponentUpdate = (nextProps, { value }) =>
    value !== this.state.value ||
    nextProps.openSuggest !== this.props.openSuggest;

  /**
   * update address state and child component value
   * @param value
   */
  setAddress = value => {
    this.setState({ value });
    this.address.setValue(value);
  };

  /**
   * update value when user selected an address from the suggested list and hide the loading icon
   * @param suggest
   */
  handleSelectSuggest = suggest => {
    const { onSelectSuggest } = this.props;

    this.setAddress(suggest.description);

    onSelectSuggest(suggest);
  };

  /**
   * listen to change value action from child component
   * @param value
   */
  handleChange = value => {
    const { onChange } = this.props;

    this.setAddress(value);

    onChange(value);
  };

  /**
   * get a reference of the child component
   * @param r
   */
  handleRef = r => {
    this.address = r;
  };

  /**
   * manually render suggestion list
   * @param mainText
   * @param secondaryText
   */
  renderSuggest = ({
    structured_formatting: {
      main_text: mainText,
      secondary_text: secondaryText,
    },
  }) => <SuggestItem mainText={mainText} secondaryText={secondaryText} />;

  render() {
    const { classes, absolute, googleMaps, children } = this.props;

    /**
     * if children is a component, we pass in the onChange prop to get its value
     * innerRef to set value when needed
     * and addon to show the loading icon (see Metronic/InputGroup for example)
     * @type {UGPlacesSuggest.props.children}
     */
    const content = React.cloneElement(children, {
      onChange: this.handleChange,
      innerRef: this.handleRef,
    });
    return (
      <div className={classnames(classes.root, absolute && classes.absolute)}>
        <PlacesSuggest
          googleMaps={googleMaps}
          search={this.state.value}
          renderSuggest={this.renderSuggest}
          onSelectSuggest={this.handleSelectSuggest}
          suggestComponentRestrictions={this.suggestComponentRestrictions}
          activeClassName={classes.activeClassName}
          isDropdownOpen={this.props.openSuggest}
        >
          {content}
        </PlacesSuggest>
      </div>
    );
  }
}

UGPlacesSuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  googleMaps: PropTypes.any.isRequired,
  children: PropTypes.any,
  onChange: PropTypes.func,
  onSelectSuggest: PropTypes.func,
  openSuggest: PropTypes.bool,
  absolute: PropTypes.bool,
};

UGPlacesSuggest.defaultProps = {
  onChange: defaultFunc,
  onSelectSuggest: defaultFunc,
  openSuggest: false,
  absolute: true,
};

/**
 * wrapped inside googleMapLoader which auto-inject googleMaps API object with `places` library
 */
const wrapped = googleMapLoader(UGPlacesSuggest, {
  libraries: ['places'],
  key: process.env.GOOGLE_MAPS_API_KEY,
});

export default compose(withStyles(styles, { name: 'Google-PlaceSuggest' }))(
  wrapped,
);

/**
 * Created by stephenkarpinskyj on 31/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { EVENT_CONSTANTS } from 'utils/constants/events';

export class ForEachEventVariant extends React.Component {
  renderFirst = (...renders) => {
    let r;

    for (let i = 0; i < renders.length; i += 1) {
      r = renders[i];
      if (r) break;
    }

    if (!r) r = this.props.renderDefault;
    return (typeof r === 'function' ? r() : r) || null;
  };

  render = () => {
    const {
      variant,
      renderEditableForm,
      renderEditableHeading,
      renderEditableHeadingForm,
      renderField,
      renderLabel,
      renderLabelHeading,
      renderLabelValue,
      renderLabelValueStacked,
      renderLabelValueFlag,
      renderLabelValueWithInfo,
      renderIcon,
      renderCard,
      renderOption,
      renderData,
      renderValueOnly,
      renderProp,
      renderLocationPopper,
      renderSingleLocation,
    } = this.props;

    switch (variant) {
      case EVENT_CONSTANTS.VARIANTS.editableForm:
        return this.renderFirst(renderEditableForm);

      case EVENT_CONSTANTS.VARIANTS.editableHeading:
        return this.renderFirst(renderEditableHeading);

      case EVENT_CONSTANTS.VARIANTS.editableHeadingForm:
        return this.renderFirst(renderEditableHeadingForm);

      case EVENT_CONSTANTS.VARIANTS.field:
        return this.renderFirst(renderField);

      case EVENT_CONSTANTS.VARIANTS.label:
        return this.renderFirst(renderLabel);

      case EVENT_CONSTANTS.VARIANTS.labelValueWithHomeTime:
        return this.renderFirst(renderLabelValueWithInfo);

      case EVENT_CONSTANTS.VARIANTS.labelHeading:
        return this.renderFirst(renderLabelHeading);

      case EVENT_CONSTANTS.VARIANTS.labelValue:
        return this.renderFirst(renderLabelValue);

      case EVENT_CONSTANTS.VARIANTS.labelValueStacked:
        return this.renderFirst(renderLabelValueStacked);

      case EVENT_CONSTANTS.VARIANTS.labelValueFlag:
        return this.renderFirst(renderLabelValueFlag);

      case EVENT_CONSTANTS.VARIANTS.icon:
        return this.renderFirst(renderIcon);

      case EVENT_CONSTANTS.VARIANTS.card:
        return this.renderFirst(renderCard);

      case EVENT_CONSTANTS.VARIANTS.option:
        return this.renderFirst(renderOption);

      case EVENT_CONSTANTS.VARIANTS.data:
        return this.renderFirst(renderData);

      case EVENT_CONSTANTS.VARIANTS.valueOnly:
        return this.renderFirst(renderValueOnly);

      case EVENT_CONSTANTS.VARIANTS.renderProp:
        return this.renderFirst(renderProp);

      case EVENT_CONSTANTS.LOCATION_TYPES.Popper:
        return this.renderFirst(renderLocationPopper);

      case EVENT_CONSTANTS.LOCATION_TYPES.SingleLocation:
        return this.renderFirst(renderSingleLocation);

      default:
        return this.renderFirst();
    }
  };
}

ForEachEventVariant.propTypes = {
  // parent
  variant: PropTypes.string,
  renderDefault: PropTypes.any,
  renderEditableForm: PropTypes.any,
  renderEditableHeading: PropTypes.any,
  renderEditableHeadingForm: PropTypes.any,
  renderField: PropTypes.any,
  renderLabel: PropTypes.any,
  renderLabelHeading: PropTypes.any,
  renderLabelValue: PropTypes.any,
  renderLabelValueStacked: PropTypes.any,
  renderLabelValueFlag: PropTypes.any,
  renderIcon: PropTypes.any,
  renderCard: PropTypes.any,
  renderOption: PropTypes.any,
  renderData: PropTypes.any,
  renderValueOnly: PropTypes.any,
  renderProp: PropTypes.func,
  renderLocationPopper: PropTypes.func,
  renderSingleLocation: PropTypes.func,
  renderLabelValueWithInfo: PropTypes.func,
};

ForEachEventVariant.defaultProps = {
  variant: null,
};

export default ForEachEventVariant;

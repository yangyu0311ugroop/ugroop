import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { convertStyleClass } from 'utils/style-utils';
import { H1, H2, H3, H4, H5, H6, TITLE, SPAN } from 'utils/constants/fontTypes';
import omit from 'lodash/omit';

import style from './style';

export class Typography extends PureComponent {
  // This is necessary so that we won't pass props that are not needed
  // for h1, h2, h3 - p tags since react complains about it
  getFilteredProps = () =>
    omit(this.props, [
      'classes',
      'type',
      'className',
      'children',
      'weight',
      'dense',
      'error',
      'success',
      'primary',
      'noMargin',
      'transform',
      'fontStyle',
      'textAlign',
      'letterSpace',
      'subtitle',
      'lavender',
      'white',
    ]);

  renderTypography = defaultClassNames => {
    const { type, classes, children } = this.props;

    switch (type) {
      case H1:
        return (
          <h1
            {...this.getFilteredProps()}
            className={classnames(classes.h1FontSize, defaultClassNames)}
          >
            {children}
          </h1>
        );
      case H2:
        return (
          <h2
            {...this.getFilteredProps()}
            className={classnames(classes.h2FontSize, defaultClassNames)}
          >
            {children}
          </h2>
        );
      case H3:
        return (
          <h3
            {...this.getFilteredProps()}
            className={classnames(classes.h3FontSize, defaultClassNames)}
          >
            {children}
          </h3>
        );
      case H4:
        return (
          <h4
            {...this.getFilteredProps()}
            className={classnames(classes.h4FontSize, defaultClassNames)}
          >
            {children}
          </h4>
        );
      case H5:
        return (
          <h5
            {...this.getFilteredProps()}
            className={classnames(classes.h5FontSize, defaultClassNames)}
          >
            {children}
          </h5>
        );
      case H6:
        return (
          <h6
            {...this.getFilteredProps()}
            className={classnames(classes.h6FontSize, defaultClassNames)}
          >
            {children}
          </h6>
        );
      case TITLE:
        return (
          <h3
            {...this.getFilteredProps()}
            className={classnames(classes.titleFontSize, defaultClassNames)}
          >
            {children}
          </h3>
        );
      case SPAN:
        return (
          <span
            {...this.getFilteredProps()}
            className={classnames(classes.spanFontSize, defaultClassNames)}
          >
            {children}
          </span>
        );
      default:
        return (
          <p
            {...this.getFilteredProps()}
            className={classnames(classes.h5FontSize, defaultClassNames)}
          >
            {children}
          </p>
        );
    }
  };

  render() {
    const {
      classes,
      className,
      weight,
      letterSpace,
      noMargin,
      dense,
      error,
      success,
      primary,
      transform,
      fontStyle,
      textAlign,
      subtitle,
      lavender,
      white,
      whiteSpace,
      color,
      lineHeight1,
      clickable,
    } = this.props;

    const defaultClassNames = classnames(
      classes.headerCommon,
      letterSpace && classes.letterSpacing,
      weight && convertStyleClass(classes, weight),
      error && convertStyleClass(classes, 'error'),
      success && convertStyleClass(classes, 'success'),
      primary && convertStyleClass(classes, 'primary'),
      lavender && convertStyleClass(classes, 'lavender'),
      white && convertStyleClass(classes, 'white'),
      transform && classes[`transform.${transform}`],
      fontStyle && classes[`fontStyle.${fontStyle}`],
      textAlign && classes[`textAlign.${textAlign}`],
      LOGIC_HELPERS.ifElse(whiteSpace, classes[`whiteSpace.${whiteSpace}`]),
      subtitle && convertStyleClass(classes, 'subtitle'),
      (noMargin || dense) && classes.noMargin,
      LOGIC_HELPERS.ifElse(color, classes[`color${color.toLowerCase()}`], ''),
      LOGIC_HELPERS.ifElse(lineHeight1, classes.lineHeight1),
      LOGIC_HELPERS.ifElse(clickable, classes.clickable),
      className,
    );

    return this.renderTypography(defaultClassNames);
  }
}

Typography.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  weight: PropTypes.string,
  dense: PropTypes.bool,
  error: PropTypes.bool,
  success: PropTypes.bool,
  primary: PropTypes.bool,
  noMargin: PropTypes.bool,
  transform: PropTypes.oneOf([
    null,
    '',
    'capitalize',
    'uppercase',
    'lowercase',
  ]),
  clickable: PropTypes.bool,
  fontStyle: PropTypes.oneOf([null, '', 'normal', 'italic']),
  textAlign: PropTypes.oneOf([null, '', 'left', 'right', 'center', 'justify']),
  letterSpace: PropTypes.bool,
  subtitle: PropTypes.bool,
  lavender: PropTypes.bool,
  whiteSpace: PropTypes.string,
  white: PropTypes.bool,
  color: PropTypes.string,
  lineHeight1: PropTypes.bool,
};

Typography.defaultProps = {
  dense: false,
  noMargin: false,
  transform: null,
  fontStyle: null,
  textAlign: null,
  subtitle: false,
  lavender: false,
  white: false,
  color: '',
  clickable: false,
};

export default withStyles(style, { name: 'Typography' })(Typography);

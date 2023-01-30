/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import { Hidden } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import H1 from 'components/H1';
import H2 from 'components/H2';
import Logo from 'ugcomponents/Logo/Logo';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import stylesheet from './styles';

const renderHeadingHelper = (
  classes,
  heading,
  headingUnderline,
  renderHeading,
  fullWidth,
) => {
  const className = classNames(
    classes.headingText,
    headingUnderline && classes.headingUnderline,
    LOGIC_HELPERS.ifElse(fullWidth, classes.fullWidth),
  );
  const renderedHeading = (
    <H2 noMargin className={className}>
      {heading}
    </H2>
  );
  if (typeof renderHeading === 'function')
    return renderHeading(renderedHeading);
  return renderedHeading;
};

const renderSubheadingHelper = (
  classes,
  subheading,
  renderSubheading,
  hideOnSm,
) => {
  const renderedSubheading = !!subheading && (
    <span className={classes.subheadingText}>{subheading}</span>
  );
  const rendered = renderSubheading
    ? renderSubheading(renderedSubheading)
    : renderedSubheading;
  return (
    rendered && (
      <Hidden smDown={hideOnSm}>
        <div className={classes.subheadingMargin}>{rendered}</div>
      </Hidden>
    )
  );
};

export const Title = ({
  classes,
  className,
  heading,
  subheading,
  headingBackground,
  headingUnderline,
  renderHeading,
  renderSubheading,
  fullWidth,
  hideOnSm,
}) => (
  <div
    data-testid="dialog-complex-title"
    className={classNames(classes.container, className)}
  >
    <div className={classNames(classes.textContainer, className)}>
      <Logo block />
      {renderHeadingHelper(
        classes,
        heading,
        headingUnderline,
        renderHeading,
        fullWidth,
      )}
      {renderSubheadingHelper(classes, subheading, renderSubheading, hideOnSm)}
    </div>
    <H1 noMargin className={classes.headingBackground}>
      <span className={classes.headingBackgroundSpan}>{headingBackground}</span>
    </H1>
  </div>
);

Title.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  className: PropTypes.string,
  heading: PropTypes.any,
  subheading: PropTypes.any,
  headingBackground: PropTypes.any,
  headingUnderline: PropTypes.bool,
  renderHeading: PropTypes.func,
  renderSubheading: PropTypes.func,
  fullWidth: PropTypes.bool,
  hideOnSm: PropTypes.bool,
};

Title.defaultProps = {
  className: null,
  heading: null,
  subheading: null,
  headingBackground: null,
  headingUnderline: true,
  renderHeading: null,
  renderSubheading: null,
  hideOnSm: true,
};

export default withStyles(stylesheet, { name: 'ComplexDialogFormTitle' })(
  Title,
);

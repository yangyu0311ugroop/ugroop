/**
 * Created by stephenkarpinskyj on 27/6/18.
 */

import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { EVENT_ICON_HELPERS } from 'containers/Templates/TemplateManagement/components/Event/components/Buttons/components/TooltipIconButton/helpers';
import PropTypes from 'prop-types';
import React from 'react';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { NODE_POSITIONS } from 'utils/constants/nodes';
import { EVENT_HELPERS } from 'utils/helpers/events';
import Icon from 'viewComponents/Icon';
import styles from './style';

export class EventIcon extends React.PureComponent {
  getShouldRender = (type, subtype) => !!type && !!subtype;

  getBoldClassName = (classes, bold) => (bold ? classes.bold : null);

  getIconColor = (color, colors) => color || colors.icon.background.default;

  showSubIcon = (type, subtype) =>
    EVENT_ICON_HELPERS.showSubIconFn(type, subtype, this.props);

  render = () => {
    const {
      classes,
      type,
      subtype,
      position,
      iconOverride,
      size,
      color,
      bold,
    } = this.props;

    const showSubIcon = this.showSubIcon(type, subtype);

    const {
      icon,
      iconEnd,
      iconOverrides,
      colors,
    } = EVENT_HELPERS.getEventSubtypeConstants(type, subtype);
    const className = classnames(this.getBoldClassName(classes, bold), {
      [classes.cyclingLineHeight]:
        subtype === EVENT_CONSTANTS.TRANSPORTATIONS.BICYCLE.type,
    });
    const props = {
      icon: EVENT_HELPERS.getEventIcon({
        icon,
        iconEnd,
        iconOverrides,
        position,
        iconOverride,
      }),
      size,
    };

    const renderedIcon = <Icon className={className} {...props} />;
    const style = {
      color: this.getIconColor(color, colors),
    };

    if (!this.getShouldRender(type, subtype)) return null;

    if (showSubIcon) {
      if (position === NODE_POSITIONS.end) {
        return (
          <span style={style}>
            <GridContainer alignItems="center" wrap="nowrap" spacing={0}>
              <GridItem>{renderedIcon}</GridItem>
              <GridItem>
                <div className={classes.walkout}>
                  <Icon
                    icon="lnr-walk"
                    className={className}
                    bold
                    size="xxxs"
                  />
                </div>
              </GridItem>
            </GridContainer>
          </span>
        );
      }

      if (position === NODE_POSITIONS.start) {
        return (
          <span style={style}>
            <GridContainer alignItems="center" wrap="nowrap" spacing={0}>
              <GridItem>
                <div className={classes.walkin}>
                  <Icon
                    icon="lnr-walk"
                    className={className}
                    bold
                    size="xxxs"
                  />
                </div>
              </GridItem>
              <GridItem>{renderedIcon}</GridItem>
            </GridContainer>
          </span>
        );
      }
    }

    return <span style={style}>{renderedIcon}</span>;
  };
}

EventIcon.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  type: PropTypes.string,
  subtype: PropTypes.string,
  position: PropTypes.string,
  iconOverride: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  bold: PropTypes.bool,
  showSubIcon: PropTypes.bool,
};

EventIcon.defaultProps = {
  type: null,
  subtype: null,
  position: null,
  iconOverride: null,
  size: null,
  color: null,
  bold: false,
};

export default withStyles(styles, { name: 'viewComponents/Event/Icon' })(
  EventIcon,
);

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { H6 } from 'viewComponents/Typography';
import Icon from 'viewComponents/Icon';
import styles from './styles';

export class TourIcon extends PureComponent {
  isHotel = () => this.props.icon === 'bed';

  generateStyle = (name, place) => {
    const isHotel = this.isHotel();
    const { classes, solid } = this.props;
    const style = solid ? 'solid' : 'hollow';
    const type = isHotel ? 'Hotel' : 'Flight';

    if (name === 'icon') {
      return classnames(classes.icon, classes[`${style}${type}`]);
    }

    if (name === 'caret') {
      return classnames(
        classes[`icon${place}`],
        solid && classes[`${style}${type}Caret`],
        !solid && classes[`${style}${type}${place}`],
      );
    }

    return classnames(classes.dateTime, classes[`${style}${type}`]);
  };

  generateDateTime = () => {
    if (!this.props.dateTime) return '';

    return <H6 className={this.generateStyle()}>{this.props.dateTime}</H6>;
  };

  generateIconCaret = place => {
    if (!this.props.caret) return '';

    return <div className={this.generateStyle('caret', place)} />;
  };

  render() {
    const { classes, size, icon, dense, caret } = this.props;
    const isHotel = this.isHotel();
    const iconName = isHotel ? icon : `ug-thin-${icon}`;

    return (
      <div
        className={classnames(
          classes.root,
          dense && classes.dense,
          caret && classes.caret,
        )}
      >
        {this.generateDateTime()}
        <div className={classes.iconRoot}>
          {this.generateIconCaret('Before')}
          <Icon
            size={size}
            icon={iconName}
            className={this.generateStyle('icon')}
          />
          {this.generateIconCaret('After')}
        </div>
      </div>
    );
  }
}

TourIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  dateTime: PropTypes.string,
  caret: PropTypes.bool,
  solid: PropTypes.bool,
  dense: PropTypes.bool,

  // size
  size: PropTypes.oneOf([
    'base',
    SIZE_CONSTANTS.XXS,
    'extraSmall',
    'small',
    'large',
    'extraLarge',
  ]),

  // icon
  icon: PropTypes.oneOf(['bed', 'arrival', 'departure', 'in-flight']),
};

TourIcon.defaultProps = {
  icon: 'bed',
  size: 'base',
  caret: false,
  solid: false,
  dense: false,
};

export default withStyles(styles, { name: 'ViewComponentsIcon' })(TourIcon);

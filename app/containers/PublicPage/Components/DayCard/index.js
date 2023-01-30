import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage as M } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { VARIANTS } from 'variantsConstants';
import Card from 'ugcomponents/Card/index';
import Img from 'components/Img/index';
import Node from 'smartComponents/Node';
import Logo from 'shareAssets/logo-solo-dark.png';
import m from './messages';
import styles from './styles';

export class DayCard extends PureComponent {
  generateImage = () => {
    const { classes, selected, imgSrc, dayCount } = this.props;
    if (imgSrc) {
      return <Img alt="" src={imgSrc} className={classes.imgBg} />;
    }

    const num = (dayCount % 5) + 1;
    const color = `color${num}`;

    return (
      <div
        className={classNames(
          classes.flexCenter,
          classes.placeholder,
          classes[color],
        )}
      >
        <Img
          alt="logo"
          src={Logo}
          className={classNames(classes.logo, {
            [classes.logoSelected]: selected,
          })}
        />
      </div>
    );
  };

  renderCard = () => {
    const {
      classes,
      imgSrc,
      selected,
      dayCount,
      dateText,
      placeText,
    } = this.props;

    return (
      <Card
        className={classNames(classes.root, {
          [classes.selected]: selected,
        })}
        withShadow={selected}
      >
        <div
          className={classNames(
            {
              [classes.boxShadow]: !imgSrc,
            },
            classes.overshadow,
          )}
        />
        {this.generateImage()}
        <div
          className={classNames(classes.contentContainer, {
            [classes.selectedHeight]: selected,
          })}
        >
          <div className={classNames(classes.dayLabel, classes.textColor)} />
          <div className={classNames(classes.dayInfo, classes.whiteColor)}>
            <p className={classes.info}>
              <span className={classes.dateText}>
                <M {...m.dayLabel} values={{ dayCount }} />: {dateText}
              </span>
              <span className={classes.placeText}>{placeText}</span>
            </p>
          </div>
        </div>
      </Card>
    );
  };

  render = () => {
    const { id } = this.props;
    return (
      <>
        {this.renderCard()}
        <Node id={id} variant={VARIANTS.LOGIC} />
      </>
    );
  };
}

DayCard.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number,
  imgSrc: PropTypes.string.isRequired,
  dayCount: PropTypes.number.isRequired,
  blankSlateColor: PropTypes.string,
  selected: PropTypes.bool,
  dateText: PropTypes.node,
  placeText: PropTypes.node,
  rotate: PropTypes.number,
};

DayCard.defaultProps = {
  id: null,
  selected: false,
  blankSlateColor: 'color1',
  rotate: 0,
};

export default withStyles(styles, { name: 'DayCard' })(DayCard);

import { withStyles } from '@material-ui/core/styles';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import Icon from 'ugcomponents/Icon';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PageLogo from 'ugcomponents/NaviBar/AdminNavBar/PageLogo';
import styles from './styles';

export class LoadingText extends PureComponent {
  state = {
    dots: '',
  };

  componentDidMount = () => {
    const { intervalMs } = this.props;

    this.updateDots = setInterval(this.addDots, intervalMs);
  };

  componentWillUnmount = () => {
    clearInterval(this.updateDots);
  };

  addDots = () => {
    const { maxDots, dot } = this.props;
    const { dots } = this.state;
    if (dots.length + 1 > maxDots) {
      return this.setState({ dots: '' });
    }

    return this.setState({ dots: `${dots}${dot}` });
  };

  renderIcon = () => {
    const { classes, sizeIcon } = this.props;

    return (
      <div className={classes.loading}>
        <Icon icon="lnr-sync2" size={sizeIcon} />
      </div>
    );
  };

  renderSplash = () => {
    const { classes, hideLogo, fullScreen, noMargin } = this.props;

    return (
      <GridContainer
        direction="column"
        alignItems="center"
        className={fullScreen && classes.fullscreen}
        spacing={0}
      >
        <GridItem>{!hideLogo && <PageLogo full />}</GridItem>
        <GridItem>
          <JText uppercase bold sm gray>
            <GridContainer
              alignItems="center"
              className={!noMargin && classes.loadingText}
            >
              <GridItem>Loading content</GridItem>
              <GridItem>{this.renderIcon()}</GridItem>
            </GridContainer>
          </JText>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { classes, splash, text, icon, show } = this.props;
    const { dots } = this.state;

    if (!show) return null;

    if (splash) {
      return this.renderSplash();
    }

    if (!text && icon) {
      return this.renderIcon();
    }

    return (
      <span className={classes.root}>
        {text}
        {dots}
      </span>
    );
  };
}

LoadingText.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  text: PropTypes.node,
  dot: PropTypes.node,
  intervalMs: PropTypes.number,
  maxDots: PropTypes.number,
  icon: PropTypes.bool,
  sizeIcon: PropTypes.string,
  splash: PropTypes.bool,
  show: PropTypes.bool,
  hideLogo: PropTypes.bool,
  fullScreen: PropTypes.bool,
  noMargin: PropTypes.bool,

  // resaga props
};

LoadingText.defaultProps = {
  text: '',
  dot: '.',
  intervalMs: 300,
  maxDots: 3,
  icon: true,
  show: true,
  sizeIcon: 'normal',
  fullScreen: true,
};

export default compose(withStyles(styles, { name: 'LoadingText' }))(
  LoadingText,
);

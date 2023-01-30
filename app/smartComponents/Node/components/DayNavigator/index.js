import { PHOTO_TITLE_DATE, PREVIOUS } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { scroller } from 'react-scroll/modules';
import { compose } from 'redux';
import resaga from 'resaga';
import Node from 'smartComponents/Node/index';
import Icon from 'ugcomponents/Icon';
import { scrollOptions } from 'utils/constant';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';

export class DayNavigator extends PureComponent {
  componentWillUnmount = () => {
    clearTimeout(this.scrollTo);
  };

  handleClick = selectedId => () => {
    this.props.resaga.setValue({ selectedId });
    this.scrollTo = setTimeout(this.scrolling(selectedId, scrollOptions), 100);
    // scroller.scrollTo(`scroller-node-${selectedId}`, scrollOptions);
  };

  scrolling = (selectedId, scrollOtion) => () => {
    scroller.scrollTo(`scroller-node-${selectedId}`, scrollOtion);
  };

  renderDefault = () => {
    const { id, index, startDate, direction, classes } = this.props;

    const isPrevious = direction === PREVIOUS;

    const justify = LOGIC_HELPERS.ifElse(isPrevious, 'flex-end');
    const alignItems = LOGIC_HELPERS.ifElse(isPrevious, 'flex-end');
    const gridDirection = LOGIC_HELPERS.ifElse(isPrevious, 'row-reverse');
    const directionText = LOGIC_HELPERS.ifElse(isPrevious, 'Previous', 'Next');
    const directionIcon = LOGIC_HELPERS.ifElse(
      isPrevious,
      'lnr-arrow-left',
      'lnr-arrow-right',
    );
    const arrowClassName = LOGIC_HELPERS.ifElse(
      isPrevious,
      classes.prevButton,
      classes.nextButton,
    );

    return (
      <GridContainer
        direction={gridDirection}
        alignItems="center"
        className={classes.noWrap}
        wrap="nowrap"
      >
        <GridItem className={classes.grow}>
          <GridContainer
            spacing={0}
            direction="column"
            alignItems={alignItems}
            className={classes.noWrap}
            wrap="nowrap"
          >
            <GridItem className={classes.header}>{directionText}</GridItem>
            <Node
              id={id}
              index={index}
              variant={PHOTO_TITLE_DATE}
              startDate={startDate}
              component={GridItem}
              contentClassName={classes.content}
              ellipsisClassName={classes.ellipsisDiv}
              justify={justify}
              direction={gridDirection}
            />
          </GridContainer>
        </GridItem>
        <GridItem className={arrowClassName}>
          <Icon icon={directionIcon} className={classes.content} />
        </GridItem>
      </GridContainer>
    );
  };

  renderMinimise = () => {
    const { direction, label } = this.props;

    if (label) return label;

    const isPrevious = direction === PREVIOUS;

    const directionIcon = LOGIC_HELPERS.ifElse(
      isPrevious,
      'lnr-chevron-left',
      'lnr-chevron-right',
    );

    return <Icon icon={directionIcon} size="small" />;
  };

  render = () => {
    const {
      id,
      direction,
      classes,
      disabled,
      minimise,
      className,
    } = this.props;

    const isPrevious = direction === PREVIOUS;

    const textAlign = LOGIC_HELPERS.ifElse(isPrevious, 'right', 'left');

    const button = minimise ? this.renderMinimise() : this.renderDefault();
    const defaultClassName = minimise
      ? classes.minimiseButton
      : classes.actionButton;

    return (
      <Button
        textAlign={textAlign}
        disabled={disabled}
        block
        dense
        noPadding
        size="extraSmall"
        className={classnames(defaultClassName, classes.arrowHover, className)}
        onClick={this.handleClick(id)}
      >
        {button}
      </Button>
    );
  };
}

DayNavigator.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  index: PropTypes.number,
  startDate: PropTypes.string,
  direction: PropTypes.string,

  disabled: PropTypes.bool,
  minimise: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.node,

  // resaga props
};

DayNavigator.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'DayNavigator' }),
  resaga(CONFIG),
)(DayNavigator);

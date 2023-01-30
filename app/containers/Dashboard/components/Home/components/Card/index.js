import { HOME_CARDS, HOME_NAMES } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import InlineButton from 'ugcomponents/Buttons/InlineButton';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export const toggle = hide => !hide;

export class Card extends PureComponent {
  toggleOpen = () => {
    this.props.resaga.setValue({
      hide: toggle,
    });
  };

  renderCount = adj => {
    const { classes, count, hide } = this.props;

    if (!count || !hide) return null;

    return (
      <GridItem>
        <span className={classes.pendingBadge}>
          {count} {adj}
        </span>
      </GridItem>
    );
  };

  renderContent = () => {
    const { hide, content } = this.props;

    if (hide) return null;

    return content;
  };

  render = () => {
    const { classes, name, hide } = this.props;

    const { header, icon, color, adj } = HOME_CARDS[name];

    const collapseIcon = LOGIC_HELPERS.ifElse(
      hide,
      'lnr-chevron-right',
      'lnr-chevron-down',
    );
    const collapseIconColor = LOGIC_HELPERS.ifElse(!hide, color);
    const collapseCardClassName = LOGIC_HELPERS.ifElse(
      hide,
      classes.hideGray,
      classes.paddingBottom,
    );

    return (
      <GridContainer
        card
        highlight={!hide}
        dense
        direction="column"
        cardClassName={classnames(classes.card, collapseCardClassName)}
      >
        <GridItem>
          <div
            className={classnames(classes.bodyHeading, classes.headingPadding)}
          >
            <GridContainer alignItems="center">
              <GridItem>
                <InlineButton
                  className={classes.collapseIcon}
                  onClick={this.toggleOpen}
                >
                  <Icon bold size="small" icon={collapseIcon} />
                </InlineButton>
              </GridItem>
              <GridItem>
                <Icon
                  color={collapseIconColor}
                  size="normal"
                  bold
                  icon={icon}
                />
              </GridItem>
              <GridItem className={classes.grow}>
                <div className={classes.headerPadding}>
                  <GridContainer alignItems="center">
                    <GridItem>{header}</GridItem>
                    <GridItem className={classes.grow}>&nbsp;</GridItem>
                    {this.renderCount(adj)}
                  </GridContainer>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </GridItem>

        {this.renderContent()}
      </GridContainer>
    );
  };
}

Card.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  name: PropTypes.oneOf(HOME_NAMES),
  content: PropTypes.node,
  count: PropTypes.number,

  // resaga props
  hide: PropTypes.bool,
};

Card.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Card' }),
  resaga(CONFIG),
)(Card);

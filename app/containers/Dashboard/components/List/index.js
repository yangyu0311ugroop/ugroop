import { LINE, TOUR_LIST_NAMES, TOUR_LISTS } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Node from 'smartComponents/Node';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class List extends PureComponent {
  items = () => {
    const { items, maxRender } = this.props;

    if (!maxRender) return items;

    return items.slice(0, maxRender);
  };

  renderItem = id => {
    const { classes } = this.props;

    return (
      <GridItem key={id}>
        <Node
          variant={LINE}
          id={Number.parseInt(id, 10)}
          className={classes.content}
          ellipsisClassName={classes.ellipsisDiv}
        />
      </GridItem>
    );
  };

  render = () => {
    const { classes, name, first } = this.props;

    const items = this.items();

    if (!items.length) return null;

    return (
      <>
        <GridItem>
          <div
            className={classnames(
              classes.heading,
              LOGIC_HELPERS.ifElse(first, classes.firstHeading),
            )}
          >
            <GridContainer alignItems="center">
              {TOUR_LISTS[name].color && (
                <GridItem>
                  <Icon
                    color={TOUR_LISTS[name].color}
                    size="normal"
                    bold
                    icon={TOUR_LISTS[name].icon}
                  />
                </GridItem>
              )}
              <GridItem>{TOUR_LISTS[name].header}</GridItem>
            </GridContainer>
          </div>
        </GridItem>

        {items.map(this.renderItem)}
      </>
    );
  };
}

List.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  items: PropTypes.array,
  first: PropTypes.bool,
  name: PropTypes.oneOf(TOUR_LIST_NAMES),
  maxRender: PropTypes.number,

  // resaga props

  // customisable props
};

List.defaultProps = {
  items: [],
};

export default compose(
  withStyles(styles, { name: 'List' }),
  resaga(CONFIG),
)(List);

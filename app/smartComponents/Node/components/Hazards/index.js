import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Hazard from 'smartComponents/Node/types/Hazard';
import Icon from 'ugcomponents/Icon';
import { CONFIG } from './config';
import styles from './styles';

export class Hazards extends PureComponent {
  renderHazard = (id, index) => {
    const { id: parentNodeId } = this.props;

    return (
      <GridItem key={id}>
        <Hazard id={id} parentNodeId={parentNodeId} index={index} />
      </GridItem>
    );
  };

  renderEmpty = () => {
    const { classes, component: Component } = this.props;

    return (
      <Component>
        <GridContainer
          direction="column"
          alignItems="center"
          spacing={2}
          card
          dashed
        >
          <GridItem>
            <GridContainer direction="column" spacing={0} alignItems="center">
              <GridItem>
                <Icon icon="lnr-warning" size="mediumXPlus" color="grey" />
              </GridItem>
              <GridItem>
                <div className={classes.subTitle}>
                  Add a risk & hazard to describe causes, control measures as
                  long as likelihood and impact, responsibility, etc.
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </Component>
    );
  };

  render = () => {
    const { ids, component: Component } = this.props;

    if (!ids.length) return this.renderEmpty();

    return (
      <Component>
        <GridContainer direction="column">
          {ids.map(this.renderHazard)}
        </GridContainer>
      </Component>
    );
  };
}

Hazards.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number, // parent id
  ids: PropTypes.array,
  component: PropTypes.any,

  // resaga props
};

Hazards.defaultProps = {
  ids: [],
  component: 'span',
};

export default compose(
  withStyles(styles, { name: 'Hazards' }),
  resaga(CONFIG),
)(Hazards);

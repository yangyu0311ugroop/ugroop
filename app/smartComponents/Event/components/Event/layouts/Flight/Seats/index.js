import { ability } from 'apis/components/Ability/ability';
import { PARTICIPANT } from 'utils/modelConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HOC } from 'datastore/nodeStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import Node from 'smartComponents/Node';
import AddSeat from 'smartComponents/Node/components/Seats/components/AddSeat';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import { H5 } from 'viewComponents/Typography';
import { EditablePlaceholder } from 'viewComponents/Editable';
import styles from './styles';

export class Seats extends PureComponent {
  renderSeat = id => (
    <GridItem key={id} xs={12}>
      <Node id={id} variant={VARIANTS.TEXT_ONLY} />
    </GridItem>
  );

  renderUpperRightButton = () => {
    const { id: nodeId, classes } = this.props;

    return (
      <GridItem xs={2} sm={1} md={1}>
        <div className={classes.addSeatBtn}>
          <AddSeat parentNodeId={nodeId} />
        </div>
      </GridItem>
    );
  };

  renderEmptyList = () => (
    <EditablePlaceholder>No seats added yet</EditablePlaceholder>
  );

  render = () => {
    const { classes, value } = this.props;
    if (!ability.can('execute', PARTICIPANT)) return null;

    const seats = LOGIC_HELPERS.ifElse(
      value.length > 0,
      <GridContainer className={classes.root} spacing={0}>
        {value.map(id => this.renderSeat(id))}
      </GridContainer>,
      this.renderEmptyList(),
    );

    return (
      <GridItem>
        <GridContainer alignItems="center">
          <GridItem xs={10} sm={11} md={11}>
            <H5 weight="bold" dense>
              Seats
            </H5>
          </GridItem>
          {this.renderUpperRightButton()}
        </GridContainer>
        {seats}
      </GridItem>
    );
  };
}

Seats.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  value: PropTypes.array,
  id: PropTypes.number,

  // resaga props
};

Seats.defaultProps = {
  value: [],
};

export default compose(
  withStyles(styles, { name: 'Seats' }),
  NODE_STORE_HOC.selectProp({ path: NODE_PATHS.seats }),
)(Seats);

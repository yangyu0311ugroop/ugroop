import { Can } from 'apis/components/Ability/components/Can';
import { CONTENT } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import Children from 'smartComponents/Node/parts/Children';
import Headx from 'ugcomponents/Headx';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { RISK } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';

export class RiskCard extends PureComponent {
  openAddRisk = () => {
    PORTAL_HELPERS.openAddRisk({}, this.props);
  };

  selectRisk = id => () => {
    this.props.resaga.setValue({
      selectedRiskId: id,
      layout: 'risk',
    });
  };

  renderEmpty = () => {
    const { classes } = this.props;

    return (
      <div className={classes.noContent}>
        No risk activities have been assessed.
      </div>
    );
  };

  renderChildren = ({ ids }) => {
    const { classes } = this.props;

    if (!ids.length) return null;

    return (
      <GridItem>
        <div className={classes.badge}>{ids.length}</div>
      </GridItem>
    );
  };

  renderRisk = (id, index) => {
    const { selectedRiskId, classes } = this.props;

    return (
      <GridItem onClick={this.selectRisk(id)}>
        <div
          className={classnames(
            classes.item,
            LOGIC_HELPERS.ifElse(selectedRiskId === id, classes.itemActive),
          )}
        >
          <GridContainer alignItems="center" wrap="nowrap">
            <GridItem>
              <Headx>#{index + 1}</Headx>
            </GridItem>
            <GridItem xs>
              <NodeProp
                id={id}
                valueKey={CONTENT}
                isCustomData={false}
                editable={false}
              />
            </GridItem>
            <Children id={id}>{this.renderChildren}</Children>
          </GridContainer>
        </div>
      </GridItem>
    );
  };

  renderRisks = () => {
    const { risks } = this.props;

    if (!risks.length) {
      return this.renderEmpty();
    }

    return (
      <GridContainer direction="column" spacing={0}>
        {risks.map(this.renderRisk)}
      </GridContainer>
    );
  };

  render = () => {
    const { classes } = this.props;

    return (
      <GridContainer card direction="column">
        <GridItem>
          <GridContainer alignItems="center">
            <Can do="create" on={RISK}>
              <GridItem>
                <Button
                  color="primary"
                  size="xs"
                  className={classes.smallText}
                  onClick={this.openAddRisk}
                >
                  <GridContainer alignItems="center">
                    <GridItem>
                      <Icon size="xsmall" icon="lnr-plus" bold />
                    </GridItem>
                  </GridContainer>
                </Button>
              </GridItem>
            </Can>
            <GridItem xs>
              <div className={classes.header}>Risk Assessment</div>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>{this.renderRisks()}</GridItem>
      </GridContainer>
    );
  };
}

RiskCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  // id: PropTypes.number, // templateId / parentId

  // resaga props
  risks: PropTypes.array,
  selectedRiskId: PropTypes.number,
};

RiskCard.defaultProps = {
  risks: [],
};

export default compose(
  withStyles(styles, { name: 'RiskCard' }),
  resaga(CONFIG),
)(RiskCard);

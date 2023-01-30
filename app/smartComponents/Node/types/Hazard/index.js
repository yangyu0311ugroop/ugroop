import { ability } from 'apis/components/Ability/ability';
import { CONTENT } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import DeleteNode from 'smartComponents/Node/components/DeleteNode';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import RiskRating from 'smartComponents/Node/components/Rating/components/RiskRating';
import Description from 'smartComponents/Node/parts/Description';
import Impact from 'smartComponents/Node/parts/Impact';
import Likelihood from 'smartComponents/Node/parts/Likelihood';
import AddButton from 'ugcomponents/Buttons/AddButton';
import Headx from 'ugcomponents/Headx';
import Icon from 'ugcomponents/Icon';
import { HAZARD } from 'utils/modelConstants';
import { CONFIG } from './config';
import styles from './styles';

export class Hazard extends PureComponent {
  componentWillMount = () => {
    const { createdBy } = this.props;

    this.hazard = {
      type: HAZARD,
      createdBy,
    };
  };

  canEdit = () => {
    const { editable } = this.props;

    return editable && ability.can('execute', this.hazard);
  };

  renderResponsibility = ({ content, isEmpty, isViewing, startEdit }) => {
    if (isEmpty && isViewing) {
      if (this.canEdit())
        return (
          <GridItem>
            <AddButton onClick={startEdit}>who is responsible?</AddButton>
          </GridItem>
        );

      return null;
    }

    return (
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <Headx>Responsibility</Headx>
          </GridItem>
          <GridItem>{content}</GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderWhen = ({ content, isEmpty, isViewing, startEdit }) => {
    if (isEmpty && isViewing) {
      if (this.canEdit())
        return (
          <GridItem>
            <AddButton onClick={startEdit}>when does this apply?</AddButton>
          </GridItem>
        );

      return null;
    }

    return (
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <Headx>When</Headx>
          </GridItem>
          <GridItem>{content}</GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderDone = ({ content, isEmpty, isViewing, startEdit }) => {
    if (isEmpty && isViewing) {
      if (this.canEdit())
        return (
          <GridItem>
            <AddButton onClick={startEdit}>
              any notes about completion?
            </AddButton>
          </GridItem>
        );

      return null;
    }

    return (
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <Headx>Done</Headx>
          </GridItem>
          <GridItem>{content}</GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  render = () => {
    const { classes, index, id, parentNodeId } = this.props;

    const editable = this.canEdit();

    return (
      <GridContainer card direction="column">
        <GridItem>
          <GridContainer wrap="nowrap">
            <GridItem className={classes.indentHeader}>
              <Headx>#{index + 1}</Headx>
            </GridItem>
            <GridItem xs>
              <GridContainer direction="column">
                <GridItem>
                  <GridContainer wrap="nowrap">
                    <GridItem>
                      <RiskRating id={id} />
                    </GridItem>
                    <GridItem xs>
                      <NodeProp
                        id={id}
                        valueKey={CONTENT}
                        bold
                        isCustomData={false}
                        editable={editable}
                      />
                    </GridItem>
                    {editable && (
                      <GridItem>
                        <DeleteNode id={id} parentId={parentNodeId} noText />
                      </GridItem>
                    )}
                  </GridContainer>
                </GridItem>

                <GridItem>
                  <GridContainer alignItems="center">
                    <GridItem>
                      <Likelihood id={id} editable={editable} />
                    </GridItem>
                    <GridItem>
                      <Impact id={id} editable={editable} />
                    </GridItem>
                  </GridContainer>
                </GridItem>

                <GridItem>
                  <GridContainer direction="column" spacing={0}>
                    <GridItem>
                      <Headx>Control Measures</Headx>
                    </GridItem>

                    <Description
                      id={id}
                      valueKey="control"
                      showEmpty
                      noContent={
                        <GridContainer alignItems="center">
                          <GridItem>
                            <Icon
                              size="small"
                              icon="lnr-warning"
                              color="warning"
                              bold
                              paddingRight
                            />
                          </GridItem>
                          <GridItem>No control measure specified</GridItem>
                        </GridContainer>
                      }
                      placeholder="Elimination or Control Measures"
                      noPadding
                      editable={editable}
                    />
                  </GridContainer>
                </GridItem>

                <NodeProp
                  id={id}
                  valueKey="responsibility"
                  editable={editable}
                  showEmpty
                >
                  {this.renderResponsibility}
                </NodeProp>

                <NodeProp id={id} valueKey="when" editable={editable} showEmpty>
                  {this.renderWhen}
                </NodeProp>

                <NodeProp id={id} valueKey="done" editable={editable} showEmpty>
                  {this.renderDone}
                </NodeProp>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

Hazard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  index: PropTypes.number,
  id: PropTypes.number,
  parentNodeId: PropTypes.number,

  // resaga props
  editable: PropTypes.bool,
  createdBy: PropTypes.number,
};

Hazard.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Hazard' }),
  resaga(CONFIG),
)(Hazard);

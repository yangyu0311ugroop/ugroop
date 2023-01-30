import { NODE_API, CREATE_CHILD, CREATE_NEXT_NODE } from 'apis/constants';
// import { TAB_CONTENT, CREATE_CHILD_NODE, CREATE_NEXT_NODE } from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/config';
import sectionHelper from 'datastore/templateManagementStore/helpers/sectionHelper';
import tabHelper from 'datastore/templateManagementStore/helpers/tab';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ACTIVITY } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';
import styles from './styles';

export class AddSection extends PureComponent {
  addSection = () => {
    const { id, type, parent } = this.props;
    const REQUEST_NAME = id > 0 ? CREATE_NEXT_NODE : CREATE_CHILD;

    this.props.resaga.dispatchTo(NODE_API, REQUEST_NAME, {
      payload: {
        id,
        nodeId: parent,
        node: { type },
        keyPath: `${parent}.children`,
      },
      onSuccess: this.createSuccess,
    });
  };

  // create CustomTab-section success
  createSuccess = (result, payload) => {
    const { onSuccess } = this.props;
    const { parent, node } = payload;

    this.props.resaga.setValue({
      sections: sectionHelper.upsert(result, { node }), // insert section data
      tabs: tabHelper.insertChild(parent, result.id),
      editSections: sectionHelper.upsert({ id: result.id }, { node: {} }),
    });

    LOGIC_HELPERS.ifFunction(onSuccess, [result, payload]);
  };

  render = () => {
    const { isCreatingChild, addButtonLabel, classes } = this.props;

    return (
      <GridContainer direction="column" alignItems="center" spacing={1}>
        <GridItem>
          <Button
            color="primary"
            size="xs"
            weight="bold"
            onClick={this.addSection}
            loading={isCreatingChild}
          >
            <GridContainer
              direction="row"
              alignItems="center"
              spacing={1}
              wrap="nowrap"
            >
              <GridItem>
                <Icon size="small" icon="lnr-plus" bold />
              </GridItem>
              <GridItem className={classes.label}>{addButtonLabel}</GridItem>
            </GridContainer>
          </Button>
        </GridItem>
      </GridContainer>
    );
  };
}

AddSection.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  parent: PropTypes.number,
  onSuccess: PropTypes.func,
  type: PropTypes.string,
  addButtonLabel: PropTypes.string,

  // resaga props
  isCreatingChild: PropTypes.bool,
};

AddSection.defaultProps = {
  id: 0,
  parent: 0,
  type: ACTIVITY,
  addButtonLabel: 'Add a section',
};

export default compose(
  withStyles(styles, { name: 'AddSection' }),
  resaga(CONFIG),
)(AddSection);

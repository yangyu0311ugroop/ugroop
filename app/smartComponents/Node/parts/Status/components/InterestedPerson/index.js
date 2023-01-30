import React from 'react';
import PropTypes from 'prop-types';
import dotProp from 'dot-prop-immutable';
import { FormattedMessage as M } from 'react-intl';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { INTERESTED_PERSON_STATUSES } from 'utils/constants/nodes';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import GridItem from 'components/GridItem';
import Button from 'viewComponents/Button';
import { Data } from 'ugcomponents/Inputs';
import inputs from './inputs';
import m from './messages';

export class InterestedPerson extends React.PureComponent {
  handleSubmit = value => () => {
    const { id, type } = this.props;
    let model = {};
    model = dotProp.set(model, inputs.status.name, value);
    model = dotProp.set(model, inputs.type.name, type);
    NODE_API_HELPERS.updateNode({ nodeId: id, ...model }, this.props);
  };

  renderCompleteButton = () => (
    <GridItem>
      <Button
        size="small"
        variant="outline"
        dense
        onClick={this.handleSubmit(INTERESTED_PERSON_STATUSES.complete)}
      >
        <M {...m.completeButtonLabel} />
      </Button>
    </GridItem>
  );

  renderPendingButton = () => (
    <GridItem>
      <Button
        size="small"
        variant="outline"
        dense
        onClick={this.handleSubmit(INTERESTED_PERSON_STATUSES.pending)}
      >
        <M {...m.pendingButtonLabel} />
      </Button>
    </GridItem>
  );

  renderActions = () => {
    const { status, readOnly } = this.props;
    if (!readOnly)
      return status ? this.renderPendingButton() : this.renderCompleteButton();
    return null;
  };

  renderData = () => {
    const { status } = this.props;
    return <Data value={status} {...inputs.status} />;
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.ACTIONS]: this.renderActions,
      [DEFAULT]: this.renderData,
    });
  };
}

InterestedPerson.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  status: PropTypes.string,
  type: PropTypes.string,
  readOnly: PropTypes.bool,
};

InterestedPerson.defaultProps = {
  id: null,
  variant: null,
  status: INTERESTED_PERSON_STATUSES.pending,
  readOnly: false,
};

export default InterestedPerson;

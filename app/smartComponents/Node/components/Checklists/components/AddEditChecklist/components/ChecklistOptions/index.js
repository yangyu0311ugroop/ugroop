import { OPTION, DEFAULT, CHECK_INPUT } from 'appConstants';
import Checkgroups from 'smartComponents/Node/components/Checkgroups';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { withRouter } from 'react-router-dom';
import { Select } from 'ugcomponents/Inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';
import inputs from '../../inputs';

export class ChecklistOptions extends PureComponent {
  renderCheckOption = () => {
    const {
      rootNodeId,
      accountParentNodeId,
      onChange,
      // isLoading,
      variant,
    } = this.props;
    return (
      <React.Fragment>
        <Checkgroups
          parentNodeId={LOGIC_HELPERS.ifElse(
            rootNodeId,
            rootNodeId,
            accountParentNodeId,
          )}
          variant={variant}
          onChange={onChange}
        />
      </React.Fragment>
    );
  };

  renderDefault = () => {
    const { rootNodeId, accountParentNodeId, onChange, isLoading } = this.props;

    const options = (
      <React.Fragment>
        <Checkgroups
          parentNodeId={LOGIC_HELPERS.ifElse(
            rootNodeId,
            rootNodeId,
            accountParentNodeId,
          )}
          variant={OPTION}
        />
      </React.Fragment>
    );

    return (
      <Select
        {...inputs.NODE}
        options={options}
        optionRendered
        showNone
        onChange={onChange}
        disabled={isLoading}
      />
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [OPTION]: this.renderDefault,
      [CHECK_INPUT]: this.renderCheckOption,
      [DEFAULT]: this.renderDefault,
    });
  };
}

ChecklistOptions.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  rootNodeId: PropTypes.number,
  onChange: PropTypes.func,
  parentType: PropTypes.string,
  parentNodeId: PropTypes.number,
  accountParentNodeId: PropTypes.number,
  variant: PropTypes.string,

  // resaga props
  isLoading: PropTypes.bool,
};

ChecklistOptions.defaultProps = {
  rootNodeId: null,
  isLoading: false,
};

export default compose(
  withStyles(styles, { name: 'ChecklistOptions' }),
  withRouter,
  resaga(CONFIG),
)(ChecklistOptions);

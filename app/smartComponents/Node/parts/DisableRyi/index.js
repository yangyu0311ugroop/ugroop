import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT } from 'appConstants';
import JText from 'components/JText';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import { Checkbox } from 'components/material-ui/index';
import { TEMPLATE_API, UPDATE_HASHKEY } from 'apis/constants';
import { CONFIG } from './config';
import styles from './styles';

export class DisableRyi extends React.PureComponent {
  state = {
    disabled: false,
  };

  finishEdit = () => {
    this.setState({ disabled: false });
  };

  onClick = () => {
    const { id, disableRYI } = this.props;
    this.setState({ disabled: true });
    return this.props.resaga.dispatchTo(TEMPLATE_API, UPDATE_HASHKEY, {
      payload: {
        id,
        disableRYI: !disableRYI,
      },
      onSuccess: this.finishEdit,
      onError: this.finishEdit,
    });
  };

  renderButtonText = () =>
    LOGIC_HELPERS.ifElse(this.props.disableRYI, 'Reopen', 'Complete');

  renderDefault = () => {
    const { disableRYI, onClick, classes } = this.props;
    const { disabled } = this.state;
    return (
      <GridContainer alignItems="center">
        <GridItem>
          <Checkbox
            disabled={disabled}
            onClick={onClick || this.onClick}
            checked={disableRYI}
            title="Disable Register your interest feature"
            color="default"
            checkedIcon={<Icon size="medium" icon="lnr-check-square" />}
            icon={<Icon size="medium" icon="lnr-square" />}
            className={classes.checkbox}
          />
        </GridItem>
        <GridItem>
          <span>Disable </span>
          <JText italic gray>
            Register your interest{' '}
          </JText>
          <span>feature</span>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
    });
  };
}

DisableRyi.propTypes = {
  // HOC
  classes: PropTypes.object.isRequired,
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  resaga: PropTypes.object,
  onClick: PropTypes.func,

  // resaga value
  disableRYI: PropTypes.bool,
};

DisableRyi.defaultProps = {
  id: null,
  variant: null,
  disableRYI: false,
};
export default compose(
  withStyles(styles, { name: 'DisableRyi' }),
  resaga(CONFIG),
)(DisableRyi);

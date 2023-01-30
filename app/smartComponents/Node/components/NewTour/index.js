import { withStyles } from '@material-ui/core/styles';
import { DEFAULT } from 'appConstants';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG } from './config';
import styles from './styles';

export class NewTour extends PureComponent {
  openDialog = () => {
    const { onClick } = this.props;

    PORTAL_HELPERS.openAddTour({}, this.props);
    LOGIC_HELPERS.ifFunction(onClick);
  };

  renderDefault = () => (
    <JButton bg="gray" onClick={this.openDialog}>
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem>
          <Icon size="small" icon="lnr-plus" color="success" />
        </GridItem>
        <GridItem>
          <JText dark>Create new</JText>
        </GridItem>
      </GridContainer>
    </JButton>
  );

  render = () => {
    const { variant, children } = this.props;

    let content;

    if (typeof children === 'function') {
      content = children({ onClick: this.openDialog });
    } else {
      content = LOGIC_HELPERS.switchCase(variant, {
        [DEFAULT]: this.renderDefault,
      });
    }

    return content;
  };
}
NewTour.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,
  // resaga: PropTypes.object.isRequired,

  // parent
  children: PropTypes.func,
  onClick: PropTypes.func,
  variant: PropTypes.string,

  // resaga
};

NewTour.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'NewTour' }),
  resaga(CONFIG),
)(NewTour);

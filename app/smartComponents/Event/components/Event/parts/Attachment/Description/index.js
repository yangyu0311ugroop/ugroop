import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import { EVENT_ATTACHMENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Text } from 'smartComponents/Inputs';
import { VARIANTS } from 'variantsConstants';

import styles from './styles';

export class Description extends PureComponent {
  renderTextOnly = () => {
    const { description, children } = this.props;

    return LOGIC_HELPERS.ifFunction(children, [description], description);
  };

  renderTextField = () => {
    const { description } = this.props;

    return <Text name="description" value={description} />;
  };

  renderProp = () => {
    const { description, children } = this.props;

    return LOGIC_HELPERS.ifFunction(children, [description]);
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [DEFAULT]: this.renderTextOnly,
    });
  };
}

Description.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  children: PropTypes.func,

  // resaga props
  description: PropTypes.string,
};

Description.defaultProps = {
  description: '',
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'Description' }),
  EVENT_STORE_HOC.selectAttachmentProp({
    path: EVENT_ATTACHMENT_PATHS.description,
    outputProp: 'description',
  }),
)(Description);

/**
 * Created by stephenkarpinskyj on 12/7/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import EditableHeading from './components/EditableHeading';
import EditableHeadingForm from './components/EditableHeadingForm';
import inputs from './inputs';
import { CONFIG } from './config';

export class Icon extends React.PureComponent {
  renderIcon = Component => () => (
    <Component {...this.props} {...inputs.iconOverride} />
  );

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderEditableHeading={this.renderIcon(EditableHeading)}
        renderEditableHeadingForm={this.renderIcon(EditableHeadingForm)}
      />
    );
  };
}

Icon.propTypes = {
  // parent
  variant: PropTypes.string,
  rootClass: PropTypes.string,

  // resaga value
  value: PropTypes.string,
  type: PropTypes.string,
  subtype: PropTypes.string,
};

Icon.defaultProps = {
  variant: null,

  value: '',
  type: '',
  subtype: '',
};

export default compose(resaga(CONFIG))(Icon);

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import omit from 'lodash/omit';
import { withPhoneCUD } from 'smartComponents/Person/hoc/PersonCUD';
import PhoneComponent from 'smartComponents/Phone/components/Phone';

import { CONFIG } from './config';
import styles from './styles';

export class PersonPhone extends PureComponent {
  stripOwnProps = () => omit(this.props, ['resaga', 'classes']);

  render = () => {
    const { onFinish } = this.props;

    return (
      <PhoneComponent
        onCreateSuccess={onFinish}
        onCancelCreate={onFinish}
        {...this.stripOwnProps()}
      />
    );
  };
}

PersonPhone.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  // I disable it for the sake that it will appear in the
  // auto complete of webstorm
  // eslint-disable-next-line
  viewStore: PropTypes.string,
  onFinish: PropTypes.func,

  // resaga props
};

PersonPhone.defaultProps = {
  viewStore: '',
};

export default compose(
  withPhoneCUD,
  withStyles(styles, { name: 'PersonPhone' }),
  resaga(CONFIG),
)(PersonPhone);

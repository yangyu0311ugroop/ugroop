import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import UGCardFooter from 'ugcomponents/Card/UGCardFooter';
import Duration from './components/Duration';

import styles from './styles';

export class Footer extends PureComponent {
  render = () => {
    const { classes, actions, duration } = this.props;

    return (
      <UGCardFooter className={classes.templateItemFooter}>
        <Duration duration={duration} />
        {actions}
      </UGCardFooter>
    );
  };
}

Footer.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  duration: PropTypes.number,
  actions: PropTypes.node,
};

Footer.defaultProps = {
  actions: '',
  duration: null,
};

export default withStyles(styles, { name: 'TemplateFooter' })(Footer);

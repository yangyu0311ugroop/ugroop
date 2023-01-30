import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Form from 'ugcomponents/Form';
import { Checkbox } from 'ugcomponents/Inputs';
import { CONFIG } from './config';
import styles from './styles';

export class Footer extends PureComponent {
  handleToggle = (_, showCompleted) => {
    this.props.resaga.setValue({ showCompleted });
  };

  render = () => {
    const { classes, label, showCompleted } = this.props;

    return (
      <Form>
        <div className={classes.footer}>
          <Checkbox
            currentValue={showCompleted}
            name="showCompleted"
            label={label}
            className={classes.checkbox}
            onChange={this.handleToggle}
          />
        </div>
      </Form>
    );
  };
}

Footer.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
  showCompleted: PropTypes.bool,

  // customisable props
  label: PropTypes.string,
};

Footer.defaultProps = {
  showCompleted: false,

  label: 'View completed invitations',
};

export default compose(
  withStyles(styles, { name: 'Footer' }),
  resaga(CONFIG),
)(Footer);

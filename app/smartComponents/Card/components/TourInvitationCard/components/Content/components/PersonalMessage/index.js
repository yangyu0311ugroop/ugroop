import { withStyles } from '@material-ui/core/styles';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { SimpleRTE } from 'ugcomponents/Inputs';
import styles from './styles';

export class PersonalMessage extends PureComponent {
  render = () => {
    const { classes, content } = this.props;

    if (!content) {
      return null;
    }

    return (
      <GridItem>
        <div className={classes.root}>
          <SimpleRTE name="pm" value={content} readOnly />
        </div>
      </GridItem>
    );
  };
}

PersonalMessage.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  content: PropTypes.string,

  // resaga props
};

PersonalMessage.defaultProps = {
  content: '',
};

export default compose(withStyles(styles, { name: 'PersonalMessage' }))(
  PersonalMessage,
);

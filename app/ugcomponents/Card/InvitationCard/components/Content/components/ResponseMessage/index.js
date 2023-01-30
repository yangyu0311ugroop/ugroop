import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import { P } from 'viewComponents/Typography';
import styles from './styles';
import m from './messages';

export class ResponseMessage extends PureComponent {
  render = () => {
    const { classes, content } = this.props;

    if (!content) {
      return null;
    }

    return (
      <div className={classes.root}>
        <P weight="bold" className={classes.messageHeader} noMargin>
          <M {...m.header} />
        </P>
        <P noMargin>
          <em>{content}</em>
        </P>
      </div>
    );
  };
}

ResponseMessage.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  content: PropTypes.string,

  // resaga props
};

ResponseMessage.defaultProps = {
  content: '',
};

export default compose(withStyles(styles, { name: 'ResponseMessage' }))(
  ResponseMessage,
);

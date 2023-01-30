import { withStyles } from '@material-ui/core/styles';
import { DEFAULT } from 'appConstants';
import JText from 'components/JText';
import { EVENT_ATTACHMENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Attachment } from 'smartComponents/Inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import { CONFIG } from './config';
import styles from './styles';

export class AttachmentLink extends PureComponent {
  handleClick = ev => {
    ev.stopPropagation();
  };

  padUrlquery = (url, fileName) =>
    `${process.env.COORDINATE_BASE_URL}/${url}?filename=${fileName}`;

  renderField = () => {
    const { link: url, name } = this.props;
    // const linkQuery = this.padUrlquery(url, name);

    const value = {
      url,
      name,
    };

    return <Attachment name="link" value={value} showClear />;
  };

  renderDefault = () => {
    const { link, name } = this.props;
    const linkQuery = this.padUrlquery(link, name);
    return (
      <a href={linkQuery} target="_blank" onClick={this.handleClick}>
        Attachment
      </a>
    );
  };

  renderProp = () => {
    const { link, children, name } = this.props;
    const linkQuery = this.padUrlquery(link, name);

    return LOGIC_HELPERS.ifFunction(children, [linkQuery]);
  };

  renderTextOnly = () => {
    const { link, name } = this.props;
    const linkQuery = this.padUrlquery(link, name);

    return (
      <JText link ellipsis component="a" href={linkQuery} target="_blank">
        {name}
      </JText>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [VARIANTS.FIELDS_ONLY]: this.renderField,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

AttachmentLink.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  children: PropTypes.func,

  // resaga props
  link: PropTypes.string,
  name: PropTypes.string,
};

AttachmentLink.defaultProps = {
  link: '',
  variant: '',
  name: '',
};

export default compose(
  withStyles(styles, { name: 'Link' }),
  resaga(CONFIG),
  EVENT_STORE_HOC.selectAttachmentProp({
    path: EVENT_ATTACHMENT_PATHS.name,
    outputProp: 'name',
  }),
  EVENT_STORE_HOC.selectAttachmentProp({
    path: EVENT_ATTACHMENT_PATHS.link,
    outputProp: 'link',
  }),
)(AttachmentLink);

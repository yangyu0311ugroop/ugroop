import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import { withStyles } from 'components/material-ui';
import get from 'lodash/get';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import AttachmentsInput from 'smartComponents/Inputs/Attachments';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG } from './config';
import styles from './styles';

export const defaultValue = props => {
  const { data, adding } = props;

  return adding || EVENT_VIEW_HELPERS.eventAttachments(data).length > 0;
};

export class Attachments extends PureComponent {
  state = {
    adding: defaultValue(this.props),
  };

  eventAttachments = () => {
    const { uploadedIds, uploadedFiles, adding } = this.state;

    if (!uploadedIds) return LOGIC_HELPERS.ifElse(adding, [], null);

    return uploadedIds.map(uploadedId => {
      const { name, url: link, size, responseFile } = uploadedFiles[uploadedId];
      const type = get(responseFile, 'type');

      return { name, link, size, type };
    });
  };

  updateAttachments = ({ uploadedIds, uploadedFiles }) => {
    const { onChange } = this.props;

    this.setState({ uploadedIds, uploadedFiles });
    LOGIC_HELPERS.ifFunction(onChange, [{ uploadedIds, uploadedFiles }]);
  };

  setAdding = () => this.setState({ adding: true });

  closeAdding = () => this.setState({ adding: false });

  render = () => {
    const { data, editing, card } = this.props;
    const { adding } = this.state;

    if (!adding) {
      return (
        <JButton onClick={this.setAdding}>
          <GridContainer alignItems="center" wrap="nowrap">
            <GridItem>
              <Icon icon="lnr-plus" size="xsmall" color="blue" bold />
            </GridItem>
            <GridItem>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <JText blue>Attachments</JText>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </JButton>
      );
    }

    return (
      <AttachmentsInput
        editing={editing}
        data={data}
        onChange={this.updateAttachments}
        onClose={this.closeAdding}
        card={card}
      />
    );
  };
}

Attachments.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,
  // parent props
  data: PropTypes.object,
  onChange: PropTypes.func,
  editing: PropTypes.bool,
  card: PropTypes.bool,

  // resaga props
};

Attachments.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Attachments' }),
  resaga(CONFIG),
)(Attachments);

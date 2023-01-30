import Empty from 'components/Empty';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Thumbnail, {
  StyledThumbnail,
} from 'smartComponents/Event/components/Event/parts/Attachment/Thumbnail';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class AttachmentsCard extends PureComponent {
  state = {};

  renderDescription = description =>
    description && (
      <GridItem>
        <JText gray ellipsis>
          {description}
        </JText>
      </GridItem>
    );

  reduceAttachments = (acc, attach) => {
    if (attach.errorMessage) return acc;

    return acc.concat(attach);
  };

  attachments = () => {
    const { id, data, attachments } = this.props;

    let newAttachments;

    if (id) {
      newAttachments = attachments;
    } else {
      newAttachments = EVENT_VIEW_HELPERS.eventAttachments(data);
    }
    if (!newAttachments || !Array.isArray(newAttachments)) return [];

    return newAttachments.reduce(this.reduceAttachments, []);
  };

  renderAttachment = (id, index) => {
    if (typeof id === 'number') {
      return <Thumbnail dataId={id} key={id} />;
    }

    return <StyledThumbnail {...id} key={index} />;
  };

  renderAttachments = () => {
    const attachments = this.attachments();

    if (!attachments.length) {
      return (
        <JText gray italic>
          No attachments uploaded yet
        </JText>
      );
    }

    return (
      <GridContainer direction="column">
        {attachments.map(this.renderAttachment)}
      </GridContainer>
    );
  };

  renderEmpty = () => {
    const { canCreate } = this.props;

    if (!canCreate) return null;

    return (
      <GridItem>
        <Empty title="Attachments" description="No attachments" />
      </GridItem>
    );
  };

  render = () => {
    const { classes, card, preview } = this.props;
    const attachments = this.attachments();

    if (!attachments.length) return this.renderEmpty();

    return (
      <GridItem>
        <GridContainer
          card={card}
          direction="column"
          spacing={2}
          cardClassName={LOGIC_HELPERS.ifElse(preview, classes.preview)}
        >
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              {LOGIC_HELPERS.ifElse(
                preview,
                <GridItem>
                  <JText danger sm uppercase>
                    preview
                  </JText>
                </GridItem>,
              )}
              <GridItem>
                <GridContainer alignItems="center" nowrap wrap="nowrap">
                  <GridItem>
                    <JText bold black>
                      Attachments
                    </JText>
                  </GridItem>
                  {attachments.length > 0 && (
                    <GridItem>
                      <JText sm gray>
                        ({attachments.length})
                      </JText>
                    </GridItem>
                  )}
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>

          <GridItem className={classes.attachmentGrid}>
            {this.renderAttachments()}
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };
}

AttachmentsCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  data: PropTypes.object,
  card: PropTypes.bool,
  canCreate: PropTypes.bool,
  preview: PropTypes.bool,
  viewing: PropTypes.bool,
  onEdit: PropTypes.func,

  // resaga props
  attachments: PropTypes.array,
};

AttachmentsCard.defaultProps = {
  attachments: [],
  card: true,
};

export default compose(
  withStyles(styles, { name: 'AttachmentsCard' }),
  resaga(CONFIG),
)(AttachmentsCard);

import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from 'smartComponents/Node/components/Ratings/components/RatingForm/config';
import styles from 'smartComponents/Node/components/Ratings/components/RatingForm/styles';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { EditableLabel } from 'viewComponents/Editable';
import { Content, Rating } from 'smartComponents/Node/parts';
import { VARIANTS } from 'variantsConstants';
import P from 'viewComponents/Typography';

export class RatingForm extends PureComponent {
  reactQuillProps = {
    className: this.props.classes.form,
    placeholder: 'Share details of your own experience on this event ',
  };

  render = () => {
    const { id, error } = this.props;

    const errorMsg = LOGIC_HELPERS.ifElse(
      error,
      <GridItem>
        <P dense fontStyle="italic" error>
          Rating is required
        </P>
      </GridItem>,
      null,
    );

    return (
      <GridContainer direction="column" wrap="nowrap">
        <GridItem>
          <GridContainer direction="column" wrap="nowrap" spacing={0}>
            <GridItem>
              <EditableLabel>Rating</EditableLabel>
            </GridItem>
            <GridItem>
              <Rating id={id} variant={VARIANTS.TEXT_FIELD} />
            </GridItem>
            {errorMsg}
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer direction="column" wrap="nowrap" spacing={0}>
            <GridItem>
              <EditableLabel>Review</EditableLabel>
            </GridItem>
            <GridItem>
              <Content
                id={id}
                variant={VARIANTS.TEXT_FIELD}
                row={5}
                reactQuillProps={this.reactQuillProps}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

RatingForm.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  error: PropTypes.bool,

  // resaga props
};

RatingForm.defaultProps = {
  id: 0,
  error: false,
};

export default compose(
  withStyles(styles, { name: 'RatingForm' }),
  resaga(CONFIG),
)(RatingForm);

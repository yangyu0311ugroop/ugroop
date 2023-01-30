import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import ContentLoader from 'react-content-loader';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HOC } from 'datastore/nodeStore/hoc';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { EditableLabel } from 'viewComponents/Editable';
import Form from 'smartComponents/Node/types/Form';
import { H4 } from 'viewComponents/Typography';
import { compose } from 'redux';
import { withStyles } from 'components/material-ui';

import UploadZone from './components/UploadZone';
import m from './messages';
import styles from './styles';
import JText from '../../../../components/JText';
import Icon from '../../../../ugcomponents/Icon';
import JButton from '../../../../viewComponents/Button/variants/JButton';
import Empty from '../../../../components/Empty';

const DEFAULT_LABEL =
  'Attach any documentation explicitly relating to the person ' +
  'travelling like medical management plan, doctors certificates, ' +
  'copies of any travel-related authorisations, tickets, coupons, passes, ' +
  'insurance forms, high-resolution facial image, or forms to be completed.';

export class Forms extends React.PureComponent {
  state = {
    showAll: false,
    attaching: false, // !this.props.value.length,
  };

  getShow = () => {
    const { compact, loading, value } = this.props;
    return !compact || loading || !!value.length;
  };

  renderPart = (Component, props = {}) => {
    const { value, ...rest } = this.props;
    return <Component {...rest} {...props} />;
  };

  renderUploadZone = () => {
    const { id, compact, readOnly, simple, value } = this.props;
    const { attaching } = this.state;
    if (!readOnly) {
      return (
        ((!compact && simple) || (!compact && !simple && attaching)) && (
          <GridItem>
            <UploadZone
              id={id}
              simple={simple}
              formIds={value}
              onCancel={this.openAttachmentView}
              label={DEFAULT_LABEL}
            />
          </GridItem>
        )
      );
    }
    return null;
  };

  toggleShowAll = () => {
    const { showAll } = this.state;
    this.setState({ showAll: !showAll });
  };

  renderMoreLess = (max, ids) => {
    const { showAll } = this.state;
    if (ids.length > max) {
      return (
        <GridItem>
          <JText sm onClick={this.toggleShowAll} link underline>
            {LOGIC_HELPERS.ifElse(
              showAll,
              'Show less',
              `See all (${ids.length})`,
            )}
          </JText>
        </GridItem>
      );
    }
    return null;
  };

  renderFormRows = () => {
    const { value, iconPadding, loading } = this.props;
    const MAX_SHOW = 2;
    const ids =
      !this.state.showAll && value.length > MAX_SHOW
        ? value.slice(0, MAX_SHOW)
        : value;
    const xOffset = iconPadding ? 4 : 0;
    return loading ? (
      <GridItem style={{ height: 56 }}>
        <ContentLoader height={40} width={480}>
          <rect x={xOffset} y="0" rx="2" ry="2" width="16" height="16" />
          <rect x={xOffset + 24} y="3" rx="2" ry="2" width="360" height="10" />
          <rect x={xOffset} y="20" rx="2" ry="2" width="16" height="16" />
          <rect x={xOffset + 24} y="23" rx="2" ry="2" width="360" height="10" />
        </ContentLoader>
      </GridItem>
    ) : (
      <React.Fragment>
        {ids.map(id =>
          this.renderPart(Form, { key: id, id, variant: VARIANTS.ROW }),
        )}
        {this.renderMoreLess(MAX_SHOW, value)}
      </React.Fragment>
    );
  };

  openAttachmentView = () => {
    const { attaching } = this.state;
    this.setState({ attaching: !attaching });
  };

  renderEmpty = () => {
    const { value } = this.props;
    const { attaching } = this.state;
    if (value.length || attaching) return null;
    return (
      <GridItem>
        <Empty description="No forms & attachments" />
      </GridItem>
    );
  };

  renderEditableLabel = () => {
    const { compact, value, simple } = this.props;

    const { attaching } = this.state;
    if (compact) return null;
    return (
      <GridContainer justify="space-between" alignItems="baseline">
        <GridItem>
          <EditableLabel Typography={H4}>
            <M {...m.label} /> {!!value.length && ` (${value.length})`}
          </EditableLabel>
        </GridItem>
        {!simple && !attaching && (
          <GridItem>
            <JButton
              bg="gray"
              onClick={this.openAttachmentView}
              title={DEFAULT_LABEL}
            >
              <GridContainer alignItems="center" wrap="nowrap">
                <GridItem>
                  <Icon size="small" icon="lnr-paperclip" />
                </GridItem>
                <GridItem>Attach</GridItem>
              </GridContainer>
            </JButton>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderEditable = () =>
    this.getShow() && (
      <GridItem xs>
        <GridContainer direction="column" wrap="nowrap">
          {this.renderEditableLabel()}
          {!this.state.attaching && this.renderFormRows()}
          {this.renderUploadZone()}
          {this.renderEmpty()}
        </GridContainer>
      </GridItem>
    );

  renderValueProp = () => {
    const { children, value } = this.props;
    return children({ values: value });
  };

  render = () => {
    const { variant, renderProp } = this.props;
    if (renderProp) {
      return this.renderValueProp();
    }

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderEditable,
    });
  };
}

Forms.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  compact: PropTypes.bool,
  iconPadding: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.any,
  renderProp: PropTypes.bool,
  attaching: PropTypes.bool,
  simple: PropTypes.bool,

  // resaga value
  value: PropTypes.array,
};

Forms.defaultProps = {
  renderProp: false,
  id: null,
  variant: null,
  readOnly: false,
  compact: false,
  iconPadding: false,
  loading: false,
  simple: true,

  value: [],
};

// export default NODE_STORE_HOC.selectProp({ path: NODE_PATHS.forms })(Forms);
export default compose(
  withStyles(styles, { name: 'Forms' }),
  NODE_STORE_HOC.selectProp({ path: NODE_PATHS.forms }),
)(Forms);

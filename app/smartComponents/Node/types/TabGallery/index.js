import { CARD, DEFAULT, BADGE } from 'appConstants';
import { PUB_API, GET_PUB_TEMPLATE_TAB } from 'apis/constants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TAB_GALLERY } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import { CONFIG } from './config';
import Card from './components/Card';
import Tab from './components/Tab';
import Badge from './components/Badge';

export class TabGallery extends PureComponent {
  componentDidMount = () => {
    const { isPublic, variant, children } = this.props;
    if (variant === CARD && isPublic && children.length === 0) {
      this.fetchPublic(this.props);
    }
  };

  fetchPublic = props => {
    const { id, templateId, hashkey } = props;
    this.props.resaga.dispatchTo(PUB_API, GET_PUB_TEMPLATE_TAB, {
      payload: {
        tab: { id, type: TAB_GALLERY },
        id,
        hashkey,
        templateId,
      },
    });
  };

  renderDefault = () => null;

  renderRow = () => null;

  renderCard = () => {
    const { variant, ...props } = this.props;

    return <Card {...props} />;
  };

  renderTab = () => {
    const { variant, ...props } = this.props;

    return <Tab {...props} />;
  };

  renderBadge = () => {
    const { variant, ...props } = this.props;

    return <Badge {...props} />;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TABLE]: this.renderRow,
      [CARD]: this.renderCard,
      [TAB_GALLERY]: this.renderTab,
      [BADGE]: this.renderBadge,
      [DEFAULT]: this.renderDefault,
    });
  };
}

TabGallery.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  isPublic: PropTypes.bool,

  // resaga props
  index: PropTypes.number,
  children: PropTypes.array,
};

TabGallery.defaultProps = {
  variant: '',
  isPublic: false,

  children: [],
};

export default compose(resaga(CONFIG))(TabGallery);

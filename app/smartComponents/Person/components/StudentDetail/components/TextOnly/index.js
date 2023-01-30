import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { EditablePlaceholder } from 'viewComponents/Editable';
import { Span } from 'viewComponents/Typography';
import { Number, Year, Class } from '../../parts';
import { CONFIG } from './config';
import m from './messages';

export class StudentDetailTextOnly extends React.PureComponent {
  renderPart = Component => (
    <Component {...this.props} variant={VARIANTS.TEXT_ONLY} />
  );

  renderYear = () => {
    const { year } = this.props;
    return (
      !!year && (
        <Span dense>
          <M {...m.year} values={{ year: this.renderPart(Year) }} />
        </Span>
      )
    );
  };

  renderClass = () => {
    const { className } = this.props;
    return (
      !!className && (
        <Span dense>
          <M {...m.class} values={{ class: this.renderPart(Class) }} />
        </Span>
      )
    );
  };

  renderNumber = () => {
    const { number } = this.props;
    return (
      !!number && (
        <Span dense>
          <M {...m.number} values={{ number: this.renderPart(Number) }} />
        </Span>
      )
    );
  };

  renderYearClass = () => {
    const year = this.renderYear();
    const className = this.renderClass();
    return (
      (year || className) && (
        <M
          {...m.yearClass}
          values={{
            year,
            class: className,
            separator: !!year && !!className && ', ',
          }}
        />
      )
    );
  };

  renderYearClassNumber = () => {
    const yearClass = this.renderYearClass();
    const number = this.renderNumber();
    return (
      (yearClass || number) && (
        <M
          {...m.yearClassNumber}
          values={{
            yearClass,
            number,
            separator: !!yearClass && !!number && ', ',
          }}
        />
      )
    );
  };

  render = () => {
    const { placeholder } = this.props;
    return (
      this.renderYearClassNumber() || (
        <EditablePlaceholder>{placeholder}</EditablePlaceholder>
      )
    );
  };
}

StudentDetailTextOnly.propTypes = {
  // parent
  placeholder: PropTypes.string,

  // resaga value
  year: PropTypes.string,
  className: PropTypes.string,
  number: PropTypes.string,
};

StudentDetailTextOnly.defaultProps = {
  placeholder: null,

  year: null,
  className: null,
  number: false,
};

export default resaga(CONFIG)(StudentDetailTextOnly);

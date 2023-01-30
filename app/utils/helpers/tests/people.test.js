import { MEDICAL_SEVERITIES } from 'utils/constants/people';
import { MEDICAL_SEVERITY_HELPERS } from '../people';

describe('utils/helpers/people', () => {
  describe('MEDICAL_SEVERITY_HELPERS', () => {
    describe('#renderSeverity()', () => {
      it('still matches snapshot', () => {
        expect(
          MEDICAL_SEVERITY_HELPERS.renderSeverity(MEDICAL_SEVERITIES.mild),
        ).toMatchSnapshot();
        expect(
          MEDICAL_SEVERITY_HELPERS.renderSeverity(MEDICAL_SEVERITIES.moderate),
        ).toMatchSnapshot();
        expect(
          MEDICAL_SEVERITY_HELPERS.renderSeverity(MEDICAL_SEVERITIES.severe),
        ).toMatchSnapshot();
        expect(MEDICAL_SEVERITY_HELPERS.renderSeverity()).toMatchSnapshot();
      });
    });

    describe('#sortSeverity()', () => {
      it('still matches snapshot', () => {
        expect(
          MEDICAL_SEVERITY_HELPERS.sortSeverity({
            value: MEDICAL_SEVERITIES.mild,
          }),
        ).toMatchSnapshot();
        expect(
          MEDICAL_SEVERITY_HELPERS.sortSeverity({
            value: MEDICAL_SEVERITIES.moderate,
          }),
        ).toMatchSnapshot();
        expect(
          MEDICAL_SEVERITY_HELPERS.sortSeverity({
            value: MEDICAL_SEVERITIES.severe,
          }),
        ).toMatchSnapshot();
        expect(MEDICAL_SEVERITY_HELPERS.sortSeverity({})).toMatchSnapshot();
      });
    });
  });
});

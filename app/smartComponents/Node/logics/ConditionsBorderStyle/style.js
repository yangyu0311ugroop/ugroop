import { MEDICAL_SEVERITIES } from 'utils/constants/people';

const makeBorder = (side, color) => ({
  [`border${side}`]: `solid 3px ${color}`,
});

const makeBorders = (color1, color2) => ({
  ...makeBorder('Top', color1),
  ...makeBorder('Left', color1),
  ...makeBorder('Right', color2),
  ...makeBorder('Bottom', color2),
});

const makeMedicalBorders = (colors, severity) => ({
  [`medical_${severity}`]: makeBorders(colors[severity], colors[severity]),
  [`medicalDietary_${severity}`]: makeBorders(colors[severity], colors.dietary),
});

const style = ({ colors }) => ({
  ...makeMedicalBorders(colors, MEDICAL_SEVERITIES.mild),
  ...makeMedicalBorders(colors, MEDICAL_SEVERITIES.moderate),
  ...makeMedicalBorders(colors, MEDICAL_SEVERITIES.severe),
  dietary: makeBorders(colors.dietary, colors.dietary),
  margin: {
    marginRight: 1,
  },
});

export default style;

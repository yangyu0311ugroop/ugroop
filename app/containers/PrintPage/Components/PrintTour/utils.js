import { UID_HELPERS } from 'utils/helpers/uid';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

const VIDEO_SEARCH_TAG_GLOBAL = /<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="/g;
const VIDEO_SEARCH_TAG_LOCAL = '<iframe class="ql-video"';

const convertHtmlToLink = (descr, indicator, arrayTag) => {
  const array = descr.split(arrayTag);

  const newArray = array.map(data => {
    if (data.includes(indicator)) {
      const url = data.replace(`${indicator}=`, '');
      const urlLink = `<p>${url}</p>`;
      const origContent = `<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="${url}"> </iframe>`;
      return `${origContent} Video: ${urlLink}`;
    }
    return data;
  });
  return newArray.join('');
};

const handleVideo = description => {
  if (!description) return '';

  const arrayTagIndicator = UID_HELPERS.generateUID();
  const parseTagIndicator = UID_HELPERS.generateUID();

  const hasVideo = description.toString().includes(VIDEO_SEARCH_TAG_LOCAL);

  if (!hasVideo) return description;

  const paddedStr = `${arrayTagIndicator} ${LOGIC_HELPERS.ifElse(
    description,
    description,
    '',
  )}`;
  const parsedStr = paddedStr
    .replace(
      VIDEO_SEARCH_TAG_GLOBAL,
      `${arrayTagIndicator} ${parseTagIndicator}= `,
    )
    .replace(/"><\/iframe>/g, `${arrayTagIndicator}`);

  return convertHtmlToLink(parsedStr, parseTagIndicator, arrayTagIndicator);
};
export const PRINT_TOUR_HELPER = {
  handleVideo,
};

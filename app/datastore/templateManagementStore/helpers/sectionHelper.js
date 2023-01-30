import dotProp from 'dot-prop-immutable';
import _, { get, keys, merge } from 'lodash';

// immutable function
const upsert = (result, { node }) => sections => {
  const data = sections || {};
  return dotProp.merge(data, `${result.id}`, { ...node, ...result });
};

// immutable function
const remove = id => sections => dotProp.delete(sections, `${id}`);

// immutable function
const setPhoto = (sectionId, ids) => sections =>
  dotProp.set(sections, `${sectionId}.photos`, ids);

const getPhotoIds = sectionId => sections =>
  dotProp.get(sections, `${sectionId}.photos`, []);
// immutable function
const removePhotoById = (sectionId, id) => sections => {
  const children = getPhotoIds(sectionId)(sections);
  const index = _.indexOf(children, id);
  if (index !== -1) {
    return dotProp.delete(sections, `${sectionId}.photos.${index}`);
  }
  return sections;
};

const setAttachment = (sectionId, id) => attachment => {
  if (Number.isInteger(id)) {
    return dotProp.set(attachment, `${sectionId}.attachment`, id);
  }
  return attachment;
};

const removeAttachmentById = sectionId => attachment =>
  dotProp.delete(attachment, `${sectionId}.attachment`);

const makeSection = (id, formData) => {
  const { editContent, editLocation } = formData;

  const emptyLocation = !editLocation
    ? { placeId: '', icon: '', timeZoneId: '' }
    : {};

  return {
    id,
    content: editContent,
    customData: { location: editLocation, ...emptyLocation },
    type: 'activity',
  };
};

const MAX_INT = 2294967295;
const uniqueInteger = () => Date.now() % MAX_INT;

// return empty if description not changed
const makeDescription = description =>
  description ? { customData: { description } } : {};

const makeUrl = url => (url ? { customData: { url } } : {});

const makeLocation = ({ editLocation, ...rest }) => {
  // return empty if no photo props changed
  if (!editLocation) return {};

  return { customData: rest };
};

const makePhoto = photo => {
  // return null if photo is null means deleted
  if (photo === null) {
    const customData = { photoId: null, photo: null, metaInfo: null };
    return { customData, photos: [] };
  }

  // return empty if no photo props changed
  if (!keys(photo).length) return null;

  // if photo is updated
  const customData = {
    photoId: photo.id,
    photo: photo.content,
    metaInfo: photo.metaInfo,
  };

  // if photo is already exist, just return updated customData
  if (photo.id) return { customData };

  // otherwise, generate a unique ID and inject it to photos as well
  const generatedId = uniqueInteger();
  const photos = [generatedId];

  return { customData, photos };
};

const makeAttachment = (parentNodeId, formData, dirtyData) => {
  const { fileDescription } = formData;
  const {
    attachmentId,
    attachment,
    attachmentDescription,
    attachmentURL,
  } = dirtyData;

  // attachment touched
  const generatedId = uniqueInteger();
  const description =
    attachmentDescription === null || attachmentDescription === undefined
      ? fileDescription
      : attachmentDescription;

  // if attachment is not exist, return it without ID
  if (!attachmentURL && !description)
    return { customData: { attachment: null }, canDelete: true };

  let customData = {
    attachment: {
      ...attachment,
      parentNodeId,
      description,
    },
  };

  // if no attachment yet but with description
  if (!attachmentId && description)
    return { customData, createAttachment: true };

  // if attachment is not exist, return it without ID
  if (!attachmentId) return { customData, attachment: generatedId };

  // otherwise, return updated customData with actual attachmentId
  customData = dotProp.set(customData, 'attachment.id', attachmentId);
  return { customData, attachment: attachmentId };
};

const mergeAll = (...props) => merge({}, ...props);

const mergeAttachment = (attachmentId, attachment) => (attachments = {}) =>
  dotProp.merge(attachments, `${attachmentId}`, attachment);

const setAttachmentValue = node => {
  const attachmentId = get(node, 'attachment');
  if (!attachmentId) return {};

  const attachment = get(node, 'customData.attachment', {});
  return {
    attachments: mergeAttachment(attachmentId, attachment),
  };
};

export default {
  upsert,
  remove,
  setPhoto,
  setAttachment,
  removePhotoById,
  removeAttachmentById,
  makeSection,
  makeDescription,
  makeUrl,
  makePhoto,
  makeLocation,
  makeAttachment,
  mergeAll,
  mergeAttachment,
  setAttachmentValue,
};

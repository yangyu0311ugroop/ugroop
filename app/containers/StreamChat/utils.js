export const getChannel = async (client, type, id) => {
  const channel = await client.queryChannels({
    type,
    cid: id,
  });
  if (channel && channel.length > 0) {
    await channel[0].watch();
    return channel[0];
  }
  return null;
};

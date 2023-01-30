import { StreamChat } from 'stream-chat';
class StreamChatStartUp {
  constructor() {
    try {
      this.streamChat = new StreamChat(process.env.STREAM_CHAT_KEY, {
        timeout: 10000,
      });
    } catch (e) {
      console.log(e);
    }
  }

  getStreamChatInstance = () => this.streamChat;
}

export default StreamChatStartUp;

class ChatApi {
  #_client;

  constructor({client}) {
    this.#_client = client;
    this.url = '/chats';
  }

  getChatsPreview() {
    return this.#_client.get(`${this.url}/`);
  }

  getChat(data) {
    return this.#_client.get(
        `${this.url}/chat/${data.chatId}?interlocutorId=${data.interlocutorId}`);
  }

  setChatFavorite(data) {
    return this.#_client.patch(
        `${this.url}/chat/${data.chatId}/favorite`, data);
  }

  setChatBlocked(data) {
    return this.#_client.patch(
        `${this.url}/chat/${data.chatId}/blocked`, data);
  }

  postNewMessage(data) {
    return this.#_client.post(`${this.url}/chat/${data.chatId}`, data);
  }

  createCatalog(data) {
    return this.#_client.post(`${this.url}/catalogs/`, data);
  }

  getCatalogsList(data) {
    return this.#_client.get(`${this.url}/catalogs/`, data);
  }

  deleteCatalog(data) {
    return this.#_client.delete(`${this.url}/catalogs/${data.catalogId}`);
  }

  changeCatalogName(data) {
    return this.#_client.patch(
        `${this.url}/catalogs/${data.catalogId}`, data);
  }

  addChatIntoCatalog(data) {
    return this.#_client.post(
        `${this.url}/catalogs/${data.catalogId}`, data);
  }

  removeChatFromCatalog(data) {
    return this.#_client.delete(
        `${this.url}/catalogs/${data.catalogId}/${data.chatId}`);
  }

}

export default ChatApi;

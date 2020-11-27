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
        `${this.url}/${data.chatId}?userId=${data.userId}`);
  }

  setChatFavorite(data) {
    return this.#_client.patch(
        `${this.url}/${data.chatId}/favorite`, data);
  }

  setChatBlocked(data) {
    return this.#_client.patch(
        `${this.url}/${data.chatId}/blocked`, data);
  }

  postNewMessage(data) {
    return this.#_client.post(`${this.url}/${data.chatId}`, data);
  }

  createCatalog(data) {
    return this.#_client.post(`${this.url}/catalogs`, data);
  }

  getCatalogsList(data) {
    return this.#_client.get(`${this.url}/catalogs`, data);
  }

  deleteCatalog(data) {
    return this.#_client.delete(`${this.url}/catalogs/${data.catalogId}`, data);
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
        `${this.url}/catalogs/${data.catalogId}/${data.chatId}`, data);
  }

}

export default ChatApi;

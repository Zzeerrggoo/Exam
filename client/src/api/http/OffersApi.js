class OffersApi {
  #_client;

  constructor({client}) {
    this.#_client = client;
    this.url = '/offers';

  }

  getOffersForContest = ({contestId}) => {
    return this.#_client.get(`${this.url}/${contestId}`);
  };

  getModeratingOffers = ({limit, offset}) => {
    return this.#_client.get(
        `${this.url}/moderating?limit=${limit}&offset=${offset}`);
  };

  addNewOffer = (data) => {
    return this.#_client.post(`${this.url}/`, data);
  };

  setOfferStatus = (data) => {
    return this.#_client.patch(`${this.url}/${data.offerId}/status`, data);
  };

  changeOfferMark = (data) => {
    return this.#_client.put(`${this.url}/${data.offerId}/rating`, data);
  };

}

export default OffersApi;
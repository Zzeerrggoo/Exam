class OffersApi {
  #_client;

  constructor({client}) {
    this.#_client = client;
    this.url = '/offers';

  }

  getOffersForContest = ({contestId}) => {
    return this.#_client.get(`${this.url}/${contestId}`);
  };

  getModeratingOffers = ({limit, offset, filter}) => {
    return this.#_client.get(
        `${this.url}/moderating/offers?limit=${limit}&offset=${offset}&filter=${filter}`);
  };

  addNewOffer = (data) => {
    return this.#_client.post(`${this.url}/`, data);
  };

  setOfferStatus = (data) => {
    return this.#_client.patch(`${this.url}/${data.offerId}/status`, data);
  };

  moderateOffer = (data) => {
    return this.#_client.patch(`${this.url}/${data.offerId}/moderate`, data);
  };

  changeOfferMark = (data) => {
    return this.#_client.put(`${this.url}/${data.offerId}/rating`, data);
  };

}

export default OffersApi;
class OffersApi {
  #_client;

  constructor({client}) {
    this.#_client = client;
    this.url = '/offers';

  }

  getOffersForContest = ({contestId}) => {
    return this.#_client.get(`${this.url}/${contestId}`);
  };

}

export default OffersApi;
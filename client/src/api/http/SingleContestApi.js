class SingleContestApi {
  #_client;

  constructor({client}) {
    this.#_client = client;
    this.url = '/singleContest';
  }

  getDescDataForContest = (data) => {
    const urlParams = new URLSearchParams(data).toString();
    return this.#_client.get(`${this.url}/description?${urlParams}`);
  };

}

export default SingleContestApi;

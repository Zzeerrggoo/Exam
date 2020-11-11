class ContestsApi {
  #_client;

  constructor({client}) {
    this.#_client = client;
    this.url = '/contests';

  }

  getCustomersContests = (data) => {
    const config = {
      headers: {
        status: data.contestStatus,
      },
    };
    return this.#_client.get(`${this.url}/user/${data.id}`, config);
  };

  getActiveContests = (data) => {
    const urlParams = new URLSearchParams(data).toString();
    return this.#_client.get(`${this.url}/user/${data.id}/active?${urlParams}`);
  };

  getIndustryForContest = () => {
    return this.#_client.get(`${this.url}/industries`);
  };

}

export default ContestsApi;

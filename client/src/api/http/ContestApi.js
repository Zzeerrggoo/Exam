class ContestApi {
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
    console.log(data);
    const urlParams = new URLSearchParams(data).toString();
    console.log(urlParams);
    return this.#_client.get(`${this.url}/user/${data.id}/active?${urlParams}`);
  };

    return this.#_client.get(url, config);
  };

}

export default ContestApi;

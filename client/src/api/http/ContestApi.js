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

    const url = `${this.url}/user/${data.id}`;

    return this.#_client.post(url, data, config);
  };

}

export default ContestApi;

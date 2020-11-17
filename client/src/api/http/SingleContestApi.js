class SingleContestApi {
  #_client;

  constructor({client}) {
    this.#_client = client;
    this.url = '/singleContest';
  }

  getDescrDataForContest = (data) => {
    const urlParams = new URLSearchParams(data).toString();
    return this.#_client.get(`${this.url}/description?${urlParams}`);
  };

  getContestById = ({contestId}) => {
    return this.#_client.get(`${this.url}/${contestId}`);
  };

  updateContest = (data) => {
    return this.#_client.patch(`${this.url}/${data.contestId}`, data);
  };

  getContestFile = ({contestId, fileName}) => {
    return this.#_client.get(`${this.url}/${contestId}/file/${fileName}`);
  };

}

export default SingleContestApi;

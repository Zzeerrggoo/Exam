class PaymentApi {
  #_client;

  constructor({client}) {
    this.#_client = client;
    this.url = '/payment';
  }

  pay(data) {
    return this.#_client.patch(`${this.url}/pay`, data.formData);
  }

  cashout(data) {
    return this.#_client.patch(`${this.url}/cashout`, data);
  }

}

export default PaymentApi;

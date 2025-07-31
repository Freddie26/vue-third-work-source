export default class FetchProvider {

  async request(options) {
    const body = options.data ? JSON.stringify(options.data) : null;
    try {
      const url = options.baseUrl + options.path + this.computeQueryParams(options.query);
      const response = await fetch(
        url,
        {
          method: options.method,
          headers: options.headers,
          body
        }
      );

      if (!response.ok) await this.onError(response);
      if (response.status === 204) return response;

      return await response.json();
    } catch (ex) {
      await this.onError(ex)
    }
  }

  computeQueryParams(query) {
    if (!query) return '';
    const queryParams = new URLSearchParams(query);
    return '?' + queryParams.toString();
  }

  async onError(ex) {
    if (ex.json) {
      const { error } = await ex.json();
      throw new Error(error.message);
    } else if (ex.message) {
      throw new Error(ex.message);
    } else {
      throw new Error(ex)
    }
  }

  async get(path, requestOptions) {
    return this.request({ path, method: 'GET', ...requestOptions });
  }

  async post(path, requestOptions) {
    return this.request({ path, method: 'POST', ...requestOptions });
  }

  async put(path, requestOptions) {
    return this.request({ path, method: 'PUT', ...requestOptions });
  }

  async delete(path, requestOptions) {
    return this.request({ path, method: 'DELETE', ...requestOptions });
  }
}

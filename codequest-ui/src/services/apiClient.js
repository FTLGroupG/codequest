/**
 * ApiClient class for making API requests using axios.
 */
import axios from "axios";

class ApiClient {
  /**
   * Creates an instance of ApiClient.
   * @param {string} remoteHostUrl - The URL of the remote host.
   */
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "codequest_token";
  }

  /**
   * Sets the authentication token.
   * @param {string} token - The authentication token.
   */
  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token);
  }

  /**
   * Sends an HTTP request to the API.
   * @param {object} config - The request configuration.
   * @param {string} config.endpoint - The API endpoint.
   * @param {string} [config.method='GET'] - The HTTP method.
   * @param {object} [config.data={}] - The request payload.
   * @returns {Promise<object>} The response data or an error object.
   */
  async request({ endpoint, method = `GET`, data = {} }) {
    const url = `${this.remoteHostUrl}${endpoint}`;

    const headers = { "Content-Type": "application/json" };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const res = await axios({ url, method, data, headers });

      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });

      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  /**
   * Logs in a user.
   * @param {object} credentials - The user's login credentials.
   * @returns {Promise<object>} The response data or an error object.
   */
  async loginUser(credentials) {
    return await this.request({
      endpoint: `auth/login`,
      method: `POST`,
      data: credentials,
    });
  }

  /**
   * Signs up a user.
   * @param {object} credentials - The user's signup credentials.
   * @returns {Promise<object>} The response data or an error object.
   */
  async signupUser(credentials) {
    return await this.request({
      endpoint: `auth/register`,
      method: `POST`,
      data: credentials,
    });
  }

  async fetchQuestionByModule(id) {
    return await this.request({
      endpoint: `questions/${id}`,
      method: `GET`,
    });
  }

  async fetchQuestionById(id) {
    return await this.request({
      endpoint: `questions/id/${id}`,
      method: `GET`,
    });
  }

  async completeModule(module_id) {
    return await this.request({
      endpoint: `auth/userprogress/${module_id}`,
      method: `PUT`,
    });
  }

  /**
   * Fetches the user details using the stored token.
   * @returns {Promise<object>} The response data or an error object.
   */
  async fetchUserFromToken() {
    return await this.request({ endpoint: `auth/me`, method: `GET` });
  }
}

export default new ApiClient("http://localhost:3001/");

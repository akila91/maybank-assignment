import axios from 'axios';
import globalVariables from './global'
var qs = require('qs');

const TIMEOUT_IN_MINUTES = 9;

function getTimeout(timeoutInMinutes) {
    return ((timeoutInMinutes * 60) + 30) * 1000
}

export default class HttpClient {
    constructor(host, port = "") {
        this.host = host;
        this.port = port;

        if (this.port !== "") {
            this.endpoint = `${this.host}:${this.port}`
        } else {
            this.endpoint = `${this.host}`
        }

        this._axios = axios.create({
            baseURL: this.endpoint,
            timeout: getTimeout(TIMEOUT_IN_MINUTES)
        });
    }

    getEndpoint() {
        console.log(`${this.endpoint} is our endpoint.`);
        return this.endpoint
    }

    getAxiosInstance() {
        return this._axios;
    }

    static addRequestInterceptor(client) {
        client.interceptors.request.use(function (config) {
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        return client
    }

    static addResponseInterceptor(client) {
        client.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            return Promise.reject(error);
        });

        return client
    }

    makeRequest(method, url, config = { data: {}, headers: {}, params: {}, onUploadProgress: function (progressEvent) { } }, withAuth = false) {
        let client = this._axios;

        let requestConfig = {
            method: method,
            url: url,
            data: config.data,
            headers: config.headers,
            params: config.params,
            paramsSerializer: params => {
                return qs.stringify(params)
            },
            onUploadProgress: config.onUploadProgress
        };

        if (withAuth) {
            client = HttpClient.addRequestInterceptor(client)
        }

        console.log("Request Config ", requestConfig);

        return new Promise((resolve, reject) => {
            client(requestConfig)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    if (error.response) {
                        resolve(error.response);
                    } else if (error.request) {
                        console.log("Request ", error.request);
                        reject(error);
                    } else {
                        console.log('Error', error.message);
                        reject(error);
                    }
                });
        });
    }
}


import HttpClient from './httpClient'

const OfficeIP = "http://172.17.21.21:81";
const AnyWhereElseIP = "http://197.248.38.196:5581";

const AppEndpoint = 'http://jsonplaceholder.typicode.com';
const Port = "5581";
const host = 'http://jsonplaceholder.typicode.com';

const DefaultRedirectRoute = "/survey/channels/view";

const client = new HttpClient(AppEndpoint);

function makeRequest(method, url, config, withAuth = false) {
  return client.makeRequest(method, url, config, withAuth)
}

export default {
  AppEndpoint,
  host,
  DefaultRedirectRoute,
  makeRequest
}

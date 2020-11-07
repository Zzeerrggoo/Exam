import axios from 'axios';
import config from '../../app/config';
import AuthApi from './AuthApi';
import ContestApi from './ContestApi';

const {
  api: {http},
} = config;

const client = axios.create(http);

export const auth = new AuthApi({client});
export const contest = new ContestApi({client});

export default client;

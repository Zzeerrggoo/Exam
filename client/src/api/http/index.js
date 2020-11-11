import axios from 'axios';
import config from '../../app/config';
import AuthApi from './AuthApi';
import ContestsApi from './ContestsApi';
import SingleContestApi from './SingleContestApi';

const {
  api: {http},
} = config;

const client = axios.create(http);

export const auth = new AuthApi({client});
export const contest = new ContestsApi({client});
export const singleContest = new SingleContestApi({client});

export default client;

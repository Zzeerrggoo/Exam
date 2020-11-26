import axios from 'axios';
import config from '../../app/config';
import AuthApi from './AuthApi';
import ContestsApi from './ContestsApi';
import SingleContestApi from './SingleContestApi';
import PaymentApi from './PaymentApi';
import OffersApi from './OffersApi';
import ChatApi from './ChatApi';

const {
  api: {http},
} = config;

const client = axios.create(http);

export const auth = new AuthApi({client});
export const contests = new ContestsApi({client});
export const singleContest = new SingleContestApi({client});
export const payment = new PaymentApi({client});
export const offers = new OffersApi({client});
export const chats = new ChatApi({client});

export default client;

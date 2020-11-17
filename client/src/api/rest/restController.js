import http from '../interceptor';
import client from '../http';

export const getPreviewChat = () => http.post('getPreview');
export const getDialog = (data) => http.post('getChat', data);
export const newMessage = (data) => http.post('newMessage', data);
export const changeChatFavorite = (data) => http.post('favorite', data);
export const changeChatBlock = (data) => http.post('blackList', data);
export const getCatalogList = (data) => http.post('getCatalogs', data);
export const addChatToCatalog = (data) =>
    http.post('addNewChatToCatalog', data);
export const createCatalog = (data) => http.post('createCatalog', data);
export const deleteCatalog = (data) => http.post('deleteCatalog', data);
export const removeChatFromCatalog = (data) =>
    http.post('removeChatFromCatalog', data);
export const changeCatalogName = (data) => http.post('updateNameCatalog', data);

/*//////////////////THAT'S IT//////////////////*/
export const getContestById = (data) => {
  return client.get('getContestById', {
    headers: {
      contestId: data.contestId,
    },
  });
};
export const updateContest = (data) => client.post('updateContest', data);
export const downloadContestFile = (data) =>
    client.get('downloadFile/' + data.fileName);
/////////////////////////////////////////////////
export const setNewOffer = (data) => client.post('setNewOffer', data);
export const setOfferStatus = (data) => client.post('setOfferStatus', data);
export const changeMark = (data) => client.post('changeMark', data);
import http from '../interceptor';

export const getUser = () => http.post('getUser');
export const updateContest = (data) => http.post('updateContest', data);
export const setNewOffer = (data) => http.post('setNewOffer', data);
export const setOfferStatus = (data) => http.post('setOfferStatus', data);
export const downloadContestFile = (data) =>
    http.get('downloadFile/' + data.fileName);
export const payMent = (data) => http.post('pay', data.formData);
export const changeMark = (data) => http.post('changeMark', data);
export const getPreviewChat = () => http.post('getPreview');
export const getDialog = (data) => http.post('getChat', data);
//export const dataForContest = (data) => http.post('dataForContest', data);
export const cashOut = (data) => http.post('cashout', data);
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
//THAT'S IT

export const getContestById = (data) => {
  return http.get('getContestById', {
    headers: {
      contestId: data.contestId,
    },
  });
};

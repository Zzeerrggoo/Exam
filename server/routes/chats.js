const chatsRouter = require('express').Router();
const controller = require('../controllers/newChatcontroller');

chatsRouter.get('/', controller.getChatsPreview);

chatsRouter.get('/:chatId', controller.getChat);
chatsRouter.post('/:chatId', controller.postNewMessage);

chatsRouter.patch('/:chatId/favorite', controller.setChatFavorite);
chatsRouter.patch('/:chatId/blocked', controller.setChatBlocked);

chatsRouter.post('/catalogs', controller.createCatalog);
chatsRouter.get('/catalogs', controller.getCatalogs);

chatsRouter.route('/catalogs/:catalogId')
  .post(controller.addChatToExistingCatalog)
  .patch(controller.changeCatalogName)
  .delete(controller.deleteCatalog);

chatsRouter.delete('/catalogs/:catalogId/:chatId',
  controller.removeChatFromCatalog);

module.exports = chatsRouter;

const chatsRouter = require('express').Router();
const controller = require('../controllers/newChatcontroller');

chatsRouter.get('/', controller.getChatsPreview);

chatsRouter.get('/chat/:chatId', controller.getChat);
chatsRouter.post('/chat/:chatId', controller.postNewMessage);
chatsRouter.patch('/chat/:chatId/favorite', controller.setChatFavorite);
chatsRouter.patch('/chat/:chatId/blocked', controller.setChatBlocked);

chatsRouter.post('/catalogs/', controller.createCatalog);
chatsRouter.get('/catalogs/', controller.getCatalogs);
chatsRouter.route('/catalogs/:catalogId')
  .post(controller.addChatToExistingCatalog)
  .patch(controller.changeCatalogName)
  .delete(controller.deleteCatalog);

chatsRouter.delete('/catalogs/:catalogId/:chatId',
  controller.removeChatFromCatalog);

module.exports = chatsRouter;

import React from 'react';
import DialogList from '../DialogList/DialogList';
import {useSelector} from 'react-redux';
import {chatSelector} from '../../../../selectors';

const DialogListContainer = () => {

  const chatStore = useSelector(chatSelector);

  const {messagesPreview, userId} = chatStore;
  return <DialogList preview={messagesPreview}
                     userId={userId}/>;

};

export default DialogListContainer;

/*import React from 'react';
import {connect} from 'react-redux';
import {getChatPreview} from '../../../../actions/chatsActionCreators';
import DialogList from '../DialogList/DialogList';

class DialogListContainer extends React.Component {
  componentDidMount() {
    //this.props.getChatPreview();
  }

  render() {
    const {messagesPreview, userId} = this.props;
    return <DialogList preview={messagesPreview}
                       userId={userId}/>;
  }
}

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => {
  return {
    getChatPreview: () => dispatch(getChatPreview()),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DialogListContainer);
*/
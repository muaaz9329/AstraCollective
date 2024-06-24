import {useEffect, useState} from 'react';
import {apiService} from '../../../../../network';
import routes from '../../../../../network/routes';
import {ErrorFlashMessage} from '../../../../../services/helpingMethods';
import {useDispatch} from 'react-redux';
import {setComments} from '../../../../../redux/Slices/commentSlice';
const useApi = id => {
  const [loading, setLoading] = useState(false);
  const [userComment, setUserComment] = useState('');
  const dispatch = useDispatch();

  const getComments = async () => {
    setLoading(true);
    await apiService.Get({
      url: routes.getComments + '/' + id,
      setLoading,
      OnSuccess: res => {
        // setComment(res?.data?.comments);
        dispatch(setComments(res?.data?.comments));
        setLoading(false);
      },
      OnError: e => {
        // setComment([]);
        dispatch(setComments([]));
        setLoading(false);
        ErrorFlashMessage('Something went wrong');
      },
    });
  };

  const addReplies = async id => {
    setLoading(true);
    await apiService.Post({
      url: routes.createReply,
      body: {
        comment: id,
        text: userComment,
      },
      setLoading,
      OnSuccess: res => {
        console.log(res);
        setUserComment('');
        getComments();
      },
      OnError: e => {
        console.log(e);
        ErrorFlashMessage('Something went wrong');
      },
    });
  };

  const addComment = async () => {
    await apiService.Post({
      url: routes.createComment,
      body: {
        post: id,
        text: userComment,
      },
      setLoading,
      OnSuccess: res => {
        console.log(res);
        getComments();
      },
      OnError: e => {
        console.log(e);
        ErrorFlashMessage('Something went wrong');
      },
    });
  };

  useEffect(() => {
    getComments();
  }, []);
  return {
    loading,
    setUserComment,
    userComment,
    addComment,
    addReplies,
  };
};
export default useApi;

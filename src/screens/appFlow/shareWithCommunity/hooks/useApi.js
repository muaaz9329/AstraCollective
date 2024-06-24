import {useEffect, useState} from 'react';
import {apiService} from '../../../../network';
import routes from '../../../../network/routes';
import {
  ErrorFlashMessage,
  SuccessFlashMessage,
} from '../../../../services/helpingMethods';
import useValidation from '../../../../hooks/useValidation';
import {useNavigation} from '@react-navigation/native';
import {appNavigationParam} from '../../../../services';
import {useDispatch} from 'react-redux';
import {setUserProfileRefresh} from '../../../../redux/Slices/refreshSlice';
const useApi = (comingFor, postData) => {
  const [postText, setPostText] = useState('');
  const [loading, setLoading] = useState(false);
  const {validatePostText} = useValidation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const createPost = async bookId => {
    if (validatePostText(postText)) {
      setLoading(true);
      await apiService.Post({
        url: routes.createPost,
        body: {
          text: postText,
          id: bookId,
        },
        setLoading,
        OnSuccess: res => {
          SuccessFlashMessage('Post created successfully !');

          navigation.navigate('Community');
        },
        OnError: e => {
          ErrorFlashMessage('Error', e);
        },
      });
    }
  };

  //Updating post Logic
  useEffect(() => {
    if (comingFor === appNavigationParam['postInCommunity'].editPost) {
      setPostText(postData.text);
    }
  }, []);
  const updatePost = async () => {
    if (postData === postText) {
      navigation.goBack();
      return;
    }
    if (validatePostText(postText)) {
      setLoading(true);
      apiService.Patch({
        url: routes.editPost + '/' + postData?.id,
        body: {
          text: postText,
        },
        setLoading,
        OnSuccess: res => {
          SuccessFlashMessage('Post updated successfully !');
          dispatch(setUserProfileRefresh(true));
          navigation.goBack();
        },
        OnError: e => {
          ErrorFlashMessage('Error', e);
        },
      });
    }
  };

  return {
    postText,
    setPostText,
    loading,
    createPost,
    updatePost,
  };
};
export default useApi;

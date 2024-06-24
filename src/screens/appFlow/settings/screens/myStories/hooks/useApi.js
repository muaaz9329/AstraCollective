import {useEffect, useState} from 'react';
import {apiService} from '../../../../../../network';
import routes from '../../../../../../network/routes';
import {
  ErrorFlashMessage,
  SuccessFlashMessage,
} from '../../../../../../services/helpingMethods';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getAllMyStories = async () => {
    await apiService.Get({
      url: routes.getMyStories,
      setLoading,
      OnSuccess: res => {
        // console.log('res-->', res);
        setData(res?.data?.myStories);
      },
      OnError: e => {
        console.log('error-->', e);
      },
    });
  };

  const DeleteStory = async id => {
    apiService.Delete({
      url: routes.deleteStory + '/' + id,
      setLoading,
      OnSuccess: res => {
        console.log('res-->', res);
        const tempData = data.filter(item => item._id !== id);
        setData(tempData);
        SuccessFlashMessage('Story Deleted Successfully');
      },
      OnError: e => {
        console.log('error-->', e);
        ErrorFlashMessage('Something went wrong', e);
      },
    });
  };

  useEffect(() => {
    getAllMyStories();
  }, []);
  return {
    loading,
    data,
    DeleteStory,
  };
};
export default useApi;

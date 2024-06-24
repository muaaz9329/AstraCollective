import {useEffect, useState} from 'react';
import {apiService} from '../../../../../../network';
import routes from '../../../../../../network/routes';

const useApi = tag => {
  const [loading, setLoading] = useState(false);
  const [posts, setPost] = useState([]);

  const getAllPostOfTag = async () => {
    apiService.Get({
      url: routes.getPostByTag,
      params: {
        q: tag,
      },
      setLoading: setLoading,
      OnSuccess: res => {
        setPost(res?.data);
      },
      OnError: e => {
        console.log('error--->', e);
      },
    });
  };

  useEffect(() => {
    getAllPostOfTag();
  }, []);
  return {loading, posts};
};
export default useApi;

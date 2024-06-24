import {useEffect, useState} from 'react';
import {apiService} from '../../../../../network';
import routes from '../../../../../network/routes';
import {useNavigation} from '@react-navigation/native';
import {
  refreshSelector,
  setCommunityRefresh,
} from '../../../../../redux/Slices/refreshSlice';
import {useDispatch, useSelector} from 'react-redux';
import { Alert } from 'react-native';
const useApi = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const {communityRefresh} = useSelector(refreshSelector);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const getAllPosts = async (shouldLoad = true) => {
    shouldLoad && setLoading(true);
    await apiService.Get({
      url: routes.getAllPosts,
      OnSuccess: res => {
        setPosts([]);
        setPosts(res?.data?.posts);
        // console.log('res--->', res);
        setLoading(false);
      },
      OnFailure: res => {
        console.log(res);
        setLoading(false);
      },
      setLoading: shouldLoad ? setLoading : () => {},
    });
  };

  const refreshFunction = async () => {
     await apiService.Get({
      url: routes.getAllPosts,
      OnSuccess: res => {
        setPosts([]);
        setPosts(res?.data?.posts);
        // console.log('res--->', res);
        setLoading(false);
      },
      OnFailure: res => {
        console.log(res);
        setLoading(false);
      },
      setLoading:  () => {},
    });
  };

  const onRefresh = () => {
    // dispatch(setUserProfileRefresh(true));
    setRefresh(true);
    console.log("refresh ran")
    // Fetch data or perform any actions here
    // Refresh data (call a function)
    refreshFunction().then(() => {
      
      dispatch(setCommunityRefresh(false));
      setRefresh(false);
    });
  };


  useEffect(()=>{
    console.log({refresh})
  },[refresh])

  useEffect(()=>{
    console.log({communityRefresh})
  },[communityRefresh])



  useEffect(() => {
    if (communityRefresh) {
      onRefresh();
    }
  }, [communityRefresh]);

  useEffect(() => {
    getAllPosts();
    navigation.addListener('focus', () => {
      getAllPosts(false);
      // console.log('focus');
    });
  }, []);

  return {
    loading,
    posts,
    onRefresh,
    refresh,
  };
};

export default useApi;

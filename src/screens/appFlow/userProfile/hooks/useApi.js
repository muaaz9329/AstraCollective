import {useEffect, useState} from 'react';
import routes from '../../../../network/routes';
import {apiService} from '../../../../network';
import {ErrorFlashMessage} from '../../../../services/helpingMethods';
import {
  refreshSelector,
  setUserProfileRefresh,
} from '../../../../redux/Slices/refreshSlice';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
const useApi = (id, isComingForOwn, isComingForUser, setFriend) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const {userProfileRefresh} = useSelector(refreshSelector);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const getProfile = async (shouldLoad = true) => {
    shouldLoad && setLoading(true);
    await apiService.Get({
      url: routes.getProfile + '/' + id,
      OnSuccess: res => {
        setUserData(res?.data);
        setFriend(res?.data?.user?.isFriend);
      },
      OnFailure: res => {
        console.log(res);
        ErrorFlashMessage('Something went wrong');
      },
      setLoading: shouldLoad ? setLoading : val => {},
    });
  };

  const getMyProfile = async (shouldLoad = true) => {
    shouldLoad && setLoading(true);

    await apiService.Get({
      url: routes.getMyProfile,
      OnSuccess: res => {
        setUserData(res?.data);
      },
      OnFailure: res => {
        console.log(res);
        ErrorFlashMessage('Something went wrong');
      },
      setLoading: shouldLoad ? setLoading : val => {},
    });
  };

  const refreshFunction = async () => {
    if (isComingForOwn) {
      await getMyProfile(false);
    } else if (isComingForUser) {
      await getProfile(false);
    }
  };

  const onRefresh = () => {
    // dispatch(setUserProfileRefresh(true));
    setRefresh(true);
    // Fetch data or perform any actions here
    // Refresh data (call a function)
    refreshFunction().then(() => {
      dispatch(setUserProfileRefresh(false));
      setRefresh(false);
    });
  };

  useEffect(() => {
    if (isComingForOwn) {
      getMyProfile();
    } else if (isComingForUser) {
      getProfile();
    }
  }, []);

  useEffect(() => {
    if (userProfileRefresh) {
      onRefresh();
    }
  }, [userProfileRefresh]);
  return {
    loading,
    userData,
    onRefresh,
    refresh,
  };
};
export default useApi;

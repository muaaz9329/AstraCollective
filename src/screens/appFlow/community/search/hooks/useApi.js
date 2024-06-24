import {useEffect, useState} from 'react';
import {apiService} from '../../../../../network';
import routes from '../../../../../network/routes';
import {useDispatch} from 'react-redux';
const useApi = index => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchUser, setSearchUser] = useState([
    {
      _id: '65f2a8fa62c6f1bfee64f3c1',
      image: 'https://astraappbucket.s3.us-east-2.amazonaws.com/1710402714158',
      interests: [{_id: '65dd97eb15031bac650580e2', name: 'Cooking', __v: 0}],
      genres: [
        {_id: '65dd98c515031bac650580f3', name: 'Ballroom Dance', __v: 0},
        {_id: '65dd98b815031bac650580f0', name: 'Tap Dance', __v: 0},
        {_id: '65dd98a515031bac650580ed', name: 'Jazz Dance', __v: 0},
      ],
      characters: [],
      firstName: 'Muaaz',
      lastName: 'Khan',
      userName: 'Muaz',
      id: '65f2a8fa62c6f1bfee64f3c1',
      isFriend: 'not-friend',
    },
  ]);
  const [searchHashtag, setSearchHashtag] = useState([
    {postCount: 6, tag: 'Cooking'},
  ]);
  const dispatch = useDispatch();
  const handleSearchTerm = async term => {
    if (index === 0) {
      //search for users

      apiService.Get({
        url: routes.getUsersByUsername,
        params: {
          userName: term,
        },
        setLoading: setLoading,
        OnSuccess: res => {
          setSearchUser(res?.data?.users);
        },
        OnFailure: res => {
          console.log(res);
        },
      });
    } else if (index === 1) {
      //Search for hashtags
      apiService.Get({
        url: routes.getHashTagResults,
        params: {
          q: term,
        },
        setLoading: setLoading,
        OnSuccess: res => {
          setSearchHashtag(res?.data);
        },
        OnError: e => {
          console.log('error --->', e);
        },
      });
    }
  };

  useEffect(() => {
    handleSearchTerm();
  }, [index]);

  return {
    loading,
    setSearchTerm,
    searchTerm,
    handleSearchTerm,
    searchUser,
    searchHashtag,
  };
};
export default useApi;

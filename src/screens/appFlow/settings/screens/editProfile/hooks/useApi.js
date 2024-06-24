import {useEffect, useState} from 'react';
import {apiService} from '../../../../../../network';
import {appRoutes} from '../../../../../../services';
import routes from '../../../../../../network/routes';
import {
  ErrorFlashMessage,
  SuccessFlashMessage,
} from '../../../../../../services/helpingMethods';
import {AppReducers} from '../../../../../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import useValidation from '../../../../../../hooks/useValidation';
import {userDataSave} from '../../../../../../redux/Slices/userDataSlice';
import useImagePicker from '../../../../../../hooks/useImagePicker';
import useS3 from '../../../../../../hooks/useS3';
const useApi = navigation => {
  const [loading, setLoading] = useState(false);
  const {validateName, validateUserName} = useValidation();
  const {imagePicker} = useImagePicker();
  const {uploadImageOnS3} = useS3();
  const dispatch = useDispatch();
  const [interest, setInterest] = useState([
    {
      _id: '',
      userInfo: '',
    },
  ]);
  const [genre, setGenre] = useState([
    {
      _id: '',
      userInfo: '',
    },
  ]);
  const [character, setCharacter] = useState([
    {
      _id: '',
      img: '',
    },
  ]);
  const {userData} = useSelector(state => state[AppReducers.UserData]);

  const defaultUserInfo = {
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    userName: userData?.userName,
    image: userData?.image,
  };

  const [userInfo, setUserInfo] = useState({});

  const value = {
    interest: userData?.interests,
    genre: userData?.genres,
    character: userData?.characters,
  };

  const getInfoToEdit = async () => {
    try {
      setUserInfo(defaultUserInfo);
      setLoading(true);
      await apiService.Get({
        url: routes.allGenre,
        setLoading: val => console.log(val),
        OnSuccess: res => {
          setGenre(res.data.genere);
        },
        OnError: error => {
          console.log('error', error);
          throw error;
        },
      });

      await apiService.Get({
        url: routes.allInterest,
        setLoading: val => console.log(val),
        OnSuccess: res => {
          setInterest(res.data.interest);
        },
        OnError: error => {
          console.log('error', error);
          throw error;
        },
      });

      await apiService.Get({
        url: routes.allCharacters,
        setLoading: val => console.log(val),
        OnSuccess: res => {
          setCharacter(res.data.character);
        },
        OnError: error => {
          console.log('error', error);
          throw error;
        },
      });
    } catch (error) {
      ErrorFlashMessage('Error', error);
    }
  };

  const updateUser = async () => {
    if (
      userInfo.firstName === defaultUserInfo.firstName &&
      userInfo.lastName === defaultUserInfo.lastName &&
      userInfo.userName === defaultUserInfo.userName &&
      userInfo.image === defaultUserInfo.image
    ) {
      navigation.goBack();
    } else {
      if (
        validateName(userInfo.firstName) &&
        validateName(userInfo.lastName) &&
        validateUserName(userInfo.userName)
      ) {
        let bodyObj = {};
        if (userInfo.firstName !== defaultUserInfo.firstName) {
          bodyObj.firstName = userInfo.firstName;
        }
        if (userInfo.lastName !== defaultUserInfo.lastName) {
          bodyObj.lastName = userInfo.lastName;
        }
        if (userInfo.userName !== defaultUserInfo.userName) {
          bodyObj.userName = userInfo.userName;
        }
        if (userInfo.image !== defaultUserInfo.image) {
          bodyObj.image = userInfo.image;
        }
        try {
          setLoading(true);
          await apiService.Patch({
            url: routes.updateMe,
            setLoading,
            body: bodyObj,
            OnSuccess: res => {
              dispatch(userDataSave(res?.data?.user));
              // console.log(res?.data?.user);
              navigation.goBack();
              SuccessFlashMessage('Success', 'Profile Updated SuccessFully');
            },
            OnError: error => {
              ErrorFlashMessage('Error', error);
            },
          });
        } catch (error) {
          ErrorFlashMessage('Error', error);
        }
      }
    }
  };

  const getSelectedItemsForAllTypes = {
    getInterest: () => {
      // Extract names from arr1
      const interestArr = interest.map(item => item.name);

      const filteredInterest = value.interest.filter(item =>
        interestArr.includes(item.name),
      );

      return filteredInterest;
    },
    getGenre: () => {
      const genreArr = genre.map(item => item.name);

      const filteredGenre = value.genre.filter(item =>
        genreArr.includes(item.name),
      );
      return filteredGenre;
    },
    getCharacter: () => {
      const charArr = character.map(item => item.name);

      const filteredCharacter = value.character.filter(item =>
        charArr.includes(item.name),
      );
      return filteredCharacter;
    },
  };

  const changeUserImage = async () => {
    try {
      let imageData = await imagePicker();
      uploadImageOnS3(imageData, val => {
        // console.log('imgUrl', val);
        setUserInfo({...userInfo, image: val});
      });
    } catch (e) {
      console.log(e);
    }
  };

  console.log(userInfo);

  useEffect(() => {
    getInfoToEdit().then(() => {
      // first get all the data then set the selected items
      setLoading(false);
    });
  }, []);

  return {
    loading,
    userInfo,
    setUserInfo,
    getSelectedItemsForAllTypes,
    updateUser,
    changeUserImage,
  };
};

export default useApi;

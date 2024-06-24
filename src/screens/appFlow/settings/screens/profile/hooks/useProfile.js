// import routes from '../../../../../../network/routes';

import {useEffect, useState} from 'react';
import {AppReducers, store} from '../../../../../../redux/store';
import {appIcons, appRoutes} from '../../../../../../services';
import {useSelector, useDispatch} from 'react-redux';
import {apiService} from '../../../../../../network';
import routes from '../../../../../../network/routes';
import {userDataSave} from '../../../../../../redux/Slices/userDataSlice';
import {SuccessFlashMessage} from '../../../../../../services/helpingMethods';
const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const listActions = [
    {
      name: 'Edit Profile',
      icon: appIcons.iconProfile,
      navigate: appRoutes.editProfile,
    },
    {
      name: 'Notification',
      icon: appIcons.iconSetting,

      component: true,
    },
    !store.getState()?.userData?.isSocial
      ? {
          name: 'Change Password',
          icon: appIcons.iconPrivacy,
          navigate: appRoutes.changePassword,
        }
      : {},
    {
      name: 'My Downloads',
      icon: appIcons.iconInfo,
      navigate: appRoutes.myDownloads,
    },
    {
      name: 'My Stories',
      icon: appIcons.book,
      navigate: appRoutes.myStories,
    },
    {
      name: 'About Us',
      icon: appIcons.iconInfo,
      navigate: appRoutes.termsPrivacy,
      data: 'about',
    },
    {
      name: 'Privacy Policy',
      icon: appIcons.iconPrivacy,
      navigate: appRoutes.termsPrivacy,
      data: 'privacy',
    },
    {
      name: 'Terms of Use',
      icon: appIcons.iconTerms,
      navigate: appRoutes.termsPrivacy,
      data: 'terms',
    },
    {
      name: 'Contact Us',
      icon: appIcons.iconContact,
      navigate: appRoutes.contactMe,
    },
    !store.getState()?.userData?.isSocial && {
      name: 'Delete Account',
      icon: appIcons.iconDeleteAcc,
      navigate: appRoutes.deleteAccount,
      shouldColor: true,
      color: 'red',
    },
    {
      name: 'Logout',
      icon: appIcons.iconLogout,
      navigate: appRoutes.wizard,
    },
  ];

  const {userData} = useSelector(state => state[AppReducers.UserData]);

  const defaultData = {
    userName: userData?.userName,
    image: userData?.image,
    email: userData?.email,
    isNotification: userData?.isNotification,
  };

  const [userInfo, setUserInfo] = useState(defaultData);

  useEffect(() => {
    setUserInfo(userData);
  }, [userData]); // side effect function that runs when userData changes , assigning userData to userInfo

  // console.log(, 'socialLog');

  const updateNotification = async isOn => {
    setLoading(true);
    await apiService.Patch({
      url: routes.updateMe,
      setLoading,
      body: {
        isNotification: isOn,
      },
      OnSuccess: res => {
        dispatch(userDataSave(res?.data?.user));
        setUserInfo({...userInfo, isNotification: !userInfo.isNotification});
        setToggle(isOn);
        SuccessFlashMessage('Success', 'Notification Updated');
      },
      OnError: e => {
        console.log('e', e);
        ErrorFlashMessage('Error', e);
      },
    });
  };

  const [toggle, setToggle] = useState(userInfo.isNotification);

  return {
    listActions,
    userInfo,
    updateNotification,
    loading,
    setToggle,
    toggle,
  };
};

export default useProfile;

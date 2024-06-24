import {useEffect, useState} from 'react';
import {apiService} from '../../../../network';
import routes from '../../../../network/routes';
import {ErrorFlashMessage} from '../../../../services/helpingMethods';
import useLogout from '../../../../hooks/useLogout';

const useApi = () => {
  const [loading, setLoading] = useState(true);
  const {logout} = useLogout();
  const [books, setBooks] = useState([
    {
      _id: '',
      coverImage: '',
      genres: [''],
      interests: [''],
      title: '',
    },
  ]);
  const getRecommendedBooks = async () => {
    await apiService.Get({
      setLoading,
      url: routes.recommendedStories,
      OnSuccess: res => {
        setBooks(res?.data?.stories)
      },
      OnError: e => {
        console.log('e', e);
        if (String(e).includes('Token has expired.')) {
          ErrorFlashMessage('Error', 'Token has expired. Please login again.');
          logout();
          return;
        }
        ErrorFlashMessage('Error', e);
      },
    });
  };

  useEffect(() => {
    getRecommendedBooks();
  }, []);
  return {
    loading,
    books,
    setLoading
  };
};
export default useApi;

// useEffect(() => {

//   //Notification On Background
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage,
//     );
//   });

//   //Notification On Quit
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//           remoteMessage.data,
//         );
//       }
//     });

//   //Notification On Foreground
//   messaging().onMessage(async remoteMessage => {
//     console.log('Notification On Foreground', remoteMessage);
//     FlashAlert("S", "Notification", remoteMessage.notification.body, () => { notificationClicked(remoteMessage) })
//   });
// }, [])

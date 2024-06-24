import {useEffect, useState} from 'react';
import {apiService} from '../../../../../../network';
import routes from '../../../../../../network/routes';
import {ErrorFlashMessage} from '../../../../../../services/helpingMethods';

const useApi = passedType => {
  const [Loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const getTermsAndConditions = async () => {
    setLoading(true);

    await apiService.Get({
      url: routes.termsAndConditions,
      setLoading,
      OnSuccess: res => {
        setLoading(false);
        setContent(res.data?.data[0]?.data);
        console.log('res', res);
      },
      OnError: e => {
        setLoading(false);
        ErrorFlashMessage('Something went wrong');
      },
    });
  };

  const getPrivacyPolicy = async () => {
    setLoading(true);
    await apiService.Get({
      url: routes.privacyPolicy,
      setLoading,
      OnSuccess: res => {
        setLoading(false);
        setContent(res.data?.data[0]?.data);
        console.log('res', res);
      },
      OnError: e => {
        setLoading(false);
        ErrorFlashMessage('Something went wrong');
      },
    });
  };

  const getAboutUs = async () => {
    setLoading(true);
    await apiService.Get({
      url: routes.aboutUs,
      setLoading,
      OnSuccess: res => {
        setLoading(false);
        setContent(res.data?.about[0]?.text);
        console.log('res', res);
      },
      OnError: e => {
        setLoading(false);
        ErrorFlashMessage('Something went wrong');
      },
    });
  };

  useEffect(() => {
    if (passedType === 'terms') {
      getTermsAndConditions();
    } else if (passedType === 'privacy') {
      console.log('privacy');
      getPrivacyPolicy();
    } else if (passedType === 'about') {
      getAboutUs();
    }

    return () => {
      setContent('');
      passedType = '';
      setLoading(false);
    };
  }, []);

  return {
    Loading,
    content,
  };
};
export default useApi;

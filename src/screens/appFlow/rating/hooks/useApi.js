import {useEffect, useState} from 'react';
import {apiService} from '../../../../network';
import routes from '../../../../network/routes';
import {SuccessFlashMessage} from '../../../../services/helpingMethods';
import {appRoutes} from '../../../../services';
import useValidation from '../../../../hooks/useValidation';

const useApi = (id, navigation) => {
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const {validateReview} = useValidation();
  const addRating = async () => {
    if (validateReview(rating, review)) {
      await apiService.Post({
        url: routes.AddReview,
        body: {
          rating: rating,
          review: review,
          story: id,
        },
        OnSuccess: res => {
          SuccessFlashMessage('Success', 'Review Added Successfully');
          navigation.navigate(appRoutes.tab, {
            screen: 'Home',
          });
        },
        OnError: err => {
          console.log('err', err);
        },
        setLoading,
      });
    }
  };

  return {
    loading,
    review,
    addRating,
    setReview,
    rating,
    setRating,
  };
};
export default useApi;

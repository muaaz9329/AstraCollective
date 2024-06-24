import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {appNavigationParam, appRoutes} from '../../../../services';
import useValidation from '../../../../hooks/useValidation';
import {setUserPrompt} from '../../../../redux/Slices/createStorySlice';

const useCreateStory = navigation => {
  const dispatch = useDispatch();

  const [desc, setDesc] = useState('');
  const {validatePrompt} = useValidation();

  const handlePrompt = () => {
    if (validatePrompt(desc)) {
      dispatch(setUserPrompt(desc));
      navigation.navigate(appRoutes.newInterestSelection, {
        comingFor: appNavigationParam['chooseInterestScreen'].newInterest,
      });
    }
  };

  return {
    desc,
    setDesc,
    handlePrompt,
  };
};

export default useCreateStory;

import {useImperativeHandle, useState} from 'react';

const useModel = ref => {
  const [open, setOpen] = useState(false);
  useImperativeHandle(ref, () => ({
    showModel() {
      setOpen(true);
    },
    hideModel() {
      setOpen(false);
    },
  }));

  const hideModel = () => {
    setOpen(false);
  };

  return {
    open,
    hideModel,
  };
};

export default useModel;

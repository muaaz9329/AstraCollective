import React, {useEffect, useState} from 'react';

export default function useBadge(setValue, value, initialSelectedValues = []) {
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Runs when user selects an item
  const selectItem = id => {
    let array = [...selectedInterests];
    console.log('hey i selected an item', id);
    let index = array.findIndex(item => item._id === id);
    if (index === -1) {
      array.push({_id: id});
    } else {
      array.splice(index, 1);
    }
    setSelectedInterests([...array]);
    setValue([...array]);
    // console.log('id', id);
  };

  // Checks if an item is selected
  const checkSelected = id => {
    let status = false;
    let array = [...selectedInterests];
    const filterId = array.filter(item => item._id === id);
    if (filterId.length > 0) {
      status = true;
    }

    return status;
  };

  useEffect(() => {
    setSelectedInterests(initialSelectedValues);
    console.log('initial values set');
  }, []);

  return {selectItem, checkSelected};
}

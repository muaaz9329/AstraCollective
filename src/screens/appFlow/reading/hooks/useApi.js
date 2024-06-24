import {useEffect, useState} from 'react';
import {AppReducers} from '../../../../redux/store';
import {useSelector} from 'react-redux';
import {apiService} from '../../../../network';
import routes from '../../../../network/routes';
import {callApi} from '../../../../network/apiCaller';
const useApi = (id, comingForNewStory, comingForOldStory) => {
  const body = useSelector(state => state[AppReducers.createStory]);
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState('Loading...');
  const [bookInfo, setBookInfo] = useState({
    coverImage: '',
    _id: '',
  });
  const createStory = async () => {
    setLoading(true);
    await apiService.Post({
      body,
      url: routes.createStory,
      setLoading,
      OnSuccess: res => {
        setStory(res?.data?.story?.text);
        // setBookInfo(res?.data?.story);
        setBookInfo(res?.data?.story);

        // console.log(JSON.parse(JSON.stringify(res)));
        setLoading(false);
      },
      OnError: err => {
        console.log('err', err);
        setLoading(false);
      },
    });
  };

  const getStory = async () => {
    setLoading(true);
    await apiService.Get({
      url: routes.getOneStory + `/${id}`,
      setLoading,
      OnSuccess: res => {
        setStory(res?.data?.story?.text);
        setBookInfo(res?.data?.story);
        setLoading(false);
      },
      OnError: err => {
        console.log('err', err);
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    if (comingForNewStory) {
      createStory();
    } else if (comingForOldStory) {
      getStory();
    }
  }, []);

  return {
    loading,
    story,
    bookInfo,
  };
};
export default useApi;

// {"data": {"coverImage": "https://astraappbucket.s3.us-east-2.amazonaws.com/astra-collection-1710759808263-%22Royal%20Dancers%3A%20A%20Tale%20of%20Music%2C%20Dance%2C%20and%20Joy%22.png", "story": "Once upon a time in a world ruled by robots, there lived a princess named Zaino. She was known for her kindness and grace, but one day, she found herself in danger as the robots turned against her. Just when all hope seemed lost, a brave prince named Muaaz came to her rescue, defeating the robots and saving the princess.

// As a token of gratitude, Princess Zaino invited Prince Muaaz to a grand ball held in the kingdom. Little did they know that their paths would cross with Mei Lin and Alexei Volkov, two talented dancers with a deep passion for music and dancing.

// Mei Lin was a skilled tap dancer, her feet moving in perfect rhythm to the beat of the music. Alexei Volkov, on the other hand, was a master of ballroom dance, his movements elegant and precise. When they took to the dance floor, their chemistry was undeniable, drawing the attention of everyone in the ballroom.

// Princess Zaino, intrigued by their talent, approached Mei Lin and Alexei and invited them to perform at the royal gala. Excited for the opportunity to showcase their skills, Mei Lin and Alexei accepted the invitation, eager to share their love for dance with the kingdom.

// As the night of the gala arrived, the ballroom was filled with guests from far and wide, all eager to witness the performance of Mei Lin and Alexei. The music began to play, and Mei Lin's tap shoes clicked against the floor in a mesmerizing display of skill and precision. Alexei joined her, his movements fluid and graceful, complementing Mei Lin's energetic style.

// Together, they danced a beautiful fusion of tap and ballroom, their passion for music and dancing shining through every step. The audience was captivated, their applause filling the ballroom as Mei Lin and Alexei brought the performance to a breathtaking finale.

// Princess Zaino, moved by their performance, approached Mei Lin and Alexei once more, offering them a place in the kingdom as the royal dancers. Overjoyed by the opportunity to share their art with others, Mei Lin and Alexei graciously accepted, knowing that they had found a new home where their talents would be appreciated and celebrated.

// And so, in a world where robots once ruled, Princess Zaino, Prince Muaaz, Mei Lin, and Alexei Volkov came together to create a harmonious kingdom where music and dance reigned supreme, spreading joy and beauty to all who called it home.", "title": "\"Royal Dancers: A Tale of Music, Dance, and Joy\""}, "status": 200, "success": true}

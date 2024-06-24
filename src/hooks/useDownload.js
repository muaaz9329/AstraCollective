import ReactNativeBlobUtil from 'react-native-blob-util';
import {useDispatch, useSelector} from 'react-redux';
import {addStoryToDownload, inAppDownloadSelector} from '../redux/Slices/inAppDownload';

const useDownload = () => {
  const dispatch = useDispatch();
  const {stories} = useSelector(inAppDownloadSelector) 
  const downloadStory = async (
    item = {
      _id: '6628e9afdbd98c754e13047e',
      title: '"Rhythm of the Heart: A Tap Dance Duo\'s Journey"',
      coverImage:
        'https://astraappbucket.s3.amazonaws.com/astra-collection-1713957295461-%22Rhythm%20of%20the%20Heart%3A%20A%20Tap%20Dance%20Duo%27s%20Journey%22.png',
      estimatedTime: '2:54',
      text: 'In the bustling city of New York, there existed a hidden gem known as the Tap Dance Academy. This academy was a haven for those who shared a deep passion for the rhythmic art of tap dancing. Among the students were two individuals, Eve and Tyler, who stood out for their exceptional talent and unwavering dedication to the craft.\n\nEve, with her fiery red hair and infectious energy, was a natural on the dance floor. Her feet moved with precision and grace, creating mesmerizing rhythms that echoed through the halls of the academy. Tyler, on the other hand, was known for his smooth moves and charismatic charm. Together, they formed a dynamic duo that captivated audiences wherever they performed.\n\nTheir journey in the world of tap dancing was not without challenges. They faced fierce competition, grueling practice sessions, and moments of self-doubt. But through it all, Eve and Tyler found strength in each other\'s company. Their friendship blossomed into a partnership that transcended the boundaries of the dance floor.\n\nOne day, as they were preparing for a prestigious tap dancing competition, Eve stumbled upon a mysterious note hidden in the corner of the practice room. It read: "Hjffilbvbuh7v7g7h8h7g6x4s6big7g7g8h8g6f7g8h8j9k8v6d5g7h9j9j9j9j9k9k8h6f6DD4s she f7h9j9j9h8h8h9j9j8h7h9j9h8GH8j9j8h8h8h9j9j8h8h7g7f6f7h8j9j9b8v7c5x4cub in in in u tc u un7j9j9k9k9j9j9jojinib7g7g7j8j8h7g8j9j9j8h8him8j8j8j8h8h7h8h8h8h8h8h8h8h7h7h7h7h7h7h7h8h8h8h8h8h8h8h7h8h8h8h8h8h8hu8h7h7h7h7hu8h8h8h."\n\nIntrigued by the cryptic message, Eve shared it with Tyler, and together, they embarked on a thrilling adventure to unravel its meaning. The note led them on a scavenger hunt across the city, where they encountered various challenges that put their tap dancing skills to the test. With each step they took, their bond grew stronger, and their passion for dancing shone brighter than ever before.\n\nFinally, after a series of clues and dance-offs, Eve and Tyler found themselves standing in front of a hidden stage in an old theater. As they stepped onto the spotlight, the stage came to life with the sound of their tapping feet. Their movements were a symphony of rhythm and harmony, weaving a story of friendship, perseverance, and love for the art of tap dancing.\n\nThe audience was spellbound by their performance, and as the final notes echoed through the theater, a sense of fulfillment washed over Eve and Tyler. They had not only solved the mystery of the note but had also discovered a deeper connection to each other and to the world of tap dancing.\n\nAs they took their final bow, Eve and Tyler knew that their journey was far from over. With hearts full of passion and feet ready to dance, they embraced the endless possibilities that lay ahead, knowing that as long as they had each other, they could conquer any challenge that came their way.\n\nAnd so, the story of Eve and Tyler, two souls united by their love for tap dancing, continued to unfold, inspiring others to follow their dreams and dance to the rhythm of their hearts.',
      user: '662766dac6fccb02b10410bb',
      isReviewed: false,
    },
    setLoading,
  ) => {
    // download story
    setLoading && setLoading(true);
    try {
      const res = await ReactNativeBlobUtil.fetch('GET', item.coverImage);
      let base64 = await res.base64();
      base64 = `data:image/png;base64,${base64}`;
      item['coverImage'] = base64;
      dispatch(addStoryToDownload(item));

      setLoading && setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading && setLoading(false);
    }
  };

  const isAlreadyDownloaded = (bookInfo) =>{
    return stories?.filter(item => item?._id === bookInfo?._id).length > 0;
  }
  
  return {downloadStory , isAlreadyDownloaded};
};

export default useDownload;

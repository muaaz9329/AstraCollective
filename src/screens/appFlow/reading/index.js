import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {
  appIcons,
  appNavigationParam,
  colors,
  fontFamily,
  fontPixel,
  routes,
  widthPixel,
} from '../../../services';
import {Header} from '../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import ShareBottomSheet from './components/shareBottomSheet';
import useReading from './hooks/useReading';
import useApi from './hooks/useApi';
import Loader from '../../../components/loader/Loader';
import CurrentReadingText from './components/currentReadingText';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getOneStorySelector} from '../../../redux/Slices/getOneStorySlice';
import AnimatedLoader from '../../../components/loader/animatedLoader';
import useDownload from '../../../hooks/useDownload';
import {inAppDownloadSelector} from '../../../redux/Slices/inAppDownload';
function renderRightComponents(
  onClickShare,
  onPressDownload,
  isAlreadyDownloaded,
) {
  return (
    <View style={styles.flexRowContainer}>
      {!isAlreadyDownloaded && (
        <TouchableOpacity onPress={onPressDownload}>
          <Image source={appIcons.iconUpload} style={styles.iconUploadStyles} />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={onClickShare}>
        <Image source={appIcons.iconShare} style={styles.iconShareStyles} />
      </TouchableOpacity>
    </View>
  );
}

function halfTime(timeStr) {
  // Split the input string into hours and minutes
  let [hours, minutes] = timeStr.split(':').map(Number);

  // Calculate half of the minutes
  let halfMinutes = Math.floor(minutes / 2);

  // If minutes are more than 30, increment hours by 1 and subtract 30 from minutes

  // Format the result as a string
  let result = `${hours}:${halfMinutes.toString().padStart(2, '0')}`;

  return result;
}

function calculateTimeToRead(text = ' ', dualSpeed = false) {
  const words = text.split(/\s+/).length;
  const averageWordsPerSecond = (55 + 65) / 2 / 22;
  const timeInSeconds = words / averageWordsPerSecond;
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  if (dualSpeed) {
    return halfTime(`${minutes}:${seconds}`);
  }

  return `${minutes}:${seconds}`;
}
const Reading = () => {
  const [downloadingLoading, setDownloadingLoading] = useState(false);
  const {downloadStory} = useDownload();
  const {comingFor, id: _id} = useRoute()?.params || {
    comingFor: appNavigationParam['reading'].oldStory,
    id: '',
  }; // default value

  const {stories} = useSelector(inAppDownloadSelector);

  const comingForNewStory =
    comingFor === appNavigationParam['reading'].newStory;
  const comingForOldStory =
    comingFor === appNavigationParam['reading'].oldStory;

  const navigation = useNavigation();

  const {loading, story, bookInfo} = useApi(
    _id,
    comingForNewStory,
    comingForOldStory,
  );

  const onPressDownload = async () => {
    setDownloadingLoading(true);
    await downloadStory(bookInfo, setDownloadingLoading);
  };

  const isAlreadyDownloaded =
    stories?.filter(item => item?._id === bookInfo?._id).length > 0;

  const {
    onClickShare,
    play,
    setPlay,
    setSheet,
    sheet,
    currentReading,
    handleProgress,
    progress,
    splitedStory,
    dualSpeed,
    setDualSpeed,
    onPressCommunityShare,
  } = useReading(story, bookInfo, comingForNewStory);

  return (
    <AnimatedLoader loading={loading}>
      <Loader loading={downloadingLoading} />
      <SafeAreaView style={styles.safeAreaViewStyles}>
        <Header
          isBack={true}
          onPressBack={() => {
            navigation.navigate(routes.tab, {
              screen: 'Home',
            });
          }}
          title={'Reading Story'}
          rightSideComponent={() => {
            return renderRightComponents(
              onClickShare,
              onPressDownload,
              isAlreadyDownloaded,
            );
          }}
        />

        <ScrollView>
          <View style={styles.scrollViewStyles}>
            <Text style={styles.readingStyles}>
              {splitedStory.map((item, index) => {
                return (
                  <CurrentReadingText
                    isReadingMe={currentReading === index}
                    key={index}>
                    {item}
                  </CurrentReadingText>
                );
              })}
            </Text>
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <View style={styles.flexContainer}>
            <View
              style={{
                width: '95%',
              }}>
              <Slider
                style={{width: '90%', height: 40}}
                minimumValue={1}
                maximumValue={100}
                minimumTrackTintColor={colors.theme}
                maximumTrackTintColor={colors.grey}
                thumbTintColor={colors.theme}
                value={progress}
                onValueChange={handleProgress}
              />
              <View style={styles.progressContainer}>
                {/* <Text style={styles.progressTextStyles}>12.15</Text> */}

                <Text style={styles.progressTextStyles}>
                  {calculateTimeToRead(story, dualSpeed)}
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  marginTop: widthPixel(10),
                }}
                onPress={() => {
                  setDualSpeed(!dualSpeed);
                }}>
                <Image
                  source={appIcons.doubleSpeedIcon}
                  style={[
                    styles.doubleSpeedImageStyles,
                    dualSpeed && {
                      tintColor: colors.theme,
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.playPauseBtnStyles}
              onPress={() => {
                setPlay(!play);
              }}>
              <Image
                style={styles.playPauseImageStyles}
                source={play ? appIcons.iconPause : appIcons.iconPlay}
              />
            </TouchableOpacity>
          </View>
          <ShareBottomSheet
            setOpen={setSheet}
            open={sheet}
            onPressCommunityShare={onPressCommunityShare}
          />
        </View>
      </SafeAreaView>
    </AnimatedLoader>
  );
};

export default Reading;

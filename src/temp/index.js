import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import BackgroundWrapper from './componets/BackgroundWrapper';
import {heightPixel, Poppins, widthPixel} from '../services';
import {ChevronLeft} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ClaimAnimationContext} from '../Provider/claimModel';

const dailyCheckInData = [
  {
    day: 1,
    bonus: 20,
    isClaimed: false,
  },
  {
    day: 2,
    bonus: 20,
    isClaimed: false,
  },
  {
    day: 3,
    bonus: 25,
    isClaimed: false,
  },
  {
    day: 4,
    bonus: 25,
    isClaimed: false,
  },
  {
    day: 5,
    bonus: 30,
    isClaimed: false,
  },
  {
    day: 6,
    bonus: 30,
    isClaimed: false,
  },
  {
    day: 7,
    bonus: 30,
    isClaimed: false,
  },
];

const taskForBeginnersData = [
  {
    title: 'Get reward notifications',
    bonus: 20,
    isClaimed: false,
  },
  {
    title: 'Get reward sharing',
    bonus: 20,
    isClaimed: false,
  },
  {
    title: 'Get reward review',
    bonus: 100,
    isClaimed: false,
  },
  {
    title: 'Complete your profile',
    bonus: 50,
    isClaimed: false,
  },
  {
    title: 'Complete Book of Love',
    bonus: 50,
    isClaimed: false,
  },
  {
    title: 'Follow us on Instagram',
    bonus: 50,
    isClaimed: false,
  },
  {
    title: 'Follow us on Tik Tok',
    bonus: 50,
    isClaimed: false,
  },
  {
    title: 'Confirm email',
    bonus: 50,
    isClaimed: false,
  },
];

const watchAdsData = [
  {
    index: 0,
    bonus: 5,
    isClaimed: false,
    isLastAdWatched: true,
  },
  {
    index: 1,
    bonus: 5,
    isClaimed: false,
    isLastAdWatched: false,
  },
  {
    index: 2,
    bonus: 10,
    isClaimed: false,
    isLastAdWatched: false,
  },
  {
    index: 3,
    bonus: 10,
    isClaimed: false,
    isLastAdWatched: false,
  },
  {
    index: 4,
    bonus: 15,
    isClaimed: false,
    isLastAdWatched: false,
  },
  {
    index: 5,
    bonus: 15,
    isClaimed: false,
    isLastAdWatched: false,
  },
];

function DailyCheckInComponent({day = 1, bonus = 20, isClaimed = false}) {
  return (
    <TouchableOpacity
      disabled
      style={
        isClaimed
          ? {
              opacity: 1,
            }
          : styles.btnTouchStyles
      }>
      <LinearGradient //   colors={['#4D55B3', '#A95093']}
        colors={isClaimed ? ['#4D55B3', '#A95093'] : ['#2E3138', '#2E3138']} // disableColor
        start={{
          x: 0.5,
          y: 0,
        }}
        end={{
          x: 0.5,
          y: 1,
        }}
        style={styles.btnStyles}>
        <Text style={styles.btnText}>+{bonus}</Text>
        <View
          style={{
            marginTop: widthPixel(5),
          }}>
          <Image
            source={require('./assest/coin.png')}
            style={styles.coinImage}
          />
        </View>
      </LinearGradient>
      <Text style={styles.dailyBtnBottomText}>Day {day}</Text>
    </TouchableOpacity>
  );
}

function TasksForBeginnersComponent({
  title = 'Get reward notifications',
  bonus = 10,
  isClaimed = false,
  handleItem = () => {
    console.log('handleItem');
  },
}) {
  return (
    <View style={styles.taskForBegginerContainer}>
      <View style={styles.cardFirstContainer}>
        <Image
          source={require('./assest/coin.png')}
          style={styles.coinMainStyles}
          resizeMode="contain"
        />
        <View
          style={{
            marginLeft: widthPixel(16),
          }}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>+ {bonus} Bonus</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            handleItem(title);
          }}
          disabled={isClaimed}>
          <LinearGradient
            colors={['#4D55B3', '#A95093']} //   colors={['#2E3138', '#2E3138']} // disableColor
            start={{
              x: 0,
              y: 0.5,
            }}
            end={{
              x: 1,
              y: 0.5,
            }}
            style={styles.smallBtnStyles}>
            <Text style={styles.smallBtnTextStyles}>
              {isClaimed ? 'Claim' : 'Get'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function WatchAdsComponent({
  bonus,
  isClaimed,
  isWatchedLastAd,
  index,
  handleItem = () => {
    console.log('handleItem');
  },
}) {
  return (
    <View style={styles.taskForBegginerContainer}>
      <View style={styles.cardFirstContainer}>
        <Image
          source={require('./assest/coin.png')}
          style={styles.coinMainStyles}
          resizeMode="contain"
        />
        <View
          style={{
            marginLeft: widthPixel(16),
          }}>
          <Text style={styles.secondCardTitle}>+ {bonus} Bonus</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            opacity: isWatchedLastAd ? 1 : 0.5,
          }}
          disabled={isClaimed || !isWatchedLastAd}
          onPress={() => {
            handleItem(index);
          }}>
          <LinearGradient
            colors={['#4D55B3', '#A95093']} //   colors={['#2E3138', '#2E3138']} // disableColor
            start={{
              x: 0,
              y: 0.5,
            }}
            end={{
              x: 1,
              y: 0.5,
            }}
            style={[styles.smallBtnStyles]}>
            <Text style={styles.smallBtnTextStyles}>
              {isClaimed ? 'Claim' : 'Watch'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const TempScreen = () => {
  const [dailyCheckIn, setDailyCheckIn] = useState(dailyCheckInData);
  const [taskForBeginners, setTaskForBeginners] =
    useState(taskForBeginnersData);
  const [watchAds, setWatchAds] = useState(watchAdsData);
  const [bonus, setBonus] = useState(20);
  const [isClaimedTodayBonus, setIsClaimedTodayBonus] = useState(false);

  const [time, setTime] = useState(24 * 60 * 60);

  const {state, setState} = useContext(ClaimAnimationContext);
  useEffect(() => {
    if (isClaimedTodayBonus) {
      const interval = setInterval(() => {
        setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isClaimedTodayBonus]);

  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTodayBonus = () => {
    if (!isClaimedTodayBonus) {
      setBonus(bonus + 20);
      setDailyCheckIn(prev => {
        return prev.map((item, index) => {
          if (index === 0) {
            return {
              ...item,
              isClaimed: true,
            };
          }
          return item;
        });
      });
      setState(true);
      setIsClaimedTodayBonus(true);
    }
  };

  const handleTaskForBeginners = title => {
    setTaskForBeginners(prev => {
      return prev.map(item => {
        if (item.title === title) {
          setBonus(bonus + item.bonus);
          return {
            ...item,
            isClaimed: true,
          };
        }
        return item;
      });
    });
    setState(true);
  };

  const handleWatchAds = index => {
    if (watchAds[index].isClaimed) return;
    setWatchAds(prev => {
      let data = prev.map((item, i) => {
        if (i === index) {
          setBonus(bonus + item.bonus);
          return {
            ...item,
            isClaimed: true,
          };
        }
        return item;
      });

      data = data.map((item, i) => {
        if (i === index + 1) {
          return {
            ...item,
            isLastAdWatched: true,
          };
        }
        return item;
      });

      return data;
    });
    setState(true);
  };
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: 'black',
        }}>
        <ImageBackground
          style={styles.backgroundImageStyles}
          source={require('./assest/bg.png')}
          resizeMode="cover"
        />
        <View style={styles.topContainer}>
          <View style={styles.header}>
            <ChevronLeft size={28} strokeWidth={3} color={'#fff'} />
            <View style={styles.scoreContainer}>
              <Text style={styles.bounceText}>Your Bonus:</Text>
              <Text style={styles.score}>{bonus}</Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
            }}></View>
        </View>
        <View style={styles.AbsoluteContainer}>
          <View style={styles.bottomSheet}>
            <Text style={styles.title}>Daily Check-in</Text>
            <Text style={styles.subtitle}>Earn rewards for check-in</Text>
            <View style={styles.dailyChallengeCOntainer}>
              {dailyCheckIn.map((item, index) => (
                <DailyCheckInComponent
                  key={index}
                  day={item.day}
                  bonus={item.bonus}
                  isClaimed={item.isClaimed}
                />
              ))}
            </View>
            <View style={styles.getBtnContainer}>
              <TouchableOpacity
                style={{
                  width: '90%',
                  opacity: isClaimedTodayBonus ? 0.5 : 1,
                }}
                disabled={isClaimedTodayBonus}
                onPress={handleTodayBonus}>
                <LinearGradient
                  colors={['#4D55B3', '#A95093']}
                  //   colors={['#2E3138', '#2E3138']} // disableColor
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={styles.getBtnStyles}>
                  <Text style={styles.getBtnTextStyles}>
                    {isClaimedTodayBonus ? formatTime(time) : 'Get Daily Bonus'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.taskForBeginnersContainer}>
              <Text style={styles.title}>Task for Beginners</Text>
              <Text style={styles.subtitle}>Only one chance</Text>
              {taskForBeginners.map((item, index) => (
                <TasksForBeginnersComponent
                  key={index}
                  title={item.title}
                  bonus={item.bonus}
                  isClaimed={item.isClaimed}
                  handleItem={handleTaskForBeginners}
                />
              ))}
            </View>
            <View style={styles.bounceContainer}>
              <Text style={styles.title}>Watch Ads, Earn Bonus</Text>
              <Text style={styles.subtitle}>
                Watch ads and earn rewards{' '}
                <Text
                  style={{
                    color: '#FF8AD2',
                  }}>
                  + 20 Bonus{' '}
                </Text>{' '}
              </Text>

              {watchAds.map((item, index) => (
                <WatchAdsComponent
                  key={index}
                  bonus={item.bonus}
                  isClaimed={item.isClaimed}
                  isWatchedLastAd={item.isLastAdWatched}
                  index={item.index}
                  handleItem={handleWatchAds}
                />
              ))}
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.point}>
              1. All interpretation rights of Bonus belong to Pixllove
            </Text>
            <Text style={styles.point}>
              2. Bonus can only be used for depixelation or livechat, valid for
              10 days and will be automatically expired and liquidated after
              expiration.
            </Text>
            <Text style={styles.point}>
              3. For 100 bonus coins, you get 1 depixelation and 3 live chats
            </Text>
            <Text style={styles.point}>
              4. The daily limit will be used first when going live. After that,
              bonus coins will be used. If there are not enough bonus coins, the
              balance will be used automatically.
            </Text>
            <Text style={styles.point}>
              5. The sign-in refreshes every evening at 0 am (UTC+1)
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TempScreen;

const styles = StyleSheet.create({
  point: {
    color: 'white',
    fontFamily: Poppins(400),
    fontSize: widthPixel(10),
    lineHeight: widthPixel(15),
    marginBottom: widthPixel(11),
  },
  descriptionTitle: {
    color: 'white',
    fontFamily: Poppins(600),
    fontSize: widthPixel(13),
    lineHeight: widthPixel(19),
    marginBottom: widthPixel(5),
  },
  topContainer: {
    flex: 1,
    paddingHorizontal: widthPixel(15),
  },
  header: {
    marginTop: widthPixel(105),
    paddingHorizontal: widthPixel(2),
  },
  scoreContainer: {
    marginLeft: widthPixel(17),
    marginTop: widthPixel(10),
  },
  score: {
    fontFamily: Poppins(600),
    fontSize: widthPixel(19),
    color: 'white',
  },
  bounceText: {
    fontFamily: Poppins(600),
    fontSize: widthPixel(17),
    color: 'white',
    lineHeight: widthPixel(25.5),
  },
  backgroundImageStyles: {
    height: 1000,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  footer: {
    marginTop: widthPixel(35),
    paddingBottom: widthPixel(20),
  },
  secondCardTitle: {
    fontFamily: Poppins(600),
    fontSize: widthPixel(14),
    color: '#FF6BC5',
    lineHeight: widthPixel(21),
  },
  bounceContainer: {
    marginTop: widthPixel(16),
  },
  smallBtnTextStyles: {
    fontFamily: Poppins(600),
    fontSize: widthPixel(12),
    color: 'white',
    lineHeight: widthPixel(15),
  },
  smallBtnStyles: {
    // width: widthPixel(52),
    paddingHorizontal: widthPixel(12.5),
    height: widthPixel(23),
    borderRadius: widthPixel(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFirstContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardSubtitle: {
    fontFamily: Poppins(400),
    fontSize: widthPixel(12),
    color: '#FF6BC5',
    lineHeight: widthPixel(18),
  },
  cardTitle: {
    fontFamily: Poppins(600),
    fontSize: widthPixel(13),
    color: 'white',
    lineHeight: widthPixel(19),
  },
  coinMainStyles: {
    width: widthPixel(28),
    height: widthPixel(28),
  },
  taskForBegginerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2E3138',
    borderRadius: widthPixel(12),
    paddingHorizontal: widthPixel(16),
    paddingVertical: widthPixel(13),
    marginTop: widthPixel(10),
  },
  taskForBeginnersContainer: {
    marginTop: widthPixel(16),
  },
  dailyBtnBottomText: {
    fontFamily: Poppins(500),
    fontSize: widthPixel(10),
    color: 'white',
    lineHeight: widthPixel(15),
    marginTop: widthPixel(5),
    textAlign: 'center',
  },
  getBtnTextStyles: {
    fontFamily: Poppins(600),
    fontSize: widthPixel(14),
    color: 'white',
    lineHeight: widthPixel(21),
  },
  getBtnContainer: {
    marginTop: widthPixel(12),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  getBtnStyles: {
    paddingVertical: widthPixel(10),
    borderRadius: widthPixel(20),
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTouchStyles: {
    opacity: 0.5,
  },
  dailyChallengeCOntainer: {
    marginTop: widthPixel(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coinImage: {
    width: widthPixel(21),
    height: widthPixel(21),
  },
  btnText: {
    fontFamily: Poppins(600),
    fontSize: widthPixel(14),
    color: 'white',
    lineHeight: widthPixel(21),
  },
  btnStyles: {
    paddingTop: widthPixel(7),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: widthPixel(12),
    borderRadius: widthPixel(12),
    width: widthPixel(40),
  },
  subtitle: {
    fontFamily: Poppins(500),
    fontSize: widthPixel(12),
    lineHeight: widthPixel(18),
  },
  title: {
    fontFamily: Poppins(600),
    fontSize: widthPixel(17),
    color: 'white',
  },
  bottomSheet: {
    backgroundColor: '#1E1E1E',
    paddingTop: widthPixel(18),
    paddingBottom: widthPixel(35),
    paddingHorizontal: widthPixel(15),
    flex: 1,

    borderRadius: widthPixel(16),
  },
  AbsoluteContainer: {
    width: '100%',
    paddingHorizontal: widthPixel(15),
    flex: 1,
    marginTop: widthPixel(50),
  },
});

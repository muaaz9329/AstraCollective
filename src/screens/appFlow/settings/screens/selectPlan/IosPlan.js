import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  Platform,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {appIcons, colors} from '../../../../../services';
import {styles} from './styles';

import {Header} from '../../../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import RadioGroup from 'react-native-radio-buttons-group';
import {
  PurchaseError,
  requestSubscription,
  useIAP,
  validateReceiptIos,
} from 'react-native-iap';
import PROJECT from '../../../../../../project.config';
import {apiService} from '../../../../../network';
import routes from '../../../../../network/routes';
import {userDataSave} from '../../../../../redux/Slices/userDataSlice';
import {ErrorFlashMessage} from '../../../../../services/helpingMethods';
import Loader from '../../../../../components/loader/Loader';
const ITUNES_SHARED_SECRET = PROJECT.ITUNES_SHARED_SECRET;

const errorLog = ({message, error}) => {
  console.error('An error happened', message, error);
};

const isIos = Platform.OS === 'ios';

//product id from appstoreconnect app->subscriptions
const subscriptionSkus = Platform.select({
  ios: ['monthlySubscription49'],
});

const IosPlan = ({navigation}) => {
  const {
    connected,
    subscriptions, //returns subscriptions for this app.
    getSubscriptions, //Gets available subscriptions for this app.
    currentPurchase, //current purchase for the transaction
    finishTransaction,
    purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev)
    getPurchaseHistory, //gets users purchase history
  } = useIAP();

  const [loading, setLoading] = useState(false);

  const handleGetPurchaseHistory = async () => {
    try {
      await getPurchaseHistory();
    } catch (error) {
      errorLog({message: 'handleGetPurchaseHistory', error});
    }
  };

  useEffect(() => {
    handleGetPurchaseHistory();
  }, [connected]);
  //* Here we are getting all the OLD purchase history of that particular user device as soon as we are connected to apple

  const handleGetSubscriptions = async () => {
    try {
      await getSubscriptions({skus: subscriptionSkus});
    } catch (error) {
      errorLog({message: 'handleGetSubscriptions', error});
    }
  };

  useEffect(() => {
    handleGetSubscriptions();
  }, [connected]);
  //* Here we are getting all the subscription app offers form appstore connect , as soon as we are connected to apple

  useEffect(() => {
    // ... listen if connected, purchaseHistory and subscriptions exist
    if (
      purchaseHistory.find(
        x => x.productId === (subscriptionSkus[0] || subscriptionSkus[1]),
      )
    ) {
      // console.log(purchaseHistory)
      // navigation.navigate("Home");
      // console.log(' useEffect with X ---> ', true);
      console.log(
        'Device 🤝 astraCollective -> purchase verified by device purchase history',
      );
    } else {
      console.log(
        'Device 🖕 astraCollective -> purchase unverified by device purchase history',
      );
    }
  }, [connected, purchaseHistory, subscriptions]);

  //* Here we are checking if user has bought the subscription in past by comparing each purchase productId to the Avaible Product ID in our app store connect , this will run as soon as screens mounts

  const handleBuySubscription = async productId => {
    try {
      await requestSubscription({
        sku: productId,
      });
      Alert.alert('Sucessfully Purchased');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof PurchaseError) {
        errorLog({message: `[${error.code}]: ${error.message}`, error});
      } else {
        errorLog({message: 'handleBuySubscription', error});
      }
    }
  };

  //* Here we are requesting to purchase the subsription , this will on success make the finishTransaction boolean to true

  useEffect(() => {
    const checkCurrentPurchase = async purchase => {
      if (purchase) {
        try {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            if (Platform.OS === 'ios') {
              const isTestEnvironment = __DEV__;

              //send receipt body to apple server to validete
              const appleReceiptResponse = await validateReceiptIos(
                {
                  'receipt-data': receipt,
                  password: ITUNES_SHARED_SECRET,
                },
                isTestEnvironment,
              );

              //if receipt is valid
              if (appleReceiptResponse) {
                const {status} = appleReceiptResponse;
                if (status) {
                  // navigation.navigate('Home');

                  console.log(
                    'Apple 🤝 astraCollective -> purchase verified by apple',
                  );

                  await apiService.Patch({
                    url: routes.updateMe,
                    setLoading,
                    body: {
                      subscriptionType: 'monthly',
                    },
                    OnSuccess: res => {
                      console.log('response--->', JSON.stringify(res, null, 2));
                      dispatch(userDataSave(res?.data?.user));
                      Alert.alert(
                        'You have already bought subscription',
                        null,
                        [
                          {
                            text: 'OK',
                            onPress: () => {
                              navigation.goBack();
                            },
                          },
                        ],
                      );
                    },
                    OnError: res => {
                      ErrorFlashMessage(
                        'Error',
                        'please contact the author for further information',
                      );
                    },
                  });
                } else {
                  console.log(
                    'Apple 🖕 astraCollective -> purchase unverified by apple',
                  );
                }
              }

              return;
            }
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);

  //* this is were we validate by giving it the object of item we purchase (currentPurchase) , if transactionReceipt exsist of that purchase in apple database then apple response will be true (status), this will run as soon as we mount it or buy something

  const dispatch = useDispatch();

  const [desc, setDesc] = useState('Dream Story');
  const packageData = [
    {
      text: 'Ability to Generate 3500 word of story',
      highlightWord: '3500',
      isChecked: true,
    },
  ];

  // const radioButtons = useMemo(
  //   () => [
  //     {
  //       id: '1', // acts as primary key, should be unique and non-empty string
  //       label: '',
  //       value: 'option1',
  //       color: '#0076E9',
  //       borderColor: '#0076E9',
  //     },
  //   ],
  //   [],
  // );

  // const [selectedId, setSelectedId] = useState();

  // useEffect(()=>{
  //   console.log(JSON.stringify(subscriptions,null,2))
  // },[subscriptions])  // you can see all the subscription that app offers here

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Loader loading={loading} />
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <Header title={'Select Subscription Plan'} isBack={true} />

      <View style={[styles.container]}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </Text>

          <View style={styles.storyInput}>
            <Image source={appIcons.upgrade} style={styles.upgrade} />
            <Text style={styles.planText}>Premium Plan</Text>
            <Text style={styles.planPrice}>$49.99 / Per Month</Text>

            <View style={styles.divider} />
            <View>
              {packageData.map((item, index) => {
                return (
                  <View key={index} style={styles.horizontalFlex}>
                    {item.isChecked && (
                      <Image
                        source={appIcons.checkBox}
                        style={styles.checkboxImage}
                      />
                    )}
                    <Text style={styles.packageText}>
                      {renderText(item.text, item.highlightWord)}
                    </Text>
                  </View>
                );
              })}
            </View>
            {loading && <ActivityIndicator size="large" />}
            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={() => {
                handleBuySubscription(subscriptions[0].productId);
                console.log('subscriptions -->  ', subscriptions);
              }}>
              <Text style={styles.continueText}>Subscribe</Text>
              <Image source={appIcons.backIcon} style={styles.forwardIcon} />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

const renderText = (text, highlightWord) => {
  return text.split(' ').map((word, index) => {
    return (
      <Text
        key={index}
        style={[
          styles.packageText,
          {color: word === highlightWord && '#0076E9'},
        ]}>
        {word + ' '}
      </Text>
    );
  });
};
export default IosPlan;

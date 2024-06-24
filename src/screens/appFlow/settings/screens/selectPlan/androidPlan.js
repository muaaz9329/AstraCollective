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
import {useDispatch, useSelector} from 'react-redux';
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
import {
  ErrorFlashMessage,
  SuccessFlashMessage,
} from '../../../../../services/helpingMethods';
import Loader from '../../../../../components/loader/Loader';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {store} from '../../../../../redux/store';

// const ITUNES_SHARED_SECRET = PROJECT.ITUNES_SHARED_SECRET;

// const errorLog = ({message, error}) => {
//   console.error('An error happened', message, error);
// };

// const isIos = Platform.OS === 'ios';

// //product id from appstoreconnect app->subscriptions
// const subscriptionSkus = Platform.select({
//   ios: ['monthlySubscription49'],
// });

const AndroidPlan = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  //   const [desc, setDesc] = useState('Dream Story');
  const {userData} = useSelector(state => state.userData);

  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const packageData = [
    {
      text: 'Ability to Generate 3500 word of story',
      highlightWord: '3500',
      isChecked: true,
    },
  ];

  const handlePurchase = async () => {
    //http://localhost:4500/api/v1/subscription/create-subscription/65ded0e2083996eeadd7561e
    setLoading(true);
    await apiService.Post({
      url:
        routes.createIntent + '/' + store.getState()?.userData?.userData?._id,
      setLoading: setLoading,
      body: {
        type: 'Premium Plan',
      },
      OnSuccess: async res => {
        // console.log('res --> ', JSON.stringify(res, null, 2));
        const {subscriptionId, paymentIntentId, customerId, clientSecret} = res;

        const initResponse = await initPaymentSheet({
          merchantDisplayName: 'Astra Collective',
          paymentIntentClientSecret: clientSecret,
          //   customerId: customerId,
        });
        await presentPaymentSheet();
        if (initResponse.error) {
          ErrorFlashMessage('Error in payment sheet initialization');
          return;
        } else {
          apiService.Post({
            url:
              routes.confirmPayment +
              '/' +
              store.getState()?.userData?.userData?._id,
            setLoading: setLoading,
            body: {
              paymentIntentId: paymentIntentId,
              subscriptionId: subscriptionId,
            },
            OnSuccess: async res => {
              //   console.log('res --> ', JSON.stringify(res, null, 2));
              SuccessFlashMessage('Subscription added successfully');
              dispatch(userDataSave(res?.data?.user));
              navigation.goBack();
            },
            OnError: res => {
              ErrorFlashMessage('Error in payment confirmation');
            },
          });
        }
      },
      OnFailure: res => {
        ErrorFlashMessage({message: res.data.message});
      },
    });
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    await apiService.Patch({
      url: routes.cancelSubscription,
      setLoading: setLoading,
      body: {},
      OnSuccess: async res => {
        console.log('res --> ', JSON.stringify(res, null, 2));
        SuccessFlashMessage('Subscription cancelled successfully');
        dispatch(userDataSave(res?.data?.user));
        navigation.goBack();
      },
      OnFailure: res => {
        ErrorFlashMessage(res);
      },
    });
  };

  return (
    <StripeProvider publishableKey={PROJECT.STRIPE_PUBLISHABLE_KEY}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        {/* <Loader loading={loading} /> */}
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
                  // handleBuySubscription(subscriptions[0].productId);
                  // console.log('subscriptions -->  ', subscriptions);
                  if (userData?.subscriptionType === 'monthly') {
                    handleCancelSubscription();
                  } else {
                    handlePurchase();
                  }
                }}>
                <Text style={styles.continueText}>
                  {userData?.subscriptionType === 'monthly'
                    ? 'unsubscribe'
                    : 'subscribe'}
                </Text>
                <Image source={appIcons.backIcon} style={styles.forwardIcon} />
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </StripeProvider>
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
export default AndroidPlan;

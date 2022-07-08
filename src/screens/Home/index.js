import React, {memo, useState, useCallback, useEffect} from 'react';
import {Text, RefreshControl, TouchableOpacity, View} from 'react-native';
//components
import AppTemplate from 'components/Templates/AppTemplate';
import {asyncWait} from 'utils/Helpers';
//routes
import {Routes} from 'navigation/Routes';
// redux
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {setUserNameStart} from 'store/user/Slices';
import {setSingOut} from 'store/auth/Slices';
// utils
import {log} from 'utils/Loger';
import {NativeHeight} from 'utils/Helpers';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const {userName} = useSelector(
    ({user}) => ({
      userName: user?.userName,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(setUserNameStart());
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    try {
      setRefreshing(true);
      // dispatch different action
      asyncWait(2000)
        .then(() => setRefreshing(false))
        .then(() => log('get refreshed'));
    } catch {
      setRefreshing(false);
    }
  }, []);

  const refreshControlHome = () => (
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  );

  const goExit = () => {
    dispatch(setSingOut());
  };

  return (
    <AppTemplate
      navTitle={userName}
      hideBackNav={false}
      scrollable={true}
      notification={__DEV__}
      refreshing={refreshing}
      onRefresh={onRefresh}
      refreshControl={refreshControlHome()}>
      <Text>Hello!</Text>
      <Text>You are login =)</Text>

      <View
        style={{
          alignSelf: 'center',
          marginTop: NativeHeight / 3,
          height: 100,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.ModalScreen)}>
          <Text>Tap to open modal!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goExit()}>
          <Text>Tap to Exit App!</Text>
        </TouchableOpacity>
      </View>
    </AppTemplate>
  );
};

export default memo(Home);

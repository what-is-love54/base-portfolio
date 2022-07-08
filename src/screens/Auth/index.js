import React, {memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
//components
import AuthTemplate from 'components/Templates/AuthTemplate';
//redux
import {useDispatch} from 'react-redux';
import {loginStart} from 'store/auth/Slices';
//utils
import {NativeHeight} from 'utils/Helpers';

const Welcome = () => {
  const dispatch = useDispatch();

  return (
    <AuthTemplate hideBackNav>
      <Text>Welcome to auth screen</Text>
      <View style={{marginTop: NativeHeight / 2}}>
        <TouchableOpacity onPress={() => dispatch(loginStart())}>
          <Text>Press to logIn</Text>
        </TouchableOpacity>
      </View>
    </AuthTemplate>
  );
};

export default memo(Welcome);

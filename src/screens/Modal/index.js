import React, {memo} from 'react';
import {Text} from 'react-native';
//components
import ModalTemplate from 'components/Templates/ModalTemplate';

const SuccessModalScreen = () => {
  return (
    <ModalTemplate navTitle="Congratulations!">
      <Text>Hello it`s modal! </Text>
      <Text>To close it tap on top area or on close btn! </Text>
    </ModalTemplate>
  );
};

export default memo(SuccessModalScreen);

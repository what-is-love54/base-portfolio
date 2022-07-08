import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
//lib
import {ScaledSheet} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
// utils
import {colors} from 'utils/Colors';
import {NativeWidth} from 'utils/Helpers';

const ModalTemplate = ({navTitle = '', children}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => navigation.goBack()}
      />
      <View style={[styles.container, {paddingBottom: insets.bottom}]}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.titleText}>{navTitle}</Text>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  closeButton: {
    alignItems: 'center',
    height: '25@ms',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: '10@ms',
    borderTopRightRadius: '10@ms',
    paddingTop: '27@ms',
    width: NativeWidth,
  },
  innerContainer: {
    paddingHorizontal: '48@ms',
  },
  mainContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalHeader: {
    alignItems: 'flex-end',
    paddingRight: '25@ms',
  },
  titleText: {
    color: colors.inputTextBlack,
    fontSize: '16@ms',
    paddingBottom: '15@ms',
    textAlign: 'center',
  },
});

ModalTemplate.propTypes = {
  navTitle: PropTypes.string,
  children: PropTypes.node,
};

export default memo(ModalTemplate);

import React, {memo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
//lib
import {ScaledSheet} from 'react-native-size-matters';
//nav
import {useNavigation} from '@react-navigation/native';
//components
import BaseTemplate from 'components/Templates/BaseTemplate';
import HeadPanel from 'components/Header';
//utils
import {colors} from 'utils/Colors';

const AuthTemplate = ({children}) => {
  const navigation = useNavigation();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderHeader = () => (
    <HeadPanel
      panelStyle={styles.panelStyle}
      topInsets={10}
      androidBackButtonClickHandler={goBack}
      doubleClickCloseAppAndroid
    />
  );

  return (
    <BaseTemplate scrollable={false} additionalHeader={renderHeader()}>
      <View style={styles.childrenContent}>{children}</View>
    </BaseTemplate>
  );
};

const styles = ScaledSheet.create({
  childrenContent: {
    alignItems: 'center',
    flex: 1,
  },
  panelStyle: {
    backgroundColor: colors.white,
    paddingHorizontal: '20@ms',
  },
});

export default memo(AuthTemplate);

AuthTemplate.propTypes = {
  children: PropTypes.node,
};

import React, {memo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
//lib
import {ScaledSheet} from 'react-native-size-matters';
//nav
import {useNavigation} from '@react-navigation/native';
//components
import HeadPanel from 'components/Header';
import BaseTemplate from 'components/Templates/BaseTemplate';
//utils
import {colors} from 'utils/Colors';

const AppTemplate = ({
  navTitle = '',
  hideBackNav = false,
  scrollable = false,
  bounces = true,
  children, // the text inputs and button, etc
  refreshControl,
  childrenStyle,
}) => {
  const navigation = useNavigation();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderHeaderLeftContent = title => (
    <Text numberOfLines={1} style={styles.navTitle}>
      {title}
    </Text>
  );

  const renderHeader = title => (
    <HeadPanel
      topInsets={10}
      panelStyle={styles.panelStyle}
      leftContent={renderHeaderLeftContent(title)}
      androidBackButtonClickHandler={goBack}
      dubleClickCloseAppAndroid
    />
  );

  return (
    <BaseTemplate
      hasTopHeader={!hideBackNav}
      scrollable={scrollable}
      additionalHeader={renderHeader(navTitle)}
      scrollViewStyles={styles.mainContainer}
      bounces={bounces}
      refreshControl={refreshControl}>
      <View style={[styles.childrenContent, childrenStyle]}>{children}</View>
    </BaseTemplate>
  );
};

const styles = ScaledSheet.create({
  childrenContent: {
    flex: 1,
    paddingHorizontal: '20@ms',
  },
  mainContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  navTitle: {
    color: colors.black,
    fontSize: '20@ms',
  },
  panelStyle: {
    paddingBottom: '30@ms',
    paddingHorizontal: '22@ms',
  },
});

export default memo(AppTemplate);

AppTemplate.propTypes = {
  navTitle: PropTypes.string,
  hideBackNav: PropTypes.bool,
  children: PropTypes.node,
  scrollable: PropTypes.bool,
  closeButton: PropTypes.bool,
  bounces: PropTypes.bool,
};

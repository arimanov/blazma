import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Pressable, Image, SafeAreaView} from 'react-native';
import Icon from './Icon';
import {useSelector, useDispatch} from 'react-redux';
import {toggleMessageFetching} from '../redux/actions';
import {
  fetchMessageActiveSelector,
  messageFetchingEnabledStatus,
} from '../redux/selectors';
import Indicator from './Indicator';
import colors from '../utils/appColors';

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const drawerOpenState = IsDrawerOpen(navigation);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isActive = useSelector(fetchMessageActiveSelector);
  const isMessageFetchingEnabled = useSelector(messageFetchingEnabledStatus);

  useEffect(() => setIsDrawerOpen(drawerOpenState), [drawerOpenState]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.edgeWrapper}>
        <Pressable
          style={({pressed}) => [
            pressed ? styles.buttonPressedIn : styles.buttonPressedOut,
            styles.button,
          ]}
          onPress={() => navigation.toggleDrawer()}>
          <Icon
            name={
              isDrawerOpen ? 'chevron-back-circle' : 'chevron-forward-circle'
            }
            color={colors.blueSecond}
            size={25}
          />
        </Pressable>
      </View>
      <View style={styles.logoWrapper}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </View>
      <View style={styles.edgeWrapper}>
        <Indicator
          actionIsActive={isActive}
          isPressed={isMessageFetchingEnabled}
          togglePress={() => dispatch(toggleMessageFetching())}
        />
      </View>
    </SafeAreaView>
  );
};

const IsDrawerOpen = navigation =>
  !!navigation
    .getState()
    .history.find(el => el.type === 'drawer' && el.status === 'open');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundSecond,
    flexDirection: 'row',
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  edgeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    paddingLeft: 7,
  },
  buttonPressedIn: {
    backgroundColor: colors.grayGeneral,
  },
  buttonPressedOut: {
    backgroundColor: colors.blueFifth,
  },
  logoWrapper: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  logo: {
    width: 177,
    height: 27,
  },
});

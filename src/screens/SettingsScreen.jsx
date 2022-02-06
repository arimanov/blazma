import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Switch,
  ScrollView,
} from 'react-native';
import Icon from '../components/Icon';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../utils/appColors';
import useLog from '../hooks/useLog';

const CleanLogButton = props => (
  <Pressable
    {...props}
    style={({pressed}) => [
      pressed ? styles.cleanBtnPressIn : styles.cleanBtnPressOut,
      styles.cleanBtn,
    ]}>
    <Icon name="trash-outline" size={15} color={colors.dark} />
    <Text style={styles.cleanBtnText}>clean</Text>
  </Pressable>
);

export default () => {
  const [value, setValue] = useState('eng');
  const [items, setItems] = useState([
    {label: 'English', value: 'eng'},
    {label: 'Russian', value: 'ru'},
  ]);
  const {getRecords, clean} = useLog();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.settingsRowTitle}>
            <View style={styles.settingsRowTitleWrap}>
              <Icon name="moon-outline" size={18} color={colors.dark} />
              <Text style={styles.optionHeader}>Dark Mode</Text>
            </View>
            <Text style={styles.optionSubTitle}>Not available now</Text>
          </View>
          <View style={styles.settingsRowControl}>
            <Switch ios_backgroundColor={colors.grayGeneral} disabled={true} />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.settingsRowTitle}>
            <View style={styles.settingsRowTitleWrap}>
              <Icon name="language-outline" size={18} color={colors.dark} />
              <Text style={styles.optionHeader}>Language</Text>
            </View>
            <Text style={styles.optionSubTitle}>Not available now</Text>
          </View>
          <View style={styles.settingsRowControl}>
            <DropDownPicker
              value={value}
              items={items}
              setValue={setValue}
              setItems={setItems}
              disabled={true}
              disabledStyle={{opacity: 0.3}}
              style={{height: 35}}
            />
          </View>
        </View>

        <View style={styles.logTopContainer}>
          <Text style={styles.logHeader}>Application log:</Text>
          <CleanLogButton onPress={clean} />
        </View>

        <ScrollView style={styles.logContainer}>
          {getRecords().map((logs, i) => (
            <Text style={styles.logRecord} key={i}>
              {logs.dt}: {logs.record}
            </Text>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  logContainer: {
    backgroundColor: colors.light,
    zIndex: -1,
    padding: 10,
    borderRadius: 5,
  },
  optionHeader: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.dark,
  },
  optionSubTitle: {
    color: colors.grayGeneral,
    marginTop: 5,
  },
  logTopContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  logHeader: {
    fontSize: 16,
    flex: 1,
  },
  logRecord: {
    fontSize: 12,
    marginBottom: 10,
    color: colors.blueSecond,
  },
  cleanBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cleanBtnPressIn: {
    backgroundColor: colors.blueThird,
  },
  cleanBtnPressOut: {
    backgroundColor: colors.blueFifth,
  },
  cleanBtnText: {
    textAlign: 'center',
    marginLeft: 5,
    color: colors.dark,
  },
  settingsRowTitle: {
    width: '50%',
    justifyContent: 'center',
  },
  settingsRowControl: {
    width: '50%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  settingsRowTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

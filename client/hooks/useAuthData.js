import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserDataAction } from '../redux/reducers';
import useLog from './useLog';

export default () => {

    const dispatch = useDispatch();
    const { info, error } = useLog();

    useEffect(async () => {
        const userName = await AsyncStorage.getItem('@userName');
        const userToken = await AsyncStorage.getItem('@userToken');
        if (userName && userToken) {
            info(`use stored user auth data: ${userName}`);
            const userIsExist = await dispatch(setUserDataAction(userName, userToken));
            if (!userIsExist) {
                await unsetUserData();
            }
        }
    }, []);

    return {
        setUserData: async ({ userName, userToken }) => {
            try {
                await AsyncStorage.setItem('@userName', userName)
                await AsyncStorage.setItem('@userToken', userToken)
            } catch (e) {
                error(e);
            }
        }
    }
}

export const unsetUserData = async () => {
    try {
        await AsyncStorage.removeItem('@userName');
        await AsyncStorage.removeItem('@userToken');
    } catch (e) {
        error(e);
    }
}

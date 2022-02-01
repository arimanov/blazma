import { useEffect, useState } from 'react';
import { AppState  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { fetchMessagesAction } from '../redux/actions';
import { MESSAGE_FETCH_INTERVAL_MS } from '../utils/constants';
import useLog from './useLog';

export default () => {

    const [isRunning, setIsRunning] = useState(false);
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const { info } = useLog();

    useEffect(() => {
        info(' init message fetching');
        if (!isRunning) {
            setIsRunning(true);
            setInterval(() => {
                if (navigation.getState().index === 1 && AppState.currentState === 'active') {
                    dispatch(fetchMessagesAction());
                }
            }, MESSAGE_FETCH_INTERVAL_MS);
        }
    }, []);
}
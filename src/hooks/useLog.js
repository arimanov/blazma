import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns'
import { cleanLogAction, addLogRecordAction } from '../redux/actions';
import { getApplicationLog } from '../redux/selectors';

export default () => {

    const logRecords = useSelector(getApplicationLog);
    const dispatch = useDispatch();

    const addRecord = (recordText) => {
        const dt = format(new Date(), 'dd.MM.yyyy HH:mm:ss');
        dispatch(addLogRecordAction({ dt, record: recordText }))
        console.log(recordText);
    }

    return {
        info: (recordText) => addRecord(`ℹ️ ${recordText}`),
        error: (recordText) => addRecord(`🛑️ ${recordText}`),
        getRecords: () => logRecords,
        clean: () => dispatch(cleanLogAction()),
    };
}
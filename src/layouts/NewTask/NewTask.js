import classNames from 'classnames/bind';

import styles from './NewTask.module.scss';
import Task from '../../components/Task';

const cx = classNames.bind(styles);

function NewTask() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('label')}> NewTask </div>
            <Task />
        </div>
    );
}

export default NewTask;

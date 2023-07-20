import ManageTask from '../../layouts/ManageTask/ManageTask';
import NewTask from '../../layouts/NewTask/NewTask';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <NewTask />
            <ManageTask />
        </div>
    );
}

export default Home;

import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import { actions } from '../../store';
import Task from '../../components/Task';
import * as searchServices from '../../services/searchService';
import { useDebounce } from '../../hooks';
import styles from './ManageTask.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';

const cx = classNames.bind(styles);

function ManageTask() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const state = useSelector((state) => state.reducer);
    const [todoList, setTodoList] = useState(state.currentList);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
    const dispatch = useDispatch();

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        setTodoList(state.currentList);
    }, [state.currentList]);

    // fetch search
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        const fetchApi = async () => {
            setLoading(true);

            const res = await searchServices.search(debouncedValue);

            setSearchResult(res.data.data);

            console.log(res.data.data);
            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);

    //handle clear
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    //handle change
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    //handle remove
    const handleRemove = () => {
        dispatch(actions.deleteAllList());
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('label')}> To Do List </div>
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search..."
                    spellCheck={false}
                    className={cx('search_input')}
                    onChange={handleChange}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
            </div>

            {searchResult.length === 0
                ? todoList.map((data, index) => <Task isUpdate data={data} key={index} />)
                : searchResult.map((data, index) => <Task isUpdate data={data} key={index} />)}

            {state.temporarilyList.length !== 0 && !state.isIgnore ? (
                <div className={cx('bulk-action')}>
                    <div className={cx('bulk-name')}>Bulk Action: </div>
                    <div className={cx('bulk-list-btn')}>
                        <Button
                            className={cx('btn-done')}
                            onClick={() => dispatch(actions.ignoreTempList())}
                        >
                            {' '}
                            Done
                        </Button>
                        <Button className={cx('btn-remove')} onClick={handleRemove}>
                            {' '}
                            Remove
                        </Button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default ManageTask;

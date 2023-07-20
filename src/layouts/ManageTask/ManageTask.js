import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import Task from '../../components/Task';
import * as searchServices from '../../services/searchService';
import { useDebounce } from '../../hooks';
import styles from './ManageTask.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ManageTask() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const state = useSelector((state) => state.reducer);
    const [todoList, setTodoList] = useState(state.currentList);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

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

            {state.isChange ? <div>Here</div> : null}
        </div>
    );
}

export default ManageTask;

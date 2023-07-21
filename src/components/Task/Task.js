import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as showService from '../../services/showService';
import { actions } from '../../store';
import Button from '../Button';
import styles from './Task.module.scss';

const cx = classNames.bind(styles);

function Task({ isUpdate = false, data = {} }) {
    const [info, setInfo] = useState({
        name: '',
        description: '',
        piority: 'Normal',
        ...data,
        date: data.date ? data.date : '',
        tick: false,
    });
    const [isDetail, setIsDetail] = useState(false);

    const dispatch = useDispatch();

    //reset currentList
    useEffect(() => {
        const fetchApi = async () => {
            const res = await showService.show();
            dispatch(actions.getList(res.data.data));
        };

        fetchApi();
    }, [dispatch]);

    //handleSubmit
    const handleSubmit = () => {
        if (isUpdate) {
            dispatch(actions.updateList(info));
        } else {
            dispatch(actions.addList(info));
        }
    };

    //handleChange
    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    //handleChangeTick
    const handleChangeTick = (e) => {
        if (info.tick === false) dispatch(actions.addTempList(info));
        else dispatch(actions.removeTempList(info));
        setInfo({ ...info, tick: !info.tick });
    };

    //handleRemove
    const handleRemove = () => {
        dispatch(actions.deleteList(info));
    };

    return (
        <div className={cx('wrapper')}>
            {isUpdate ? (
                <div className={cx('box-header')}>
                    <div className={cx('box-header-info')}>
                        <input
                            type="checkbox"
                            name="tick"
                            checked={info.tick}
                            onChange={handleChangeTick}
                        />
                        <div className={cx('box-name')}> {data.name}</div>
                    </div>
                    <div className={cx('box-header-btn')}>
                        <Button className={cx('btn-detail')} onClick={() => setIsDetail(!isDetail)}>
                            {' '}
                            Detail
                        </Button>
                        <Button className={cx('btn-remove')} onClick={handleRemove}>
                            {' '}
                            Remove
                        </Button>
                    </div>
                </div>
            ) : null}
            {!isUpdate || isDetail ? (
                <form id="newtask" onSubmit={handleSubmit}>
                    <div className={cx('box-content')}>
                        <input
                            type="text"
                            id="task-name"
                            name="name"
                            className={cx('task-name')}
                            value={info.name}
                            onChange={handleChange}
                            required
                            placeholder="Add new task..."
                        />

                        <label htmlFor="task-description"> Description</label>
                        <textarea
                            id="task-description"
                            name="description"
                            rows="8"
                            cols="50"
                            value={info.description}
                            onChange={handleChange}
                        />

                        <div className={cx('task-list-items')}>
                            <div className={cx('task-item')}>
                                <label htmlFor="task-date">Due Date</label>
                                <input
                                    type="date"
                                    id="task-date"
                                    name="date"
                                    value={info.date}
                                    required
                                    onChange={handleChange}
                                    className={cx('task-item_input')}
                                />
                            </div>

                            <div className={cx('task-item')}>
                                <label htmlFor="task-piority">Piority</label>
                                <select
                                    form="newtask"
                                    id="task-piority"
                                    name="piority"
                                    value={info.piority}
                                    onChange={handleChange}
                                    className={cx('task-item_input')}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Normal">Normal</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>

                        <input
                            type="submit"
                            name="submit"
                            className={cx('task-btn_add')}
                            value={isUpdate ? 'Update' : 'Add'}
                        />
                    </div>
                </form>
            ) : null}
        </div>
    );
}

export default Task;

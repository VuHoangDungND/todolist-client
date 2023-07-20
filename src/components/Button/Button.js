import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ to, disabled = false, children, className, onClick, ...passProps }) {
    const props = {
        onClick,
        ...passProps,
    };

    // Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    const classes = cx('wrapper', {
        [className]: className,
        disabled,
    });
    return (
        <div className={classes} {...props}>
            <span className={cx('title')}>{children}</span>
        </div>
    );
}

export default Button;

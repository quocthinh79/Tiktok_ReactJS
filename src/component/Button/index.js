import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    outlinethin = false,
    rounder = false,
    nonBorder = false,
    small = false,
    medium = false,
    lagger = false,
    children,
    onClick,
    iconLeft = false,
    iconRight = false,
    disable = false,
    className,
    ...passProps
}) {
    let Component = 'button';
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        outlinethin,
        rounder,
        nonBorder,
        small,
        medium,
        lagger,
        disable,
    });

    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    // Disable events
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    return (
        <Component className={classes} {...props}>
            {iconLeft ? <span className={cx('icon-btn')}>{iconLeft}</span> : <Fragment />}
            <span className={cx('title')}>{children}</span>
            {iconRight ? <span className={cx('icon-btn')}>{iconRight}</span> : <Fragment />}
        </Component>
    );
}

export default Button;

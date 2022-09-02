import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/f89b316574f8f0ab300e20d4b7ff6a29~c5_100x100.jpeg?x-expires=1662278400&x-signature=ZzOnYdCX0GSGQxf3fS0EA4zvxv4%3D"
                className={cx('avatar')}
                alt="Avatar"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Lê Quốc Thịnh</span>
                    <FontAwesomeIcon className={cx('icon-check')} icon={faCircleCheck} />
                </h4>
                <p className={cx('user-id')}>quocthinh</p>
            </div>
        </div>
    );
}

export default AccountItem;

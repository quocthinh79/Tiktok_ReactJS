import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faPlug, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

import Tippy from '@tippyjs/react/headless';
import { useSpring, motion } from 'framer-motion';
import { useState } from 'react';

import { Wrapper as PopperWrapper } from '~/component/Popper';
import AccountItem from '~/component/AccountItem';

import Button from '~/component/Button';

const cx = classNames.bind(styles);

function Header() {
    const springConfig = { damping: 15, stiffness: 300 };
    const initialScale = 0.5;
    const opacity = useSpring(0, springConfig);
    const scale = useSpring(initialScale, springConfig);

    function onMount() {
        scale.set(1);
        opacity.set(1);
    }

    function onHide({ unmount }) {
        const cleanup = scale.onChange((value) => {
            if (value <= initialScale) {
                cleanup();
                unmount();
            }
        });

        scale.set(initialScale);
        opacity.set(0);
    }

    const [searchResult, setSearchResult] = useState([]);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo.default} alt="Tiktok" />
                </div>
                <Tippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <motion.div style={{ scale, opacity }} className={cx('search-value')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                            </PopperWrapper>
                        </motion.div>
                    )}
                    animation={true}
                    onMount={onMount}
                    onHide={onHide}
                >
                    <div className={cx('search')}>
                        <input
                            className={cx('input-search')}
                            placeholder="Search accounts and videos"
                            spellCheck={false}
                        />
                        <button className={cx('close')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        <span className={cx('line-search')}></span>
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy>
                <div className={cx('action')}>
                    <Button outlinethin medium iconLeft={<FontAwesomeIcon icon={faPlus} />}>
                        Upload
                    </Button>
                    <Button primary medium>
                        Log in
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default Header;

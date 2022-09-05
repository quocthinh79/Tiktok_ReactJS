import TippyHeadless from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import AccountItem from '~/component/AccountItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { useSpring, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Search() {
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
    const [searchValue, setSearchValue] = useState('');
    const [showSearchResult, setShowSearchResult] = useState(true);

    const inputSearchRef = useRef();

    const handlerHideResult = () => {
        setShowSearchResult(false);
    };

    return (
        <TippyHeadless
            interactive
            visible={showSearchResult && searchResult.length > 0}
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
            onClickOutside={handlerHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputSearchRef}
                    value={searchValue}
                    className={cx('input-search')}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowSearchResult(true)}
                />
                {!!searchValue && (
                    <button
                        className={cx('close')}
                        onClick={() => {
                            setSearchValue('');
                            inputSearchRef.current.focus();
                            setSearchResult([]);
                        }}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                <span className={cx('line-search')}></span>
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </TippyHeadless>
    );
}

export default Search;

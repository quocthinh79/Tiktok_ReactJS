import TippyHeadless from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import AccountItem from '~/component/AccountItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { useSpring, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useDebounce } from '~/hooks';

import axios from 'axios';

import * as searchService from '~/apiService/searchService';

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
    const [loading, setLoading] = useState(false);

    const debounce = useDebounce(searchValue, 500);

    const inputSearchRef = useRef();

    const handlerHideResult = () => {
        setShowSearchResult(false);
    };

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchService.search(debounce);
            setSearchResult(result);

            setLoading(false);
        };

        fetchApi();
    }, [debounce]);

    const handleChange = (e) => {
        const searchValue = e.target.value;
        setSearchValue(searchValue.startsWith(' ') ? searchValue.trim() : searchValue);
    };

    return (
        <TippyHeadless
            interactive
            visible={showSearchResult && searchResult.length > 0}
            render={(attrs) => (
                <motion.div style={{ scale, opacity }} className={cx('search-value')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
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
                    onChange={handleChange}
                    onFocus={() => setShowSearchResult(true)}
                />
                {!!searchValue && !loading && (
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
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <span className={cx('line-search')}></span>
                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </TippyHeadless>
    );
}

export default Search;

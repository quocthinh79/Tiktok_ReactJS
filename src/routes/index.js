// Layouts
import { HeaderOnly } from '~/component/Layout';

import Following from '~/pages/Following';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Profile copy';
import Search from '~/pages/Search';
// Không cần đăng nhập vẫn vào được
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
];

// Cần đăng nhập để vào
const privateRoutes = [];

export { publicRoutes, privateRoutes };

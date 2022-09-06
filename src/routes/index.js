import routesConfig from '~/config/routes';

// Layouts
import { HeaderOnly } from '~/component/Layouts';

import Following from '~/pages/Following';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Profile copy';
import Search from '~/pages/Search';
// Không cần đăng nhập vẫn vào được
const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.following, component: Following },
    { path: routesConfig.profile, component: Profile },
    { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
    { path: routesConfig.search, component: Search, layout: null },
];

// Cần đăng nhập để vào
const privateRoutes = [];

export { publicRoutes, privateRoutes };

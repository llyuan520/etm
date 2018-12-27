/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */
/**输出带子路由的路由*/
import RouteWithSubRoutes from './RouteWithSubRoutes'

/**给页面增加标题的组件*/
import wrapPage from './TitlePage'
import NavRouter from './Nav'
import LoadingPage from './LoadingPage'

import Breadcrumb from './Breadcrumb'
import Header from './Header'
import GlobalFooter from './Footer'

/**react懒加载组件*/
import AsyncComponent from './AsyncComponent'

export {
    RouteWithSubRoutes,
    wrapPage,
    NavRouter,
    LoadingPage,
    AsyncComponent,
    Breadcrumb,
    Header,
    GlobalFooter,
}
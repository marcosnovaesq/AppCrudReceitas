import React from 'react'
import ViewUser from './views/User'
import Login from './components/form/login/login'
import IndexSection from './components/layout/index/index-section'
import { isAuthenticated } from './config/auth'
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Layout from './components/layout/layout';
import ViewRecipe from './views/Recipe';


const CustomRoute = ({ ...rest }) => {
    if (!isAuthenticated()) {
        return <Redirect to='/login' />
    }
    return <Route {...rest} />
}


const Routes = () => (
    <Layout>
        <Switch>
            <Route exact path="/" component={IndexSection} />
            <Route exact path="/login" component={Login} />
            <CustomRoute path="/users" component={ViewUser} />
            <CustomRoute path="/recipes" component={ViewRecipe} />
            <Route exact path="*" component={() => (<h1>404 | Not Found</h1>)} />
        </Switch>
    </Layout>

)

export default Routes;

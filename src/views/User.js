import React from 'react'
import ListUser from '../components/list/users/list-user'
import FormUser from '../components/form/users/form-user'
import ShowUser from '../components/show/user/show-user'
import {
    Route
} from "react-router-dom";
const ViewUser = (props) => {

    const rotaASerExibida = () => {
        if (props.location.pathname === '/users') {
            return <Route match path={props.match.path} component={ListUser} />
        }
        else if (props.location.pathname === '/users/create') {
            return <Route exact path={props.match.path + "/create"} component={FormUser} />
        }
        else if (props.location.pathname.includes('edit')) {
            return <Route exact path={props.match.path + "/edit/:id"} component={FormUser} />
        }
        else {
            return <Route exact path={props.match.path + "/:id"} component={ShowUser} />
        }
    }

    // <Route exact path={props.match.path + "/edit/:id"} component={FormUser} />

    return rotaASerExibida()
    // return (
    //     < >
    //         <Route exact match path={props.match.path} component={ListUser} />
    //         <Route exact path={props.match.path + "/create"} component={FormUser} />
    //         <Route exact path={props.match.path + "/edit/:id"} component={FormUser} />
    //         <Route exact path={props.match.path + "/:id"} component={ShowUser} />
    //     </>
    // )
}



export default ViewUser
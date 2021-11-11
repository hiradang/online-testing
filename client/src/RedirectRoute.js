import React, { Component } from 'react'
import { Route, Redirect} from "react-router-dom";

function RedirectdRoute({isAuth: isAuth,  id: id,  component: Component, ...rest}) {
    console.log(isAuth, id);
    return (<Route 
        {...rest}
        render={(props)=> {
            if (isAuth) {
                if (isAuth === "student")               
                    return <Redirect to= {{pathname: `/student/${id}`, state: {from: props.location}}}/>
                else return <Redirect to= {{pathname: `/teacher/${id}`, state: {from: props.location}}}/>
            } else {
                return <Component />
            }
        }}
    />
    );
}
export default RedirectdRoute
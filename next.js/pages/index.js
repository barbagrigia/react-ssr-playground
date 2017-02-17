import React from "react";
import {makeStore} from "../lib/store";
import connectToProvider from "../lib/connectToProvider";
import Link from "next/link";

class Page extends React.Component {

    static getInitialProps({store, isServer, pathname, query}) {

        console.log('2. Page.getInitialProps uses the store to dispatch things, pathname', pathname, 'query', query);

        // If it's a server, then all async actions must be done before return or return a promise
        if (isServer) {

            return new Promise((res) => {
                setTimeout(() => {
                    store.dispatch({type: 'TICK', payload: 'server'});
                    res();
                }, 200);
            });

        }

        // If it's a client, then it does not matter because client can be progressively rendered
        store.dispatch({type: 'TICK', payload: 'client'});

    }

    render() {
        console.log('5. Page.render');
        return (
            <div>
                <h1>Index</h1>
                <div>Redux status: {this.props.reduxStatus}</div>
                <Link href="/other"><a>Navigate</a></Link>
            </div>
        )
    }

}

Page = connectToProvider(makeStore, state => state)(Page);

export default Page;
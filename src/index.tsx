import ReactDOM from 'react-dom'

// third party
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// load mock apis
import '_mockApis'

// project imports
import * as serviceWorker from 'serviceWorker'
import App from 'App'
import { store, persister } from 'store'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// style + assets
import 'assets/scss/style.scss'
import 'styles/globals.css'

// ==============================|| REACT DOM RENDER  ||============================== //

const client = new ApolloClient({
    uri: 'http://192.168.0.107:3002/graphql',
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persister}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

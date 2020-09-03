import HomePage from '@App/components/HomePage';
import { RootState } from '@App/store/reducers';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Dispatch } from 'redux';
import { createGlobalStyle } from 'styled-components';
import DayDetailsPage from '../DayDetailsPage';
import ErrorPage from '../ErrorPage';
import MainPage from '../MainPage';
import PrivateRoute from '../PrivateRoute';
import Navbar from '@App/components/Navbar';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  :root {
    font-size: 16px;
    --text-primary: #00254D;
    --text-secondary: #9C9F9F;
    --text-label: #54575A;
    --birdie-accent: #54C6C1;
    --surface-color: #F3F9FF;
    --card-shadow: 0px 4px 10px rgba(0, 37, 77, 0.21);
    --text-link: #48BDFF;
  }
  html, body {
    background-color: #fff;
    font-family: "Roboto Condensed";
    margin: 0;
    padding: 0;
    color: var(--text-secondary);
  }

  #root{
    height: 100vh;
    width: 100vw;
  }
  h1,h2,h3,h4,h5,h6 {
    margin: 0;
    color: var(--text-primary);
    font-family: Poppins !important;
    line-height: 100%;
  }
  h1.extra {
    font-size: 5rem;
  }
  hr {
    width: 100%;
    height: 1px;
    background-color: #DFDFDF;
    outline: none;
    border: none;
  }
  a {
    text-decoration: none;
    color: var(--birdie-accent);
    text-transform: capitalize; 
  }
  input, select, textarea {
    border: none;
    outline: none;
    font-size: .98rem;
    font-family: "Roboto Condensed" !important;
    background-color: transparent !important;
    color: var(--text-primary);
    flex: 1;
}
`;

interface AppProps {
}

const App: React.FunctionComponent<AppProps> = () => {
    return (
        <>
            <GlobalStyles/>
            <Navbar/>
            <Switch>
                <Route path="/" exact={true}>
                    <HomePage/>
                </Route>
                <PrivateRoute path="/daily" exact={true}>
                    <MainPage/>
                </PrivateRoute>
                <PrivateRoute path="/daily/:date" exact={true}>
                    <DayDetailsPage/>
                </PrivateRoute>
                <Route>
                    <ErrorPage errorCode={404}/>
                </Route>
            </Switch>
        </>
    );
};

const mapStateToProps = (state: RootState, ownProps: object) => {
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
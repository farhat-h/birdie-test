import { RootState } from '@App/store/reducers';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
const PrivateRoute: React.FunctionComponent<RouteProps & { canContinue?: boolean }>
    = ({ children, canContinue, ...rest }) => {
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    canContinue ? (
                        children
                    ) : (
                            <Redirect
                                to={{
                                    pathname: '/',
                                    state: { from: location }
                                }}
                            />
                        )}
            />
        );
    };
const mapStateToProps = (state: RootState) => {
    return {
        canContinue: state.recipientId !== null
    };
};
export default connect(mapStateToProps, null)(PrivateRoute);
import * as React from 'react';
import Page from './Page';
const ErrorPage: React.FunctionComponent<{ errorCode: number }> = (props) => {
    return (
        <Page style={{ justifyContent: 'center' }}>
            <h1>Error code: {props.errorCode}</h1>
        </Page>
    );
};

export default ErrorPage;
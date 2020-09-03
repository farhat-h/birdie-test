import * as React from 'react';
import Page from './Page';
import SummaryFeed from './SummaryFeed';
import PieChart from '@App/components/PieChart';

const MainPage: React.FunctionComponent<{}> = (props) => {
    return (
        <Page>
            <h2 style={{marginBottom: 16}}>Quick stats</h2>
            <PieChart/>
            <hr style={{marginTop: 16}}/>
            <h2 style={{marginBottom: 16}}>Daily events timeline</h2>
            <SummaryFeed/>
        </Page>
    );
};

export default MainPage;
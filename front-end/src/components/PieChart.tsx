import { Cell, Legend, Pie, PieChart as Chart, ResponsiveContainer, Tooltip } from 'recharts';
import styled from 'styled-components';
import * as React from 'react';
import { get } from '@App/helpers/http';
import { Select } from '@App/components/Input';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';

interface DataObject {
    [key: string]: number | string;
}

const Card = styled.div`
    width: 100%;
    background-color: #fff;
    padding: 8px;
    border-radius: 8px;
    box-shadow: var(--card-shadow);
    min-height: 480px;
`;

const chartColors = [
    '#E91E63',
    '#00BCD4',
    '#673AB7',
    '#4CAF50',
    '#2196F3',
    '#FFEB3B',
    '#9C27B0',
    '#FF9800',
    '#3F51B5',
    '#CDDC39',
    '#03A9F4',
    '#FF5722',
    '#009688',
    '#f44336',
    '#FFC107',
    '#8BC34A',
];

// tslint:disable-next-line:no-any
const PieChart: React.FunctionComponent<{ data?: any[], label?: string, recipientId?: string }> = props => {
    const [state, setState] = React.useState({chartType: 'medication', data: []});
    React.useEffect(() => {
        get(`/api/${state.chartType}/${props.recipientId}`).then(res => {
            if (!res.error) {
                setState({...state, data: res.data});
            }
        });
        // tslint:disable-next-line:align
    }, [state.chartType]);
    const onChartTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;
        setState({...state, chartType: value});
    };
    return (
        <Card>
            <Select onChange={onChartTypeChange} value={state.chartType}>
                <option value={'medication'}>Regular Medication Intake</option>
                <option value={'mood'}>Mood observation</option>
            </Select>
            <ResponsiveContainer width="100%" height={400}>
                <Chart>
                    <Tooltip/>
                    <Legend align={'center'} verticalAlign={'top'}/>
                    <Pie
                        labelLine={true}
                        label={true}
                        data={state.data}
                        outerRadius={120}
                        innerRadius={80}
                        paddingAngle={5}
                        nameKey={'label'}
                        dataKey={'data'}

                    >
                        {
                            state.data.map((e: DataObject, index: number) => <Cell

                                key={`cell-${index}`}
                                fill={chartColors[index % chartColors.length]}
                            />)
                        }
                    </Pie>
                </Chart>
            </ResponsiveContainer>
        </Card>
    );
};
const mapStateToProps = (state: RootState) => ({recipientId: state.recipientId});
export default connect(mapStateToProps, null)(PieChart);
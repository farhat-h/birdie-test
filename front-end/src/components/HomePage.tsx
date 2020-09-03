import { setRecipient } from '@App/store/actions';
import { RootState } from '@App/store/reducers';
import * as React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
import { get } from '../helpers/http';
import Button from './Button';
import { Select } from './Input';
import List from './List';
import Page from './Page';

const logo = require('@App/assets/images/small-logo.svg');

const styles = {
    title: {
        width: 500,
        maxWidth: '100%',
        marginBottom: 16,
    },
    description: {
        width: 500,
        maxWidth: '100%'
    }
};

interface HomePageProps {
    recipientId: string;
    setRecipientId: (recipId: string) => void;
}

const buildRecipientOptions =
    (recipient: string) => <option key={recipient} value={recipient}>{recipient}</option>;

const HomePage: React.FunctionComponent<HomePageProps> = (props) => {
    const history = useHistory();
    const [recipients, setRecipients] = React.useState([]);
    React.useEffect(() => {
        get('/api/recipients').then(res => {
            if (!res.error) {
                setRecipients(res.data);
            }
        });
        //  tslint:disable-next-line: align
    }, []);
    const onRecipientIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;
        if (value !== 'DEFAULT') {
            props.setRecipientId(value);
        }
    };
    const onButtonClick = () => history.replace('/daily');
    return (
        <Page>
            <img src={logo} alt="logo"/>
            <h1 style={styles.title} className="extra">Birdie test</h1>
            <p style={styles.description}>Internship application demo, <a href="https://www.linkedin.com/in/farhat-haythem/">Haythem Farhat</a></p>
            <hr/>
            <Select
                value={props.recipientId}
                onChange={onRecipientIdChange}
                block={true}
                iconLeft={{name: 'perm_identity'}}
            >
                <option value="DEFAULT">Select a care recipient...</option>
                <List
                    list={recipients}
                    renderItem={buildRecipientOptions}
                />
            </Select>
            <p>Here's a list of available care recipients to advance in the demo</p>
            <Button
                onClick={onButtonClick}
                disabled={props.recipientId === null}
                style={{marginTop: 32}}
            >
                Continue to demo
            </Button>
        </Page>
    );
};

const mapStateToProps = ({recipientId}: RootState) => {
    return {recipientId};
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
    return {
        setRecipientId: (recipId: string) => dispatch(setRecipient(recipId))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
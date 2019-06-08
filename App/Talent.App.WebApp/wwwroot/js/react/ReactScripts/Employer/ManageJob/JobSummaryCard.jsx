import React from 'react';
import Cookies from 'js-cookie';
import { Popup, Card, Label, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props)
    };

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'http://localhost:51689/listing/listing/closeJob',
    };

    render() {
        const { job } = this.props;

        return (
            <div className="ui card" key={job.id} width={5}>
                <div className="content">
                    <div className="header">{job.title}</div>
                    <div className="meta">{job.location.city}  {job.location.country}</div>
                    <div className="description">{job.summary}</div>
                </div>

                <div className="right floated ui three buttons">
                    <div className="ui red basic button"><i className="close icon"></i>Close</div>
                    <div className="ui yellow basic button"><i className="edit icon"></i>Edit</div>
                    <div className="ui blue basic button"><i className="copy icon"></i>Copy</div>
                </div>

            </div>
        )

    }
}
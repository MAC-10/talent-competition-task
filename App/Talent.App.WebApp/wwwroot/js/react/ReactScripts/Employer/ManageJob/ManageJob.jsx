import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import {
    Pagination, Icon, Dropdown, Label, Button,
    Checkbox, Accordion, Form, Segment, Modal, Card
} from 'semantic-ui-react';


export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
    };

    init() {
        //let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        //loaderData.isLoading = false;
        //this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        this.loadData(() =>
            this.setState({ loaderData })
        )
        loaderData.isLoading = false;
        
        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
    };

    loadData(callback) {
        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
       // your ajax call and other logic goes here

        $.ajax({
            data: {
                activePage: this.state.activePage,
                sortbyDate: this.state.sortBy.date,
                showActive: this.state.filter.showActive,
                showClosed: this.state.filter.showClosed,
                showDraft: this.state.filter.showDraft,
                showExpired: this.state.filter.showExpired,
                showUnexpired: this.state.filter.showUnexpired
            },

            url: link,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + cookies,

            },
            success: function (data) {
                if (data.myJobs) {
                    this.state.loadJobs = data.myJobs
                }
                return callback();

            }.bind(this),

        });
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    render() {
        let jobs = this.state.loadJobs;
        let jobCards = null;

        if (jobs !== "") {
             jobCards = this.state.loadJobs.map(job => (
                <JobSummaryCard
                    key={job.id}
                    job={job}
                    />
                )) 
        }


        

        else {
            datalist = "No Jobs Found";
        }


        const filterOptions = [
            { key: 'showActive', text: 'Show Active', value: 'showActive' },
            { key: 'showClosed', text: 'Show Closed', value: 'showClosed' },
            { key: 'showDraft', text: 'Show Draft', value: 'showDraft' },
            { key: 'showExpired', text: 'Show Expired', value: 'showExpired' },
            { key: 'showUnexpired', text: 'Show Unexpired', value: 'showUnexpired' }
        ]

        const sortOptions = [
            { key: 'Newest', text: 'Newest First', value: 'Newest' },
            { key: 'Oldest', text: 'Oldest First', value: 'Oldest' }
        ]
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">
                    <h2>Jobs</h2>
                    <div>
                        <span>
                            <i className="filter icon"></i>
                            Filter:

                <Dropdown placeholder="Choose filter" inline options={filterOptions} />
                        </span>
                        <span>
                            <i className="calendar alternate icon"></i>
                            Short by Date:
                      <Dropdown inline options={sortOptions} defaultValue={sortOptions[0].value} />
                        </span>
                        <br />
                    </div>
                    <br />
                    <div className="ui two cards">
                        {jobCards}
                    </div>
                    <br />

                    <div align="center">
                        <Pagination
                            activePage={this.state.activePage}
                            totalPages={this.state.totalPages}
                        />
                    </div>
                    <br />

                </div>
            </BodyWrapper >
        )

    }
}

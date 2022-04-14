import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import Header from './ZachsComponents/Header';
import { Link, withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class TaskList extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {tasks: [], csrfToken: cookies.get('XSRF-TOKEN'), isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch(`/api/projects/${this.props.match.params.projectId}/tasks`, {credentials: 'include'})
            .then(response => response.json())
            .then(data => this.setState({tasks: data, isLoading: false}))
            .catch(() => this.props.history.push('/projects'));
    }

    async remove(id) {
        await fetch(`/api/projects/${this.props.match.params.projectId}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'X-XSRF-TOKEN': this.state.csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            let updatedTasks = [...this.state.tasks].filter(i => i.id !== id);
            this.setState({tasks: updatedTasks});
        });
    }

    render() {
        const {tasks, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const taskList = tasks.map(task => {
            return <tr key={task.id}>
                <td style={{whiteSpace: 'nowrap'}}>{task.name}</td>
                <td>
                    <ButtonGroup>
                       
                        <Button size="sm" color="primary" tag={Link} to={"/projects/" +
                            this.props.match.params.projectId + "/" + this.props.match.params.projectName + "/" + task.id}>Edit</Button>
                        <Button size="sm" color="success" onClick={() => this.remove(task.id)}>Completed</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
           
                
                <Container >
                   <br></br><br></br>
                   <br></br><br></br>
                    
                    <div className="float-end">
                        <Button color="success" tag={Link} to={"/projects/" + this.props.match.params.projectId +
                            "/" + this.props.match.params.projectName + "/new"}>Add Task</Button>
                    </div>
                    <h3>{this.props.match.params.projectName} Tasks</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="90%">Tasks</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {taskList}
                        </tbody>
                    </Table>
                </Container>
          
        );
    }
}

export default withCookies(withRouter(TaskList));
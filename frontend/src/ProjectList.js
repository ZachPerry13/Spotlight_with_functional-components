import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


class ProjectList extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {projects: [], csrfToken: cookies.get('XSRF-TOKEN'), isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/projects', {credentials: 'include'})
            .then(response => response.json())
            .then(data => this.setState({projects: data, isLoading: false}))
            .catch(() => this.props.history.push('/projects'));
    }

    async remove(id) {
        await fetch(`/api/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'X-XSRF-TOKEN': this.state.csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            let updatedProjects = [...this.state.projects].filter(i => i.id !== id);
            this.setState({projects: updatedProjects});
        });
    }

    render() {
        const {projects, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const projectList = projects.map(project => {
            return <tr key={project.id}>
                <td>
                    <Button color="link" tag={Link} to={"/projects/" + project.id + "/" + project.name}>
                        {project.name}
                    </Button>
                </td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/projects/" + project.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(project.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
           

                <Container >
                   <br></br><br></br>
                   <br></br><br></br>
                    <div className="Flex">
                        <Button color="success" tag={Link} to="/projects/new">Add Projects</Button>
                    </div>
                    <h3>My Projects</h3>
                    <Table className="Flex">
                        <thead>
                        <tr>
                            <th width="90%">Name</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projectList}
                        </tbody>
                    </Table>
                </Container>
            
        );
    }
}

export default withCookies(withRouter(ProjectList));
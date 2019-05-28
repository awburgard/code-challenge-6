import React, { Component } from 'react';
import { connect } from 'react-redux';
import AnimalListItem from '../AnimalListItem/AnimalListItem';

// DO NOT MODIFY THIS FILE FOR BASE MODE!

class AnimalList extends Component {
    state = {
        name: '',
        id: '',
    }

    handleChange = (event) => {
        if (event.target.dataset.name === 'species') {
            this.setState({
                name: event.target.value
            })
        } else if (event.target.dataset.name === 'id') {
            this.setState({
                id: event.target.value
            })
        }
    };

    handleButton = (event) => {
        this.props.dispatch({
            type: 'POST_ZOO_ANIMALS',
            payload: {
                name: this.state.name,
                id: this.state.id
            }
        })
        this.clearInputs()
    }

    clearInputs = (event) => {
        this.setState({
            name: '',
            id: '',
        })
    }

    componentDidMount() {
        const action = { type: 'GET_ZOO_ANIMALS' };
        this.props.dispatch(action);
    }

    // Renders the list of animals
    render() {
        return (
            <div>
                <h4>Key:</h4>
                    <p>1 = Mammal</p>
                    <p>2 = Bird</p>
                    <p>1 = Fish</p>
                    <p>1 = Reptile</p>
                    <p>1 = Amphibian</p>
                <input
                    type="text"
                    placeholder="Species"
                    value={this.state.name}
                    data-name="species"
                    onChange={this.handleChange}
                />
                <input
                    type="number"
                    placeholder="Class"
                    value={this.state.id}
                    data-name="id"
                    onChange={this.handleChange}
                />
                <button onClick={this.handleButton}>Add Animal</button>
                <table className="AnimalList">
                    <thead>
                        <tr><th>Species</th><th>Class</th></tr>
                    </thead>
                    <tbody>
                        {/* Render each item from the zooAnimal reducer */}
                        {this.props.reduxState.zooAnimals.map((classData, i) => {
                            return (<AnimalListItem key={i} classData={classData} />);
                        })}
                    </tbody>
                </table>
            </div>

        );
    }
}

// Makes our reducers available in our component
const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(AnimalList);

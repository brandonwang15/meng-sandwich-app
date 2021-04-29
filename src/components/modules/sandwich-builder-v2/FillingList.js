import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FillingListEntry from './FillingListEntry';

const Container = styled.div`
    border: 1px solid gray;
    padding: 10px;
`;


class FillingList extends React.Component {
    
    state = {
        "contents": [1,2,3],
    }

    render() {
        console.log("STATE = ", this.state);
        return (
            <Container>
                <h3>List #{this.props.fillingListID}</h3>
                {this.state.contents.map(fillingID => 
                    <FillingListEntry sandwichID={this.props.sandwichID} fillingID={fillingID}/>
                    )}
            </Container>
            )
    }
}

FillingList.propTypes = {
    fillingListID: PropTypes.number.isRequired,
    sandwichID: PropTypes.number.isRequired,
}

export default FillingList;
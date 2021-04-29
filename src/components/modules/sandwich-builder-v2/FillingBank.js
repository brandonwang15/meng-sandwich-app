import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FillingBankEntry from './FillingBankEntry';
import styled from 'styled-components';

const Container = styled.div`
    border: 1px solid gray;
    padding: 10px;
`;


class FillingBank extends React.Component {
    render() {
        return (
            <Container>
                <h3>Bank: {this.props.id}</h3>
                {this.props.fillingIDs.map(id => 
                    <FillingBankEntry sandwichID={this.props.sandwichID} fillingID={id}/>
                    )}
            </Container>
            )
    }
}

FillingBank.propTypes = {
    id: PropTypes.string.isRequired,
    fillingIDs: PropTypes.array.isRequired,
    sandwichID: PropTypes.number.isRequired,
}

export default FillingBank;
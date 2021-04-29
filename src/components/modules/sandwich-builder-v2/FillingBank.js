import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FillingBankEntry from './FillingBankEntry';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
    border: 1px solid gray;
    padding: 10px;
`;

const ContentsList = styled.div`

`;

class FillingBank extends React.Component {
    render() {
        return (
            <Container>
                <h3>Bank: {this.props.id}</h3>
                <ContentsList>
                    {this.props.fillingIDs.map(id =>
                        <FillingBankEntry sandwichID={this.props.sandwichID} fillingID={id} />)
                    }
                </ContentsList>
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
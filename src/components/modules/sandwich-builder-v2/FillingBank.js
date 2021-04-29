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
                <h3>{this.props.displayTitle}</h3>


                <Droppable droppableId={this.props.listID}>
                    {(providedDroppable) => {
                        return (
                            <ContentsList
                                ref={providedDroppable.innerRef}
                                {...providedDroppable.droppableProps}>

                                {this.props.contents.map((fillingID, listIndex) =>
                                    <FillingBankEntry 
                                        key={fillingID} 
                                        fillingID={fillingID} 
                                        sandwichID={this.props.sandwich.uid} 
                                        index={listIndex}
                                    />

                                )}
                                {providedDroppable.placeholder}
                            </ContentsList>
                        )
                    }
                    }
                </Droppable>
            </Container>
        )
    }
}

FillingBank.propTypes = {
    displayTitle: PropTypes.string.isRequired,
    listID: PropTypes.string.isRequired,
    contents: PropTypes.array.isRequired,
    sandwich: PropTypes.object.isRequired,
}

export default FillingBank;
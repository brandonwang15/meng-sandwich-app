import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import store from '../../../store';


const Container = styled.div`
    border: 1px solid lightgray;
    margin-bottom: 8px;
    padding: 5px;
    background-color: white;
    &:hover {
        background-color: #61f7ff;
    };
`;

const Title = styled.h6`
    text-style: bold;
`;



class FillingBankEntry extends React.Component {
    render() {
        let sandwich = store.getState().sandwiches[this.props.sandwichID];
        let filling = sandwich.allFillings[this.props.fillingID];

        return (
            <Draggable draggableId={this.props.fillingID} index={this.props.index}>
                {(provided) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <Title>{filling.title}</Title>
                        <div>
                            Sandwich ID: {this.props.sandwichID}
                        </div>
                        <div>
                            Filling ID: {this.props.fillingID}
                        </div>
                        <div>
                            Suggested Day: {filling.suggestedDay}
                        </div>
                        <b>
                            {filling.duration + " min."}
                        </b>
                    </Container>

                )

                }
            </Draggable>
        )
    }
}

FillingBankEntry.propTypes = {
    sandwichID: PropTypes.number.isRequired,
    fillingID: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
}

export default FillingBankEntry;
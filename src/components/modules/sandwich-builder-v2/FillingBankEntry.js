import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    border: 1px solid lightgray;
    margin-bottom: 8px;
`;


class FillingBankEntry extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.fillingID}>
                {(provided) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                    >
                        <div>
                            Sandwich ID: {this.props.sandwichID}
                        </div>
                        <div>
                            Filling ID: {this.props.fillingID}
                        </div>
                    </Container>

                )

                }
            </Draggable>
        )
    }
}

FillingBankEntry.propTypes = {
    sandwichID: PropTypes.number.isRequired,
    fillingID: PropTypes.number.isRequired,
}

export default FillingBankEntry;
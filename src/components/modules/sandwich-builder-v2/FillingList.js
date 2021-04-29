import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FillingListEntry from './FillingListEntry';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
    border: 1px solid gray;
    padding: 10px;
`;

const ContentsList = styled.div`

`;

class FillingList extends React.Component {

    state = {
        "contents": ["filling-a", "filling-b", "filling-c"],
    }

    render() {
        console.log("STATE = ", this.state);
        return (
            <Container>
                <h3>List: {this.props.fillingListID}</h3>
                <Droppable droppableId={this.props.fillingListID}>
                    {(providedDroppable) => {
                        return (
                        <ContentsList
                            ref={providedDroppable.innerRef}
                            {...providedDroppable.droppableProps}>

                            {this.state.contents.map((fillingID, listIndex) =>
                                <FillingListEntry sandwichID={this.props.sandwichID} fillingID={fillingID} key={listIndex} index={listIndex} />
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

FillingList.propTypes = {
    fillingListID: PropTypes.string.isRequired,
    sandwichID: PropTypes.number.isRequired,
}

export default FillingList;
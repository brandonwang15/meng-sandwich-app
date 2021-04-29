import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FillingListEntry from './FillingListEntry';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
    border: 1px solid gray;
    padding: 10px;
    margin-bottom: 20px;
`;

const ContentsList = styled.div`

`;

class FillingList extends React.Component {

    render() {
        console.log("FillingList.props = ", this.props);
        
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
                                    <FillingListEntry
                                        sandwichID={this.props.sandwich.uid}
                                        fillingID={fillingID}
                                        key={fillingID}
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

FillingList.propTypes = {
    displayTitle: PropTypes.string.isRequired,
    listID: PropTypes.string.isRequired,
    sandwich: PropTypes.object.isRequired,
    contents: PropTypes.array.isRequired,
}

export default FillingList;
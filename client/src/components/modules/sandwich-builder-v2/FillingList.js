import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FillingListEntry from './FillingListEntry';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
    border: 1px dashed gray;
    padding: 10px;
    margin-bottom: 20px;
`;

const ContentsList = styled.div`

`;

const ListTitle = styled.h4`
    /* Make text unselectable*/ 
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                            supported by Chrome, Edge, Opera and Firefox */
`;

const DurationTotal = styled.div`
    font-weight: bold;
    margin-bottom: 10px;

    /* Make text unselectable*/ 
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                            supported by Chrome, Edge, Opera and Firefox */
`;

class FillingList extends React.Component {

    render() {
        console.log("FillingList.props = ", this.props);

        let totalDurationOfFillings = 0;
        this.props.contents.forEach(fillingId => {
            totalDurationOfFillings += this.props.sandwich.allFillings[fillingId].duration;
        });

        return (
            <Container>
                <ListTitle>{this.props.displayTitle}</ListTitle>
                <DurationTotal>{"Total: " + totalDurationOfFillings + " min."}</DurationTotal>
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
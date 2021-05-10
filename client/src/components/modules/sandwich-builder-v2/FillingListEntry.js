import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import store from '../../../store'

const Container = styled.div`
    border: 1px solid lightgray;
    margin-bottom: 8px;
    padding: 5px;
    background-color: white;
`;

const Title = styled.h6`
    text-style: bold;
`;

const ExpandableSubContainer = styled.div`
    margin: 20px;

`;

class FillingListEntry extends React.Component {
    render() {
        let sandwich = store.getState().sandwiches[this.props.sandwichID];
        let filling = sandwich.allFillings[this.props.fillingID];

        return (
            <Draggable draggableId={this.props.fillingID} index={this.props.index}>
                {providedDraggable => {
                    return (<Container
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        ref={providedDraggable.innerRef}
                    >
                        <Title>
                            {filling.title}
                        </Title>
                        <div>
                            Sandwich ID: {this.props.sandwichID}
                        </div>
                        <div>
                            Filling ID: {this.props.fillingID}
                        </div>
                        <b>
                            {filling.duration + " min."}
                        </b>
                        <ExpandableSubContainer>
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target={"#listEntryFillingDetails-" + this.props.fillingID} aria-expanded="false" aria-controls="collapseExample">
                                See More
                            </button>
                            <div class="collapse" id={"listEntryFillingDetails-" + this.props.fillingID}>
                                {
                                    Object.entries(filling.materials).map(tuple => {
                                        let [fillingKey, value] = tuple;
                                        let url = value.url;

                                        return <div>
                                            <b>{fillingKey + ": "}</b>
                                            <a href={url} target="_blank">link</a>
                                        </div>
                                    })
                                }
                            </div>

                        </ExpandableSubContainer>
                    </Container>);
                }}
            </Draggable>
        )
    }
}

FillingListEntry.propTypes = {
    sandwichID: PropTypes.number.isRequired,
    fillingID: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
}

export default FillingListEntry;
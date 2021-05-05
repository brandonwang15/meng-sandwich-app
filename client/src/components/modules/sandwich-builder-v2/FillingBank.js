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

const BankTitle = styled.h3`
/* Make text unselectable*/ 
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                            supported by Chrome, Edge, Opera and Firefox */
`;

class FillingBank extends React.Component {
    render() {
        return (
            <Container>
                <BankTitle>{this.props.displayTitle}</BankTitle>


                <Droppable droppableId={this.props.listID}>
                    {(providedDroppable) => {
                        return (
                            <ContentsList
                                ref={providedDroppable.innerRef}
                                {...providedDroppable.droppableProps}>

                                {this.props.contents.map((fillingID, listIndex) =>
                                    <div onMouseOver={() => this.props.onFillingMouseOver(fillingID)}
                                        onMouseOut={() => this.props.onFillingMouseOver(-1)}>
                                        <FillingBankEntry 
                                            key={fillingID} 
                                            fillingID={fillingID} 
                                            sandwichID={this.props.sandwichId} 
                                            index={listIndex}
                                        />
                                    </div>

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
    sandwichId: PropTypes.number.isRequired,
    onFillingMouseOver: PropTypes.func.isRequired,
}

export default FillingBank;
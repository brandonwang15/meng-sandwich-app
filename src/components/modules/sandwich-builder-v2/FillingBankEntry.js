import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    border: 1px solid lightgray;
    margin-bottom: 8px;
`;


class FillingBankEntry extends React.Component {
    render() {
        return (
            <Container>
                <div>
                    Sandwich ID: {this.props.sandwichID}
                </div>
                <div>
                    Filling ID: {this.props.fillingID}
                </div>
            </Container>
        )
    }
}

FillingBankEntry.propTypes = {
    sandwichID: PropTypes.number.isRequired,
    fillingID: PropTypes.number.isRequired,
}

export default FillingBankEntry;
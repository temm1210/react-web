import React from 'react'
import BaseContainer from 'containers/base/BaseContainer';
import CardListContainer from 'containers/card/CardListContainer';

export default ({match}) => {
    return (
        <BaseContainer>
            <CardListContainer page={match.params.page} limit={10}/>
        </BaseContainer>
    )
}

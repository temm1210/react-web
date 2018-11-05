import React from 'react'
import LoginContainer from 'containers/auth/LoginContainer';
import BaseContainer from 'containers/base/BaseContainer';

export default () => {
    return (
        <BaseContainer>
            <LoginContainer/>
        </BaseContainer>
    )
}

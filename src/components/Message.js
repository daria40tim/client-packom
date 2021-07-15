import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({variant, children}) => {
    return <Alert style={{
        position: 'fixed', 
        marginTop: "25vh",
        marginLeft: "40vw"
    }} variant={variant}>{children}</Alert>
}

Message.defaultProps = {
    variant: 'info'
}

export default Message
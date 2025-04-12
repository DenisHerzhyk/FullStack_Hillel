import React from "react";
import { use } from 'react';

const MessageComponent = ({messagePromise}) => {
    const message = use(messagePromise);
    return <h1>{message}</h1>
}

export default MessageComponent;
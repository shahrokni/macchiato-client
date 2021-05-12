import React, { Fragment, FunctionComponent } from 'react';
import UserMessage from '../../entity/user-message/user-message';
import TestService from '../../service/test-service/test.service';


const Test: FunctionComponent = () => {
    const message = new UserMessage();

    const sendMessage = () => {           
        message.isAdvertisement = false;
        const test = new TestService();
        console.log(message)
       test.sendMessage(message)
    }

    const test = (
        <Fragment>
            <input id={'rId'} onChange={event=>{message.receiverId = event.target.value}} />
            <input id={'sId'} onChange={event=>{message.senderId = event.target.value}} />
            <input id={'msgTtl'} onChange={event=>{message.title = event.target.value}} />
            <input id={'msgTxt'} onChange={event => message.text = event.target.value} />
            <button onClick={() => { sendMessage() }} />
        </Fragment>
    )
    return test;
}

export default Test;
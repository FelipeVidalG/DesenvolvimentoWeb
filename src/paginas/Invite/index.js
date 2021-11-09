import React from 'react';
import { useParams } from 'react-router';

import './index.css'

function Invite(){
    const params = useParams()
    const festaId = params.id

    console.log(festaId);
    return(
        <div>

        </div>
    )
}

export default Invite;
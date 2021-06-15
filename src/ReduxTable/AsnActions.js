import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import Content from '../Dashboard/Content';


export default function Asn(){
    //console.log("Data from ASNAction: ",Store.getState().asn.asnList);
    const dispatch = useDispatch();
    dispatch({
        type : "ASN",
        payload: axios.get("http://localhost:8080/cbo/asn")
    });
    return(
        <Content>
             <div className="ASN">
                <h1>Hello ASN</h1>
            </div>
        </Content>
    )
}

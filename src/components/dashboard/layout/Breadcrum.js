import React from 'react';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';


export default function Breadcrum({ history, current }) {

    return (
        <div className="row">
            <div className="col-md-12 mb-4">

                <Paper className="functionalities">
                    <ul id="breadcrumb" className="breadcrumb">
                        <li></li>
                        {history.map((history) => (
                            <li key={uuid()}><Link to={history.link} title={history.title}>{history.title}</Link></li>
                        ))}

                        <li className="active"><strong>{current}</strong></li>
                    </ul>
                </Paper>

            </div>
        </div>
    )
}

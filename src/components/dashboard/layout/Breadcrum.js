import React from 'react';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';


export default function Breadcrum({ history, current }) {
    return (
        <div className="row">
            <div className="col-md-12 mb-3">

                <Paper className="functionalities">
                    <ul id="breadcrumb" className="breadcrumb">
                        <li></li>
                        {history.map((history) => (
                            <li><Link to={history.link} title={history.title}>{history.title}</Link></li>
                        ))}
                        {/* <li>
                    <a title="home"><i className="material-icons"></i>home</a>
                </li> */}
                        <li className="active"><strong>{current}</strong></li>
                    </ul>
                </Paper>

            </div>
        </div>
    )
}

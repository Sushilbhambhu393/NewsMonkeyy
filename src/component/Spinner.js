
//import React, { Component } from 'react'
import Loader from './Loader.gif'

const Spinner = ()=> {
        return (
            <div className="text-center">
                <img className="my-3" src={Loader} alt="loading" />
            </div>
        )
}

export default Spinner
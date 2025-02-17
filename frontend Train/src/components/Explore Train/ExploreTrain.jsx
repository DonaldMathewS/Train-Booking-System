import React from 'react'
import "./ExploreTrain.css"
import { Train_Type } from '../../assets/front/assets'

const ExploreTrain = ({ trainType, setTrainType }) => {
    return (
        <>
            <div className="exploretrain" id="exploreTrain">
                <h1>Explore your Train</h1>
                <p className="exploreTraintext">
                    "Pick your train category: Premium for ultimate comfort, Standard for reliable service, or Budget for a wallet-friendly option. Whatever your choice, a smooth and memorable journey is just a click away!"
                </p>

                <hr />
            </div>
        </>
    )
}

export default ExploreTrain;

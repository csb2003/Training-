import React from "react";

function Card({username}) {
    console.log(username)
    return (
        <div className="w-72 flex flex-col rounded-xl glass min-h-72 mt-3">
            <div>
                <img
                    src="https://media4.giphy.com/media/1gbqIc1fK8QgR3bHL7/giphy.gif?cid=790b7611a2f696d51a46ce892e420e77735707466a2abd3b&rid=giphy.gif&ct=g"
                    alt="test"
                    width="300"
                    height="300"
                    className="rounded-t-xl w-full"
                />
            </div>
            <div className="flex flex-col py-3 px-3 pb-7 -mt-4 bg-black rounded-b-xl">
                <div className="flex justify-between">
                    <h1 className="font-RubikBold">{username} ape nft accidental</h1>
                </div>
                <div className="flex justify-between font-mono">
                    <p>#345</p>
                    <p>0.01</p>
                </div>
            </div>
        </div>
    );
}

export default Card;

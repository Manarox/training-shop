import React from 'react';

export const Unique = (props) => {
    const {content} = props;

    let arr = [];
    let result = [];

    ({content}.content).map(elem => {
        return (
            arr.push(elem.color)
        )
    })

    for (let str of arr) {
        if (!result.includes(str)) {
            result.push(str);
        }
    }

    return (
        <>
            {result.join(`, `)}
        </>   
    )
}
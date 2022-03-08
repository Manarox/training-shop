import React from 'react';

const Unique = (props) => {
    const {content} = props;

    let arr = [];
    let result = [];

    ({content}.content).map(elem => {
        return (
            arr.push(elem.color)
        )
    })
    // console.log(`arr`, arr)

    for (let str of arr) {
        if (!result.includes(str)) {
            result.push(str);
        }
        }

    // console.log(`result`, result)

    return (
        <>
            {result.join(`, `)}
        </>   
    )
}

export {Unique}
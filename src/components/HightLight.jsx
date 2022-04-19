import React from 'react';

const HightLight = ({formikValues, dataCity}) => {
    if (!formikValues) return dataCity
    const regexp = new RegExp(formikValues, 'ig')
    const matchValue = dataCity.match(regexp)
    if (matchValue) {
        return dataCity.split(regexp).map((str, index, array) => {
        if (index < array.length - 1) {
            const strBold = matchValue.shift()
            return <>{str}<span className='hightlight' id={dataCity}>{strBold}</span></>
        }
        return str
        })
    }
    return dataCity
}

export {HightLight}
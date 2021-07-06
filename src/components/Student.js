import React, { useEffect, useState, useContext } from 'react';
import studentStyles from '../css/studentStyles.module.scss';
import Img from './Img'
import Grades from './Grades';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { getAverage } from '../functions/studentFunctions';
import { Context } from "../Context";
import Tags from './Tags'

const Student = ({ index }) => {
    const [average, setAverage] = useState(null);
    const [gradesAreShown, setGradesAreShown] = useState(false);
    const [context] = useContext(Context);
   
    function handleClick() {
        setGradesAreShown(p => !p);
    }

    useEffect(() => {
        //calculate average
        setAverage(getAverage(context.students[index].grades));
    }, [context.students, index])

    return (
        <>
       {context.students[index].blockedByName===false&&context.students[index].blockedByTag===false&&<div className={studentStyles.container}>
            <button aria-label={'toggle ' + context.students[index].firstName + 'grades'} name="toggle grades" className={studentStyles.plusMinusButton} onClick={() => { handleClick() }}>
                <FontAwesomeIcon className={studentStyles.plusMinusIcon} icon={!gradesAreShown ? faPlus : faMinus} />
            </button>
            <div className={studentStyles.imgContainer}>
                <Img source={context.students[index].pic} witdh={124} height={124} alt={context.students[index].lastName + ' ' + context.students[index].firstName} />
            </div>
            <div className={studentStyles.infosContainer}>
                <h1>{context.students[index].firstName.toUpperCase()} {context.students[index].lastName.toUpperCase()}</h1>
                <ul className={studentStyles.secondaryInfos}>
                    <li>Email: {context.students[index].email}</li>
                    <li>Company: {context.students[index].company}</li>
                    <li>Skill: {context.students[index].skill}</li>
                    <li>Average: {average}%</li>
                </ul>
                <Grades isShown={gradesAreShown} grades={context.students[index].grades} />
                <Tags index={index}/>
                </div>
        </div>}</>
    )
}

export default Student


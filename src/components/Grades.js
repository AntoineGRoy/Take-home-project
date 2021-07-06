import React from 'react';
import studentStyles from '../css/studentStyles.module.scss';


const Grades = ({ grades, isShown }) => {

    return (
        <ul className={studentStyles.extendedGrades}>
            {isShown && grades.map((grade, index) => {
                return <li key={'grade' + index + "-" + grade}>Test {index + 1}:<span className={studentStyles.percentSpan}>{grade}%</span></li>
            })}
        </ul>
    )
}

export default React.memo(Grades);

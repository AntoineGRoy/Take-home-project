import React, {Suspense, useEffect, useState, useRef, useContext } from 'react';
import robot from '../svg/robot.svg';
import Student from'./Student';
import { Context } from "../Context";

const StudentsList=()=>{
    const [context, setContext] = useContext(Context);

    const [searchName,setSearchName]=useState('');
    const [searchTag,setSearchTag]=useState('');
    const [noResults,setNoResults]=useState(false);
    const nameSearchRef=React.useRef(null);
    const tagSearchRef=React.useRef(null);

    const studentsList=useRef(null);

    

    useEffect(()=>{
        //checking if the list is empty
        if(studentsList.current.firstChild===null){
            setNoResults(true);
        }else{setNoResults(p=>{
            if(p===true){
                setNoResults(false);
            }
        })}
    },[context.students]);

  


    const handleChange=(e)=>{
        //when user is typing in one of the fields
        //name field
        if(e.target.name==='search by name'){
            //handling the value
            setSearchName(e.target.value);
            if(e.target.value===''){
                //if the field is made empty make blocked by name false in all students
                let allStudents=context.students.map((student)=>{
                    return {...student, blockedByName:false}
                })
                setContext({...context, students:allStudents});
            }else{
            //reevaluate the filtering
            let term=e.target.value;
            let output=[...context.students];
            let l=term.length;
                let lowerCaseSearchName=term.toLowerCase();
                output.forEach((item)=>{
                    let lowerCaseLastNameSubstr=item.lastName.substr(0,l).toLowerCase();
                    let lowerCaseFirstNameSubstr=item.firstName.substr(0,l).toLowerCase();
                    filterByName(item,lowerCaseLastNameSubstr,lowerCaseFirstNameSubstr,lowerCaseSearchName);
                })
                setContext({...context, students:output});
            }
        }
        //tag field
        if(e.target.name==='search by tag'){
            setSearchTag(e.target.value);
            if(e.target.value===''){
                //if the field is made empty make blocked by tag false in all students
                let allStudents=context.students.map((student)=>{
                    return {...student, blockedByTag:false}
                });
                console.log("free from tag");
                setContext({...context, students:allStudents});   
            }else{
                let term=e.target.value;
                let output=[...context.students];
                let lowerCaseSearchTag=term.toLowerCase();
                let l=term.length;
                output.forEach((item)=>{
                    if(item.tags===undefined){
                        item.blockedByTag=true;
                        console.log('blocked by tag');
                    }else{
                        let lowerCaseTagsSubstrArray=item.tags.map((tag)=>{
                            return tag.substr(0,l).toLowerCase();
                        })
                        filterByTag(item,lowerCaseTagsSubstrArray,lowerCaseSearchTag);
                    } 
                })
                setContext({...context, students:output});
            }}
    }

    function filterByName(item,lowerCaseLastNameSubstr,lowerCaseFirstNameSubstr,lowerCaseSearchName){    
            if(lowerCaseLastNameSubstr!==lowerCaseSearchName
            && lowerCaseFirstNameSubstr!==lowerCaseSearchName
            ){
               if(!item.blockedByName)item.blockedByName=true;
            }else{
                if(item.blockedByName===true) item.blockedByName=false;
            }
        }

    function filterByTag(item,lowerCaseTagsSubstrArray,lowerCaseSearchTag){
        let accepted=false;
        for(let i=0;i<lowerCaseTagsSubstrArray.length;i++){
            if(lowerCaseTagsSubstrArray[i]===lowerCaseSearchTag){
                accepted=true;
                break
            }
        }
        if(accepted===false){
           if(!item.blockedByTag) {
               item.blockedByTag=true;
            }  
        }else{

            if(item.blockedByTag){
                item.blockedByTag=false;
            }
        }
    }


    return (
        <div className="StudentsList">
            <input ref={nameSearchRef} name="search by name" placeholder='Search by name' className="searchInput" onChange={handleChange} value={searchName} type='text' maxLength='40'/>
            <input ref={tagSearchRef} name="search by tag" placeholder='Search by tag' className="searchInput" onChange={handleChange} value={searchTag} type='text' maxLength='40'/>
            <Suspense fallback={<div>Loading...</div>}>
        <div ref={studentsList}>
         {context.students&&context.students.map((student,index)=>{
             return (
                     <Student key={student.id} index={index}/> 
             )
         })}
         </div>
         </Suspense>
         {noResults&&<div className="no-result">
             <img src={robot} alt="sad robot"/>
             <h2 className='message'>Sorry, no match...</h2>
             </div>} 
        </div>
    )
}

export default StudentsList

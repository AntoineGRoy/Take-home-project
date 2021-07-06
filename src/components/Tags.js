import React,{useState, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { validateTag } from '../functions/studentFunctions';
import studentStyles from '../css/studentStyles.module.scss';
import { Context } from "../Context";

const Tags=({index})=>{

    const [context, setContext] = useContext(Context);
    const [tag, setTag] = useState('');
    const [tagError,setTagError]=useState('');

    const tagInput = React.useRef(null);

    const onPressEnter = (e) => {
        if (e.charCode === 13 && document.activeElement === tagInput.current ) {
            if(tagError)setTagError('');
            e.preventDefault();
            let newStudents = context.students;
            console.log(newStudents[index].tags)
            //validate tag return tag or false
            let tagErrorText = validateTag(tag,context.students[index].tags || []);
            if (tagErrorText==='') {
                if (!newStudents[index].tags) {
                    newStudents[index].tags = [tag];
                    console.log("pas DE TAG YET")
                    console.log(newStudents[index].tags)
                } else {
                    newStudents[index].tags = [...newStudents[index].tags, tag]
                    console.log("TAG YET")
                    console.log(newStudents[index].tags)
                }
                setContext({...context,students:newStudents});
                setTag('');
            }else{setTagError(tagErrorText)}
        }
    }

    function deleteTag(idx){
        let newStudents = context.students;
        let tempTags=context.students[index].tags.map(tag=>tag);
        tempTags.splice(idx,1);
        console.log(tempTags);
        newStudents[index].tags = [...tempTags];
        setContext({students:newStudents});
        setTagError('');
        console.log(tempTags);
        setTag('');
        
        
           
    }



    return (
        <>
             {context.students[index].tags&&context.students[index].tags.length > 0 ? <div className={studentStyles.tagsContainer}>
                    {context.students[index].tags.map((tag,idx) => {
                        return <span className={studentStyles.tag} key={"tag-" + idx}><FontAwesomeIcon onClick={()=>{deleteTag(idx)
                        }}icon={faTimes}/> {tag}</span>
                    })}
                     <span className={studentStyles.tagError}>{tagError}</span>
                </div>:null}
                <input maxLength='15' placeholder='Add a tag' autoComplete="off" className={studentStyles.tagInput} value={tag} ref={tagInput} type='text' onKeyPress={e => { onPressEnter(e); }} onChange={(e) => { setTag(e.target.value); }} />
            
        </>
    )
}

export default Tags

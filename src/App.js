import React from 'react'
import './css/reset.css';
import './css/App.scss';
import robot from './svg/robot.svg'
import { useEffect, Suspense, useState } from 'react';
import { Context } from "./Context.js";
const StudentsList = React.lazy(() => import('./components/StudentsList'));

function App() {
  const [context, setContext] = useState();
  const APIUrl = "https://api.hatchways.io/assessment/students";


  useEffect(() => {
    //avoid update on umounted components
    let ignore = false;
    const generatingFilterableStudents= 
    (students) => {
        let filterableStudents=students.map((student)=>{
            return {...student,blockedByTag:false, blockedByName:false};
        });

        console.log(filterableStudents);
        return {students:filterableStudents};
    };
    async function fetchStudents(url) {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (!ignore) setContext(generatingFilterableStudents(json.students));
        
      } catch (err) {
        setContext({fetchError:err}); // TypeError: failed to fetch
      }
    }
    if (!ignore) fetchStudents(APIUrl);


    return () => { ignore = true }
  }, []);

  return (
    <div className="App">
      {context&&context.fetchError && <div className="no-result">
        <img src={robot} alt="sad robot" />
        <h2 className='message'>Sorry, something went wrong...</h2>
        <h2 className='message'>I can't access the hatchways API</h2>
        <h3>{context.fetchError.type}</h3>
      </div>}
      {context && <Suspense fallback={context.fetchError ? <div>{context.fetchError}</div> : <div>...Loading</div>}>
      <Context.Provider value={[context, setContext]}>
        <StudentsList />
      </Context.Provider>
      </Suspense>}
    </div>
  );
}

export default App;

import {getAverage} from '../functions/studentFunctions';


test('return the grades average to two decimals',()=>{
    const average=getAverage([33,32,35]);
   expect(average).toBe(33.33);
});


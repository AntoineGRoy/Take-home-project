export const getAverage=(arr)=>{
    let gradesAverage = arr.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10)) / arr.length;
    return Math.round(gradesAverage*100)/100;
};

export function validateTag(tag,tags) {
    //too many tags
    if(tags&&tags.length>6){
        return '5 tags is the maximum'
    }
    tag.trim();
    //tag is already present in tags
    if(tags&&tags.length>0&&tags.includes(tag)){
        return 'You can\'t add the same tag twice'
    }
    //tag is empty
    if(tag===''){
        return 'Your tag cannot be empty'
    }
        return '';
}
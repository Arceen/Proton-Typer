import React,{Component} from 'react';
let styles={
    fontSize: '20px',
    margin:'2px',
    width:'auto',
    overflow:'hidden',
    textAlign:'center',
    display:'flex',
    flexWrap:'wrap'
}

const Word = (props)=>{
    let c = {}
    if (props.color)
        c = Object.assign({},styles,{background: props.color, border:'1px solid red'});
    else{
        c = Object.assign({},styles,{background: 'white'});
    }
    return(
    <div style={c}>{props.word}<span style={{display:"inline-block", width: "20px"}}></span>
    </div>
    )
}

export default Word;
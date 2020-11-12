import React from 'react';
import './word.css';

const Word = (props)=>{
    let c = {}
    console.log(props)
    if (props.tp === "current"){
        console.log("Current")
        if(props.correct){
            c = Object.assign({},{background: 'lightgreen'});
        }
        else{
            c = Object.assign({},{background: 'red'});
        }
    }
    else{
        c = Object.assign({},{background: 'pink'})
    }
    return(
    <div className="word-style" style={c}>{props.word}<span style={{display:"inline-block", width: "2em"}}></span>
    </div>
    )
}

export default Word;
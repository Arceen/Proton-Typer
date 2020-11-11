import React,{Component} from 'react';
import words from './words_list.js';
import Word from './word.js';
class WordContainer extends Component{
    
    constructor(props){
        super(props);
        const t = words.split("\n")
        let text = []
        for (let i = 0; i<300; i++){
            text.push(t[Math.floor(Math.random()*3000)])
        }
        
        var cw = text.slice(0,1)[0]
        this.state={
            currentWord: text.splice(0,1),
            current: text.splice(0,16),
            text,
            lindex: 0,
            letter: cw[0],
            completed:false,
            err:0,
            lerr:0,
            currtyped:"",
            wcount: 0
        }
    }
   nextWord(){
       console.log(typeof this.state.currentWord)
       var cw = this.state.current.slice(0,1)[0]
       this.setState({
            currentWord: this.state.current.splice(0,1),
            current:this.state.current.concat(this.state.text.splice(0,1)),
            lerr:0,
            lindex: 0,
            letter: cw[0][0],
            wcount: this.state.wcount+1,
        })
   }
   typeMistake(){
       console.log("Oops!")
       this.setState({
           lerr:1,
           err:this.state.err+1,
       })
   }
   fixMistake(){
       console.log("Fixed it!")
       this.setState({
           lerr:0,
       })
   }
   letterUpdate(indx, ltr){
       this.setState({
        lindex: indx,
        letter: ltr,
       })
   }
   
   typeBox = (e)=>{
       console.log(typeof this.state.current)
       console.log(this.state.currentWord[0])
       console.log(e.target.value)
       if(e.target.value === ' '){
           e.target.value = "";
       }
       else if(e.target.value===this.state.currentWord[0]+' '){
           this.nextWord()
           e.target.value = "";
       }
       else if(e.target.value===this.state.currentWord[0]){

       }
       else if(this.state.currentWord[0].startsWith(e.target.value)){
            this.letterUpdate(e.target.value.length, this.state.currentWord[0][e.target.value.length]);
            if(this.state.lerr === 1){
                this.fixMistake();
            }
       }
       else{
           if(this.state.lerr === 0){
            this.typeMistake();
           }
       }
       

   }
   render(){ 
    //    console.log(this.state.current)
    
    return (
      <div>
          <h1>Write something</h1>
       
          {console.log(this.state.currentWord)}
     <div style={{flexDirection:'row', display:'inline-flex', flexWrap:'wrap'}}>  
          <Word word={this.state.currentWord[0]} color={this.state.lerr===0?undefined:'red'}/>
          {this.state.current.map((x,index)=><Word word={x} key={index+this.state.wcount}/>)}
          </div>     
          <input style={{width:'100%'}} onChange={this.typeBox}/>
        
      </div>
        )
    }
}


export default WordContainer;
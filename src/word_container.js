import React,{Component} from 'react';
import words from './words_list.js';
import Word from './word.js';
import './word_container.css';

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
            start: true,
            completed:false,
            err:0,
            lerr:0,
            currtyped:"",
            wcount: 0,
            totletters: 0,
            time:60,
        }
    }

    beginTyping(){
        console.log('Starting the timer');
        this.startTimer();
        this.setState({
            start:false,
        })
    }
    async startTimer(){
        // let curr, nxt;
        // curr = Date.now();
        // nxt = 0;
        
        //     if (nxt-curr>=1000){
        var interval = setInterval(() => {
                this.setState({
                time:this.state.time-1,
                    })
                if(this.state.time<=0){
                    this.setState({
                            completed:true,
                    })
                    clearInterval(interval);
                }
            
            }, 1000);
        //         
        //         curr = Date.now();
        //         nxt = 0;
        //     }
        //     else{
        //         nxt = Date.now();
        //     }

        
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
           totletters: this.state.totletters+1,
       })
   }
   fixMistake(){
       console.log("Fixed it!")
       this.setState({
           lerr:0,
       })
   }
   letterUpdate(indx, ltr){
       if(this.state.lerr === 0){
        this.setState({
            lindex: indx,
            letter: ltr,
            totletters: this.state.totletters+1
        })
        }
        else{
            this.setState({
                lindex: indx,
                letter: ltr,
                
            })
        }
   }
   
   typeBox = (e)=>{
       console.log(typeof this.state.current)
       console.log(this.state.currentWord[0])
       console.log(e.target.value)
       if(this.state.start){
            this.beginTyping();
       }
       if(this.state.completed){
            // this.stopTyping();
            
            console.log("completed");
            return;
       }
       if(e.target.value === ' '){
           e.target.value = "";
       }
       else if(e.target.value===this.state.currentWord[0]+' '){
           this.nextWord()
           e.target.value = "";
       }
       else if(e.target.value===this.state.currentWord[0]){
            this.letterUpdate(e.target.value.length, " ")
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
   stopTyping(){

   }
   render(){ 
    //    console.log(this.state.current)
    let WPM = isNaN(((this.state.totletters*60)/(5*(60-this.state.time)))) || ((this.state.totletters*60)/(5*(60-this.state.time)))===Infinity ? 0 : ((this.state.totletters*60)/(5*(60-this.state.time))).toFixed(2);
    let Accuracy = isNaN((1-(this.state.err/this.state.totletters))*100) ? 0 : ((1-(this.state.err/this.state.totletters))*100).toFixed(2)
    return (
      <div className="type-container">
          <h1>Welcome to Proton Typer!</h1>

        <div><div>Words Typed: {this.state.wcount}</div>
        <div><span>Accuracy:</span> {Accuracy}%</div>
        <div>Time Remaining: {this.state.time}</div>
        <div><span>WPM:</span> {WPM}</div>
        </div>
        <div className="word-row">  
          <Word word={this.state.currentWord[0]} tp="current" correct={this.state.lerr===0?true:false}/>
          {this.state.current.map((x,index)=><Word word={x} key={index+this.state.wcount}/>)}
          </div>     
          <input className="input-box" onChange={this.typeBox}/>
        
      </div>
        )
    }
}


export default WordContainer;
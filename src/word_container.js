import React,{Component} from 'react';
import words from './words_list.js';
import Word from './word.js';
import './word_container.css';

class WordContainer extends Component{
    
    constructor(props){
        super(props);
        this.tryAgain.bind(this)
        const t = words.split("\n")
        let text = []
        for (let i = 0; i<300; i++){
            text.push(t[Math.floor(Math.random()*3000)])
        }
        const baseTime = 2
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
            time:baseTime,
            typeSkillLevel:"Unknown",
            existingWPM:0,
            existingAcc:0,
            currTypeSkillLevel:"Unknown",
            currWPM:0,
            currAcc:0,
            timesCompleted:0,
            baseTime,
        }
    }

    rldStates(){
        const t = words.split("\n")
        let text = []
        for (let i = 0; i<300; i++){
            text.push(t[Math.floor(Math.random()*3000)])
        }
        var cw = text.slice(0,1)[0]
        this.setState({
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
            currTypeSkillLevel:"Unknown",
            currWPM:0,
            currAcc:0,
            wcount: 0,
            totletters: 0,
            time:this.state.baseTime,
        })
    }

    tryAgain = ()=>{
        this.rldStates();
        
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
                    let bt = this.state.baseTime;
                    let WPM = isNaN(((this.state.totletters*60)/(5*(bt-this.state.time)))) || ((this.state.totletters*60)/(5*(bt-this.state.time)))===Infinity ? 0 : ((this.state.totletters*60)/(5*(bt-this.state.time))).toFixed(2);
                    let Accuracy = isNaN((1-(this.state.err/this.state.totletters))*100) ? 0 : ((1-(this.state.err/this.state.totletters))*100).toFixed(2)
                    let tCompleted = this.state.timesCompleted+1;
                    let exWPM = this.state.existingWPM*(1-1/tCompleted)+(WPM/tCompleted);           
                    let exAcc = this.state.existingAcc*(1-1/tCompleted)+(Accuracy/tCompleted);
                    
                    let skillLevel = this.getSkillLevel(exWPM)
                    this.setState({
                        completed:true,
                        existingWPM:exWPM,
                        existingAcc:exAcc,
                        timesCompleted:tCompleted,
                        typeSkillLevel: skillLevel,
                        currTypeSkillLevel: this.getSkillLevel(WPM),
                        currWPM:WPM,
                        currAcc:Accuracy,
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
    getSkillLevel(WPM){
        
        let wpm = Math.round(WPM);
        if(wpm<20) {return "New Typist";}
        else if( wpm<45) return "Normal Typist";
        else if( wpm<70) return "Good Typist";
        else if( wpm<90) return "Beast Typist";
        else return "Legendary Typist";
        
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
   getColorForSkill(skillLevel){

    switch(skillLevel){
        case "Unknown":
            console.log("unknown 0")
            console.log('0')
            return '0';
        case "New Typist":
            return '1';
        case "Normal Typist":
            return '2';
        case "Good Typist":
            return '3';
        case "Beast Typist":
            return '4';
        case "Legendary Typist":
            return '5';
        default:
            return '6';
    }
   }
   render(){ 
    //    console.log(this.state.current)
    let bt = this.state.baseTime;
    console.log(bt)
    console.log(this.state.totletters)
    console.log(this.state.time)
    let WPM = isNaN(((this.state.totletters*60)/(5*(bt-this.state.time)))) || ((this.state.totletters*60)/(5*(bt-this.state.time)))===Infinity ? 0 : ((this.state.totletters*60)/(5*(bt-this.state.time))).toFixed(2);
    let Accuracy = isNaN((1-(this.state.err/this.state.totletters))*100) ? 0 : ((1-(this.state.err/this.state.totletters))*100).toFixed(2)
    
    if(this.state.completed){
        return(
            <div className="completed-container">
                <h1>You are officially Awesome!</h1>
                <div><span class="sh">Your WPM:</span>&nbsp; {this.state.currWPM}</div>
                <div><span class="sh">Your Accuracy:</span> &nbsp;{this.state.currAcc}%</div>
        <div><span class="sh">Skill Level for This Text:</span>&nbsp;<span className={"skilldiv-"+this.getColorForSkill(this.state.currTypeSkillLevel)}>{this.state.currTypeSkillLevel}</span></div>
                <div><h4>Try again?</h4></div>
                <button className="btnAgain" onClick={this.tryAgain}>Yes!</button>
            </div>
        )
    }
    else{
        return (
            <div className="type-container">
                <h1 className="Welcome">Welcome to Proton Typer!</h1>
                <div className="space-div"></div>
                <div className="info-section">
                
                <div><span class="sh">Words Typed:&nbsp;</span>{this.state.wcount}</div>
                <div><span class="sh">Accuracy:</span>&nbsp; {Accuracy}%</div>
                <div><span class="sh">WPM:&nbsp;</span> {WPM}</div>
                <div><span class="sh">Average Skill Level:&nbsp;</span><span className={"skilldiv-"+this.getColorForSkill(this.state.typeSkillLevel)}>{this.state.typeSkillLevel}</span></div>
                <div><span class="sh">Average WPM:&nbsp;</span> {this.state.existingWPM}</div>
                <div><span class="sh">Average Accuracy:&nbsp;</span> {this.state.existingAcc}%</div>
                
                </div>
                <div><span class="sh">Time Remaining: &nbsp;</span><span className={this.state.time>=10?"timespanlot":"timespanlittle"}>{this.state.time}</span></div>
                
                <div className="space-div"></div>
                <div className="word-row">  
                <Word word={this.state.currentWord[0]} tp="current" correct={this.state.lerr===0?true:false}/>
                {this.state.current.map((x,index)=><Word word={x} key={index+this.state.wcount}/>)}
                </div>     
                <div className="space-div"></div>
                <input placeholder={this.state.start?"Let's Start...":"Keep Going"} className={this.state.lerr === 1?"input-box-err":"input-box"} onChange={this.typeBox} autoFocus/>
                
            </div>
            )
        }
    }
}


export default WordContainer;
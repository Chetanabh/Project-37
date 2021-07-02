class Quiz {
  constructor(){
    this.title2 = createElement('h1');
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements

    question.hide();
    //write code to change the background color here
    background(100,250,100);
    //write code to show a heading for showing the result of Quiz
    this.title2.html("RESULT OF THE QUIZ");
    this.title2.position(350,0);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      fill("blue");
      textSize(20);
      text("*NOTE : CONTESTANT WHO ANSWERED CORRECT ARE HIGHLIGHTED IN GREEN COLOR!",100,230);
    }
    for(var plr in allContestants){
      var correctAns = "2";
      if(correctAns === allContestants[plr].answer){
        fill("green");
        textSize(19);
        text(allContestants[plr].name + " : " + allContestants[plr].answer,300,300);
      }else {
        fill("red");
        textSize(19);
        text(allContestants[plr].name + " : " + allContestants[plr].answer,300,360);
      }
    }

    //write code to add a note here
    /*textSize(18);
    text("*NOTE : Contestant who answered correct are highlughted in green color!",100,230);*/

    //write code to highlight contest who answered correctly
    
  }

}

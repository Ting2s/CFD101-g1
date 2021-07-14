//  :class="{'show':isOK,'none':isNO}"
// let vue=new Vue({
//   el:document.getElementById('whiteBoard'),
//   data: {
//     isOK:true,
//     isNO:false
//   },
//   computed: {
//     startBtn() {
//         this.isOK = false,
//         this.isNO = true
//     }
//   }
// })
//判決對錯

//==================================================
new Vue({

  el: ('#app'),
  data: {
    answers: [
      {
        name: "A",
        option:""
      },
      {
        name: "B",
        option:""  },
      {
        name: "C",
        option:""  },
      {
        name: "D",
        option:""  },
    ],
    //被選上的問題
    questions:[],
    //問題庫
    quest_rows: [],
//============== 
    clicked: {
      color: 'red',
    },   
//==============   
    isRight: true,
    isShow: false,
//==============
    isStart: false,
    isGame: true,
    isScore: true,
    isWrapper:false,
//分數===========
    point: 0,
    allPoint: 0,
//評論===========    
    comment_A: "你真是個天才！",
    comment_B: "你真厲害！",
    comment_C: "再加油！",
//對錯===========
    rightImg: "images/dinoTest/pic/right.png",
    wrongImg: "images/dinoTest/pic/x.png"
  },
  computed: {


    choose(i) {
      this.isShow = true;
      this.clicked = true;
    //顯示對錯
      if (this.clicked = true &&
        this.questions[i].target.value == this.questions[i].quiz_a) {
        this.wrongImg = false;
        this.rightImg = true;
      } else {
        this.wrongImg = true;
        this.rightImg = false;
      }
    },
    //當選取的按鈕和quiz_a相同時->加一分
    rightPoint() {
      if (this.clicked = true &&
        this.questions[i].target.value == this.questions[i].quiz_a) {
        return this.point = 1;
      } else {
        return this.point = 0;
      }
    },

    //對錯計算
    finalScore() {
      for (let i = 1; i<=7; i++) {
        return this.allPoint += this.rightPoint();
      };
    },
  },

  methods: {
    //遊戲開始*
    game() {
      this.isStart = true;
      this.isGame = false;
    },

    //轉換選項
    options(i) {

      if (this.answers.name="A") {
        this.questions[i].quiz_opt1;
      };
      if(this.answers.name="B") {
        this.questions[i].quiz_opt2;
      };
      if(this.answers.name="C") {
        this.questions[i].quiz_opt3;
      };
      if(this.answers.name="D") {
        this.questions[i].quiz_opt4;
      };
      
    },
    
    //撈資料庫*
    myQuiz(){
      const xhr = new XMLHttpRequest();
      const my =this
      xhr.onload = function(){
        if (xhr.status == 200) {
      my.quest_rows = JSON.parse(xhr.responseText);
        }else{
          alert(xhr.status);
        }
      }
      xhr.open("get", "./php/getQuestion.php", true);
      xhr.send(null);
    },

    //20題抽7
    chooseQustion() {
      for (let i = 0; i < 7; i++) {
        let chooseQ = Math.floor(Math.random() * this.quest_rows.length);
        this.questions= this.quest_rows[chooseQ];
    
        //撇除重複
        for (let j = 0; j < i; j++) 
        {
          while (this.questions[i] == this.questions[i])
        {
          j = 0; 
          let chooseQ = Math.floor(Math.random() * this.quest_rows.length);
          this.questions = this.quest_rows[chooseQ];
        }
        }
      }
    },
  
    //切換下頁鍵*
    nextTitle(i) {
      
      if (this.questions[i].status < this.questions[i + 1].status) {
        this.questions[i].status = 2;
        this.questions[i + 1].status = 1;

      } else if (this.questions[i].status > this.questions[i + 1].status) {
        this.questions[i + 1].status = 2;
        this.questions[i + 2].status = 1;

    //切換成分數頁(scoreBoard)
      } else if (this.questions[6].status = 1) {
        this.isGame = true;
        this.isScore = false;
        this.isWrapper = true;
    }
    },
    //進入公布分數
    // inScore(){
    //   if (this.questions[6].status = 1) {
    //     this.isGame = true;
    //     this.isScore = false;
    //     this.isWrapper = true;
    // }},

    //重新開始*
    restart() {
      // console.log(this.questions[0].status);

      this.questions[0].status = 1
      for (let i = 1; i < this.questions.length; i++) {
        this.questions[i].status = 2
      }
    },
    //再玩一次*
    playAgain() {
      this.isScore = true;
      this.isGame = false;
      this.isWrapper = false;

      this.questions[0].status = 1
      for (let i = 1; i < this.questions.length; i++) {
        this.questions[i].status = 2
      }
    },
    
    //評論*
    comment() {
      if (this.score == 7) {
        return this.comment_A;
      } else if (this.score >= 4 && this.score < 7) {
        return this.comment_B;
      } else {
        return this.comment_C;
      }
    }
  },

  mounted() {
    this.myQuiz();
    this.chooseQustion();
  }
})



//==============================================
function Id(id) {
  return document.getElementById(id);
}
//==============================================
// let start_btn =Id("startBtn");
// start_btn.addEventListener("click", function (e) {

//   Id("testContent").classList.add("none");
//   Id("testContent_Q").classList.remove("none");
// })


// let toScore = Id("nextArrow");
// toScore.addEventListener("click", function (e) {

//   Id("testContent_Q").classList.add("none");
//   Id("scoreBoard").classList.remove("none");
//   Id("whiteBoard").classList.add("showScore");
//   Id("whiteBoard").classList.remove("whiteBoard");
// })

// let restart = Id("restart");
// restart.addEventListener("click", function (e) {

//   Id("testContent_Q").classList.remove("none");
//   Id("scoreBoard").classList.add("none");
//   Id("whiteBoard").classList.remove("showScore");
//   Id("whiteBoard").classList.add("whiteBoard");
// })

//==============================================
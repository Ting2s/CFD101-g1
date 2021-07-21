//==================================

function Id(id){
  return document.getElementById(id);
};
//==================================
const maxItemPerPage = 3;
const maxItemPerPage_acc = 8;
let pageBar = new Vue({

  el: '#perBox',

  data: {
    isOcean: 'ocean',
    isGround: 'ground',
    isSky: 'sky',
    //================

    // isHat: true,
    // isTicket: false,
    // isBack: false,
    //================
    postcard: "",
    //我的恐龍
    myDino: [
      {
        dino_st: 0,
        picture: "images/dinoPersonal/d2.png",
        value: "龍春暉",
      },
      {
        dino_st: 1,
        picture: "images/dinoPersonal/d2.png",
        value: "龍春暉",
      },
      {
        dino_st: 2,
        picture: "images/dinoPersonal/d2.png",
        value: "龍春暉",
      },
      {
        dino_st: 2,
        picture: "images/dinoPersonal/d2.png",
        value: "龍春暉",
      },
    ],
    //我的配件
    dinoAcc: [],
    currentPage: 1,

    //會員資料
    memberRows:[]

  },
  methods: {
    nextPage() {
      this.currentPage++;
    },
    prePage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    
    },
    //我的配件資料庫
    myAcc() {
      const xhr = new XMLHttpRequest();
      const my = this;
      xhr.onload = function () {
        if (xhr.status == 200) {
          my.dinoAcc = JSON.parse(xhr.responseText);
        } else {
          alert(xhr.status);
        }
      }
      xhr.open("get", "./php/getDinoAcc.php", true);
      xhr.send(null);
    },

    //個人資料
    member() {
      const xhr = new XMLHttpRequest();
      const my = this;
      xhr.onload = function () {
        if (xhr.status == 200) {
          my.memberRows = JSON.parse(xhr.responseText);
        } else {
          alert(xhr.status);
        }
      }
      xhr.open("get", "./php/getMember.php", true);
      xhr.send(null);
    },

    
//================================
    updatePhoto() {
    //點擊後獲取新頭像
    console.log(1);
    // let my = this;
    html2canvas(Id("myPhoto"), {     
      onrendered: function (canvas) {
      document.body.appendChild(canvas);
        
      let leCanvas = document.getElementsByTagNam("canvas")[0];
      console.log(leCanvas);
      let newImg = leCanvas.toDataURL("image/png");  
        console.log('<img src="' + newImg + '"/>');
      
      Id("saveImg").src = newImg ;
        
      //跳窗提醒傳入成功
      let span = document.getElementsByClassName("saveClose")[0];
      Id('save').onclick = function() {
      Id('saveBox').style.display = "block";
      }
      span.onclick = function() {
      Id('saveBox').style.display = "none";
      }
      window.onclick = function(event) {
        if (event.target == Id('saveBox')) {
          Id('saveBox').style.display = "none";
        }
        }
        // Id("facePhoto").src = newImg ;
      },
      width:320,
      height:220
  });

    //傳入後端
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        //傳入後端
      } else {
        alert(xhr.status);
      }
    }
    xhr.open("post", "./php/updatePhoto.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    let data_info = `newImg=${Id('facePhoto').src}`;
    xhr.send(data_info);
  }

    //=============
  },
  
  computed: {
    style() {
      const my = this;
      if (my.dinoAcc.type == 0) {
        Id("style").classList.add('hat');
        Id("style").classList.remove('ticket');
        Id("style").classList.remove('back');

      }
      if (my.dinoAcc.type == 1) {
        Id("style").classList.add('ticket');
        Id("style").classList.remove('hat');
        Id("style").classList.remove('back');
      
      }
      if (my.dinoAcc.type == 2) {
        Id("style").classList.add('back');
        Id("style").classList.remove('hat');
        Id("style").classList.remove('ticket');
      }
    },
  //我的恐龍
  getSmallList() {
    return this.myDino.filter((obj, index) => {
      return (
        index < this.currentPage * maxItemPerPage &&
        index >= (this.currentPage - 1) * maxItemPerPage
      );
    });
  },
  //別人的
  getSmallList_lub() {
    return this.dinoAcc.filter((obj, index) => {
      return (
        index < this.currentPage * maxItemPerPage_acc &&
        index >= (this.currentPage - 1) * maxItemPerPage_acc
      );
    });
  },
  isMaxPage() {
    return this.currentPage >= this.getLastPage;
  },
  isMaxPage_lub() {
    return this.currentPage >= this.getLastPage_lub;
  },
  getLastPage() {
    return Math.ceil(this.myDino.length / maxItemPerPage);
  },
  getLastPage_lub() {
    return Math.ceil(this.dinoAcc.length / maxItemPerPage_acc);
  }
},
mounted() {
  this.myAcc();
  this.member();
},
});
  


//================================
let dinoAcc_btn = Id("dinoAcc_btn");
dinoAcc_btn.addEventListener("click", function () {
  
  Id("dinoCon_my").classList.add("none");
  Id("dino_p").classList.add("none");
  Id("dinoCon_acc").classList.remove("none");
  Id("dinoAcc_p").classList.remove("none");
  
  

  Id("dinoAcc_btn").classList.add("active");
  Id("dino_btn").classList.remove("active");
})

//-----------------------------------
let dino_btn =Id("dino_btn");
dino_btn.addEventListener("click", function () {
  
  Id("dinoCon_acc").classList.add("none");
  Id("dinoAcc_p").classList.add("none");
  Id("dinoCon_my").classList.remove("none");
  Id("dino_p").classList.remove("none");
  
  
  Id("dino_btn").classList.add("active");
  Id("dinoAcc_btn").classList.remove("active");
})

//-----------------------------------
// 已儲存造型

// let span = document.getElementsByClassName("saveClose")[0];

// Id('save').onclick = function() {
// Id('saveBox').style.display = "block";
// }

// span.onclick = function() {
// Id('saveBox').style.display = "none";
// }
// window.onclick = function(event) {
//   if (event.target == Id('saveBox')) {
//     Id('saveBox').style.display = "none";
//   }
// }

//-----------------------------------
// 替代圖片

// 帽子拖曳
function hat(e) {

  Id("myHat").src = e.src;
  Id("myHat").innerHTML = e.alt;
  Id("hat_frame").style.display = "block";
  
  $("#hat_frame").click(function () {
    $("#hat_frame").toggle(1000);
  });
}
$(function () {
  $("#hat_frame").draggable({ containment: ".perFrame", scroll: false });
});

// 紋身拖曳
function ticket(e) {
  Id("myTicket").src = e.src;
  Id("myTicket").innerHTML = e.alt;

  Id("ticket_frame").style.display = "block";
  
  $("#ticket_frame").click(function () {
    $("#ticket_frame").toggle(1000);
  });

}
$(function () {
  $("#ticket_frame").draggable({ containment: ".perFrame", scroll: false });
});

// 背景拖曳
function back(e) {
  Id("myBack").src = e.src;
  Id("myBack").innerHTML = e.alt;

  Id("back_frame").style.display = "block";
 
  $("#back_frame").click(function () {
    $("#back_frame").toggle(1000);
  });

}
$(function () {
  $("#back_frame").draggable({ containment: ".perFrame", scroll: false });
});
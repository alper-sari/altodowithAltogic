

function setToDone(id) {
const data={
  isDone:true
}

var config = {
  method: 'put',
  url: 'https://altodo.c1-na.altogic.com/altodo_tasksv2/'+id,
  headers: { 

  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

}

function deleteTodo(id) {
 
var config = {
  method: 'delete',
  url: 'https://altodo.c1-na.altogic.com/altodo_tasksv2/'+id,
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

  console.log(id)

}


async function addItem(text, status, id, noUpdate) {
  const data={
    todo_title:text,
    isDone:false,
    //BoxId:id
  }
  
  var config = {
    method: 'post',
    url: 'https://altodo.c1-na.altogic.com/altodo_tasksv2',
    headers: { 

    },
    data : data
  };
  
 let values = await axios(config)

  var id = values.data._id
  console.log(id)

  var c = status === "done" ? "danger" : "";
  var item =
    '<li data-id="' +
    id +
    '" class="animated flipInX ' +
    c +
    '"><div class="checkbox"><span class="close"><i class="fa fa-times"></i></span><label><span class="checkbox-mask"></span><input type="checkbox" />' +
    text +
    "</label></div></li>";

  var isError = $(".form-control").hasClass("hidden");

  if (text === "") {
    $(".err")
      .removeClass("hidden")
      .addClass("animated bounceIn");
  } else {
    $(".err").addClass("hidden");
    $(".todo-list").append(item);
  }

  $(".refresh").removeClass("hidden");

  $(".no-items").addClass("hidden");

  $(".form-control")
    .val("")
    .attr("placeholder", "✍️ Add item...");
  setTimeout(function() {
    $(".todo-list li").removeClass("animated flipInX");
  }, 500);



  
}

function refresh() {
  $(".todo-list li").each(function(i) {
    $(this)
      .delay(70 * i)
      .queue(function() {
        $(this).addClass("animated bounceOutLeft");
        $(this).dequeue();
      });
  });

  setTimeout(function() {
    $(".todo-list li").remove();
    $(".no-items").removeClass("hidden");
    $(".err").addClass("hidden");
  }, 800);
}

$(function() {
  
  var config = {
    method: 'get',
    url: 'https://altodo.c1-na.altogic.com/altodo_tasksv2',
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));

for(var i=0; i<response.data.countInfo.count;i++){
    var c = response.data.result[i].isDone === true ? "danger" : "";
    var item =
'<li data-id="' +
response.data.result[i]._id +
'" class="animated flipInX ' +
c +
'"><div class="checkbox"><span class="close"><i class="fa fa-times"></i></span><label><span class="checkbox-mask"></span><input type="checkbox" />' +
response.data.result[i].todo_title +
"</label></div></li>";

var isError = $(".form-control").hasClass("hidden");

if (response.data.result[0].todo_title === "") {
$(".err")
  .removeClass("hidden")
  .addClass("animated bounceIn");
} else {
$(".err").addClass("hidden");
$(".todo-list").append(item);
}

$(".refresh").removeClass("hidden");

$(".no-items").addClass("hidden");

$(".form-control")
.val("")
.attr("placeholder", "✍️ Add item...");
setTimeout(function() {
$(".todo-list li").removeClass("animated flipInX");

}, 500);
    

  }
})
.catch(function (error) {
  console.log(error);
});


  


  var err = $(".err"),
    formControl = $(".form-control"),
    isError = formControl.hasClass("hidden");

  if (!isError) {
    formControl.blur(function() {
      err.addClass("hidden");
    });
  }

  $(".add-btn").on("click", function() {
    var itemVal = $(".form-control").val();
    addItem(itemVal);
    formControl.focus();
  });

  $(".refresh").on("click", refresh);

  $(".todo-list").on("click", 'input[type="checkbox"]', function() {
    var li = $(this)
      .parent()
      .parent()
      .parent();
    li.toggleClass("danger");
    li.toggleClass("animated flipInX");

    setToDone(li.data().id);

    setTimeout(function() {
      li.removeClass("animated flipInX");
    }, 500);
  });

  $(".todo-list").on("click", ".close", function() {
    var box = $(this)
      .parent()
      .parent();

    if ($(".todo-list li").length == 1) {
      box.removeClass("animated flipInX").addClass("animated                bounceOutLeft");
      setTimeout(function() {
        box.remove();
        $(".no-items").removeClass("hidden");
        $(".refresh").addClass("hidden");
      }, 500);
    } else {
      box.removeClass("animated flipInX").addClass("animated bounceOutLeft");
      setTimeout(function() {
        box.remove();
      }, 500);
    }

    deleteTodo(box.data().id)
  });

  $(".form-control").keypress(function(e) {
    if (e.which == 13) {
      var itemVal = $(".form-control").val();
      addItem(itemVal);
    }
  });
  $(".todo-list").sortable();
  $(".todo-list").disableSelection();
});

var todayContainer = document.querySelector(".today");


var d = new Date();


var weekday = new Array(7);
weekday[0] = "Sunday 🖖";
weekday[1] = "Monday 💪😀";
weekday[2] = "Tuesday 😜";
weekday[3] = "Wednesday 😌☕️";
weekday[4] = "Thursday 🤗";
weekday[5] = "Friday 🍻";
weekday[6] = "Saturday 😴";


var n = weekday[d.getDay()];


var randomWordArray = Array(
  "Oh my, it's ",
  "Whoop, it's ",
  "Happy ",
  "Seems it's ",
  "Awesome, it's ",
  "Have a nice ",
  "Happy fabulous ",
  "Enjoy your "
);

var randomWord =
  randomWordArray[Math.floor(Math.random() * randomWordArray.length)];


todayContainer.innerHTML = randomWord + n;

$(document).ready(function() {




  var mins, secs, update;

  init();
  function init() {
    (mins = 25), (secs = 59);
  }


  set();
  function set() {
    $(".mins").text(mins);
  }


  $("#start").on("click", start_timer);
  $("#reset").on("click", reset);
  $("#inc").on("click", inc);
  $("#dec").on("click", dec);

  function start_timer() {

    set();

    $(".dis").attr("disabled", true);

    $(".mins").text(--mins);
    $(".separator").text(":");
    update_timer();

    update = setInterval(update_timer, 1000);
  }

  function update_timer() {
    $(".secs").text(secs);
    --secs;
    if (mins == 0 && secs < 0) {
      reset();
    } else if (secs < 0 && mins > 0) {
      secs = 59;
      --mins;
      $(".mins").text(mins);
    }
  }


  function reset() {
    clearInterval(update);
    $(".secs").text("");
    $(".separator").text("");
    init();
    $(".mins").text(mins);
    $(".dis").attr("disabled", false);
  }


  function inc() {
    mins++;
    $(".mins").text(mins);
  }


  function dec() {
    if (mins > 1) {
      mins--;
      $(".mins").text(mins);
    } else {
      alert("This is the minimum limit.");
    }
  }
}); 



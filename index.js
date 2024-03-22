const arr = ["blue","red","yellow","green"];
var gamePattern = [];
const userChosenColor = [];
var started = false;
var lvl = 0;

function nextSequence(){
    return Math.floor(Math.random()*4);
}




function makegamepattern(ran){
    gamePattern = [];
    for(i=ran;i<arr.length;i++){
        gamePattern.push(arr[i]);
    }
}



function key () {$(document).keypress(function(){
    if(started != true){
        started = true;
        lvl += 1;
        randomNumber = nextSequence();
        makegamepattern(randomNumber);
        $("h1").text("Level "+lvl);
        $(`#${arr[randomNumber]}`).addClass("pressed");
        setTimeout(function (){
        $(`#${arr[randomNumber]}`).removeClass("pressed");
        },100)
    }
})
}

key();

$(".btn").click(function(){
    if(!started){
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")},100)
        var audio = new Audio("wrong.mp3");
        audio.play();
        return
    }
    
    const temporary = $(this).attr("id");
    userChosenColor.push(temporary);
    okay = match(temporary);
    if(okay === false){
        $("h1").text("Game Over! Press any key to restart");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")},100)
        var audio = new Audio("wrong.mp3");
        audio.play();
        started = false;
        lvl = 0
        key();
        return
    }
    else{
        ran = nextSequence();
        lvl += 1;
        $("h1").text("Level "+lvl);
        $(`#${temporary}`).addClass("pressed");
        setTimeout(function (){
            $(`#${temporary}`).removeClass("pressed");
        },100)


        setTimeout(function(){$(`#${gamePattern[0]}`).addClass("pressed");
        setTimeout(function (){
        $(`#${gamePattern[0]}`).removeClass("pressed");
        },100)
        var audio = new Audio(`${gamePattern[0]}.mp3`);
        audio.play();},1000)

        var audio = new Audio(`${temporary}.mp3`);
        audio.play();
    }
    
})



function match(color){
    if(color != gamePattern[0]){
        return false;
    }
    else{
        let x = gamePattern.shift();
        if(gamePattern.length==0){
            randomNumber = nextSequence();
            makegamepattern(randomNumber);
        }
        return true
    }

}


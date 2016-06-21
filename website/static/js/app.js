var _data = {

};

var choices = [];
$.get('/static/text/result7.txt', function(data){
    choices = data.split("\n");
    var list = [];
    for (i=0; i<choices.length;i++){
        tmp = choices[i].split("\t");
        _data[tmp[0].trim()] = tmp[1];
        choices[i] = tmp[0];
    }
});

var auto = new autoComplete({
    selector: 'input.search',
    minChars: 1,
    source: function(term, suggest){
        var matches = [];
        for (i=0; i<choices.length; i++){
            if (~choices[i].replace("(some place)", "").toLowerCase().indexOf(term)){
                console.log(choices[i]);
                matches.push(choices[i]);
            }
        }
        suggest(matches);

    }
});
var num = 0;
$(document).ready(function(){
    $("#search").on('click', function(){
        num = 0;
        $(".answer").html("");
        var data = $("#search-data").val();
        if(_data[data]){
            $(".answer").append("<div class='pure-g  show-box' data-num='" + num +"'><div class='pure-u-1-3 phrase' data-num='" + num +"'></div><div class='pure-u-2-3 example' data-num='" + num +"'></div></div>");
            $("div.phrase[data-num='" + num +"']").html(data);
            tmp = _data[data].split(" ");
            for(i=0;i<Math.min(tmp.length, 6);i++){
                $("div.example[data-num='" + num +"']").append(data.replace("(some place)", tmp[i]) + "</br>");
               
            }
            num++;
        }
        else{
            for (i=0; i<choices.length; i++){
                if (~choices[i].replace("(some place)", "").toLowerCase().indexOf(data)){
                    $(".answer").append("<div class='pure-g show-box' data-num='" + num +"'><div class='pure-u-1-3 phrase' data-num='" + num +"'></div><div class='pure-u-2-3 example' data-num='" + num +"'></div></div>");
                    $("div.phrase[data-num='" + num +"']").html(choices[i]);
                    tmp = _data[choices[i].trim()].split(" ");
                    $("div.example[data-num='" + num +"']").append(choices[i].replace("(some place)", tmp[0]));
                    num++;
                }
            }
        

        }
    });


    $(document).on('click', "div.phrase", function(e){
        console.log($(e.target).attr("data-num"));
        var data = $(e.target).text();
        num = 0;
        $(".answer").html("");
        $(".answer").append("<div class='pure-g  show-box' data-num='" + num +"'><div class='pure-u-1-3 phrase' data-num='" + num +"'></div><div class='pure-u-2-3 example' data-num='" + num +"'></div></div>");
        $("div.phrase[data-num='" + num +"']").html(data);
        tmp = _data[data].split(" ");
        for(i=0;i<Math.min(tmp.length, 6);i++){
            $("div.example[data-num='" + num +"']").append(data.replace("(some place)", tmp[i]) + "</br>");

        }
    });

});
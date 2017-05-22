/*jslint browser:true, devel:true, white:true, vars:true, eqeq:true */
/*global $:false, intel:false, orientation:false*/

$(document).ready(function(){
    $.getJSON('http://zambezitube.tv/get_json.php?callback=?','featured=yes',function(res){
        var items=JSON.stringify(res);
        var obj = $.parseJSON(items);
        console.log(obj);
        $(".featured_video").attr("data-poster", obj.items[0].img);
        $(".featured_video").attr("data-src", obj.items[0].video);
        $(".featured_video").attr("data-title", obj.items[0].title);
        $(".featured_video img").attr("src", "http://zambezitube.tv/get_json.php?img=" + obj.items[0].img);
        $('.video').click(function(event, ui) {
            video=$(this).attr('data-src');
            title=$(this).attr('data-title');
            poster=$(this).attr('data-poster');
            console.log(poster);
            //reloadPage(type, id);
            $(".video_title").html(title);
            $("#video_src").attr("src", "http://www.zambezitube.tv/videos/" + video);
            $("#main_video").attr("poster", "http://zambezitube.tv/get_json.php?img=" + poster)
            $("#main_video").load();
        });
    });
    
    // function to resize the content area
    function resizeContent(){
        var pagepaddingarr = $(".ui-page-active").css('padding-top');
        var pagepadding = pagepaddingarr.split("px");
        var headerheight = $(".ui-page-active > .ui-header").height();
        var footerheight = $(".ui-page-active > .ui-footer").height();
        if(footerheight=="NaN"){footerheight=0;}
        var windowheight = window.innerHeight;
        var windowwidth = window.innerWidth;
        var content_height = windowheight - (headerheight+footerheight) - 30; 
        var newpaddingtop = headerheight-pagepadding[0];
        $('.ui-page-active > .ui-content').css('padding-top', newpaddingtop + 'px');
        $('.ui-page-active > .ui-content').css('margin-bottom', "-" + headerheight + 'px');
        $('.ui-page-active > .ui-content').css('height', content_height + "px");
		//$('#details_div').scrollTop(0);
    }
    
    function reloadPage(typestr, id){
        $('.ui-loader').css('display', 'block');
        var tmp=typestr.split(',');
        $.getJSON('http://zambezitube.tv/get_json.php?callback=?','type=' + typestr + '&parent=' + id,function(res){
            //setlocal(type, JSON.stringify(res));
            $('.ui-loader').css('display', 'none');
            //var items=getlocal(type);
            var items=JSON.stringify(res);
            showPage(items, tmp[0], tmp[1]);
        });
    }
    
    
    function showPage(items, type, limit){
        $('.ui-loader').css('display', 'block');
        //var type=$(".content_div").attr("data-role");
        var html="";
        if(!limit){ limit=0; }
        var obj = $.parseJSON(items);
        //html += "<ul class='latestnews' data-role='listview' data-inset='true'>";
        for(item in obj.items){
            html += "<h3>" + obj.items[item].title + "</h3><a href='#video' class='video' data-poster='" + obj.items[item].img + "' data-src='" + obj.items[item].video + "' data-title='" + obj.items[item].title + "'><img src='http://www.zambezitube.tv/get_json.php?img=" + obj.items[item].img + "' width='100%' style='max-height:380px; margin: auto;'></a>";
            
        }
        $("#video_src").attr("src", "");
        
        //html += "</ul>";
        $('.' + type + '_div').html(html);
        $('.ui-loader').css('display', 'none');
        window.scrollTo(1,0);
        resizeContent();
        $('.video').click(function(event, ui) {
            video=$(this).attr('data-src');
            title=$(this).attr('data-title');
            poster=$(this).attr('data-poster');
            console.log(poster);
            //reloadPage(type, id);
            $(".video_title").html(title);
            $("#video_src").attr("src", "http://www.zambezitube.tv/videos/" + video);
            $("#main_video").attr("poster", "http://zambezitube.tv/get_json.php?img=" + poster)
            $("#main_video").load();
        });
        
        
    }
    
    
    
    
    $('.menu').click(function(event, ui) {
        type=$(this).attr('data-type');
        id=$(this).attr('data-id');
        $("#video_src").attr("src", "");
        reloadPage(type, id);
    
    });
    
    $('.back_button').click(function(event, ui) {
        $("#video_src").attr("src", "");
        //console.log("here");
    
    });
    
    
    
    // bind event handler to resize the content area on orientation change
    $(window).bind('resize orientationchange pageshow', function(event){
        window.scrollTo(1,0);
        resizeContent();
    });
    
    
});



var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
    }
};

app.initialize();

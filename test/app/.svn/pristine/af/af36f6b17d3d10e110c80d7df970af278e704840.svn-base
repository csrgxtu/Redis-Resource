var list = [];
var eblivevideos = [];
var videoMain, video2, video3, video4;
var videowidth ;
var videoheight ;
var videomode = 1;// 1表示单路 2表示多路

var ebbfq2 = [
    { id: "p21", state: "0", encodedFileName: '' },
    { id: "p22", state: "0", encodedFileName: '' }
];

var ebbfq = [
    { id: "p41", state: "0", encodedFileName: '' },
    { id: "p42", state: "0", encodedFileName: '' },
    { id: "p43", state: "0", encodedFileName: '' },
    { id: "p44", state: "0", encodedFileName: '' }
];
var ebbfqvcontainer = [
    { id: "dvContainerVideo", state: "0", encodedFileName: '' }
];
var ebbfq9 = [
    { id: "p91", state: "0", encodedFileName: '' },
    { id: "p92", state: "0", encodedFileName: '' },
    { id: "p93", state: "0", encodedFileName: '' },
    { id: "p94", state: "0", encodedFileName: '' },
    { id: "p95", state: "0", encodedFileName: '' },
    { id: "p96", state: "0", encodedFileName: '' },
    { id: "p97", state: "0", encodedFileName: '' },
    { id: "p98", state: "0", encodedFileName: '' },
    { id: "p99", state: "0", encodedFileName: '' }
];
$(document).ready(function () {

  // alert( $('#dvContent').height());
   //alert($('#dvContent').width());
    var socket = io.connect(socketVideo);
    videowidth = ($("#dvContext").width() - 80);
    videoheight = ($("#dvContext").height() - 80);
    $('#dvContainer').css("height", videoheight);
    $('#dvContainer').css("width", videowidth);
    socket.on('connect', function () {
        // alert('我时视频');
        socket.emit('action', { roomName: 'videoMsg' });
    });

    socket.on('dialog_list', function (livevideos) {
        eblivevideos = [];
        console.log(livevideos);

        for (var i = 0; i < livevideos.length; i++) {
            eblivevideos.push(new setEBlivevideos(livevideos[i]));
        }

        $('#liveUl li').remove();
        $('#dvLiveVideo div').remove();

      

        if (eblivevideos.length > 0) {
            $("#liveCount").text(eblivevideos.length);
            for (var x = 0 ; x < eblivevideos.length; x++) {
                var createdTime = eblivevideos[x].createdTime;
                createdTime = new Date(createdTime).Format('MM-dd HH:mm');
                if (!compareIsExist(eblivevideos[x].encodedFileName, ebbfq))
                    $('#dvLiveVideo').append(
                    "<div class='item' id='" + eblivevideos[x].encodedFileName + "' onclick='javascript:setVideoFile(\"" + eblivevideos[x].encodedFileName + "\",this)'>" +
                    " <a href='#'  title='任务:"+ eblivevideos[x].taskName +"' >" +
                    "    <img alt='' src='/images/video.jpg'>" +
                    "</a>" +
                    " <h5><a  href='#'  title='发布者'>" + eblivevideos[x].orgName + "-" + eblivevideos[x].displayName + "</a></h5>" +
                    " <h6><p  href='#'  title='直播时间'>" + createdTime + "</p></h6>" +
                    "</div>"
                    );
                else
                    $('#dvLiveVideo').append(
                        "<div class='item' id='" + eblivevideos[x].encodedFileName + "' onclick='javascript:setVideoFile(\"" + eblivevideos[x].encodedFileName + "\",this)'>" +
                      " <a href='#'  title='任务:" + eblivevideos[x].taskName + "' >" +
                        "    <img alt='' src='/images/video.jpg'>" +
                        "</a>" +
                        " <h5><a  href='#'  title='发布者'>" + eblivevideos[x].orgName + "-" + eblivevideos[x].displayName + "</a></h5>" +
                        " <h6><p  href='#'  title='直播时间'>" + createdTime + "</p></h6>" +
                        "</div>"
                    );
            }
        }
        else {
            $("#liveCount").text('0');
            $('#liveUl li').remove();
            $('#dvLiveVideo div').remove();

        }
        reloadList(eblivevideos);
        resizePanel();
    });

    socket.on('dialog_pop', function (name) {

            var createdTime1 = name.createdTime.slice(5);
            jQuery.messager.show({
                title: '新的直播视频:',
                msg: "<a href='/xfvideoinfo/videoLive?" + name.encodedFileName + "&" + name.taskName + "&" + name.level3Name + "&" + name.displayName + "&" + createdTime1 + "' target='_blank'>任务:" + name.taskName + "<br/>创建人:" + name.level3Name + "-" + name.displayName + "<br/>时间:" + createdTime1 + "</a>",
                timeout: 10000,
                showType: 'slide'
            });
            $('#chatAudio2')[0].play();

    });
});
function moveVideo(vindex) {
    var state = ebbfq[vindex].state;
    var encodedFileName = ebbfq[vindex].encodedFileName;
    ebbfq[vindex].state = ebbfq[0].state;
    ebbfq[vindex].encodedFileName = ebbfq[0].encodedFileName;
    ebbfq[0].state = state;
    ebbfq[0].encodedFileName = encodedFileName;


    jwplayer(ebbfq[vindex].id).setup({
        file: rtmp + ebbfq[vindex].encodedFileName,
        width: '300',
        height: '150',
        flashplayer: "/jwplayer_report/jwplayer.flash.swf"
    });
    jwplayer(ebbfq[vindex].id).play();
    jwplayer(ebbfq[0].id).setup({
        file: rtmp + ebbfq[0].encodedFileName,
        width: '500',
        height: '300',
        screencolor: "red",
        primary: "html5"
    });
    jwplayer(ebbfq[0].id).play();
}

function removeVideo(index) {
    try {
        $('#' + ebbfq[index].encodedFileName).find("span").css("visibility", "hidden");
        ebbfq[index].encodedFileName = "";
        ebbfq[index].state = "0";
        jwplayer(ebbfq[index].id).remove()
    }
    catch (e) { };
    resizePanel();
}

function compareIsExist(encodedFileName, obj) {
    var isExist = false;
    for (var i = 0; i < obj.length; i++) {
        if (encodedFileName == obj[i].encodedFileName)
            isExist = true

    }
    return isExist;
}

    //更新列表
function reloadList(livevideos) {
    if (videomode == 1)
    {
        for (var i = 0; i < ebbfqvcontainer.length; i++) {
        if (ebbfqvcontainer[i].state == "1") {
   
            if (!compareIsExist(ebbfqvcontainer[i].encodedFileName, livevideos)) {
                try {
                    jwplayer(ebbfqvcontainer[i].id).remove();
                } catch (e) { }
                ebbfqvcontainer[i].encodedFileName = "";
                ebbfqvcontainer[i].state = "0";
            }
            else {
                $("#"+ebbfqvcontainer[i].encodedFileName).css("border", "1px solid #ff8800");
            }
            }
        }
        return;
    }
      if (videomode == 2) {
        for (var i = 0; i < ebbfq2.length; i++) {
            if (ebbfq2[i].state == "1") {
                if (!compareIsExist(ebbfq2[i].encodedFileName, livevideos)) {
                    try {
                        jwplayer(ebbfq2[i].id).remove();
                    } catch (e) { }
                    ebbfq2[i].encodedFileName = "";
                    ebbfq2[i].state = "0";

                }
                else {
                    $("#" + ebbfq2[i].encodedFileName).css("border", "1px solid #ff8800");
                }
            }
        }
    }
    if (videomode == 4) {
        for (var i = 0; i < ebbfq.length; i++) {
            if (ebbfq[i].state == "1") {
                if (!compareIsExist(ebbfq[i].encodedFileName, livevideos)) {
                    try {
                        jwplayer(ebbfq[i].id).remove();
                    } catch (e) { }
                    ebbfq[i].encodedFileName = "";
                    ebbfq[i].state = "0";

                    //$('#title' + ebbfq[i].id).text('');
                }
                else {
                    $("#" + ebbfq[i].encodedFileName).css("border", "1px solid #ff8800");
                }
            }
        }
    }
    if (videomode == 9) {
        for (var i = 0; i < ebbfq9.length; i++) {
            if (ebbfq9[i].state == "1") {
                if (!compareIsExist(ebbfq9[i].encodedFileName, livevideos)) {
                    try {
                        jwplayer(ebbfq9[i].id).remove();
                    } catch (e) { }
                    ebbfq9[i].encodedFileName = "";
                    ebbfq9[i].state = "0";

                    //$('#title' + ebbfq9[i].id).text('');
                }
                else {
                    $("#" + ebbfq9[i].encodedFileName).css("border", "1px solid #ff8800");
                }
            }
        }
    }

}

    //还原panel
function resizePanel() {
    $('#container').panel('resize', {
        width: 640,
        height: 480
    });
 
}

function openVideo(id, obj) {

}

function isExist(name) {

    if (videomode == 1) {
        for (var i = 0; i < ebbfqvcontainer.length; i++) {

            if (ebbfqvcontainer[i].encodedFileName == name) {
                // alert('已在播放列表');
                exist = true;
                return [true, i];
            }
        }
        return [false, 0];
    }
    if (videomode == 2) {
        for (var i = 0; i < ebbfq2.length; i++) {

            if (ebbfq2[i].encodedFileName == name) {
                // alert('已在播放列表');
                exist = true;
                return [true, i];
            }
        }
        return [false, 0];
    }
    if (videomode == 4) {
        for (var i = 0; i < ebbfq.length; i++) {

            if (ebbfq[i].encodedFileName == name) {
                // alert('已在播放列表');
                exist = true;
                return [true, i];
            }
        }
        return [false, 0];
    }
    if (videomode == 9) {
        for (var i = 0; i < ebbfq9.length; i++) {

            if (ebbfq9[i].encodedFileName == name) {
                // alert('已在播放列表');
                exist = true;
                return [true, i];
            }
        }
        return [false, 0];
    }
}

function setVideoFile(filename, obj) {
	 
    //jwplayer("container").load({ file: 'rtmp://124.232.154.82:1935/livename/' + filename });
    $(obj).css("border", "");

	if (videomode == 2) {
		 $('#textp41').css("display",'none');
		 $('#textp42').css("display",'none');
		 $('#textp43').css("display",'none');
		 $('#textp44').css("display",'none');
		 $('#textp91').css("display",'none');
		 $('#textp92').css("display",'none');
		 $('#textp93').css("display",'none');
		 $('#textp94').css("display",'none');
		 $('#textp95').css("display",'none');
		 $('#textp96').css("display",'none');
		 $('#textp97').css("display",'none');
		 $('#textp98').css("display",'none');
		 $('#textp99').css("display",'none');
        var isBF = false;
        var vExist = isExist(filename);
        if (vExist[0]) {
            jwplayer(ebbfq2[vExist[1]].id).remove();
            ebbfq2[vExist[1]].state = "0";
            ebbfq2[vExist[1]].encodedFileName = "";
            $(obj).find("span").css("visibility", "hidden");
            return;
        }
        $(obj).find("span").css("visibility", "visible");
        $(obj).css("border", "1px solid #ff8800");
        for (var i = 0; i < ebbfq2.length; i++) {
            if (ebbfq2[i].state == '0') {
                if (ebbfq2[i].id != "container") {
                    videoMain = jwplayer(ebbfq2[i].id).setup({
                        file: rtmp + filename,
                        width: videowidth,
                        height: videoheight,
                        screencolor: "red",
                        stretching: "exactfit",
                        primary: "html5"
                    });
                }
                ebbfq2[i].state = "1";
                ebbfq2[i].encodedFileName = filename;

                if (videoMain.getState() != 'PLAYING') {
                    jwplayer(ebbfq2[i].id).play(true);
                } else {
                    jwplayer(ebbfq2[i].id).play(false);
                }
                $('#text'+ebbfq2[i].id).css("display",'block');
                var strText=obj.innerText;
                $('#text'+ebbfq2[i].id).html(strText);
                isBF = true;
                return;
            }
        }
        if (!isBF) {
            alert("请先关闭一个视频");
        }
    }
	
	

    if (videomode == 1) {
        $('.item').each(function (index, domEle) {
            $(domEle).css("border", "");
        });
        videoMain = jwplayer('dvContainerVideo').setup({
            file: rtmp + filename,
            width: videowidth,
            height: videoheight,
            screencolor: "red",
            stretching: "exactfit",
            primary: "html5"
        });
        ebbfqvcontainer[0].state = "1";
        ebbfqvcontainer[0].encodedFileName = filename;
        $(obj).css("border", "1px solid #ff8800");
        if (videoMain.getState() != 'PLAYING') {
            jwplayer('dvContainerVideo').play(true);
        } else {
            jwplayer('dvContainerVideo').play(false);
        }
        return;
    }
    if (videomode == 9)
    {
    	$('#textp21').css("display",'none');
		$('#textp22').css("display",'none');
		$('#textp41').css("display",'none');
		$('#textp42').css("display",'none');
		$('#textp43').css("display",'none');
		$('#textp44').css("display",'none');
        var isBF = false;
        var vExist = isExist(filename);
        if (vExist[0]) {
            jwplayer(ebbfq9[vExist[1]].id).remove();
            ebbfq9[vExist[1]].state = "0";
            ebbfq9[vExist[1]].encodedFileName = "";
            $(obj).find("span").css("visibility", "hidden");
            return;
        }
        $(obj).find("span").css("visibility", "visible");
        $(obj).css("border", "1px solid #ff8800");
        for (var i = 0; i < ebbfq9.length; i++) {
            if (ebbfq9[i].state == '0') {
                //$('#' + ebbfq[i].id).panel('setTitle', filename);
                if (ebbfq9[i].id != "container") {
                    videoMain = jwplayer(ebbfq9[i].id).setup({
                        file: rtmp + filename,
                        width: videowidth,
                        height: videoheight,
                        screencolor: "red",
                        stretching: "exactfit",
                        primary: "html5"
                    });
                }
                ebbfq9[i].state = "1";
                ebbfq9[i].encodedFileName = filename;

                //$('#title' + ebbfq9[i].id).text(filename);
                if (videoMain.getState() != 'PLAYING') {
                    jwplayer(ebbfq9[i].id).play(true);
                } else {
                    jwplayer(ebbfq9[i].id).play(false);
                }
                isBF = true;
                $('#text'+ebbfq9[i].id).css("display",'block');
                var strText=obj.innerText;
                $('#text'+ebbfq9[i].id).html(strText);
                return;
            }
        }
        if (!isBF) {
            alert("请先关闭一个视频");
        }
        return;
    }
    if (videomode == 4) {
    	$('#textp21').css("display",'none');
		$('#textp22').css("display",'none');
		$('#textp91').css("display",'none');
		$('#textp92').css("display",'none');
		$('#textp93').css("display",'none');
		$('#textp94').css("display",'none');
		$('#textp95').css("display",'none');
		$('#textp96').css("display",'none');
		$('#textp97').css("display",'none');
		$('#textp98').css("display",'none');
		$('#textp99').css("display",'none');
        var isBF = false;
        var vExist = isExist(filename);
        if (vExist[0]) {
            jwplayer(ebbfq[vExist[1]].id).remove();
            ebbfq[vExist[1]].state = "0";
            ebbfq[vExist[1]].encodedFileName = "";
            $(obj).find("span").css("visibility", "hidden");
            return;
        }
        $(obj).find("span").css("visibility", "visible");
        $(obj).css("border", "1px solid #ff8800");
        for (var i = 0; i < ebbfq.length; i++) {
            if (ebbfq[i].state == '0') {
                //$('#' + ebbfq[i].id).panel('setTitle', filename);
                if (ebbfq[i].id != "container") {
                    videoMain = jwplayer(ebbfq[i].id).setup({
                        file: rtmp + filename,
                        width: videowidth,
                        height: videoheight,
                        screencolor: "red",
                        stretching: "exactfit",
                        primary: "html5"
                    });
                }
                ebbfq[i].state = "1";
                ebbfq[i].encodedFileName = filename;

                if (videoMain.getState() != 'PLAYING') {
                    jwplayer(ebbfq[i].id).play(true);
                } else {
                    jwplayer(ebbfq[i].id).play(false);
                }
                $('#text'+ebbfq[i].id).css("display",'block');
                var strText=obj.innerText;
                $('#text'+ebbfq[i].id).html(strText);
                isBF = true;
                return;
            }
        }
        if (!isBF) {
            alert("请先关闭一个视频");
        }
    }
}

function setMode(mode) {
    $('.item').each(function (index, domEle) {
        $(domEle).css("border", "");
    });
    if (mode == 1) {
        videomode = 1;
        videowidth = ($("#dvContext").width() - 80) ;
        videoheight = ($("#dvContext").height() - 80);
        $('#dvContainer').css("height", videoheight);
        $('#dvContainer').css("width", videowidth);
        $('#tbtooVideo').css("display", "none");
        clearVideo();
        try {
            for (var i = 0; i < ebbfq.length; i++) {
                if (ebbfq[i].state == "1") {
                    ebbfq[0].encodedFileName = ebbfq[i].encodedFileName;
                    ebbfq[0].state = ebbfq[i].state;
                }
                break;
            }
            for (var i = 0; i < ebbfq.length; i++) {
                if (ebbfq[i].encodedFileName != "") {
                    $('#' + ebbfq[i].encodedFileName).find("span").css("visibility", "hidden");
                }
                if (i != 0) {
                    ebbfq[i].encodedFileName = "";
                    ebbfq[i].state = "0";
                }
            }
            if (ebbfq[0].encodedFileName != "") {
                $('#' + ebbfq[0].encodedFileName).find("span").css("visibility", "visible");

                videoMain = jwplayer(ebbfq[0].id).setup({
                    file: rtmp + ebbfq[0].encodedFileName,
                    width: '500',
                    height: '300',
                    screencolor: "red",
                    primary: "html5"
                });
                if (videoMain.getState() != 'PLAYING') {
                    jwplayer(ebbfq[0].id).play(true);
                } else {
                    jwplayer(ebbfq[0].id).play(false);

                }
            }
        }
        catch (e) { }
        $("#dvContentRight").fadeOut(1000);
        $("#dvContainer").show();
        $("#tbFourVideo").css("display", "none");
        $("#tbNineVideo").css("display", "none");
        // $("#dvContentRight").css("display", "none");
        //$("#dvContentLeft").css("float", "none");
    }
   else if (mode == 2)   {
       videomode = 2;
       videowidth = ($("#dvContext").width()-10)/2;
       videoheight = ($("#dvContext").height()-10) / 2;
       clearVideo();
       $("#dvContainer").css("display", "none");
       $("#tbFourVideo").css("display", "none");
       $("#tbNineVideo").css("display", "none");
       $('#tbtooVideo').show();
   }
   else if (mode == 4) {
       videomode = 4;
       videowidth = ($("#dvContext").width() - 80) / 2;
       videoheight = ($("#dvContext").height() - 80) / 2;
       clearVideo();
       $("#dvContainer").css("display", "none");
       $("#tbFourVideo").show();
       $("#tbNineVideo").css("display", "none");
       $('#tbtooVideo').css("display", "none");
       $("td").each(function (index, domEle) {
           $(domEle).css("height", videoheight);
           $(domEle).css("width", videowidth);
       });
   }
   else if (mode == 9) {
       videomode = 9;
       videowidth = ($("#dvContext").width() - 80) / 3;
       videoheight = ($("#dvContext").height() - 80) / 3;
       clearVideo();
       $("#dvContainer").css("display", "none");
       $("#tbFourVideo").css("display", "none");
       $('#tbtooVideo').css("display", "none");
       $("#tbNineVideo").show();
       $("td").each(function (index, domEle) { 
           $(domEle).css("height", videoheight);
           $(domEle).css("width", videowidth);
       });
   }
}

function hideList(){
	$('#showPage').layout('collapse','west'); 
}

function clearVideo()
{
    $('.item').each(function (index, domEle) {
        $(domEle).css("border", "");
    });
    for (var i = 0; i < ebbfqvcontainer.length; i++) {
        try {
            if (ebbfqvcontainer[i].state == '1') {
                jwplayer(ebbfqvcontainer[i].id).remove();
        }
        } catch (e)
        { }
    }
    for (var i = 0; i < ebbfq.length; i++) {
        try {if (ebbfq[i].state == '1') {
            jwplayer(ebbfq[i].id).remove();
        }
        } catch (e)
        { }
    }
    for (var i = 0; i < ebbfq2.length; i++) {
        try {
            if (ebbfq2[i].state == '1') {
                jwplayer(ebbfq2[i].id).remove();
            }
        } catch (e)
        { }
    }
    for (var i = 0; i < ebbfq9.length; i++) {
       // $('#title' + ebbfq9[i].id).text('');
        try {
            if (ebbfq9[i].state == '1') {
                jwplayer(ebbfq9[i].id).remove();
            }
        } catch (e)
        { }
    }
    ebbfqvcontainer = [
     { id: "dvContainerVideo", state: "0", encodedFileName: '' }
    ];
    ebbfq = [
        { id: "p41", state: "0", encodedFileName: '' },
        { id: "p42", state: "0", encodedFileName: '' },
        { id: "p43", state: "0", encodedFileName: '' },
        { id: "p44", state: "0", encodedFileName: '' }

    ];
    ebbfq2 = [
        { id: "p21", state: "0", encodedFileName: '' },
        { id: "p22", state: "0", encodedFileName: '' }

    ];
    ebbfq9 = [
        { id: "p91", state: "0", encodedFileName: '' },
        { id: "p92", state: "0", encodedFileName: '' },
        { id: "p93", state: "0", encodedFileName: '' },
        { id: "p94", state: "0", encodedFileName: '' },
        { id: "p95", state: "0", encodedFileName: '' },
        { id: "p96", state: "0", encodedFileName: '' },
        { id: "p97", state: "0", encodedFileName: '' },
        { id: "p98", state: "0", encodedFileName: '' },
        { id: "p99", state: "0", encodedFileName: '' }
    ];
}

function setEBlivevideos(livevideo) {
    this.encodedFileName = livevideo.encodedFileName;
    this.createdTime = livevideo.createdTime;
    this.displayName = livevideo.displayName;
    this.orgName = livevideo.level3Name;
    this.taskName= livevideo.taskName;
}
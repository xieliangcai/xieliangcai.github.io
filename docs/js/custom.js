/* 返回随机颜色 */
function randomColor() {
    return "rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")";
}

/* 鼠标点击文字特效 */
var a_idx = 0;
var a_click = 1;
var a = new Array("道可道", "非常道", "名可名", "非常名", "虚其心", "实其腹", "和其光" ,"同其尘", "居善地", "心善渊", "少则得", "敝则新",
    "上善若水", "知人者智", "自知者明", "道生一", "一生二", "二生三", "三生万物",
    "人法地", "地法天", "天法道", "道法自然", "大直若曲", "大巧若拙", "大辩若讷", "合抱之木",
    "生于毫末", "九层之台", "起于累土", "千里之行", "始于足下", "无为",
    "无我", "无欲", "居下", "清虚", "自然", "万物之始", "大道至简", "衍化至繁",
    "澹兮其若海", "旷兮其若谷", "致虚极", "守静笃", "善行无辙迹",
    "知其白", "守其黑", "知其荣", "守其辱", "道常无为而无不为",
    "上德无为而无以为", "万物得一以生", "清静为天下正", "圣人不病", "以其病病", "夫惟病病", "是以不病",
    "一曰慈", "二曰俭", "三曰不敢为天下先", "勇于敢则杀");
jQuery(document).ready(function($) {
    $("body").click(function(e) {
        /* 点击频率，点击几次就换文字 */
        var frequency = 2;
        if (a_click % frequency === 0) {

            var $i = $("<span/>").text(a[a_idx]);
            a_idx = (a_idx + 1) % a.length;
            var x = e.pageX,
                y = e.pageY;
            $i.css({
                "z-index": 9999,
                "top": y - 20,
                "left": x,
                "position": "absolute",
                "font-weight": "bold",
                "color": randomColor(),
                "-webkit-user-select": "none",
                "-moz-user-select": "none",
                "-ms-user-select": "none",
                "user-select": "none"
            });
            $("body").append($i);
            $i.animate({
                    "top": y - 180,
                    "opacity": 0
                },
                1500,
                function() {
                    $i.remove();
                });

        }
        a_click ++;

    });
});

/* 评论框加载背景图片 */
$(".v[data-class=v] .veditor").attr('style', "background-image: url(" + $cdnPrefix + "/images/common/valinebg.webp) !important;");


function getCurrentDateString() {
    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    return "" + now.getFullYear() + (month < 10 ? "0" + month : month) + (day < 10 ? "0" + day : day) + (hour < 10 ? "0" + hour : hour);
}

/* 站点运行时间 */
function runtime() {
    window.setTimeout("runtime()", 1000);
    /* 请修改这里的起始时间 */
    let startTime = new Date('12/10/2021 21:00:00');
    let endTime = new Date();
    let usedTime = endTime - startTime;
    let days = Math.floor(usedTime / (24 * 3600 * 1000));
    let leavel = usedTime % (24 * 3600 * 1000);
    let hours = Math.floor(leavel / (3600 * 1000));
    let leavel2 = leavel % (3600 * 1000);
    let minutes = Math.floor(leavel2 / (60 * 1000));
    let leavel3 = leavel2 % (60 * 1000);
    let seconds = Math.floor(leavel3 / (1000));
    let runbox = document.getElementById('run-time');
    runbox.innerHTML = '本站已运行<i class="far fa-clock fa-fw"></i> '
        + ((days < 10) ? '0' : '') + days + ' 天 '
        + ((hours < 10) ? '0' : '') + hours + ' 时 '
        + ((minutes < 10) ? '0' : '') + minutes + ' 分 '
        + ((seconds < 10) ? '0' : '') + seconds + ' 秒 ';
}
runtime();

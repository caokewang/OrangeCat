$(function () {
  loadMore($pageNo);
  var $pageNo = 1;
  $("#content .zixun_content .maigou_maigou_page .next").click(function () {
    $pageNo++;
    // console.log($pageNo);
    loadMore($pageNo);
  })
  $("#content .zixun_content .maigou_maigou_page .prev").click(function () {
    if ($pageNo > 1) {
      $pageNo--;
      loadMore($pageNo);
    } else {
      loadMore($pageNo);
      alert("已经是第一页啦！");
    }
  })
  function loadMore($pageNo = 1) {
    $.ajax({
      url: "/CatNews",
      type: "get",
      data: { pageNo: $pageNo },
      dataType: "json",
      success: function (result) {
        var html = ``;
        for (var item of result) {
          // 6.创建日期格式过滤器
          function dataTime(value) {
            // 6.1:依据原始日期格式创建日期对象
            var now = new Date(value);
            // 6.2:获取日期对象 年 月 日
            var y = now.getFullYear();
            var m = now.getMonth() + 1;
            var d = now.getDate();
            // 6.3:获取日期对象 时 分 秒
            var h = now.getHours();
            var mi = now.getMinutes();
            var s = now.getSeconds();
            // 6.4:月份与日期 如果当前月份小于10前拼接0
            m < 10 && (m = "0" + m);
            d < 10 && (d = "0" + d);
            // 6.5:拼接字符串返回
            return `${y}-${m}-${d} ${h}:${mi}:${s}`;
          };


          html += `
          <a class="zixun_item" target="_blank" href="javascript:;">
          <div class="zixun_img">
            <!-- 匹配内容中的图片 -->
            <img src="${item.img_url}"> </div>
          <div class="zixun_content">
            <div class="zixun_title">
              ${item.title} 
            </div>
            <div class="zixun_time">
              ${dataTime(item.ctime)} <span>浏览量:${item.view}</span>
            </div>
            <div class="zixun_text">
              ${item.content}
            </div>
            <div class="red_line"></div>
          </div>
        </a>
          `;
        }
        $("#content .zixun_content .zixun_left").html(html);
        if (result.length == "") {
          $pageNo--;
          loadMore($pageNo);
          alert("已经是最后一页啦！");
        }
      }
    })
  }
})
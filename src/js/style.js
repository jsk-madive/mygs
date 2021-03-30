'use strict';

/* 
  Tab Event 
*/

// tabBar
function tabBar(nowTab, MenuPosX, transition) {
  $(nowTab).find('.tab-bar').css({
    left: MenuPosX + 'px',
    transition: 'left ' + transition + 's'
  });

}

// tabAnimate
function tabAnimate() {
  var tabs = $('.tabs');
  $('.tab-list > li.on').append('<i class="tab-bar"></i>');

  $(document).on('click focus', '.tab-list > li', function () {
    $(this).addClass('on').siblings('li').removeClass('on');

    var tabIdx = $(this).index();
    $(tabs).siblings('.tab-contbox').children('.tab-cont').eq(tabIdx).show().siblings('.tab-cont').hide();
    
    var MenuPosX = $(this).position().left,
          nowTab = $(this).parent('.tab-list');
    
    tabBar(nowTab, MenuPosX, 0.3);
  });
}

$(window).on('resize', function () {
  var tabsCnt = $('.tab-list').length;
  if (tabsCnt > 0) {
    $('.tab-list > li.on').each(function(){
      var nowTab = $(this).parent('.tab-list'),
            MenuPosX = $(this).position().left;
      tabBar(nowTab, MenuPosX, 0); 
    });
  } else {
    return 0
  }
});


// listTabScroll
function listTabScroll() {
  $('.subtab').each(function () {
    $(this).children('li').on({
      'click': function () {
        var leftP = $(this).offset().left;
        $(this).parent().animate({
          scrollLeft: leftP
        }, 100);
        $('.subtab > li').removeClass('active');
        $(this).addClass('active');
      }
    });
  });
}

// joinChk
function joinTermsChk(){
  var $joinChk = $('input[name=joinchk]'),
        joinChkCnt = $('input[name=joinchk]').length;
  
  // 전체 선택
  $(document).on('click', '#joinchk-all', function (){
    if ($(this).is(':checked')) {
      $joinChk.prop('checked', true);
    } else {
      $joinChk.prop('checked', false);
    }
  });


  $joinChk.click(function () {
    var chkedCnt = $('input:checkbox[name=joinchk]:checked').length;
    if (joinChkCnt == chkedCnt) {
      $joinChk.prop('checked', true);
      $('#joinchk-all').prop('checked', true);
    } else if (joinChkCnt > chkedCnt) {
      $('#joinchk-all').prop('checked', false);
    }
  });
}


$(function () {
  // 탭 화면 초기화
  var nowTab = $('.tabs').children('ul').children('li.on').index();
  $('.tabs').siblings('.tab-contbox').children('.tab-cont').eq(nowTab).show();

  tabAnimate();
  listTabScroll();
  joinTermsChk();
});
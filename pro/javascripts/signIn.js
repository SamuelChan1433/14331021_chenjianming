var valid = 0;

$(function() {
	$("input").eq(0).blur(function() {
	  if (/^[a-zA-Z][a-zA-Z0-9]{5,17}$/.test($(this).val())) {
	    $("em").get(0).className = "hide";
	  }
	  else {
	    $("em").get(0).className = "infotext";
	  }
	})
	$("input").eq(1).blur(function() {
	  if (/^[1-9][0-9]{1,9}$/.test($(this).val()))
	    $("em").get(1).className = "hide";
	  else {
	    $("em").get(1).className = "infotext";
	  }
	})
	$("input").eq(2).blur(function() {
	  if (/^[0-9]{1,10}$/.test($(this).val()))
	    $("em").get(2).className = "hide";
	  else {
	    $("em").get(2).className = "infotext";
	  }
	})
	$("input").eq(3).blur(function() { // 邮箱匹配
	  if (/^[a-zA-Z0-9_\-]+@(([a-zA-Z_0-9\-])+\.)+[a-zA-Z]{2,4}$/.test($(this).val()))
	    $("em").get(3).className = "hide";
	  else {
	    $("em").get(3).className = "infotext";
	  }
	})
})

function CGooglesms(conf) {
  this.isResizable=false;
  this.init(conf);
  var _this = this;
  $("button", this.div).click(function() 
  {
    var urldata = '';
    urldata += "titre=" + $("input[name=titre]", _this.div).val() + "&";
    urldata += "where=" + $("input[name=where]", _this.div).val() + "&";
    $.ajax({
      type: "POST",
      url: "widgets/googlesms/googlesms.php",
      data: urldata,
      success: function(datas){
        //if(datas == null) return false;
        alert(datas); // pour les tests ...
        console.log("sendsms : ", datas); // pour les tests ...
      }
    });
  });
  /* TODO relire les datas de config déjà disponibles
  $.ajax({
    type: "GET",
    url: "widgets/googlesms/config.php?displayconfig=true",
    success: function(datas){
      alert(datas); // pour les tests ...
      console.log("sendsms : ", datas); // pour les tests ...
      _this.config = datas;
    }
  });
  */
   
  this.refreshHTML();
}

CGooglesms.type='googlesms';
UIController.registerWidget(CGooglesms);
CGooglesms.prototype = new CWidget();

// Refresh HTML from config
CGooglesms.prototype.refreshHTML = function() {
  
  this.ScreenColor=this.conf.getAttribute("ScreenColor");
  if (this.ScreenColor)
    $('div:first', this.div).css('background-color', this.ScreenColor);

  this.emailgoogle=this.conf.getAttribute("emailgoogle");
  this.passgoogle=this.conf.getAttribute("passgoogle");
  this.feedxml=this.conf.getAttribute("feedxml");

  if (this.feedxml) { 
/* Mise a jour du fichier de config permettant de pas l'avoir que dans knxweb et donc l'utilisation dans des rules linknx ... */
    var urldata = "";
    urldata += "emailgoogle=" + this.emailgoogle + "&";
    urldata += "passgoogle=" + this.passgoogle + "&";
    urldata += "feedxml=" + encodeURIComponent(this.feedxml) + "&";
    /*
    urldata += "emailgoogle=a.penhard@gmail.com&";
    urldata += "passgoogle=energy01&";
    urldata += "feedxml=" + encodeURIComponent("https://www.google.com/calendar/feeds/thf05ttfjkce3ppemmehll63ig%40group.calendar.google.com/private-3734d5f5bdb8b677107fc3fb8a9f7156/basic") + "&";
    */

    $.ajax({
      type: "POST",
      url: "widgets/googlesms/config.php?writeconfig",
      data: urldata,
      success: function(datas){
        if(datas == null) return false;
        //alert(datas); // pour les tests ...
        console.log("writeconfig : ", datas); // pour les tests ...
        return true;
      }
    });
  }

   
}
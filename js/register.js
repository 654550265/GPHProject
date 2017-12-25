(function(win,$){
    var dom={
        "gong":"#gong",
        "cai":"#cai"
    };
    var init=function(){
        return{
            index:function(){
                this.change();
            },
            change:function(){
                $('.put-message li:first-child input').click(function(){
                    var text=$(this).val();
                    if(text=="gong"){
                        $('.register-cont .title')[2].style.display='block';
                        $('.register-cont .put-message')[2].style.display='block';
                    }else{
                        $('.register-cont .title')[2].style.display='none';
                        $('.register-cont .put-message')[2].style.display='none';
                    }
                })
            }
        }
    };
    $(function(){
        init().index();
    })
})(this,jQuery);
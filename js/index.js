(function (win, $) {
    var dom = {
        zixun: '#zixun',
        J_showZx: '.J_showZx',
        saoma: '#saoma',
        J_smShow: '.J_smShow'
    };
    var top = (function () {
        return {
            init: function () {
                var _this = this;
                this.J_showZxOver();
                this.J_showZxOvers();
                this.J_showZxLeave();
                this.J_showZxLeaves();
            },
            J_showZxOver: function () {
                $(dom.zixun).on("mouseover", function () {
                    $(this).addClass('active');
                    $(dom.J_showZx).css('display','block');
                });
                $(dom.zixun).on("mouseleave", function () {
                    $(this).removeClass('active');
                    $(dom.J_showZx).css('display','none');
                });
                $(dom.J_showZx).on('mouseover',function(){
                    $(dom.zixun).addClass('active');
                    $(this).css('display','block');
                })
                $(dom.J_showZx).on("mouseleave", function () {
                    $(dom.zixun).removeClass('active');
                    $(this).css('display','none');
                });
            },
            J_showZxLeave:function(){
                $(dom.saoma).on("mouseover", function () {
                    $(this).addClass('active');
                    $(dom.J_smShow).css('display','block');
                });
                $(dom.saoma).on("mouseleave", function () {
                    $(this).removeClass('active');
                    $(dom.J_smShow).css('display','none');
                });
                $(dom.J_smShow).on('mouseover',function(){
                    $(dom.saoma).addClass('active');
                    $(this).css('display','block');
                })
                $(dom.J_smShow).on("mouseleave", function () {
                    $(dom.saoma).removeClass('active');
                    $(this).css('display','none');
                });
            },
            J_showZxOvers:function(){

            },
            J_showZxLeaves:function(){

            },
        }
    })();
    $(function () {
        top.init();
    })
})(this, jQuery);
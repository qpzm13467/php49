<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>
            豆瓣后台
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="">

<!-- JS引入 -->
        <script src="/Public/admin/js/jquery.min.js"></script>
        <script src="/Public/admin/js/bootstrap.js"></script>

<!-- CSS引入 -->
        <link href="/Public/admin/icomoon/style.css" rel="stylesheet">
        <link href="/Public/admin/css/main.css" rel="stylesheet"> 
        <link href="/Public/admin/css/wysiwyg/bootstrap-wysihtml5.css" rel="stylesheet">
        <link href="/Public/admin/css/wysiwyg/wysiwyg-color.css" rel="stylesheet">
    </head>
<body>

<!-- header头部分开始 -->
    <header>

<!-- logo图片 -->
        <a href="#" class="logo">
            <img src="/Public/admin/img/logo.png" alt="logo" />
        </a>

<!-- 登录状态 -->
        <div class="btn-group">
            <button class="btn btn-primary">
                <?php echo ($user["username"]); ?>
            </button>
            <button data-toggle="dropdown" class="btn btn-primary dropdown-toggle">
                <span class="caret">
                </span>
            </button>
            <ul class="dropdown-menu pull-right">
                <li>
                    <a href="/index.php/Home">前台页面</a>
                </li>
                <li>
                    <a href="/index.php/Admin/Login/logout">退出</a>
                </li>
            </ul>
        </div>
    </header>

<!-- header头结束 -->

<!-- 主导航 -->
    <div class="container-fluid">
        <div class="dashboard-container">
            <div class="top-nav">
                <ul>
                    <li>
                        <a href="/index.php/Admin" class="selected" id="index">
                            <div class="fs1" aria-hidden="true" data-icon="&#xe0a0;"></div>
                            后台管理
                        </a>
                    </li>
                    <li>
                        <a href="/index.php/Admin/users/users" id="users">
                            <div class="fs1" aria-hidden="true" data-icon="&#xe0b8;"></div>
                            用户管理
                        </a>
                    </li>
                    <li>
                        <a href="/index.php/Admin/movie/movie" id="movie">
                            <div class="fs1" aria-hidden="true" data-icon="&#xe096;"></div>
                            电影信息管理
                        </a>
                    </li>
                    <li>
                        <a href="/index.php/Admin/indents/index" id="indents">
                            <div class="fs1" aria-hidden="true" data-icon="&#xe0d2;"></div>
                            订单管理
                        </a>
                    </li>
                    <li>
                        <a href="/index.php/Admin/goods/index" id="goods">
                            <div class="fs1" aria-hidden="true" data-icon="&#xe0a9;"></div>
                            商品管理
                        </a>
                    </li>
                    <li>
                        <a href="/index.php/Admin/cinemas/index" id="cinemas">
                            <div class="fs1" aria-hidden="true" data-icon="&#xe14a;"></div>
                            商家管理
                        </a>
                    </li>
                    <li>
                        <a href="/index.php/Admin/review/review" id="review">
                            <div class="fs1" aria-hidden="true" data-icon="&#xe00d;"></div>
                            影评管理
                        </a>
                    </li>
                    <li>
                        <a href="/index.php/Admin/Flinks/index"id="flinks">
                            <div class="fs1" aria-hidden="true" data-icon="&#xe052;"></div>
                            友情链接管理
                        </a>
                    </li>
                    <li>
                        <a href="/index.php/Admin/confs/"id="confs">
                            <div class="fs1" aria-hidden="true" data-icon="&#xe100;"></div>
                            网站配置管理
                        </a>
                    </li>
                </ul>
                <div class="clearfix"></div>
            </div>

<!--副导航  -->
        <div class="sub-nav">
            
    <ul>
        <li><a href="/index.php/Admin/movie/movie" class="heading" id="movielist">电影信息列表</a></li>
        <li><a href="/index.php/Admin/movie/add">添加电影信息</a></li>
        <li><a href="/index.php/Admin/classes/classes" id="classeslist">电影分类管理</a></li>
    </ul>

            <div class="btn-group pull-right"></div>
        </div>
        <div style="min-height:420px;overflow:hidden;clear:both">
            

<!-- 内容主体 -->
    <div class="dashboard-wrapper">

<!-- 左边框 -->
        <div class="left-sidebar" >  

<!-- 左边内容 -->
            <div class="row-fluid">
                <div class="widget">
                    <div class="widget-header">
                        <div class="title">电影分类管理</div>
                    </div>
                    <div class="widget-body">
                        <div class="container-fluid form-horizontal">
                            <div class="control-group " >
                                <label class="control-label" for="classes">
                                  分类
                                </label>
                                <div class="controls">                            
                                    <select id="pclasses" class="span2">  
                                        <?php if(is_array($pclass)): foreach($pclass as $key=>$vo): ?><option id="pclass"value="<?php echo ($vo["id"]); ?>">
                                               <?php echo ($vo["cname"]); ?>
                                            </option><?php endforeach; endif; ?>
                                    </select>
                                    <select name="sclass"id="sclass" class="span2 input-left-top-margins">                                   
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <form action="/index.php/Admin/Classes/addClass"  method="post">
                                <div class="control-group ">
                                    <label class="control-label" >
                                        添加父类
                                    </label>
                                    <div class="controls">
                                        <input type="hidden"name="pid"value="0" >
                                        <input type="text" name="cname"class="span4">
                                        <input type="submit" class="btn btn-info" value="添加">
                                    </div>
                                </div>
                            </form>
                            <form action="/index.php/Admin/Classes/addSunClass" method="post">
                                <div class="control-group ">
                                    <label class="control-label" >
                                        添加子类
                                    </label>
                                    <div class="controls">
                                        <select  name ="pid" class="span2"> 
                                            <?php if(is_array($pclass)): foreach($pclass as $key=>$vo): ?><option value="<?php echo ($vo["id"]); ?>">
                                                   <?php echo ($vo["cname"]); ?>
                                                </option><?php endforeach; endif; ?>
                                        </select>
                                        <input type="text" name="cname"class="span2">
                                        <input type="submit" class="btn btn-info" value="添加"style="margin-left:7px">
                                    </div>
                                </div>
                            </form>
                            <form action="/index.php/Admin/Classes/delClass" method="post">
                                <div class="control-group ">
                                <label class="control-label" >
                                 删除父类
                                </label>
                                <div class="controls">                            
                                    <select  name="id"class="span4">
                                    <?php if(is_array($pclass)): foreach($pclass as $key=>$vl): ?><option value="<?php echo ($vl["id"]); ?>">
                                           <?php echo ($vl["cname"]); ?>
                                        </option><?php endforeach; endif; ?>                                  
                                    </select>
                                     <input type="submit" class="btn btn-info" value="删除">
                                </div>
                            </div>
                            </form>
                            <form action="/index.php/Admin/Classes/delClass"method="post">
                                <div class="control-group ">
                                <label class="control-label" >
                                 删除子类
                                </label>
                                <div class="controls">                            
                                    <select   name="id" class="span4">
                                        <?php if(is_array($sclass)): foreach($sclass as $key=>$vo): ?><option value="<?php echo ($vo["id"]); ?>">
                                                <?php echo ($vo["cname"]); ?>
                                            </option><?php endforeach; endif; ?>                         
                                    </select>
                                     <input type="submit" class="btn btn-info" value="删除">
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

        </div>

<!--页脚  -->
    <footer >
        <p>
            &copy; baswaAdmin 2014
        </p>
    </footer>
</body>
    
    <script src='/Public/admin/js/jquery.js'></script>
    <script src='/Public/admin/js/jquery.uploadify.min.js'></script>
    <script type="text/javascript">
        $('#index').removeAttr("class");
        $('#movie').attr("class","selected");
        $('#movielist').removeAttr("class");
        $('#classeslist').attr("class","heading");
    </script>
    <script>

// 查询子类
        $(document).ready(function(){
            $('option').eq(0).attr('selected',true);
            $.post('sclass',{'pid':1},function(data){ 
                     var str="";
                    $.each(data,function(i,j){
                        str+="<option>"+j.cname+"</option>";
                    })
                    $("#sclass").html(str);
                },"json");   


        })

// 查询子类
        $('#pclasses option').click(function(){
                var pid=$(this).val();
                var data={'pid':pid};
                $.post('sclass',data,function(data){ 
                     var str="";
                    $.each(data,function(i,j){
                        str+="<option>"+j.cname+"</option>";
                    })
                    $("#sclass").html(str);
                },"json");     
        })
       
    </script>
 
</html>
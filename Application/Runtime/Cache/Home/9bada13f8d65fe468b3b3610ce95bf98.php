<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" type="text/css" href="/Public/admin/js/ue/themes/default/css/umeditor.css">
	<script type="text/javascript" src="/Public/admin/js/ue/third-party/jquery.min.js"></script>
	<script type="text/javascript" src="/Public/admin/js/ue/umeditor.config.js"></script>
	<script src="/Public/admin/js/ue/umeditor.js" type="text/javascript"></script>
	<script type="text/javascript" src="/Public/admin/js/layer/layer.js"></script>
	
	
</head>
<body>	
<div style="width:800px">
<a href="javascript:;" class="a">a</a>
	<p id="CommentPost">发表评论</p>
	<form method="post" action="<?php echo U('add');?>" >
		<script name="ccontent" type="text/plain" id="myEditor" style="width:800px;height:240px;">
			<p class="p">这里可以输入些内容</p>
		</script>
		<input type="hidden" value="<?php echo ($mid); ?>" name="mid"></input>
		<input type="hidden" value="0" name="fcid" class="fcid"></input>
		<input type="submit" value="畅言一下" name="send" class="send"></input>
	</form>
</div>

<div style="width:800px;">
	<p style="color: blue">评论<?php if(empty($count["0"]["uid"])): ?>0<?php else: echo ($count["0"]["uid"]); endif; ?>人参与，共<?php if(empty($count["0"]["cid"])): ?>0<?php else: echo ($count["0"]["cid"]); endif; ?>条评论</p>
	<p>最新评论</p>
	<?php if(is_array($comments)): $i = 0; $__LIST__ = $comments;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vol): $mod = ($i % 2 );++$i;?><div border="1">
	<ul style="list-style:none;border-bottom:1px dashed #D8D4D4">
		<li style="color: blue"><?php echo ($vol["user"]); ?></li>
		<li style="font-size: 14px;line-height: 22px"><?php echo (date('Y-m-d H:i:s',$vol["date"])); ?><a class="hf" data="<?php echo ($vo["id"]); ?>" href="#CommentPost" style="text-decoration:none;font-size: 14px">回复</a></li>
		<?php if(!empty($vol["fcomment"])): if(is_array($vol["fcomment"])): $i = 0; $__LIST__ = $vol["fcomment"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><ul style="list-style:none;background-color:#DFFBC7;border: 1px solid #D8D4D4;">
						<li style="color: blue"><?php echo ($vo["user"]); ?></li>	
						<li style="font-size: 14px;line-height: 22px">发布于<?php echo (date('Y-m-d H:i:s',$vol["date"])); ?><a class="hf" data="<?php echo ($vo["id"]); ?>" href="#CommentPost" style="text-decoration:none;font-size: 14px">回复</a>
						</li>					
						<li style="font-size: 20px;height: 50px"><?php echo ($vo["content"]); ?></li>	
					</ul><?php endforeach; endif; else: echo "" ;endif; endif; ?>
		<li style="font-size: 20px;height: 50px"><?php echo ($vol["content"]); ?></li>
			 		
	</ul>
	</div><?php endforeach; endif; else: echo "" ;endif; ?>
</div>
<script type="text/javascript">
var um = UM.getEditor('myEditor');

	$(function(){		
		$('.hf').on('click',function(){
			var id = $(this).attr('data');		
			$('.fcid').val(id);		
		});
		$('.p').on('mousemove',function(){
			layer.open({
				type:2,
				title:'登陆',
				shadaClose:true,
				shada:0.8,
				area:['380px','90%'],
				content:'/index.php/Home/Comment/add'
			});
		})
	});
	
</script>
</body>
</html>
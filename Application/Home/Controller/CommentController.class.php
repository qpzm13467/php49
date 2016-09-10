<?php  
namespace Home\Controller;
use Think\Controller;
class CommentController extends Controller
{
	public function index(){
		//获取影片ID
		$mid = I('get.mid');
		$model = M('Comment');
		//全部评论
		$comments = $model -> field('comment.fcid as fid,comment.cid as id,comment.ccontent as content,comment.cdate as date,user.uname as user') -> join('left join user on comment.uid = user.uid')->where('comment.mid ='.$mid) -> select();
		//父评论
		//$this -> movieFcid($comments);
		foreach ($comments as $key => $value) {
			$comments[$key]['content'] = htmlspecialchars_decode($comments[$key]['content']);
			$son = $model -> field('comment.fcid as fid,comment.cid as id,comment.ccontent as content,comment.cdate as date,user.uname as user') -> join('left join user on comment.uid = user.uid') -> where("comment.mid = ".$mid." and comment.cid =" . $value['fid']) -> select();
			$comments[$key]['fcomment']=$son;
		}
		//查询评论数及人数
		$count = $model -> field('uid,count(cid) as cid') -> where('comment.mid ='.$mid)-> group('uid')->select();
		//将数据传入模板
		//dump($count);die;
		

		$this -> assign('comments', $comments);
		$this -> assign('mid', $mid);
		$this -> assign('count', $count);
		$this -> display();
	}



	public function add(){
		//判断用户是否登陆
		if(session('?id') == true){
			//获取传值
			$post = I('post.');
			unset($post['send']);
			$post['uid'] = session('id');	
			$post['cdate'] = time();
			//添加评论		
			$model = M('Comment');	
			$res = $model -> add($post);
			if($res){
				$this -> success('评论成功',U('index',array('mid' => $post['mid'])),1);
			}else{
				$this -> error('评论失败',U('index',array('mid' => $post['mid'])),1);
			}
		}else{
			echo 'denglu';
			//$this -> error('请登录',U('login/index'),1);
		}
	}
}
?>
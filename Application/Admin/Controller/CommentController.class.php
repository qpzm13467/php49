<?php 
//声明名字空间 
namespace Admin\Controller;
//引用父类元素
use Think\Controller;
//声明类并继承父元素
class CommentController extends Controller
{
	public function index(){
		//实例化模型
		$model = M('Comment');
		//获取评论数据
		$comments = $model -> field('c1.*,user.uname as cuname,movie.mname as cmname') -> table('comment as c1,user,movie') -> where('c1.uid = user.uid and c1.mid = movie.id') -> select();
		//将数据传入模板
		$this -> assign('comments',$comments);
		//载入模板
		$this -> display();
	}
	public function delComment(){
		//获取ID
		$id = I('get.id');
		//调用循环删除				
		$this -> del($id);
		$this -> success('删除成功',U('index'),1);
	} 
	private function del($id){
		//实例化模型	
		$model = M('Comment');	
		//查询以$id为父id的所有数据的id，返回一个数组$arr；
		$arr = $model -> field('cid') -> where("fcid = $id") -> select();
		//判断数据是否存在
    	if(count($arr)>0) {
        	foreach($arr as $value) {
            	$this -> del($value['cid']);
        	}
        	$model -> delete($id);
    	} else {
    		//删除此条记录
        	$model -> delete($id);       	
        }    	
	}

} 

?>
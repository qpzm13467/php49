<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Admin Login</title>
<!--                       CSS                       -->
<link rel="stylesheet" href="/Public/admin/css/login.css" type="text/css" media="screen" />
</head>
<body id="login">
    <div id="login-wrapper" class="png_bg">
    <div id="login-top">
        <h1 style="color:red">Douban Admin</h1>

<!-- Logo (221px width) -->
        <a href="#"><img id="logo" src="/Public/admin/img/logos.png" alt="Simpla Admin logo" /></a> 
    </div>

<!-- End #logn-top -->
    <div id="login-content">
        <form action="/index.php/Admin/Login/select" method="post">
            <p>
              <label>管理员帐号</label>
              <input class="text" type="text" style="height:23px;"name="email">
            </p>
            <div class="clear"></div>
            <p>
              <label>密&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp码</label>
              <input class="password" type="password" style="height:23px;"name="userpwd">
            </p>
            <div class="clear"></div>
            <p>
              <input class="button" type="submit" value="登录"style="height:30px;width:90px" />
            </p>
        </form>
    </div>

<!-- End #login-content -->
</div>

<!-- End #login-wrapper -->
</body>
</html>
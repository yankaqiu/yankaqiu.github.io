---
layout: post
title: 小菜鸡的网页学习记录
date: 2020-10-09
description: this is what included typograms code could look like
tags: web
categories: sample-posts
typograms: true
---

# 小菜鸡的网页学习记录

我先简单介绍一下我做的两个网页：

一个主界面，一个详细界面。

我这两个网页主要是用CSS来实现的，少部分用到js，我暂时学的也是比较基础的部分，想要做出优秀的网页还有很长的一段路要走。

### Home.html

![](C:\Users\帅气逼人的闫卡丘\Desktop\闫璟-Wiki考核-3019244290\Home1.PNG)

这是主网页的开头部分，顶端的目录鼠标移动至上面会出现下拉菜单：

![](C:\Users\帅气逼人的闫卡丘\Desktop\闫璟-Wiki考核-3019244290\Home2.PNG)

那就先说这个下拉菜单如何实现的。本来我写过一版纯自实现的navbar，最终这一版navbar是基于bootstrap4写的（关于bootstrap4的介绍和使用有相关的

[英文]: https://getbootstrap.com/

和中文网站（还是看英文的吧），以及

[菜鸟教程]: https://www.runoob.com/bootstrap4/bootstrap4-tutorial.html	"（写的比较详细）"

可找到和借鉴一些基础的模板），这样稍微简洁了些，再用css写一些样式即可。

`<body>`内代码：

```html
<body data-spy="scroll" data-target="#navbar-example3" data-offset="60" class="scrollspy-example-2" style="position:relative;overflow:auto" id="content">


    <nav class="navbar navbar-expand-md fixed-top" style="box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;background-color:rgb(255, 255, 255);">
        <a class="navbar-brand col-2 mt-2" href="#"><img style="height: 70px;position: fixed;top:0.5%" src="../images/捕获.PNG"></img></a>
        
        <!--下拉导航-->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
        style="padding-top: 6px;
        padding-bottom: 6px;
        border: 1px solid black;
           border-radius: 0;
           float: right;">
            <!--按钮里的内容,三条横杠-->
            <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse " style="margin-left: 11%; margin-top: 0.8%;font-size: 17px;" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active" id="bgcolor">
                    <a class="nav-link" href="/Home.html">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item dropdown" id="bgcolor">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarProject" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Project
                    </a>
    
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="bgcolor2">
                        <a class="dropdown-item" href="/Description.html">Description</a>
                        <a class="dropdown-item" href="#">Design</a>
                        <a class="dropdown-item" href="#">Model</a>
                        <a class="dropdown-item" href="#">Safety</a>
                        <a class="dropdown-item" href="#">Demonstrate</a>
                    </div>
                </li>
                <li class="nav-item dropdown" id="bgcolor">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarResults" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Experiment
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="bgcolor2">
                        <a class="dropdown-item" href="#">Notebook</a>
                        <a class="dropdown-item" href="#">Results</a>
                    </div>
                </li>
                <li class="nav-item dropdown" id="bgcolor">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarParts" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Parts
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="bgcolor2">
                        <a class="dropdown-item" href="#">Overview</a>
                        <a class="dropdown-item" href="#">Part Collection</a>
                        <a class="dropdown-item" href="#">Improved Parts</a>
                        <a class="dropdown-item" href="#">Measurement</a>
                    </div>
                </li>
                <li class="nav-item dropdown" id="bgcolor">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarHuman" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Human
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="bgcolor2">
                        <a class="dropdown-item" href="#">Human Practice</a>
                        <a class="dropdown-item" href="#">HP Supplement</a>
                        <a class="dropdown-item" href="#">Collaborations</a>
                    </div>
                </li>
                <li class="nav-item dropdown" id="bgcolor">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarTeam" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Team
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="bgcolor2">
                        <a class="dropdown-item" href="#">Team</a>
                        <a class="dropdown-item" href="#">Attributions</a>
                    </div>
                </li>
    
            </ul>
        </div>
    </nav>    
```

内含的基础知识：

> html属性和元素
>
> - 在html代码里，class为类，我们可以为不同的类设置不同的样式。HTML `<div> `元素是*块级元素*。它能够用作其他 HTML 元素的容器。设置 <div> 元素的类，使我们能够为相同的 `<div> `元素设置相同的类。
>
> - `<nav>`标签定义导航链接的容器。
>
> - 无序列表是一个项目的列表，此列项目使用粗体圆点（典型的小黑圆圈）进行标记。无序列表始于 `<ul>` 标签。每个列表项始于` <li>`。
>
> - 有序列表始于 `<ol>` 标签。每个列表项始于 `<li>` 标签。
>
> - 通过使用` <a>` 标签在 HTML 中创建链接。
>
>   有两种使用` <a>` 标签的方式：
>
>   1. 通过使用 href 属性 - 创建指向另一个文档的链接
>   2. 通过使用 name 属性 - 创建文档内的书签
>
>   超链接可以是一个字，一个词，或者一组词，也可以是一幅图像，您可以点击这些内容来跳转到新的文档或者当前文档中的某个部分。
>



`<style>`内CSS代码：

```css
.navbar-light .navbar-brand {
  color: rgba(0, 0, 0, 0.9);
  color: black !important;
  font-weight: 600;
}

.navbar-toggler-icon{
  color:black !important;
}

.navbar-toggler{
  border-color: black;
}

.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
  color: black !important;
  background-color: rgb(250,226,180) !important;
  box-shadow: 0 .3rem .5rem rgba(0,0,0,.15)!important;
}

.navbar-toggler{
  border-color: black !important;
  }

  li:hover .dropdown-menu {
      display: block;
  }
  .dropdown-menu {
  top: 100%;
}

#bgcolor a:link{color: grey !important;}
#bgcolor a:visited{color: grey !important;}
#bgcolor a:hover{color: rgb(0, 0, 0) !important;}
#bgcolor a:active{color: rgb(0, 0, 0) !important;}

#bgcolor #bgcolor2 a:link{color: grey !important;}
#bgcolor #bgcolor2 a:visited{color: black !important;}
#bgcolor #bgcolor2 a:hover{color: rgb(0,0,0) !important;}
#bgcolor #bgcolor2 a:active{color: black !important;}

a:visited {
  color: grey !important;
}

a {
  color: rgb(104,88,91) !important;
}

.dropdown-item:hover, .dropdown-item:focus {
background-color: rgba(243, 237, 238, 0.473) !important;
}

.dropdown-item.active, .dropdown-item:active {
background-color: #007bff;
}

a.nav-link{
padding:2px 20px;
margin: 0.5rem;
}

```

基础知识：

CSS选择器（类选择器、ID选择器、可结合）

接下来介绍轮播图（基于bootstrap4.5.0编写的，用css写了淡入淡出效果），但是最近学习
到用jQuery可以写出更丰富的轮播图，若使用可以再改进！：

`<body>`内代码：

```html
<!--轮播图-->
<div class="containerr" id="allCarousel">
<div id="Carousel" class="carousel slide carousel-fade" data-ride="carousel">
    <!--指示符-->
    <ul class="carousel-indicators">
        <li style="list-style-type: none">
            <ol class="carousel-indicators">
            <li data-target="#Carousel" data-slide-to="0" class="active"></li>
            </ol>
        </li>
    </ul>
    <ul class="carousel-indicators"></ul>
        <li style="list-style-type: none">
            <ol class="carousel-indicators">
            <li data-target="#Carousel" data-slide-to="1"></li>
            </ol>
        </li>
    </ul>
    <ul class="carousel-indicators"></ul>
        <li style="list-style-type: none">
            <ol class="carousel-indicators">
            <li data-target="#Carousel" data-slide-to="2"></li>
            </ol>
        </li>
    </ul>
    <!--轮播图片-->
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="../images/index2.jpg" alt="First slide" class="d-block w-100">
            <div class="carousel-caption d-done d-md-block">
                <h1>2020 IGEM</h1>
                <h5>TJU 2020</h5>
            </div>
        </div>
        <div class="carousel-item">
            <img src="../images/index.jpg" alt="Second slide" class="d-block w-100">
            <div class="carousel-caption d-done d-md-block">
                <h1>2020 IGEM</h1>
                <h5>TJU 2020</h5>
            </div>
        </div>
        <div class="carousel-item">
            <img src="../images/index3.jpg" alt="Third slide" class="d-block w-100">
            <div class="carousel-caption d-done d-md-block">
                <h1>2020 IGEM</h1>
                <h5>TJU 2020</h5>
            </div>
        </div>
    </div>
    <!--左右切换按钮-->
    <a class="carousel-control-prev" href="#Carousel" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
    </a>
    <a class="carousel-control-next" href="#Carousel" data-slide="next">
        <span class="carousel-control-next-icon"></span>
    </a>
</div>
</div>
```

>  `<span>` 元素是行内元素，能够用作文本的容器。
>
> 设置 `<span> `元素的类，能够为相同的 `<span> `元素设置相同的样式。
>

CSS相关代码：

```css
.carousel-inner img{
        width:100%;
        height:100%;
    }

/* bootstrap 轮播图淡入淡出 */
.carousel-fade .carousel-inner .carousel-item {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    transition-property: opacity;
}
.carousel-fade .carousel-inner .carousel-item,
.carousel-fade .carousel-inner .active.carousel-item-left,
.carousel-fade .carousel-inner .active.carousel-item-right {
    opacity: 0;
}
.carousel-fade .carousel-inner .active,
.carousel-fade .carousel-inner .carousel-item-next.carousel-item-left,
.carousel-fade .carousel-inner .carousel-item-prev.carousel-item-right {
    opacity: 1;
}

```

> opacity属性指定了一个元素的透明度，opicity:1是完全不透明，0是完全透明，
>
> translateX()函数表示在二维平面上水平方向移动元素。

接下来是将界面设置为左文字右图片。

`<body>`内代码：

```html
<!--下面分成四段，左文字右图片，设置背景色-->

<div>                      
    <div class = "row" id="highlight1">
        <div class="col-1"></div>
        <div class = "col-4">
            <div style="position:relative">
                <img src="../images/indexhighlight1.png" width="80%">
            </div>
        </div>
        <div class="col-6">
            <div class="circle" style="position: absolute;left: -30px;top:3px;background-image: linear-gradient(to right, #2f80ed,#56ccf2);;"></div>
            <div class="index_para" style="width: 90%;"><h1></h1>
            </br>
                <p class="fs-3" style="margin: 1cm 0 1cm 0; text-indent: 1cm; text-align: justify;">
                    PET is used extensively worldwide. However, the ability to enzymatically degrade PET, especially
                highly crystallized PET, has been thought to be limited to a few hydrolase. </p>
                <button style="background-image: linear-gradient(to right, #2f80ed,#56ccf2);" onclick="window.location.href='#'">Read more</button>
            </div>
            
            <div class="col-1"></div>
        </div>
    </div>
    <div style="height:100px"></div>
    <div class = "row" id="highlight2">
        <div class="col-2">
            
        </div>
        <div class="col-5">
            <div class="circle" style="position: absolute;left: -30px;top:3px;background-image: linear-gradient(to right,#fbc7d4, #9796f0);"></div>
            <div class="index_para" style="width: 100%;"><h1></h1>
            </br>
                <p class="fs-3" style="margin: 1cm 0 1cm 0; text-indent: 1cm;text-align: justify;">
                    Although IsPETase has the highest degradation activity of highly crystallized PET under mild
                conditions of all PET-degrading enzymes reported to date, its low thermal stability limits its ability
                for efficient and practical enzymatic degradation of PET. Considering the glass transition
                temperature of PET is around 75°C, above which the polyester chain of PET performs in a high
                elastic state where the degradation is promoted, thus, higher thermal stability will enable IsPETase
                to degrade highly crystallized PET more efficiently. </p>
                <button style="background-image: linear-gradient(to right, #fbc7d4, #9796f0);" onclick="window.location.href='#'">Read more</button>
            </div>
            
        </div>
        
        <div class = "col-4">
            <div style="position:relative">
                <img src="../images/indexhighlight2.png" width="100%">
            </div>
        </div>
        <div class="col-1"></div>
    </div>
    <div class = "row" id="highlight3">
        <div class="col-1"></div>
        <div class = "col-4">
            <div style="position:relative">
                <img src="../images/indexhighlight3.jpg" width="80%">
            </div>
        </div>
        <div class="col-6">
            <div class="circle" style="position: absolute;left: -30px;top:3px;background-image: linear-gradient(to right, #ffafbd,#ffc3a0);"></div>
            <div class="index_para" style="width: 85%;"><h1></h1>
            </br>
                <p class="fs-3" style="margin: 1cm 0 1cm 0; text-indent: 1cm;text-align: justify;">
                    Basing on the structural information of IsPETase and the theory of rational design, we developed
                    a series of protein engineering strategy using several IsPETase variants that were screened for high
                    thermal stability to improve PET degradation activity. The designed structural modifications will
                    then be further verified through a proper evaluation strategy.
                    </p> 
                <button style="background-image: linear-gradient(to right, #ffafbd,#ffc3a0);" onclick="window.location.href='#'">Read more</button>
            </div>
            
            <div class="col-1"></div>
        </div>
    </div>
    
    <div style="height:150px"></div>
    <div class = "row" id="highlight4">
        <div class="col-2">
            
        </div>
        <div class="col-5">
            <div class="circle" style="position: absolute;left: -30px;top:3px;background-image: linear-gradient(to right, #ffe259,#ffa751);;"></div>
            <div class="index_para" style="width: 90%;"><h1></h1>
            </br>
                <p class="fs-3" style="margin: 1cm 0 1cm 0; text-indent: 1cm;text-align: justify;">
                    Our project can help to increase the possibility of achieving the biodegradation of highly
                    crystallized PET under higher temperatures, contributing to solving the environmental and health
                    problems caused by the abuse of PET. Moreover, the method of rational protein engineering to
                    enhance the thermal stability of a target protein, can be effectively utilized in further applications.
                    </p>  
                <button style="background-image: linear-gradient(to right, #ffe259,#ffa751);" onclick="window.location.href='#'">Read more</button>
            </div>
            
        </div>
        
        <div class = "col-4">
            <div style="position:relative">
                <img src="../images/indexhighlight4.jpg" style="float:right" width="80%">
            </div>
        </div>
        <div class="col-1"></div>
    </div>
            
            <div class="col-1"></div>
        </div>
    </div>
</div>
```

CSS相关代码：

```css
#top_title{
display:none;
}

#content{
margin:0;
width:100%;
background-color: rgb(160, 160, 160);
}

p {
font-size:20px !important;
text-align: left !important;
font-family: 'Open Sans' !important;
font-weight:350 !important;
}


.h1{
    font-size:90px;
}

h4{
  font-size:25px;
line-height:26px;
padding-top:16px;
  padding-bottom:8px !important;
font-family:sofia;
font-weight: 700  !important;
margin-bottom: 0.8em !important;
}

h5{
  font-size:21px;
line-height:26px;
padding-top:16px;
  padding-bottom:8px !important;
font-family:sofia;
font-weight: 400  !important;
margin-bottom: 0.8em !important;
}
```

最后是一个底部footer：

![](C:\Users\帅气逼人的闫卡丘\Desktop\闫璟-Wiki考核-3019244290\Home3.PNG)

`<body>`内代码：

```html
<!--底部footer-->
<div class="footer" id="myfooter" style="background-color: black;">
    <div class="container">
        <div class="row footer-top">
            <div class="col-sm-6 col-lg-6">
                        <h4>About us</h4>
                        <ul class="list-unstyled">
							<li>
                            Team Tianjin 2019 is an undergraduate team from the Institute of Chemical Engineering, Tianjin University.
							</li>
                        </ul>
            </div>
            <div class="col-sm-6 col-lg-6">
                        <h4>Contact us</h4>
                        <ul class="list-unstyled">
                            <li>
								Wechat: iGEM 天津
                            </li>
                            <li>Email: igem.tianjin@gmail.com</li>
							<li>Address: School of Chemical Engineering, Tianjin University, 135 Yaguan Road, Jinnan District, Tianjin</li>
                        </ul>
            </div>

        </div>
        
    </div>
</div>
```

这里面用到的pb，mr，ml，mt等其实是margin和padding属性的简写，几个缩写,t,b,l,r,x,y含义分别是top,bottom,left,right,left和right,top和bottom，附官方文档链接：https://getbootstrap.com/docs/4.5/utilities/spacing/ ，

Bootstrap 提供了一套响应式、移动设备优先的流式网格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多 12 列。附链接：https://www.runoob.com/bootstrap4/bootstrap4-grid-basic.html

CSS相关代码：

```css
#myfooter{
    font-size:16.5px
}

.footer{
    color: whitesmoke;
}
```

内容部分分为四小段，左图片右文字，每一段最下一行的 read more 按钮点击后可以跳转网页之类的操作。onclick就是一个HTML事件，可以在后面加上Js代码，使其在事件发生时执行。



最上部写了一个滚动条，CSS部分利用了linear-gradient() 函数

> 该函数用于创建一个线性渐变的 "图像"。为了创建一个线性渐变，你需要设置一个起始点和一个方向（指定为一个角度）的渐变效果。你还要定义终止色。终止色就是你想让Gecko去平滑的过渡，并且你必须指定至少两种，当然也会可以指定更多的颜色去创建更复杂的渐变效果。

滚动条的JavaScript函数：

```javascript
<script>
    (function(){
        let pageHeight = document.body.scrollHeight || document.documentElement.scrollHeight; // 页面总高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight; // 浏览器视口高度
        let scrollAvail = pageHeight - windowHeight; // 可滚动的高度
        console.log('可滚动的高度：', scrollAvail);
        window.onscroll = function () {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;  // 获取滚动条的高度
            console.log('滚动条的高度：', scrollTop);
            document.querySelector('.progress').style.width = (scrollTop/scrollAvail)*100 + '%';    // 计算占比
        };
    }());
</script>
```

let关键字：let 声明的变量只是在其声明的块或者子块中可用，这一点，与var相似。二者的主要区别在于var声明的变量的作用域是整个封闭函数，而let声明的作用域是全局或者整个块的。




### Description.html

![](C:\Users\帅气逼人的闫卡丘\Desktop\闫璟-Wiki考核-3019244290\Description1.PNG)

这个顶部是用了一个jQuery插件： https://github.com/nk-o/jarallax ，实现了一种背景视觉差滚动特效。

![](C:\Users\帅气逼人的闫卡丘\Desktop\闫璟-Wiki考核-3019244290\Description2.PNG)

在侧边写了一个小目录，点击某个Part就可以移动到相应的位置。

`<body>`内代码：

```html
<div class="col-3 mb-5 pb-5 mr-5" id="navSide">
     <nav id="navbar-example3" class="navbar navbar-light bg-light flex-column position-sticky" style="top: 30%;left: 14%;font-size:110%;box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;">
          <a class="navbar-brand" href="#"><img src="../images/标志5.jpg" style="height:30px;"></img> Description</a>
             	<nav class="nav nav-pills flex-column mt-4">        
                    <a class="nav-link" href="#Part1">Part1</a>
                    <a class="nav-link" href="#Part2">Part2</a>
                    <a class="nav-link" href="#Part3">Part3</a>
                    <a class="nav-link" href="#Part4">Part4</a>
                </nav>
            </nav>
 		</div>
```



### 学习过程（仅供参考QAQ）

我先是在

[W3school]: https://www.w3school.com.cn/h.asp

上看教程学习，中途也去找了一些视频课程，但感觉老师都比较啰嗦，个人还是觉得直接看教程效率比较高（当然视频会让人更容易理解，老师有的时候会写写实例，也不会特别枯燥）。

把HTML和CSS系列教程基本上看完，花了几天时间（期间一边看一边做笔记）。因为离ddl不远了，并且光看教程难以真正掌握，于是决定一边作任务一边学习，再学点js丰富一下网页内容。

js也是直接看的网站上的教程。学习写网页时写不出来就去看别的网页的源代码，如IGEM往年的best wiki，还有别人推荐的插件库（虽然好多都没用上，但就多见识见识也挺好）后来因为写任务加练科目二，对js学习就比较落后，所以在自己的网页中用的不多，会在实例中多多学习。


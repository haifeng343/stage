<template>
  <div>
    <div class="ul1" id="ul1"></div>
  </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        moveTo(e) {
            e.preventDefault();
        },
        move1(e){
            const that = this;
            let div = document.createElement("div");
            let startPos = {};
            startPos.x = e.clientX;
            startPos.y = e.clientY;
            let li = null;
            
            function move(e) {
                let curPos = {};
                curPos.x = e.clientX;
                curPos.y = e.clientY;
            
                //移动时画框
                div.classList.add("box");
                //设置div的宽高及top/left
                that.css(div, "width", Math.abs(curPos.x - startPos.x));
                that.css(div, "height", Math.abs(curPos.y - startPos.y));
                that.css(div, "left", Math.min(curPos.x, startPos.x));
                that.css(div, "top", Math.min(curPos.y, startPos.y));
            
                document.body.appendChild(div);
            
                let lis = document.querySelectorAll("#ul1 span");
                //将框住的li放进div中(div和多个元素碰撞)
                lis.forEach(item => {
                    // 将每个li和div进行碰撞测试,如果碰到了，就设置active
                    //注意：不能直接碰撞时，直接appendChild到div中，会将后面的li全部添加进去
                    that.isConcat(div, item);
                });
            }
            //获取鼠标移动时位置
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", function() {
                document.removeEventListener("mousemove", move);
                let bucket = document.querySelector("#bucket");
                //获取到所有样式为active的li
                let lis = document.querySelectorAll("#ul1 .active");
                let arr = [];
                lis.forEach(item => {
                    // item.classList.remove("active");//删除选中的active
                    // bucket.appendChild(item);//将选中的添加进另一个div里
                    arr.push(parseInt(item.innerHTML))
                });
                
                    console.log(arr)
                //鼠标放下时清除上一个div
                div.remove(); //使用removeChild有可能还未创建div
            }, {
                once: true
            });
        },
        css(el, attr, val) {
            if (arguments.length == 3) {
                el.style[attr] = val + 'px';
            } else {
                return parseInt(getComputedStyle(el)[attr]);
            }
        },
        isConcat(el1, el2) {
            let div1Dis = el1.getBoundingClientRect();
            let div2Dis = el2.getBoundingClientRect();
            if (div1Dis.right > div2Dis.left &&
                div1Dis.bottom > div2Dis.top &&
                div1Dis.left < div2Dis.right &&
                div1Dis.top < div2Dis.bottom) {

                el2.classList.add("active");
                return el2;
            } else {
                //注意：必须给没有碰到的清除active。否则当操作时，先往前拉，后往后拉，会给往前拉的所有li都加上active，这样再往后拉后会全部加到div里
                el2.classList.remove("active");
            }
        },
    },
    mounted() {
        
let oUl = document.getElementById('ul1');
        let arr = [];
        for(let i = 1;i<101;i++){
            arr.push('<span>'+i+'</span>');
        }
        console.log(oUl)
        oUl.innerHTML = arr.join(' ');
        const that = this;
        document.addEventListener("mousedown", function(e) {
            that.move1(e);
            e.preventDefault();
        });
        document.addEventListener('mousedown', that.moveTo,false);
    },
    updated(){
    }
}
</script>
<style>
#bucket {
  border: 1px solid black;
  height: 240px;
}
#bucket span {
  background-color: lightgreen;
  color: #fff;
}

#ul1 span {
  display: block;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: yellow;
  border: 1px solid black;
  list-style: none;
  float: left;
  margin: 10px;
}

.box {
  /* border: 1px solid peru; */
  border: 1px solid rgba(0, 0, 0, 0.3);
  position: absolute;
  /* background: rgba(0,0,255,.4); */
  background: rgba(0, 0, 5, 0.1);
}

#ul1 span.active {
  background: lightblue;
  color: #fff;
}

#ul1 {
  width: 750px;
  height: auto;
  list-style-type: none;
}
</style>
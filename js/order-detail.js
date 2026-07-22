const SUPABASE_URL =
"https://ukxxmxnubxjezkwbbxdr.supabase.co";


const SUPABASE_KEY =
"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";


const client =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);





const params =
new URLSearchParams(
window.location.search
);



const id =
params.get("id");







async function loadDetail(){



// 获取当前用户


const {data:userData}=await client.auth.getUser();



const user =
userData.user;





if(!user){


location.href=
"user-login.html";


return;


}








// 查询订单


const {data,error}=await client
.from("orders")
.select("*")
.eq(
"id",
id
)
.single();






if(error){


console.log(error);


document.getElementById(
"detail"
).innerHTML=
"订单不存在";


return;


}







// 判断订单属于当前用户


if(
data.user_id
&&
data.user_id !== user.id
){


document.getElementById(
"detail"
).innerHTML=
"无权查看此订单";


return;


}








document.getElementById(
"detail"
).innerHTML=

`

<h1>

订单详情

</h1>



<hr>




<h2>

${data.product_name}

</h2>




<p>

订单编号：

${data.id}

</p>




<p>

商品价格：

¥${data.price}

</p>




<p>

购买数量：

${data.quantity || 1}

</p>





<h3>

订单状态：

${data.status || "待付款"}

</h3>





<hr>





<h2>

收货信息

</h2>





<p>

姓名：

${data.customer_name}

</p>





<p>

手机号：

${data.phone}

</p>





<p>

地址：

${data.address}

</p>






<hr>





<h2>

物流信息

</h2>





<p>

快递公司：

${data.shipping_company || "暂无"}

</p>





<p>

快递单号：

${data.tracking_number || "暂无"}

</p>






<br>




<a href="my-orders.html">

返回我的订单

</a>



`;




}





loadDetail();

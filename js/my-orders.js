const SUPABASE_URL =
"https://ukxxmxnubxjezkwbbxdr.supabase.co";


const SUPABASE_KEY =
"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";


const client =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);





async function loadOrders(){



const {data:userData}=await client.auth.getUser();



const user =
userData.user;





if(!user){


location.href=
"user-login.html";


return;


}








const {data,error}=await client
.from("orders")
.select("*")
.eq(
"user_id",
user.id
)
.order(
"id",
{
ascending:false
}
);






if(error){


console.log(error);


return;


}






let html="";





if(data.length===0){


html=
"<h3>暂无订单</h3>";


}








data.forEach(order=>{





html+=`



<div class="card">





<h3>

订单编号：

${order.id}

</h3>





<h3>

${order.product_name}

</h3>





<p>

价格：

¥${order.price}

</p>





<p>

数量：

${order.quantity || 1}

</p>





<p>

订单状态：

${order.status || "待付款"}

</p>





<p>

收货人：

${order.customer_name}

</p>





<p>

电话：

${order.phone}

</p>





<p>

地址：

${order.address}

</p>







<p>

快递公司：

${order.shipping_company || "暂无"}

</p>





<p>

快递单号：

${order.tracking_number || "暂无"}

</p>







<a href="order-detail.html?id=${order.id}">

查看详情

</a>





</div>



`;





});







document.getElementById(
"orders"
).innerHTML=html;




}







loadOrders();

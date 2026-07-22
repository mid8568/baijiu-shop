// =========================
// Supabase配置
// =========================


const SUPABASE_URL =
"https://ukxxmxnubxjezkwbbxdr.supabase.co";


const SUPABASE_KEY =
"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";



const client =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);




// =========================
// 登录检查
// =========================


async function checkLogin(){


const {data}=await client.auth.getSession();



if(!data.session){


window.location.href =
"admin-login.html";


return;


}



}



checkLogin();






// =========================
// 添加商品
// =========================


async function addProduct(){



const product={



name:
document.getElementById("name").value,



price:
Number(
document.getElementById("price").value
),



image:
document.getElementById("image").value,



description:
document.getElementById("description").value,



stock:
Number(
document.getElementById("stock").value
),



category:
document.getElementById("category").value



};





const {error}=await client
.from("products")
.insert(product);





if(error){


alert(
"添加失败:"
+
error.message
);


return;


}




alert(
"白酒添加成功"
);



loadProducts();



}









// =========================
// 商品列表
// =========================


async function loadProducts(){



const {data,error}=await client
.from("products")
.select("*")
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




data.forEach(item=>{


html+=`


<div class="card">


<img src="${item.image}">



<h3>

${item.name}

</h3>




<p>

分类：

${item.category || "未分类"}

</p>



<p>

价格：

¥${item.price}

</p>



<p>

库存：

${item.stock}

</p>





<button onclick="editProduct(${item.id})">

编辑

</button>





<button onclick="deleteProduct(${item.id})">

删除

</button>




</div>


`;



});




document.getElementById(
"product-list"
).innerHTML=html;



}









// =========================
// 编辑商品
// =========================


async function editProduct(id){



let price =
prompt(
"请输入新的价格"
);



let stock =
prompt(
"请输入新的库存"
);




if(!price || !stock){

return;

}




const {error}=await client
.from("products")
.update({

price:Number(price),

stock:Number(stock)

})
.eq(
"id",
id
);




if(error){


alert(error.message);


return;

}



alert(
"修改成功"
);



loadProducts();



}









// =========================
// 删除商品
// =========================


async function deleteProduct(id){



if(
!confirm(
"确定删除这个商品吗?"
)
)

return;





const {error}=await client
.from("products")
.delete()
.eq(
"id",
id
);





if(error){


alert(error.message);


return;


}





alert(
"删除成功"
);



loadProducts();



}









// =========================
// 订单列表
// =========================


async function loadOrders(){



const {data,error}=await client
.from("orders")
.select("*")
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





data.forEach(order=>{



html+=`


<div class="card">



<h3>

订单编号:
${order.id}

</h3>




<p>

商品:

${order.product_name}

</p>




<p>

价格:

¥${order.price}

</p>




<p>

客户:

${order.customer_name}

</p>




<p>

电话:

${order.phone}

</p>




<p>

地址:

${order.address}

</p>




<p>

状态:

${order.status || "待付款"}

</p>





<button onclick="shipOrder(${order.id})">

发货

</button>




</div>


`;



});





document.getElementById(
"order-list"
).innerHTML=html;



}









// =========================
// 发货
// =========================


async function shipOrder(id){



let company =
prompt(
"请输入快递公司"
);



let number =
prompt(
"请输入快递单号"
);





if(!company || !number){

return;

}





const {error}=await client
.from("orders")
.update({

status:"已发货",

shipping_company:company,

tracking_number:number


})
.eq(
"id",
id
);






if(error){


alert(error.message);


return;


}




alert(
"发货成功"
);



loadOrders();



}









// =========================
// 退出登录
// =========================


async function logout(){



await client.auth.signOut();



location.href=
"admin-login.html";



}








// 页面加载


loadProducts();


loadOrders();

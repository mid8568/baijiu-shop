const SUPABASE_URL =
"https://ukxxmxnubxjezkwbbxdr.supabase.co";


const SUPABASE_KEY =
"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";


const client =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);





let cart =
JSON.parse(
localStorage.getItem("cart")
||
"[]"
);



let products=[];








// 加载购物车


async function loadCart(){


let html="";


let total=0;



products=[];




for(let item of cart){



const {data,error}=await client
.from("products")
.select("*")
.eq(
"id",
item.id
)
.single();




if(error)
continue;




products.push(data);





let quantity =
item.quantity || 1;




total +=
Number(data.price)
*
quantity;





html += `


<div class="card">



<img src="${data.image}">



<h3>

${data.name}

</h3>



<p>

单价：

¥${data.price}

</p>




<p>

数量：

${quantity}

</p>




<button onclick="removeCart(${data.id})">

删除

</button>




</div>


`;



}





if(html===""){


html=
"<h3>购物车为空</h3>";


}




document.getElementById(
"cart-list"
).innerHTML=html;



document.getElementById(
"total"
).innerHTML=

"总价：¥"
+
total;



}










// 删除商品


function removeCart(id){



cart =
cart.filter(
item=>
item.id!=id
);



localStorage.setItem(

"cart",

JSON.stringify(cart)

);



location.reload();


}










// 提交订单


async function submitOrder(){



let name =
document.getElementById(
"customer"
).value;



let phone =
document.getElementById(
"phone"
).value;



let address =
document.getElementById(
"address"
).value;






if(!name || !phone || !address){



alert(
"请填写完整信息"
);


return;


}








const {data:userData}=await client.auth.getUser();

const user=userData.user;


const {data,error}=await client
.from("orders")
.insert({

product_id:product.id,

product_name:product.name,

price:product.price,

quantity:1,

customer_name:name,

phone:phone,

address:address,

user_id:user.id,

status:"待付款"

})
.select()
.single();



}





alert(
"订单提交成功"
);




localStorage.removeItem(
"cart"
);





location.href=
"payment-success.html";



}








loadCart();

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




// ======================
// 加载购物车
// ======================


async function loadCart(){


let html="";

let total=0;



for(let item of cart){



const {data,error}=await client

.from("products")

.select("*")

.eq(
"id",
item.id
)

.single();



if(error){

console.log(error);

continue;

}



let quantity =
item.quantity || 1;



total +=
Number(data.price)
*
quantity;



html+=`

<div class="card">


<img src="${data.image}">


<h3>

${data.name}

</h3>



<p>

价格：

¥${data.price}

</p>



<p>

数量：

${quantity}

</p>



<button onclick="changeQty(${data.id},1)">

+

</button>



<button onclick="changeQty(${data.id},-1)">

-

</button>



<button onclick="removeCart(${data.id})">

删除

</button>



</div>

`;



}



if(html===""){

html="<h2>购物车为空</h2>";

}



document.getElementById(
"cart-list"
).innerHTML=html;



document.getElementById(
"total"
).innerHTML=

"总价：¥"+total;



}





// ======================
// 修改数量
// ======================


function changeQty(id,num){



let item =
cart.find(
x=>x.id==id
);



if(item){


item.quantity += num;



if(item.quantity<=0){

item.quantity=1;

}


}



saveCart();



}




// ======================
// 删除
// ======================


function removeCart(id){



cart =
cart.filter(
x=>x.id!=id
);



saveCart();


}





function saveCart(){



localStorage.setItem(

"cart",

JSON.stringify(cart)

);



location.reload();


}






// ======================
// 提交订单
// ======================


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




// 获取登录用户(可为空)

const {data:userData}=

await client.auth.getUser();



const user =
userData.user || null;




for(let item of cart){



const {data:product,error}=

await client

.from("products")

.select("*")

.eq(
"id",
item.id
)

.single();





if(error){

console.log(error);

continue;

}





await client

.from("orders")

.insert({

product_id:
product.id,


product_name:
product.name,


price:
product.price,


quantity:
item.quantity || 1,


customer_name:
name,


phone:
phone,


address:
address,


// 登录用户保存ID
// 游客为空

user_id:
user ? user.id : null,


status:
"待付款"


});



}




alert(
"订单提交成功"
);



localStorage.removeItem(
"cart"
);



location.href=
"my-orders.html";



}





loadCart();

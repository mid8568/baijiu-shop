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




async function loadCheckout(){



let html="";

let total=0;



for(let item of cart){



const {data}=await client

.from("products")

.select("*")

.eq(
"id",
item.id
)

.single();





if(!data)
continue;




products.push(data);



let qty=item.quantity||1;



total += Number(data.price)*qty;



html +=`


<div class="checkout-item">


<img src="${data.image}">


<p>

${data.name}

</p>


<p>

数量:${qty}

</p>


<p>

¥${data.price}

</p>


</div>


`;



}



document.getElementById(
"order-products"
).innerHTML=html;



document.getElementById(
"checkout-total"
).innerHTML=

"总价：¥"+total;



}







async function submitOrder(){



let customer =
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




if(!customer||!phone||!address){


alert(
"请填写完整信息"
);


return;


}






const {data:userData}=

await client.auth.getUser();



const user=userData.user;




if(!user){


alert(
"请先登录"
);


location.href="user-login.html";


return;


}






// 创建订单



const product=products[0];



const {data,error}=await client

.from("orders")

.insert({

product_id:product.id,

product_name:product.name,

price:product.price,

quantity:1,

customer_name:customer,

phone:phone,

address:address,

user_id:user.id,

status:"待付款"


})

.select()

.single();






if(error){


alert(error.message);


return;


}





// 调用你的服务器Stripe


const response =
await fetch(

"https://你的服务器地址/create-payment",

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},


body:JSON.stringify({

orderId:data.id

})


}

);





const result =
await response.json();





if(result.url){



window.location.href=result.url;


}






}






loadCheckout();

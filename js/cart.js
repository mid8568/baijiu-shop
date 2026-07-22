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



async function loadCart(){


let html="";


for(let item of cart){


let {data}=await client
.from("products")
.select("*")
.eq("id",item.id)
.single();



html += `

<div class="card">

<img src="${data.image}">


<h3>
${data.name}
</h3>


<p>
价格:
¥${data.price}
</p>


</div>

`;

}


document.getElementById(
"cart-list"
).innerHTML=html;


}



async function submitOrder(){


let name=
document.getElementById("customer").value;


let phone=
document.getElementById("phone").value;


let address=
document.getElementById("address").value;



for(let item of cart){


let {data}=await client
.from("products")
.select("*")
.eq("id",item.id)
.single();



await client
.from("orders")
.insert({

product_id:data.id,

product_name:data.name,

price:data.price,

quantity:1,

customer_name:name,

phone:phone,

address:address

});


}



alert("订单提交成功");


localStorage.removeItem("cart");


}



loadCart();

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



async function loadCart(){


let html="";

let total=0;



for(let item of cart){



const {data,error}=await client
.from("products")
.select("*")
.eq("id",item.id)
.single();



if(error)
continue;



products.push(data);



total += Number(data.price);



html += `

<div class="card">


<img src="${data.image}">


<h3>

${data.name}

</h3>



<p class="price">

¥${data.price}

</p>



<button onclick="removeCart(${data.id})">

删除

</button>


</div>

`;

}



document.getElementById(
"cart-list"
).innerHTML=html;



document.getElementById(
"total"
).innerHTML=
"总价：¥"+total;



}




// 删除购物车

function removeCart(id){



cart =
cart.filter(
item=>item.id!=id
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
document.getElementById("customer").value;


let phone =
document.getElementById("phone").value;


let address =
document.getElementById("address").value;



if(!name||!phone||!address){

alert("请填写完整信息");

return;

}



for(let product of products){



await client
.from("orders")
.insert({

product_id:product.id,

product_name:product.name,

price:product.price,

quantity:1,

customer_name:name,

phone:phone,

address:address

});


}



alert("订单提交成功");



localStorage.removeItem("cart");



location.href="index.html";



}



loadCart();

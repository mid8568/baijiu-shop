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


const user=userData.user;



if(!user){

location.href="user-login.html";

return;

}



const {data,error}=await client
.from("orders")
.select("*")
.eq(
"user_id",
user.id
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
${order.product_name}
</h3>


<p>
价格：¥${order.price}
</p>


<p>
状态：
${order.status}
</p>


</div>

`;



});



document.getElementById(
"orders"
).innerHTML=html;


}



loadOrders();

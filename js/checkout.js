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





if(
!customer ||
!phone ||
!address
){


alert(
"请填写完整信息"
);


return;


}






const {
data:userData
}
=
await client.auth.getUser();




const user =
userData.user;





if(!user){


alert(
"请先登录"
);


location.href="user-login.html";


return;


}





for(let item of cart){



const {
data:product,
error
}
=
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
item.quantity,


customer_name:
customer,


phone:
phone,


address:
address,


user_id:
user.id,


status:
"待付款"


});



}




localStorage.removeItem(
"cart"
);




alert(
"订单提交成功"
);



location.href=
"my-orders.html";



}

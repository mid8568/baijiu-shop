require("dotenv").config();


const express=require("express");

const cors=require("cors");

const Stripe=require("stripe");

const {
createClient
}=require("@supabase/supabase-js");



const app=express();



app.use(
cors()
);



const stripe =
Stripe(
process.env.STRIPE_SECRET_KEY
);



const supabase =
createClient(

process.env.SUPABASE_URL,

process.env.SUPABASE_KEY

);





// 创建支付

app.post(
"/create-payment",

express.json(),

async(req,res)=>{



try{


const {
orderId
}=req.body;





// 查询订单


const {data:order,error}=await supabase
.from("orders")
.select("*")
.eq(
"id",
orderId
)
.single();





if(error){

return res.json({

error:"订单不存在"

});

}






const session =
await stripe.checkout.sessions.create({



payment_method_types:[

"card"

],





line_items:[

{

price_data:{


currency:"usd",



product_data:{


name:
order.product_name


},



unit_amount:

Number(order.price)*100



},



quantity:

order.quantity || 1



}

],





mode:"payment",






metadata:{


order_id:

order.id


},







success_url:


"https://mid8568.github.io/baijiu-shop/payment-success.html?order="+order.id,





cancel_url:


"https://mid8568.github.io/baijiu-shop/cart.html"



});






res.json({

url:
session.url

});





}catch(err){


res.json({

error:
err.message

});


}



});









// Stripe webhook


app.post(

"/webhook",

express.raw({

type:"application/json"

}),

async(req,res)=>{





const event=req.body;





if(

event.type ===

"checkout.session.completed"

){



const session =
event.data.object;





const orderId =
session.metadata.order_id;





await supabase
.from("orders")
.update({


status:"已付款",


paid_at:
new Date()


})
.eq(

"id",

orderId

);



}






res.json({

received:true

});



});









app.listen(

3000,

()=>{


console.log(

"payment server running"

);


});

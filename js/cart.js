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

let total=0;



for(let item of cart){



const {data,error}=await client
.from("products")
.select("*")
.eq("id",item.id)
.single();



if(error) continue;




let qty=item.quantity || 1;



total += Number(data.price)*qty;




html +=`


<div class="cart-item">


<img src="${data.image}">



<div>


<h3>

${data.name}

</h3>



<p>

¥${data.price}

</p>



<div class="qty">


<button onclick="changeQty(${data.id},-1)">
-
</button>



<span>

${qty}

</span>



<button onclick="changeQty(${data.id},1)">
+
</button>


</div>



<button onclick="removeCart(${data.id})">

删除

</button>



</div>


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

"合计：¥"+total;



}







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








function checkout(){


if(cart.length===0){


alert(
"购物车为空"
);


return;


}



location.href="checkout.html";


}




loadCart();

const SUPABASE_URL =
"https://ukxxmxnubxjezkwbbxdr.supabase.co";


const SUPABASE_KEY =
"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";


const client = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);



// 获取商品ID

const params =
new URLSearchParams(
    window.location.search
);


const id =
params.get("id");


// 保存当前商品ID

let currentProductId = id;





// 加载商品

async function loadProduct(){


const {data,error}=await client
.from("products")
.select("*")
.eq("id",id)
.single();



if(error){


console.log(error);


document.getElementById(
"product-detail"
).innerHTML =
"商品不存在";


return;

}




document.getElementById(
"product-detail"
).innerHTML =



`

<img src="${data.image}">


<div>


<h1>

${data.name}

</h1>



<p class="price">

¥${data.price}

</p>



<p>

${data.description}

</p>



<p>

库存：
${data.stock}

</p>



<button onclick="addCart(${data.id})">

加入购物车

</button>



</div>


`;



}



// 加入购物车


function addCart(productId){



let cart = JSON.parse(

localStorage.getItem("cart")
||
"[]"

);



cart.push({

id:productId

});



localStorage.setItem(

"cart",

JSON.stringify(cart)

);



alert("已加入购物车");


}







// 加载评价


async function loadReviews(){



const {data,error}=await client
.from("reviews")
.select("*")
.eq(
"product_id",
currentProductId
)
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



if(data.length===0){


html="暂无评价";


}



data.forEach(item=>{


html+=`


<div class="card">


<h3>

${item.username}

</h3>



<p>

评分：

${"⭐".repeat(item.rating)}

</p>



<p>

${item.content}

</p>



</div>


`;



});




document.getElementById(
"reviews"
).innerHTML=html;



}







// 发布评价


async function addReview(){



const content =
document.getElementById(
"review-content"
).value;



const rating =
Number(
document.getElementById(
"rating"
).value
);




if(!content){


alert("请输入评价");


return;

}





const {data:userData}=await client.auth.getUser();



const user =
userData.user;



if(!user){


alert(
"请先登录"
);


location.href =
"user-login.html";


return;


}





const {error}=await client
.from("reviews")
.insert({


product_id:
currentProductId,


user_id:
user.id,


username:
user.email,


content:
content,


rating:
rating


});





if(error){


alert(
error.message
);


return;

}



alert(
"评价成功"
);



document.getElementById(
"review-content"
).value="";



loadReviews();



}





// 页面加载


loadProduct();


loadReviews();

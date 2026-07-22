const SUPABASE_URL =
"https://ukxxmxnubxjezkwbbxdr.supabase.co";


const SUPABASE_KEY =
"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";


const client =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);



const params =
new URLSearchParams(
window.location.search
);



const id =
params.get("id");



async function loadDetail(){



const {data,error}=await client
.from("orders")
.select("*")
.eq(
"id",
id
)
.single();



if(error){

console.log(error);

return;

}



document.getElementById(
"detail"
).innerHTML=

`

<h1>

${data.product_name}

</h1>


<p>

价格:
¥${data.price}

</p>


<p>

订单状态:

${data.status}

</p>


<p>

快递:

${data.shipping_company || "暂无"}

</p>


<p>

快递单号:

${data.tracking_number || "暂无"}

</p>


`;



}



loadDetail();

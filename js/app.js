const SUPABASE_URL =
"https://ukxxmxnubxjezkwbbxdr.supabase.co";


const SUPABASE_KEY =
"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";


const client = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);



async function loadProducts(){


    const {data,error}=await client
    .from("products")
    .select("*")
    .order("id",{ascending:true});



    if(error){

        console.log("读取商品失败:",error);

        return;

    }



    const box=document.getElementById(
        "product-list"
    );



    if(!box){

        console.log("没有找到商品区域");

        return;

    }



    box.innerHTML="";



    data.forEach(product=>{


        box.innerHTML += `


        <div class="card">


            <img src="${product.image}">


            <h3>

            ${product.name}

            </h3>


            <p class="desc">

            ${product.description || ""}

            </p>


            <p class="price">

            ¥${product.price}

            </p>



            <a href="product.html?id=${item.id}">

            <button>

             查看商品

            </button>

             </a>

        </div>


        `;


    });


}



loadProducts();

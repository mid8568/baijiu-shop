const SUPABASE_URL =
"https://ukxxmxnubxjezkwbbxdr.supabase.co";


const SUPABASE_KEY =
"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";


const client = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);



async function addProduct(){


    const product={

        name:
        document.getElementById("name").value,


        price:
        Number(
        document.getElementById("price").value
        ),


        image:
        document.getElementById("image").value,


        description:
        document.getElementById("description").value,


        stock:
        Number(
        document.getElementById("stock").value
        )

    };



    const {error}=await client
    .from("products")
    .insert(product);



    if(error){

        alert(
        "添加失败:"
        +error.message
        );

        return;

    }


    alert("白酒添加成功");


    location.reload();


}

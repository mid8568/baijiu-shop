const SUPABASE_URL =
"https://ukxxmxnubxjezkwbbxdr.supabase.co";


const SUPABASE_KEY =
"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";


const client =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);




async function login(){


const email =
document.getElementById("email").value;



const password =
document.getElementById("password").value;




const {error}=await client.auth.signInWithPassword({

email,

password

});




if(error){

alert(
"登录失败:"
+error.message
);

return;

}



alert("登录成功");


location.href="admin.html";


}

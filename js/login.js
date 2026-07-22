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
document.getElementById(
"email"
).value.trim();



const password =
document.getElementById(
"password"
).value.trim();





if(!email || !password){


alert(
"请输入邮箱和密码"
);


return;


}







const {data,error}=await client.auth
.signInWithPassword({

email:email,

password:password

});







if(error){


alert(

"登录失败:"
+
error.message

);


return;


}







console.log(
"登录用户:",
data.user
);





alert(
"登录成功"
);





window.location.href =
"admin.html";



}

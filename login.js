   let namelogin = null
   let passwordlogin = null

   function handleLogin() {

    namelogin = document.getElementById('namelogin').value;
    passwordlogin = document.getElementById('passwordlogin').value

    if(!namelogin || !passwordlogin){
        alert('preenchao canpo')
    }else{
       namelogin = document.getElementById('namelogin').value;
       passwordlogin = document.getElementById('passwordlogin').value;
            
       console.log('Login:', { namelogin, passwordlogin });
       alert('Funcionalidade de login será implementada em breve!');
        }
    }
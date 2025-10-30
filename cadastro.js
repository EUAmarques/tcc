 let name=""
 let password = ""
 let confirmPassword = ""
 let logado = false

function handleRegister() {  
            name= document.getElementById('name').value;
            password = document.getElementById('password').value;
            confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }else{
                logado = true
            console.log('Cadastro:', { name, password });
            alert('Funcionalidade de cadastro será implementada em breve!');
            window.location.href = 'test.html';
        }
    
        
 }

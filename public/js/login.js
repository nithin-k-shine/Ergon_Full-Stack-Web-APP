//import axios from 'axios'
//const router = express.Router();

const login = async (email,password) => {
    try{
        const res = await axios({
            method: 'POST',
            url: '/users/login',data:{email,password}
        });
        if(res.data.status === 'success'){
            alert('Logged in succesfully');
            window.setTimeout(() => {
                location.assign('/projects');
              }, 1500);
           // router.get('/projects',authController.protect,viewsController.projects);
        }
        console.log(res);
    }
    catch(err){
        alert(err.response.data.message);
    }
}
const loginform=(document.getElementById('click'))

if(loginform){
    console.log('oh yea');
    loginform.addEventListener('click', e => {
        
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(email,password);
        login(email,password);
    });
}

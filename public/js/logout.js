//import axios from 'axios'
//const router = express.Router();

const logout = async () => {
    try{
        const res = await axios({
            method: 'GET',
            url: '/users/logout'
        });
        if(res.data.status === 'success'){
            console.log('oh noo, see ya later');
            alert('Logged out succesfully');
            window.setTimeout(() => {
                location.assign('/login');
              }, 1500);
        }
        //console.log(res);
    }
    catch(err){
        alert(err.message);
        //alert("Error! Couldn't log you out");
    }
}
const logoutform=(document.getElementById('click'))

if(logoutform){
    
    logoutform.addEventListener('click', e => {
        console.log('oh noo, see ya later');
        e.preventDefault();
        logout();
    });
}

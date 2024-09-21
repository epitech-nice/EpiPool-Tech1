<template>
    <div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true">

		<div class="signup">
			<form @submit.prevent="submitSignUp">
				<label for="chk" aria-hidden="true">Sign up</label>
				<input type="text" v-model="name" id="nameSign" placeholder="User name" required>
				<input type="email" v-model="email" id="emailSign" placeholder="Email" required>
				<input type="password" v-model="password" id="passSign" placeholder="Password" required>
				<button type="submit">Sign up</button>
			</form>
		</div>

		<div class="login">
			<form @submit.prevent="submitLogin">
				<label for="chk" aria-hidden="true">Login</label>
				<input type="email" v-model="emailLogin" id="emailLogin" placeholder="Email" required>
				<input type="password" v-model="passwordLogin" id="passLogin" placeholder="Password" required>
				<button type="submit">Login</button>
			</form>
		</div>
	</div>
</template>

<script>
import axios from 'axios';


export default {
	data() {
		return {
			email: '',
			password: '',
			name: '',
			emailLogin: '',
			passwordLogin: ''
		}
	},
	methods: {
		submitSignUp() {
            axios.post('http://localhost:3000/api/register', {
                name: this.name,
                email: this.email,
                password: this.password
            }).then(response => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                const expirationTime = new Date().getTime() + 60 * 60 * 1000;
                localStorage.setItem('tokenExpiration', expirationTime);
                this.$router.push('/dashboard');
            }).catch(err => {
                console.log(err);
            });
        },
        submitLogin() {
            axios.post('http://localhost:3000/api/login', {
                email: this.emailLogin,
                password: this.passwordLogin
            }).then(response => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                const expirationTime = new Date().getTime() + 60 * 60 * 1000;
                localStorage.setItem('tokenExpiration', expirationTime);
                this.$router.push('/dashboard');
            }).catch(err => {
                console.log(err);
            });
        }
	}
}

</script>

<style scoped>

.main{
	width: 415px;
	height: 500px;
	background: red;
	overflow: hidden;
    background-color: var(--secondaryBg);
	border-radius: 10px;
	box-shadow: 5px 20px 50px #000;
}
#chk{
	display: none;
}
.signup{
	position: relative;
	width:100%;
	height: 100%;
}
label {
	color: #fff;
	font-size: 2.3em;
	justify-content: center;
	display: flex;
	margin: 50px;
	font-weight: bold;
	cursor: pointer;
	transition: .5s ease-in-out;
}
input {
	width: 60%;
	height: 10px;
	background: #e0dede;
	justify-content: center;
	display: flex;
	margin: 20px auto;
	padding: 17px;
	border: none;
	outline: none;
	border-radius: 5px;
}
button{
	width: 60%;
	height: 40px;
	margin: 10px auto;
	justify-content: center;
	display: block;
	color: #fff;
	background: var(--buttonPrimary);
	font-size: 1em;
	font-weight: bold;
	margin-top: 30px;
	outline: none;
	border: none;
	border-radius: 5px;
	transition: .2s ease-in;
	cursor: pointer;
}
button:hover{
	background: var(--buttonHover);
}
.login{
	height: 460px;
	background: #eee;
	border-radius: 60% / 10%;
	transform: translateY(-180px);
	transition: .8s ease-in-out;
}
.login label{
	color: #573b8a;
	transform: scale(.6);
}

#chk:checked ~ .login{
	transform: translateY(-500px);
}
#chk:checked ~ .login label{
	transform: scale(1);	
}
#chk:checked ~ .signup label{
	transform: scale(.6);
}

</style>

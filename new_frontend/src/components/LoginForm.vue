<template>
    <div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true">

		<div class="signup">
			<form @submit.prevent="submitSignUp" style="padding-right: 15px; padding-left: 15px; text-align: center;">
				<label for="chk" aria-hidden="true">Sign up</label>
				<input type="text" v-model="name" id="nameSign" placeholder="User name" required>
				<input type="email" v-model="email" id="emailSign" placeholder="Email" required>
				<input type="password" v-model="password" id="passSign" placeholder="Password" required>
				<button type="submit" class="simpleBtn" style="margin-top: 25px;">Sign up</button>
			</form>
		</div>

		<div class="login">
			<form @submit.prevent="submitLogin">
				<div class="divForm">
					<label for="chk" aria-hidden="true">Login</label>
					<input type="email" v-model="emailLogin" id="emailLogin" placeholder="Email" required>
					<input type="password" v-model="passwordLogin" id="passLogin" placeholder="Password" required>
					<button type="submit" class="simpleBtn">Login</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import axios from '@/utils/axios';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '../utils/NotificationService';

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
            // axios.post('register', {
            //     name: this.name,
            //     email: this.email,
            //     password: this.password
            // }).then(response => {
            //     const token = response.data.token;
            //     const authStore = useAuthStore();
            //     authStore.setToken(token);
            //     this.$router.push('/dashboard');
            // }).catch(err => {
            //     console.log();
            // });
        },
        async submitLogin() {
			const { show } = useNotification();
            try {
				const response = await axios.post('login', {
					email: this.emailLogin,
					password: this.passwordLogin
				});
				const token = response.data.token;
				const authStore = useAuthStore();
				authStore.setToken(token);
				this.$router.push('/dashboard');
				show('Connected !', 'success');
			} catch (err) {
				show(err.response.data.msg, 'error');
			}
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
	transform: translateY(-450px);
}
#chk:checked ~ .login label{
	transform: scale(1);	
}
#chk:checked ~ .signup label{
	transform: scale(.6);
}

</style>

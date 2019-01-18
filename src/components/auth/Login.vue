<template>
    <div>
        <div >
            <img src="/static/LOGO.png" class="logo">
        </div>
        <div class="loginContainer" @keydown.enter="login">
            <h1 class="loginTitle">Admin Login</h1>

            <p class="errorText" v-if="error !== ''">{{ error }}</p>

            <div class="loginInputContainer">
                <label class="loginLabel">Username</label>
                <input type="text" class="form-control loginInput" placeholder="username" v-model="form.username"/>
            </div>

            <div class="loginInputContainer">
                <label class="loginLabel">Password</label>

                <input :type="passwordView" class="form-control loginInput" v-model="form.password" placeholder="password">
                <i class="fa fa-eye passwordIcon" @click="passwordView=='password' ? passwordView='text' : passwordView='password'"></i>
            </div>

            <div>
                <button-custom :loading="loading" :text="'Login'" @click.native="login"></button-custom>
            </div>
        </div>
    </div>

</template>

<script>
    import {setClientAuthorization} from "../helpers/general";
    import ButtonCustom from '../page/ButtonCustom.vue';

    export default {
        components: {ButtonCustom},
        data(){
            return {
                form:{
                    username: 'Alex123',
                    password: 'password',
                    grant_type: 'password'

                },
                error:'',
                loading: 0,
                passwordView: 'password',
                token: ''
            }
        },
        methods:{
            login(){
                this.loading = 1;

                this.error = '';

                axios.post(
                    'https://lucrez-ceva-test.herokuapp.com/oauth/token',
                    'username='+this.form.username+'&password='+this.form.password+'&grant_type=password',
                    {
                        headers: {
                            'Authorization' : 'Basic V2ViLWNsaWVudDpwYXNzd29yZA==',
                            'Content-type' : 'application/x-www-form-urlencoded'
                        }
                })
                    .then(res=>{
                        this.token = res.data.access_token;
                        axios.get('https://lucrez-ceva-test.herokuapp.com/authenticated/whoAmI',
                            {
                                headers:{
                                    'Authorization' : 'Bearer ' + res.data.access_token
                                }
                            })
                            .then(res=>{
                                this.$store.commit('login',
                                    {
                                        token: this.token,
                                        name: res.data.name,
                                        location: res.data.location,
                                        phone: res.data.phone,
                                        avatar: 'https://lucrez-ceva-test.herokuapp.com/unauthenticated/man-default.jpg'
                                    });
                                this.$router.push('/users/list');
                                this.loading = 0;

                            });

                    })
                    .catch(err=>{
                        this.error = err.response.data.error_description;
                        this.loading = 0;
                    });
            }
        },
        comments:{
            ButtonCustom
        }
    }
</script>

<style scoped>
    ::placeholder{
        color: #2FA0CB;
    }

    .logo{
        width: 200px;
        margin-top: 40px;
        background-color: #2FA0CB;
    }

    .loginContainer{
        margin: 50px auto 10px;
        max-width: 360px;
        text-align: center;
        text-shadow: 0 1px 0 rgba(147, 147, 147, 0.44);
        position: relative;
        background-color: white;
        height: 360px;
        padding: 15px 25px 25px;
        border-radius: 13px;
        box-shadow: 0 0 3px 0 black;
        color: #2FA0CB;
    }

    .loginTitle{
        font: 400 25px Helvetica,Arial,sans-serif;
        letter-spacing: -.05em;
        line-height: 20px;
        margin: 10px 0 30px;
    }

    .loginInputContainer{
        margin-bottom: 20px;
    }

    .loginInput:focus{
        -ms-box-shadow: 0 0 2px 0 #d2d2d2ab, inset 0 0 2px 0 #2a81a2d9;
        -o-box-shadow: 0 0 2px 0 #d2d2d2ab, inset 0 0 2px 0 #2a81a2d9;
        box-shadow: 0 0 2px 0 #d2d2d2ab, inset 0 0 2px 0 #2a81a2d9;
    }

    .loginInput{
        border-radius: 7px;
        border: 1px solid #2a81a2;
        position: relative;
        padding-right: 33px;
        padding-left: 15px;
    }

    .loginLabel{
        float: left;
        padding-left: 4px;
        color: #2a81a2;
    }

    .passwordIcon{
        position: relative;
        float: right;
        bottom: 28px;
        right: 11px;
        cursor: pointer;
        color: #2a81a2;
    }

    .passwordIcon:hover{
        color: black;
    }

    .errorText{
        margin-top: 5px;
        font-size: 21px;
        color: red;
        margin-bottom: 10px;
        margin-left: 5px;
    }
</style>


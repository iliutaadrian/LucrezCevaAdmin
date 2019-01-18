<template>
    <div class="container">
        <table class="table" style="background-color: white; margin-top: 20px">
            <thead class="thead-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Location</th>
                <th scope="col">Date posted</th>
                <th scope="col">Accepted</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in jobs">
                <th scope="row">{{index+1}}</th>
                <td>{{item.title}}</td>
                <td>{{item.description}}</td>
                <td>{{item.location}}</td>
                <td>
                    <span v-if="item.daysSincePosted < 15" style="color: green">{{item.daysSincePosted}}</span>
                    <span v-else-if="item.daysSincePosted < 25" style="color: gray">{{item.daysSincePosted}}</span>
                    <span v-else="item.daysSincePosted < 30" style="color: red">{{item.daysSincePosted}}</span>
                </td>
                <td>
                    <i class="fa fa-circle" style="font-size: 20px; color: green" v-if="item.acceptanceType == 'Accepted'"></i>
                    <i class="fa fa-circle" style="font-size: 20px; color: red" v-if="item.acceptanceType == 'Declined'"></i>
                    <i class="fa fa-circle" style="font-size: 20px; color: gray" v-if="item.acceptanceType == 'NotReviewed'"></i>
                    <i class="fa fa-check" style="font-size: 20px; color: green; cursor:pointer" @click="acceptJob(item)" v-if="item.acceptanceType == 'NotReviewed'"></i>
                    <i class="fa fa-times" style="font-size: 20px; color: red; cursor: pointer" @click="declineJob(item)" v-if="item.acceptanceType == 'NotReviewed'"></i>
                </td>
            </tr>
            </tbody>
        </table>

        <pagination></pagination>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                jobs: [],
                loading: 0,

            }
        },
        mounted(){
            axios.defaults.headers.common["Authorization"] = 'Bearer ' + this.$store.getters.user.token;
            axios.post('https://lucrez-ceva-test.herokuapp.com/unauthenticated/getAllDetailed/0-12',
                {
                    "locations":[],
                    "types":[],
                    "word":"",
                    "jobAcceptanceType":"All"
                }
            )
                .then(res=>{
                    this.jobs=res.data;
                });
        },
        methods:{
            acceptJob(){

            },
            declineJob(){

            }
        }



    }
</script>

<style>

</style>
<template>
    <div class="container">
        <div class="cardsContainer">
            <div class="cardContainer">
                <i class="fa fa-users iconContaner"></i>
                <animated-number
                        :value="users"
                        :formatValue="formatUsers"
                        :duration="duration"
                />
            </div>

            <div class="cardContainer">
                <i class="fa fa-briefcase iconContaner"></i>
                <animated-number
                        :value="jobs"
                        :formatValue="formatJobs"
                        :duration="duration"
                />
            </div>
        </div>

        <geo-chart chart="chart" :data="[['City', 'number'],['Cluj', 13], ['Iasi', 20], ['Constanta', 20], ['Galati', 1], ['Sibiu', 10]]" :library="{region: 'RO', resolution: 'provinces'}"></geo-chart>

        <area-chart class="chart" :data="{'2017-01-01 00:00:00 -0800': 2, '2017-01-01 00:01:00 -0800': 5}"></area-chart>


    </div>
</template>

<script>
    import AnimatedNumber from 'animated-number-vue';

    export default {
        components:{
            AnimatedNumber
        },
        data(){
            return{
                duration: 3000,
                users: 100,
                jobs: 100,
                usersData: [],
                jobsData: []
            }
        },
        methods:{
            formatUsers(value){
                return `Users: ${Number(value).toFixed(0)}`;
            },
            formatJobs(value){
                return `Jobs: ${Number(value).toFixed(0)}`;
            }
        }
    }
</script>

<style scoped>
    .cardsContainer{
        display: flex;
        flex-wrap: wrap;
        margin: 15px;
        justify-content: center;
    }

    .cardContainer{
        width: 30%;
        height: 200px;
        background-color: #b8cebf;
        border-radius: 9px;
        position: relative;
        margin: 15px;
        min-width: 300px;
    }

    .iconContaner{
         font-size: 148px;
         position: absolute;
         right: 20px;
         top: 27px;
         color: #64a578;
     }

    span{
        font-size: 48px;
        position: relative;
        top: 62px;
    }

    .chart{
        background-color: #d8eae2;
        padding: 10px;
        margin-bottom: 10px;
        margin-top: 10px;
    }

</style>

var app = new Vue({
    el: '#app',
    name: 'App',
    data() {
        return {
            data: [],
            sprintName: ""
        }
    },
    methods: {
        getRandomSprintName() {
            fetch('api/random-sprint-name')
            .then(response => { return response.json() })
            .then(data => {  
                console.log('getRestaurants response:', data);
                this.sprintName = data[0].name;
            })
            .catch(err => { alert('Error:', err) }); 
        }
    }
});
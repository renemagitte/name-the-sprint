
var app = new Vue({
    el: '#app',
    name: 'App',
    data() {
        return {
            sprintName: "",
            loading: false
        }
    },
    methods: {
        getRandomSprintName() {
            this.loading = true;
            fetch('api/random-sprint-name')
            .then(response => { return response.json() })
            .then(data => {  
                console.log('getRandomSprintName response:', data);

                this.sprintName = '"' + data[0].name + '"';

                this.loading = false;
                this.playApplause();
            })
            .catch(err => { alert('Error:', err) }); 
        },
        playApplause() {
            const audio = new Audio('./assets/sounds/applause.mp3'); // path to file
            audio.play();
        }
    }
});
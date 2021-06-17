<template>
    <div>
        <div id="header">
            <div>
                <img src="../assets/logo.png">
                <h1>Vue.js Calendar</h1>
            </div>
            <div>
                <current-month></current-month>
            </div>
        </div>
        <div id="day-bar">
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
        </div>
        <div id="calendar">
            <div v-for="week in weeks" class="calendar-week">
                <calendar-day v-for="day in week" :day="day"></calendar-day>
            </div>
        </div>
        <event-form></event-form>
    </div>
</template>
<script>
    import CalendarDay from './CalendarDay.vue';
    import CurrentMonth from './CurrentMonth.vue';
    import EventForm from './EventForm.vue';
    export default {
        computed: {
            month() {
                return this.$store.state.currentMonth;
            }, 
            year() {
                return this.$store.state.currentYear;
            },
            days() {

                //Generating all days in current month
                let days = [];
                let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D'); //1st day of whatever month, this is the format, and -1 means 1st date
                do { //keep adding current day until we are no longer in this month
                    days.push(currentDay); 
                    currentDay = this.$moment(currentDay).add(1, 'days'); //add current day by one
                } while ((currentDay.month() + 1) === this.month); //this one ensures that we are in the current mine

             
                //Add previous days to start
                currentDay = this.$moment(days[0]);

                const SUNDAY = 0;
                const MONDAY = 1;

                if(currentDay.day() !== MONDAY) {
                    do {
                        currentDay = this.$moment(currentDay).subtract(1, 'days');
                        days.unshift(currentDay);
                    } while(currentDay.day() !== MONDAY);
                }
                
                if(currentDay.day() !== SUNDAY) {
                    //add following days to 
                    currentDay = this.$moment(days[days.length - 1]);
                    do {
                        currentDay = this.$moment(currentDay).add(1, 'days');
                        days.push(currentDay);
                    } while(currentDay.day() !== SUNDAY);
                }

            
                return days;
            },
            weeks() {
                let weeks = [];
                let week = [];

                for(let day of this.days) {
                    week.push(day);
                    if(week.length === 7){
                        weeks.push(week);
                        week = [];
                    }
                }

                return weeks;

            }
        }, 
        components : {
            CalendarDay,
            CurrentMonth,
            EventForm
        }
    }
</script>
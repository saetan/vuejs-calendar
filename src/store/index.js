import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

export default new Vuex.Store({
    state: {
        currentYear: 2021,
        currentMonth: 6,
        eventFormPosX: 0,
        eventFormPosY: 0,
        eventFormActive: false,
        events: [
                {description: "pinoydotoBestDoto1", date: moment('2021-06-01', 'YYYY-MM-DD')},
                {description: "pinoydotoBestDoto2", date: moment('2021-06-05', 'YYYY-MM-DD')},
                {description: "pinoydotoBestDoto3", date: moment('2021-06-11', 'YYYY-MM-DD')}
        ],
        eventFormDate: moment()
    },
    mutations: {
        setCurrentMonth(state, payload) {
            state.currentMonth = payload;
        },
        setCurrentYear(state, payload){
            state.currentYear = payload;
        },
        eventFormPos(state, payload){
            state.eventFormPosX = payload.x;
            state.eventFormPosY = payload.y;
        },
        eventFormActive(state, payload){
            state.eventFormActive = payload;
        },
        addEvent(state, payload) {
            state.events.push({
                description: payload,
                date: state.eventFormDate
            });
        },
        eventFormDate(state, payload){
            state.eventFormDate = payload
        }
    }
});

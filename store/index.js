import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import format from 'date-fns/format'
import setMinutes from 'date-fns/set_minutes'
import setHours from 'date-fns/set_hours'
import addMinutes from 'date-fns/add_minutes'
const { config } = require('./../config.js')

function setHourMinutes (date, hours, minutes) {
  return setHours(setMinutes(date, parseInt(minutes)), parseInt(hours))
}

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    ...config,
    currentDatetime: new Date(2018, 9, 20, 9, 16, 0),
    timetable: {
      '2018-10-20': {
        '08:00': {
          'label': 'Breakfast & Registration',
          'duration': 60
        },
        '09:00': {
          'label': 'Welcome',
          'duration': 15
        },
        '09:15': {
          'label': 'Sandra Rendgen',
          'subtitle': 'Inventing the future, one visualization at a time',
          'type': 'keynote',
          'duration': 45
        },
        '10:00': {
          'label': 'Claudia Rebeca Méndez Escarza',
          'subtitle': 'Mixtec pictorial manuscripts: A source of visual information',
          'duration': 20
        }
      },
      '2018-10-21': {
        '08:00': {
          'label': 'Breakfast & Registration',
          'duration': 60
        },
        '09:00': {
          'label': 'Welcome',
          'duration': 15
        },
        '09:15': {
          'label': 'Sandra Rendgen',
          'subtitle': 'Inventing the future, one visualization at a time',
          'type': 'keynote',
          'duration': 45
        },
        '10:00': {
          'label': 'Claudia Rebeca Méndez Escarza',
          'subtitle': 'Mixtec pictorial manuscripts: A source of visual information',
          'duration': 20
        }
      }
    }
  },
  getters: {
    currentDay: state => {
      return _.get(state.timetable, format(state.currentDatetime, 'YYYY-MM-DD'), [])
    },
    events: (state, getters) => {
      const { currentDatetime } = state
      return _.map(getters.currentDay, (event, time) => {
        const [hours, minutes] = time.split(':')
        const startDatetime = setHourMinutes(currentDatetime, hours, minutes)
        const endDatetime = addMinutes(startDatetime, event.duration)
        return {
          ...event,
          startDatetime,
          endDatetime
        }
      })
    }
  },
  mutations: {
    SET_CURRENT_TIME (state, value) {
      state.currentDatetime = value
    }
  }
})

export default store

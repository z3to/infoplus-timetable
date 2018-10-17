import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import format from 'date-fns/format'
import setMinutes from 'date-fns/set_minutes'
import setHours from 'date-fns/set_hours'
import addMinutes from 'date-fns/add_minutes'
import differenceInMinutes from 'date-fns/difference_in_minutes'
import isWithinRange from 'date-fns/is_within_range'
import getTime from 'date-fns/get_time'
import isBefore from 'date-fns/is_before'
import isAfter from 'date-fns/is_after'
import compareAsc from 'date-fns/compare_asc'
import * as data from '../data/timetable.json'
import VueScrollTo from 'vue-scrollto'

const { config } = require('./../config.js')

function setHourMinutes (date, hours, minutes) {
  return setHours(setMinutes(date, parseInt(minutes)), parseInt(hours))
}

const timetable = _.fromPairs(_.map(data, (events, datum) => {
  const date = new Date(datum)
  let lastStartDateTime = false
  const _events = _.map(_.reverse(events), event => {
    const { daytime, start } = event
    let [hours, minutes] = start.split(':').map(num => parseInt(num, 10))
    if (hours < 12 && daytime === 'pm') {
      hours += 12
    }
    const startDatetime = setHourMinutes(date, hours, minutes)
    let duration = 60
    if (lastStartDateTime) {
      duration = differenceInMinutes(lastStartDateTime, startDatetime)
    }
    const endDatetime = addMinutes(startDatetime, duration)
    lastStartDateTime = startDatetime
    return {
      ...event,
      startDatetime,
      endDatetime,
      id: getTime(startDatetime)
    }
  })
  return [datum, _.reverse(_events)]
}))

Vue.use(Vuex)
Vue.use(VueScrollTo)

const store = () => new Vuex.Store({
  state: {
    ...config,
    currentDatetime: new Date(),
    timetable,
    isDynamicTime: true
  },
  getters: {
    range: state => {
      return _.map(_.keys(timetable), str => {
        const parts = str.split('-')
        return new Date(parts[0], parts[1] - 1, parts[2])
      }).sort(compareAsc)
    },
    startRange: (state, getters) => {
      return _.head(getters.range)
    },
    endRange: (state, getters) => {
      return _.last(getters.range)
    },
    tooEarly: (state, getters) => {
      return isBefore(state.currentDatetime, getters.startRange)
    },
    tooLate: (state, getters) => {
      return isAfter(state.currentDatetime, getters.endRange)
    },
    currentDay: (state, getters) => {
      const { tooEarly, tooLate, startRange, endRange } = getters
      let currentDateTime = state.currentDatetime
      if (tooEarly) {
        currentDateTime = startRange
      } else if (tooLate) {
        currentDateTime = endRange
      }
      return _.get(state.timetable, format(currentDateTime, 'YYYY-MM-DD'))
    },
    isMorning: (state, getters) => {
      const { currentDatetime } = state
      const { currentDay } = getters
      return isBefore(currentDatetime, _.head(currentDay).startDatetime)
    },
    isEvening: (state, getters) => {
      const { currentDatetime } = state
      const { currentDay } = getters
      return isAfter(currentDatetime, _.last(currentDay).endDatetime)
    },
    currentEvent: (state, getters) => {
      const { currentDatetime } = state
      const { currentDay } = getters
      const el = _.find(currentDay, event => {
        const { startDatetime, endDatetime } = event
        return isWithinRange(currentDatetime, startDatetime, endDatetime)
      })

      return _.get(el, 'id', 0)
    }
  },
  mutations: {
    SET_CURRENT_TIME (state, value) {
      state.isDynamicTime = false
      state.currentDatetime = value
    },
    UPDATE_CURRENT_TIME (state) {
      state.currentDatetime = new Date()
    },
    SET_DYNAMIC_TIME (state, value) {
      state.isDynamicTime = value
    }
  },
  actions: {
    updateTime ({ state, commit }) {
      if (state.isDynamicTime) {
        commit('UPDATE_CURRENT_TIME')
      }
    },
    toggleDynamicTime ({ commit }) {
      commit('TOGGLE_DYNAMIC_TIME')
    }
  }
})

export default store

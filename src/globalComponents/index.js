import Vue from 'vue'
import CInput from '@/components/cInput/CInput.vue'
import CInputNumber from '@/components/cInput/CInputNumber.vue'
import CTextArea from '@/components/cInput/CTextArea.vue'
import CSelect from '@/components/cSelect/CSelect.vue'
import AmountRangeSelect from '@/components/cSelect/AmountRangeSelect.vue'
import DateRangeSelect from '@/components/cSelect/DateRangeSelect.vue'
import CDate from '@/components/cSelect/CDate.vue'
import CDateTime from '@/components/cSelect/CDateTime.vue'
import SearchButton from '@/components/button/SearchButton.vue'
import ResetButton from '@/components/button/ResetButton.vue'
import CreateButton from '@/components/button/CreateButton.vue'
import BackButton from '@/components/button/BackButton.vue'
import Pagination from '@/components/pagination/Pagination.vue'

Vue.component('c-input', CInput)
Vue.component('c-input-number', CInputNumber)
Vue.component('c-text-area', CTextArea)
Vue.component('c-select', CSelect)
Vue.component('amount-range-select', AmountRangeSelect)
Vue.component('date-range-select', DateRangeSelect)
Vue.component('c-date', CDate)
Vue.component('c-date-time', CDateTime)
Vue.component('search-button', SearchButton)
Vue.component('reset-button', ResetButton)
Vue.component('create-button', CreateButton)
Vue.component('back-button', BackButton)
Vue.component('pagination', Pagination)
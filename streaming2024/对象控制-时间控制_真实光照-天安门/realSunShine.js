let sceneIsLoaded = false;
let currentDate = new Date();
let selectedWeatherValue = 'Sunny';
let selectedWeatherName = '晴天';
let selectedData = {};
let flagData = [];
let selectedSolarTerms = null;
let curSelectedSpeed = 1;
let isDateDisabled = false;
let isTimeDisabled = false;
let selectedYear = 2024;
let months = [];
let selectedMoth = 04;
let years = [];
let selectedDay = 22;
let daysThis = [];
let selectedHour = 22;
let hours = [];
let selectedMinute = 22;
let minutes = [];
let selectedSecond = 22;
let seconds = [];

let weather = [
  {
    name: '晴天',
    value: 'Sunny',
  },
  {
    name: '晴间少云',
    value: 'PartlyCloudy',
  },
  {
    name: '晴间多云',
    value: 'Cloudy',
  },
  {
    name: '阴天',
    value: 'Overcast',
  },
  {
    name: '小雨',
    value: 'LightRain',
  },
  {
    name: '中雨',
    value: 'ModerateRain',
  },
  {
    name: '大雨',
    value: 'HeavyRain',
  },
  {
    name: '小雪',
    value: 'LightSnow',
  },
  {
    name: '中雪',
    value: 'ModerateSnow',
  },
  {
    name: '大雪',
    value: 'HeavySnow',
  },
  {
    name: '扬尘',
    value: 'Dust',
  },
  {
    name: '雾霾',
    value: 'Haze',
  },
];

let SolarTerms = [
  {
    name: '自定义',
    value: '',
  },
  {
    name: '春分',
    value: '03/21',
  },
  {
    name: '夏至',
    value: '06/22',
  },
  {
    name: '秋分',
    value: '09/23',
  },
  {
    name: '冬至',
    value: '12/22',
  },
];

// 加载请求国旗升降时间数据
getFlagUpDownTimeData();

// 获取相关标签的 dom
let divMaskDom = null;
let divSetDateDom = null;
let divSetTimeDom = null;
let divSetWeatherDom = null;

let formatDateValueDom = null;
let formatTimeValueDom = null;
let weatherNameDom = null;

let seasonSelectDom = null;
let selectYearDom = null;
let selectMonthDom = null;
let selectDayDom = null;
let selectHourDom = null;
let selectMinutesDom = null;
let selectSecondsDom = null;
let selectWeatherDom = null;

window.onload = function () {
  init();

  // 获取时间面板遮罩 dom 初始化为隐藏状态
  divMaskDom = document.querySelector('.divMask');
  divMaskDom.style.display = 'none';

  // 获取时间日期及天气弹窗 dom 初始化为隐藏状态
  divSetDateDom = document.querySelector('.divWindow.divSetDate');
  divSetTimeDom = document.querySelector('.divWindow.divSetTime');
  divSetWeatherDom = document.querySelector('.divWindow.divSetWeather');
  divSetDateDom.style.display = 'none';
  divSetTimeDom.style.display = 'none';
  divSetWeatherDom.style.display = 'none';

  // 获取显示时间 dom 初始化时间
  formatDateValueDom = document.querySelector('.divShowValue.format-date');
  formatTimeValueDom = document.querySelector('.divShowValue.format-time');
  formatDateValueDom.innerText = formatDate(currentDate, 'YYYY/MM/DD');
  formatTimeValueDom.innerText = formatDate(currentDate, 'HH:mm:ss');

  // 获取天气相关 dom 设置初始值及下拉框内容
  weatherNameDom = document.querySelector('.divShowValue.weather-name');
  weatherNameDom.innerText = selectedWeatherName;
  selectWeatherDom = document.querySelector('#selWeather');
  setSelectOption(selectWeatherDom, weather);

  // 获取相关日期时间下拉框 dom 设置下拉框内容
  seasonSelectDom = document.querySelector('#seasonSelect');
  setSelectOption(seasonSelectDom, SolarTerms);
  selectYearDom = document.querySelector('.divSelectDate .select-year');
  setSelectOption(selectYearDom, years);
  selectMonthDom = document.querySelector('.divSelectDate .select-month');
  setSelectOption(selectMonthDom, months);
  selectDayDom = document.querySelector('.divSelectDate .select-day');
  setSelectOption(selectDayDom, daysThis);
  selectHourDom = document.querySelector('.divSelectDate .select-hour');
  setSelectOption(selectHourDom, hours);
  selectMinutesDom = document.querySelector('.divSelectDate .select-minutes');
  setSelectOption(selectMinutesDom, minutes);
  selectSecondsDom = document.querySelector('.divSelectDate .select-seconds');
  setSelectOption(selectSecondsDom, seconds);

  selectYearDom.value = selectedYear;
  selectMonthDom.value = selectedMoth;
  selectDayDom.value = selectedDay;
  selectHourDom.value = selectedHour;
  selectMinutesDom.value = selectedMinute;
  selectSecondsDom.value = selectedSecond;

  //var this.currentDate = new Date();
};

// 初始化场景
function init() {
  //定时更新时间
  window.setInterval(function () {
    var date = new Date(currentDate);
    date.setSeconds(date.getSeconds() + 1 * curSelectedSpeed);
    currentDate = date;
    var formattedDateTime = formatDate(currentDate, 'HH:mm:ss');

    if (sceneIsLoaded == true) {
      window.setEnvTime(currentDate, formattedDateTime);
    }

    // 更新时间
    formatDateValueDom.innerText = formatDate(currentDate, 'YYYY/MM/DD');
    formatTimeValueDom.innerText = formatDate(currentDate, 'HH:mm:ss');
  }, 1000);

  //初始化流场景
  window.appInstance = new TGApp.App();
  window.appInstance.initService(
    {
      container: document.getElementById('container'),
      mode: 'streaming',
      token: streaming2024Config.gisToken, //StreamingServer服务器获取token
      url: streaming2024Config.url, //StreamingServer服务器接口地址和端口，需要进行替换为实际地址
    },
    (result) => {
      window.appInstance.uniCall(
        'addEventListener',
        {
          eventName: 'onServiceInit',
          callback: (res) => {
            sceneIsLoaded = true;
            showDate();
            showTime();
            console.log(result);
          },
        },
        (result) => {
          console.log(result);
        }
      );
    }
  );
}

// 修改天气
function changeWeather() {
  divSetWeatherDom.style.display = 'none';
  divMaskDom.style.display = 'none';

  var sel = document.getElementById('selWeather');
  selectedWeatherName = weather[sel.selectedIndex].name;
  weatherNameDom.innerText = selectedWeatherName;

  window.appInstance.uniCall(
    'setEnvWeather',
    {
      envWeather: selectedWeatherValue,
    },
    (result) => {
      console.log(result);
    }
  );
}

//全局方法-调用API设置时间
function setEnvTime(date, time) {
  var formattedDate = formatDate(date, 'YYYY/MM/DD');

  window.appInstance.uniCall(
    'setEnvTime',
    {
      envTime: time,
      envDate: formattedDate,
      fixedTime: false,
      alwaysForward: false,
      duration: 1,
    },
    (result) => {
      console.log('setEnvTime:' + result);
    }
  );
}

// 显示日期
function showDate() {
  var formattedDate = formatDate(currentDate, 'YYYY/MM/DD');
  var formattedDateTime = formatDate(currentDate, 'HH:mm:ss');
  if (window.appInstance) {
    window.setEnvTime(currentDate, formattedDateTime);
  }

  getFlagTimeByDate(formattedDate);
}

//显示时间
function showTime() {
  var formattedDateTime = formatDate(currentDate, 'HH:mm:ss');
  if (window.appInstance) {
    window.setEnvTime(currentDate, formattedDateTime);
  }

  console.log('showTime:' + formattedDateTime);
}

// 根据日期获取国旗当天的升降时间
function getFlagTimeByDate(date) {
  selectedData = flagData.filter((obj) => {
    if (obj.date == date) {
      return obj;
    }
  });
}

// 加载请求国旗升降时间数据
function getFlagUpDownTimeData() {
  //加载国旗升降时间
  fetch('flagUpDownTime.json', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((res) => {
      flagData = res;

      var formattedDate = formatDate(currentDate, 'YYYY/MM/DD');

      selectedData = flagData.filter((obj) => {
        if (obj.date == formattedDate) {
          return obj;
        }
      });
    });

  for (let i = 0; i < 4; i++) {
    let start = 2021;
    years[i] = start + i;
  }

  for (let i = 0; i < 12; i++) {
    let start = 1;
    months[i] = padZero(start + i);
  }

  var days = new Date(selectedYear, selectedMoth, 0).getDate();
  for (let i = 0; i < days; i++) {
    let start = 1;
    daysThis[i] = padZero(start + i);
  }

  for (let i = 0; i < 24; i++) {
    let start = 0;
    hours[i] = padZero(start + i);
  }

  for (let i = 0; i < 60; i++) {
    let start = 0;
    minutes[i] = padZero(start + i);
  }

  for (let i = 0; i < 60; i++) {
    let start = 0;
    seconds[i] = padZero(start + i);
  }

  selectedYear = currentDate.getFullYear();
  selectedMoth = padZero(currentDate.getMonth() + 1);
  selectedDay = padZero(currentDate.getDate());
  selectedHour = padZero(currentDate.getHours());
  selectedMinute = padZero(currentDate.getMinutes());
  selectedSecond = padZero(currentDate.getSeconds());
}

function padZero(value) {
  return value < 10 ? '0' + value : value;
}

//设置日期按钮
function setDate() {
  divMaskDom.style.display = 'block';

  divSetDateDom.style.display = 'block';
}

//设置时间按钮
function setTime() {
  isTimeDisabled = false;
  selectHourDom.removeAttribute('disabled');
  selectMinutesDom.removeAttribute('disabled');
  selectSecondsDom.removeAttribute('disabled');

  divSetTimeDom.style.display = 'block';
  divMaskDom.style.display = 'block';
}
//设置天气按钮
function setWeather() {
  divSetWeatherDom.style.display = 'block';
  divMaskDom.style.display = 'block';
}

//关闭弹窗
function closeWindow() {
  divMaskDom.style.display = 'none';

  divSetDateDom.style.display = 'none';
  divSetTimeDom.style.display = 'none';
  divSetWeatherDom.style.display = 'none';

  let timeSelectDom = document.querySelector('#timeSelect');
  timeSelectDom.value = 'null';
}

// 回到现在
function goToToday() {
  currentDate = new Date();

  showTime();
  showDate();
}

// 更新倍速
function updateSpped(num) {
  curSelectedSpeed = num;
}

// 切换节气
function changeSolarTerms() {
  selectedSolarTerms = seasonSelectDom.value;

  if (selectedSolarTerms == '') {
    isDateDisabled = false;
    selectMonthDom.removeAttribute('disabled');
    selectDayDom.removeAttribute('disabled');
    return;
  }
  isDateDisabled = true;
  selectMonthDom.setAttribute('disabled', true);
  selectDayDom.setAttribute('disabled', true);

  let [moth, day] = selectedSolarTerms.split('/');
  selectedYear = currentDate.getFullYear();
  selectedMoth = moth;
  selectedDay = day;
  selectYearDom.value = selectedYear;
  selectMonthDom.value = selectedMoth;
  selectDayDom.value = selectedDay;
}

// 切换年份
function changeYear(event) {
  selectedYear = event.target.value;
  var days = new Date(selectedYear, parseInt(selectedMoth) - 1, 0).getDate();

  daysThis = [];
  for (let i = 0; i < days; i++) {
    let start = 1;
    daysThis[i] = padZero(start + i);
  }

  if (selectedDay > days) {
    selectedDay = '01';
  }
}

// 切换月份
function changeMonth(event) {
  selectedMoth = event.target.value;
  daysThis = [];
  var days = new Date(selectedYear, parseInt(selectedMoth) - 1, 0).getDate();
  for (let i = 0; i < days; i++) {
    let start = 1;

    daysThis[i] = padZero(start + i);
  }

  if (selectedDay > days) {
    selectedDay = '01';
  }
}
// 切换日期
function changeDay(event) {
  selectedDay = event.target.value;
}

// 修改日期
function updateDate() {
  divSetDateDom.style.display = 'none';
  divMaskDom.style.display = 'none';

  //将修改后的日期+时分秒 更新到全局this.currentDate 上
  var hour = currentDate.getHours();
  var minute = currentDate.getMinutes();
  var second = currentDate.getSeconds();

  currentDate = new Date(selectedYear, parseInt(selectedMoth) - 1, selectedDay, hour, minute, second);

  showDate();
}

// 切换升旗时间、降旗时间
function changeUpOrDownTime(event) {
  var value = event.target.value;
  if (value == 'null') {
    isTimeDisabled = false;
    selectHourDom.removeAttribute('disabled');
    selectMinutesDom.removeAttribute('disabled');
    selectSecondsDom.removeAttribute('disabled');
    return;
  }
  isTimeDisabled = true;
  selectHourDom.setAttribute('disabled', true);
  selectMinutesDom.setAttribute('disabled', true);
  selectSecondsDom.setAttribute('disabled', true);

  let time = formatDate(currentDate, 'HH:mm');
  if (value == 'upTime') {
    time = selectedData[0].upTime;
  } else if (value == 'downTime') {
    time = selectedData[0].downTime;
  } else {
    return;
  }

  let [hour, minute] = time.split(':');
  selectedHour = hour;
  selectedMinute = minute;
  selectedSecond = '00';

  selectHourDom.value = selectedHour;
  selectMinutesDom.value = selectedMinute;
  selectSecondsDom.value = selectedSecond;
}

// 选择框选择后更新数据值
function changeUpdateHour(event) {
  let value = event.target.value;
  selectedHour = value;
}
function changeUpdateMinute(event) {
  let value = event.target.value;
  selectedMinute = value;
}
function changeUpdateSecond(event) {
  let value = event.target.value;
  selectedSecond = value;
}
function changeUpdateWeather(event) {
  let value = event.target.value;
  selectedWeatherValue = value;
}

// 修改时间
function updateTime() {
  divSetTimeDom.style.display = 'none';
  divMaskDom.style.display = 'none';

  var year = currentDate.getFullYear();
  var month = currentDate.getMonth();
  var day = currentDate.getDate();

  let date = new Date(year, month, day, selectedHour, selectedMinute, selectedSecond);
  currentDate = date;

  formatTimeValueDom.innerText = formatDate(currentDate, 'HH:mm:ss');

  showTime();
}

// 格式化日期时间
function formatDate(date, format = 'YYYY/MM/DD HH:mm:ss') {
  if (!date) return '';
  date = new Date(date);
  const year = date.getFullYear();
  let hour = date.getHours();
  const isMS = year == 1970;
  if (isMS) {
    hour -= 8;
  }
  var o = {
    'M+': date.getMonth() + 1, //月份
    'D+': date.getDate(), //日
    'H+': hour, //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
  };
  if (/(Y+)/.test(format)) format = format.replace(RegExp.$1, (year + '').substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }

  return format;
}

// 设置相关的下拉框内容
function setSelectOption(element, data) {
  let optionDomStr = '';
  data.forEach((item) => {
    if (typeof item == 'object') {
      optionDomStr += `<option value="${item.value}">${item.name}</option>`;
    } else {
      optionDomStr += `<option value="${item}">${item}</option>`;
    }
  });
  element.innerHTML = optionDomStr;
}

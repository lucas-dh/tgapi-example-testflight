//返回实时时间
var divShowValue = document.getElementsByClassName('divShowValue');
//时间参数
var formattedDate = divShowValue[0];
var formattedDateTime = divShowValue[1];
var currentDate = new Date();
//显隐参数
var showSetDate = false;
var showSetTime = false;
var showSetWeather = false;

var isDateDisabled = false;
var selectedYear = 2024;
var selectedMoth = 04;
var selectedDay = 22;
var months = [2024, 2023];

var years = [];
var days = [];
var hours = [];
var minutes = [];
var seconds = [];
var selectedSolarTerms = '';
var selectedPredefinedTime = '';
var isTimeDisabled = false;
var selectedHour = 22;
var selectedMinute = 22;
var selectedSecond = 22;
var selectedWeatherName = '晴天';
var selectedWeatherValue = 'Sunny';
var showViewImageDialog = false;
//默认参数
var SolarTerms = [
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
var predefinedTimes = [
  {
    name: '自定义',
    value: '',
  },
  {
    name: '06:00',
    value: '06:00:00',
  },

  {
    name: '08:00',
    value: '08:00:00',
  },
  {
    name: '10:00',
    value: '10:00:00',
  },
  {
    name: '12:00',
    value: '12:00:00',
  },
  {
    name: '14:00',
    value: '14:00:00',
  },
  {
    name: '16:00',
    value: '16:00:00',
  },
  {
    name: '18:00',
    value: '18:00:00',
  },
];

//初始化场景
function init() {
  let _this = this;
  //定时更新时间
  window.setInterval(function () {
    var date = new Date(_this.currentDate);
    date.setSeconds(date.getSeconds() + 1);
    _this.currentDate = date;
    var formattedDateTime = moment(_this.currentDate).format('HH:mm:ss');

    if (_this.sceneIsLoaded == true) {
      setEnvTime(_this.currentDate, formattedDateTime);
    }
  }, 1000);

  //初始化流场景
  window.appInstance = new TGApp.App();
  window.appInstance.initService(
    {
      container: document.getElementById('container'),
      mode: 'streaming',
      token: streaming2024Config.sundialToken, //StreamingServer服务器获取token
      url: streaming2024Config.url, //StreamingServer服务器接口地址和端口，需要进行替换为实际地址
    },
    (result) => {
      window.appInstance.uniCall(
        'addEventListener',
        {
          eventName: 'onServiceInit',
          callback: (res) => {
            this.sceneIsLoaded = true;
            this.showDate();
            this.showTime();

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

//修改天气
function changeWeather() {
  showSetWeather = false;

  var sel = document.getElementById('selWeather');
  selectedWeatherName = weather[sel.selectedIndex].name;

  window.appInstance.uniCall(
    'setEnvWeather',
    {
      envWeather: selectedWeatherValue,
    },
    (result) => {
      console.log(result);
    }
  );
  elementConcealment();
}

//全局方法-调用API设置时间
function setEnvTime(date, time) {
  var formattedDate = moment(date).format('YYYY/MM/DD');

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

//显示日期
function showDate() {
  var formattedDateTime = moment(currentDate).format('HH:mm:ss');
  if (window.appInstance) {
    setEnvTime(currentDate, formattedDateTime);
  }
}

//格式化时间轴
function moment(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  return {
    format: function (formatString) {
      const year = dateTime.getFullYear();
      const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
      const day = dateTime.getDate().toString().padStart(2, '0');
      const hours = dateTime.getHours().toString().padStart(2, '0');
      const minutes = dateTime.getMinutes().toString().padStart(2, '0');
      const seconds = dateTime.getSeconds().toString().padStart(2, '0');

      let formattedDateTime = formatString.replace('YYYY', year);
      formattedDateTime = formattedDateTime.replace('MM', month);
      formattedDateTime = formattedDateTime.replace('DD', day);
      formattedDateTime = formattedDateTime.replace('HH', hours);
      formattedDateTime = formattedDateTime.replace('mm', minutes);
      formattedDateTime = formattedDateTime.replace('ss', seconds);

      return formattedDateTime;
    },
    addDays: function (days) {
      const newDateTime = new Date(dateTime);
      newDateTime.setDate(dateTime.getDate() + days);
      return moment(newDateTime.toISOString());
    },
  };
}

setInterval(() => {
  formattedDate.innerHTML = moment(currentDate).format('YYYY/MM/DD');
  formattedDateTime.innerHTML = moment(currentDate).format('HH:mm:ss');
}, 1000);

//绘制select标签
function selectGenerate() {
  var seasonSelect = document.getElementById('seasonSelect');
  seasonSelect.innerHTML = '';
  SolarTerms.forEach((value) => {
    var option = document.createElement('option');
    option.text = value.name;
    option.value = value.value;
    seasonSelect.appendChild(option);
  });
  seasonSelect.value = selectedSolarTerms;

  var seasonSelectOne = document.getElementById('seasonSelectOne');
  seasonSelectOne.innerHTML = '';
  years.forEach((value) => {
    var option = document.createElement('option');
    option.text = value;
    option.value = value;
    seasonSelectOne.appendChild(option);
  });
  seasonSelectOne.value = selectedYear;

  var seasonSelectTwo = document.getElementById('seasonSelectTwo');
  seasonSelectTwo.innerHTML = '';
  months.forEach((value) => {
    var option = document.createElement('option');
    option.text = value;
    option.value = value;
    seasonSelectTwo.appendChild(option);
  });
  seasonSelectTwo.value = selectedMoth;

  var seasonSelectThree = document.getElementById('seasonSelectThree');
  seasonSelectThree.innerHTML = '';
  days.forEach((value) => {
    var option = document.createElement('option');
    option.text = value;
    option.value = value;
    seasonSelectThree.appendChild(option);
  });
  seasonSelectThree.value = selectedDay;

  var timeSelect = document.getElementById('timeSelect');
  timeSelect.innerHTML = '';
  predefinedTimes.forEach((value) => {
    var option = document.createElement('option');
    option.text = value.name;
    option.value = value.value;
    timeSelect.appendChild(option);
  });
  timeSelect.value = selectedPredefinedTime;

  var timeSelectOne = document.getElementById('timeSelectOne');
  timeSelectOne.innerHTML = '';
  hours.forEach((value) => {
    var option = document.createElement('option');
    option.text = value;
    option.value = value;
    timeSelectOne.appendChild(option);
  });
  timeSelectOne.value = selectedHour;

  var timeSelectTwo = document.getElementById('timeSelectTwo');
  timeSelectTwo.innerHTML = '';
  minutes.forEach((value) => {
    var option = document.createElement('option');
    option.text = value;
    option.value = value;
    timeSelectTwo.appendChild(option);
  });
  timeSelectTwo.value = selectedMinute;

  var timeSelectThree = document.getElementById('timeSelectThree');
  timeSelectThree.innerHTML = '';
  seconds.forEach((value) => {
    var option = document.createElement('option');
    option.text = value;
    option.value = value;
    timeSelectThree.appendChild(option);
  });
  timeSelectThree.value = selectedSecond;
}

function createds() {
  for (let i = 0; i < 5; i++) {
    let start = 2021;
    years[i] = start + i;
  }

  for (let i = 0; i < 12; i++) {
    let start = 1;
    months[i] = padZero(start + i);
  }

  var day = new Date(selectedYear, selectedMoth, 0).getDate();
  for (let i = 0; i < day; i++) {
    let start = 1;
    days[i] = padZero(start + i);
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
  selectGenerate();
}

function padZero(value) {
  return value < 10 ? '0' + value : value;
}

//显示时间
function showTime() {
  var formattedDateTime = moment(this.currentDate).format('HH:mm:ss');
  if (window.appInstance) {
    setEnvTime(this.currentDate, formattedDateTime);
  }

  console.log('showTime:' + formattedDateTime);
}

//设置日期
function setDate() {
  showSetDate = true;
  //判断要素显隐
  elementConcealment();
}

function setTime() {
  showSetTime = true;
  //判断要素显隐
  elementConcealment();
}

function setWeather() {
  showSetWeather = true;
  //判断要素显隐
  elementConcealment();
}

function closeWindow() {
  showSetDate = false;
  showSetTime = false;
  showSetWeather = false;
  //判断要素显隐
  elementConcealment();
}

function elementConcealment() {
  if (showSetDate || showSetTime || showSetWeather) {
    document.getElementsByClassName('divMask')[0].style.display = 'block';
  } else {
    document.getElementsByClassName('divMask')[0].style.display = 'none';
  }
  if (showSetDate) {
    document.getElementsByClassName('divSetDate')[0].style.display = 'block';
  } else {
    document.getElementsByClassName('divSetDate')[0].style.display = 'none';
  }
  if (showSetTime) {
    document.getElementsByClassName('divSetTime')[0].style.display = 'block';
  } else {
    document.getElementsByClassName('divSetTime')[0].style.display = 'none';
  }
  if (showViewImageDialog) {
    document.getElementsByClassName('view-image-dialog-container')[0].style.display = 'flex';
  } else {
    document.getElementsByClassName('view-image-dialog-container')[0].style.display = 'none';
  }
}

//回到现在
function goToToday() {
  currentDate = new Date();

  showTime();
  showDate();
}

//修改节气
function changeSolarTerms() {
  var value = document.getElementById('seasonSelect').value;
  selectedSolarTerms = value;
  if (value == '') {
    isDateDisabled = false;
    return;
  }
  isDateDisabled = true;
  let [moth, day] = value.split('/');
  selectedYear = currentDate.getFullYear();
  selectedMoth = moth;
  selectedDay = day;
  selectGenerate();
}

//切换年份
function changeYear() {
  selectedYear = document.getElementById('seasonSelectOne').value;
  var days = new Date(selectedYear, parseInt(selectedMoth) - 1, 0).getDate();

  days = [];
  for (let i = 0; i < days; i++) {
    let start = 1;
    days[i] = padZero(start + i);
  }

  if (selectedDay > days) {
    selectedDay = '01';
  }
}

//切换月份
function changeMonth() {
  selectedMoth = document.getElementById('seasonSelectTwo').value;
  days = [];
  var days = new Date(selectedYear, parseInt(selectedMoth) - 1, 0).getDate();
  for (let i = 0; i < days; i++) {
    let start = 1;

    days[i] = padZero(start + i);
  }

  if (selectedDay > days) {
    selectedDay = '01';
  }
}

function changeDay() {
  selectedDay = document.getElementById('selectedDay').value;
}

//修改日期
function updateDate() {
  showSetDate = false;

  //将修改后的日期+时分秒 更新到全局currentDate 上
  var hour = currentDate.getHours();
  var minute = currentDate.getMinutes();
  var second = currentDate.getSeconds();

  currentDate = new Date(selectedYear, parseInt(selectedMoth) - 1, selectedDay, hour, minute, second);

  showDate();
  selectGenerate();
  elementConcealment();
}

//切换预定义时间
function changePredefinedTime() {
  var value = document.getElementById('timeSelect').value;
  selectedPredefinedTime = value;
  if (value == '') {
    isTimeDisabled = false;
    return;
  }
  isTimeDisabled = true;
  let [hour, minute, second] = value.split(':');
  selectedHour = hour;
  selectedMinute = minute;
  selectedSecond = second;
  selectGenerate();
}

//切换预定义时间
function changeHour() {
  selectedHour = document.getElementById('timeSelectOne').value;
}

//切换预定义时间
function changeMinute() {
  selectedMinute = document.getElementById('timeSelectTwo').value;
}

//切换预定义时间
function changeSecond() {
  selectedSecond = document.getElementById('timeSelectThree').value;
}

//修改时间
function updateTime() {
  showSetTime = false;
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth();
  var day = currentDate.getDate();

  let date = new Date(year, month, day, selectedHour, selectedMinute, selectedSecond);
  currentDate = date;
  showTime();
  selectGenerate();
  elementConcealment();
}

// 放大预览图片
function viewImageClick() {
  showViewImageDialog = true;
  elementConcealment();
}

//缩小
function viewOffImageClick() {
  showViewImageDialog = false;
  elementConcealment();
}

window.onload = function () {
  init();
  createds();
};

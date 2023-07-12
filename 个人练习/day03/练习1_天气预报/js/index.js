/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */
function getWerther(code) {
    myAxios({url: 'http://hmajax.itheima.net/api/weather', params: {city: code}})
        .then(result => {
            console.log(result)
            document.querySelector('.title').innerHTML = ` <span class="dateShort">${result.data.dateShort}</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">${result.data.dateLunar}</span>
        </span>`
            document.querySelector('.area').innerHTML = result.data.area

            document.querySelector('.weather-box').innerHTML = ` <div class="tem-box">
        <span class="temp">
          <span class="temperature">${result.data.temperature}</span>
          <span>°</span>
        </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${result.data.psPm25}</span>
          <span class="psPm25Level">${result.data.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src="${result.data.weatherImg}" class="weatherImg" alt="">
            <span class="weather">${result.data.weather}</span>
          </li>
          <li class="windDirection">${result.data.windDirection}</li>
          <li class="windPower">${result.data.windPower}</li>
        </ul>
      </div>`

            const todayWeather = result.data.todayWeather
            document.querySelector('.today-weather').innerHTML = ` <div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weather">${todayWeather.weather}</span>
          <span class="temNight">${todayWeather.temNight}</span>
          <span>-</span>
          <span class="temDay">${todayWeather.temDay}</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">${todayWeather.ultraviolet}</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${todayWeather.humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${todayWeather.sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${todayWeather.sunsetTime}</span>
        </li>
      </ul>`

            document.querySelector(".week-wrap").innerHTML = result.data.dayForecast.map(item => {
                return `<li class="item">
          <div class="date-box">
            <span class="dateFormat">${item.dateFormat}</span>
            <span class="date">${item.date}</span>
          </div>
          <img src="${item.weatherImg}" alt="" class="weatherImg">
          <span class="weather">${item.weather}</span>
          <div class="temp">
            <span class="temNight">${item.temNight}</span>-
            <span class="temDay">${item.temDay}</span>
            <span>℃</span>
          </div>
          <div class="wind">
            <span class="windDirection">${item.windDirection}</span>
            <span class="windPower">&lt;${item.windPower}</span>
          </div>
        </li>`
            }).join('')

        })
    document.querySelector('.search-city').addEventListener('input',(e)=>{
        myAxios({url: 'http://hmajax.itheima.net/api/weather/city',params: {city: e.target.value}})
            .then(result=>{
                console.log(result)
                document.querySelector('.search-list').innerHTML=result.data.map(item=>{
                    return `<li class="city-item" data-code="${item.code}">${item.name}</li>`
                }).join('')
            })
    })
    document.querySelector('.search-list').addEventListener('click',(e)=>{
        if(e.target.className==='city-item'){
         getWerther(e.target.dataset.code)
        }
    })
}

getWerther("110100")
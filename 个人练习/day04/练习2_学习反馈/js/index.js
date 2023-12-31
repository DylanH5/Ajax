/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */
function getProvice() {
    axios({url: 'http://hmajax.itheima.net/api/province'})
        .then(result => {
            document.querySelector('.province').innerHTML =
                '<option value="">省份</option>' +
                result.data.list.map(item => {
                    return `<option value=${item}>${item}</option>`
                }).join('')
        })
}

getProvice()
document.querySelector('.province').addEventListener('change', async (e) => {
    const cityList = await axios({url: 'http://hmajax.itheima.net/api/city', params: {pname: e.target.value}})
    document.querySelector('.city').innerHTML =
        '<option value="">城市</option>' +
        cityList.data.list.map(item => {
            return `<option value=${item}>${item}</option>`
        }).join('')
    document.querySelector('.area').innerHTML = '<option value="">地区</option>'
})
document.querySelector('.city').addEventListener('change', async (e) => {
    const cityList = await axios({
        url: 'http://hmajax.itheima.net/api/area', params: {
            pname: document.querySelector('.province').value,
            cname: e.target.value
        }
    })
    document.querySelector('.area').innerHTML =
        '<option value="">地区</option>' +
        cityList.data.list.map(item => {
            return `<option value=${item}>${item}</option>`
        }).join('')
})

document.querySelector('.submit').addEventListener('click', async () => {
    const infoForm = document.querySelector('.info-form')
    const data = serialize(infoForm, {hash: true, empty: false})
   const result=await axios({
        url: 'http://hmajax.itheima.net/api/feedback',
        thead: 'POST',
        data
    })
    console.dir(result)
    alert(result.data.message)
})
/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = '老李'

function getUserInfo() {
    axios({
        url: `http://hmajax.itheima.net/api/settings`,
        params: {
            creator
        }
    }).then(result => {
        const user = result.data.data;
        console.log(user)
        Object.keys(user).forEach(key => {
            if (`avatar` === key) {
                document.querySelector('.prew').src = user[key]
            } else if ('gender' === key) {
                document.querySelectorAll('.gender')[user[key]].checked = true
            } else {
                document.querySelector(`.${key}`).value = user[key]
            }
        })
    })
}

getUserInfo()

/**
 * 编辑用户信息
 */
document.querySelector('.submit').addEventListener('click', () => {
    const userForm = document.querySelector('.user-form')
    const user = serialize(userForm, {hash: true, empty: false})
    user.gender = +user.gender
    user.creator = creator
    console.log(user)
    axios({
        url: `http://hmajax.itheima.net/api/settings`,
        method: `PUT`,
        data: user
    }).then(result => {
        const toastDom = document.querySelector('.toast');
        const toast = new bootstrap.Toast(toastDom)
        toast.show()
        getUserInfo()
    })
})
/**
 * 编辑头像
 */
document.querySelector('.upload').addEventListener("change", e => {
    const file = e.target.files[0]
    console.log(file)
    const formData=new FormData()
    formData.append(`avatar`,file)
    formData.append(`creator`,creator)
    axios({
        url:`http://hmajax.itheima.net/api/avatar`,
        method: `PUT`,
        data: formData
    }).then(result => {
        console.log(result)
        const toastDom = document.querySelector('.toast');
        const toast = new bootstrap.Toast(toastDom)
        toast.show()
        document.querySelector('.prew').src = result.data.data.avatar
    })
})
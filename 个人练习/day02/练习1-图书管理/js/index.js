/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */
const creator = '老李'

function getBookList() {
    axios({
        url: `http://hmajax.itheima.net/api/books?creator=${creator}`
    }).then(result => {
        const list = result.data.data
        document.querySelector('.list').innerHTML = list.map((item, index) => {
            return `<tr>
                <td>${index + 1}</td>
                <td>${item.bookname}</td>
                <td>${item.author}</td>
                <td>${item.publisher}</td>
                <td data-id="${item.id}">
                    <span class="del">删除</span>
                    <span class="edit">编辑</span>
                </td>
            </tr>`
        }).join('')
    })
}

getBookList()
/**
 * 新增图书
 * @type {Element}
 */
const addModal = document.querySelector('.add-modal');
const addDialog = new bootstrap.Modal(addModal)
document.querySelector('.add-btn').addEventListener('click', () => {
    const addForm = document.querySelector('.add-form')
    const book = serialize(addForm, {hash: true, empty: false})
    console.log(book)
    axios({
        url: `http://hmajax.itheima.net/api/books`,
        method: `POST`,
        data: {
            ...book, creator
        }
    }).then(result => {
        // 创建提示框对象
        const toastDom = document.querySelector('.toast')
        const toast = new bootstrap.Toast(toastDom)
        // 显示提示框
        toast.show()
        addForm.reset()
        addDialog.hide()
        getBookList()
    })
})
/**
 * 删除图书
 */

document.querySelector('.list').addEventListener('click', (e) => {

        if (e.target.className === 'del') {
            const id = e.target.parentNode.dataset.id
            axios({
                url: `http://hmajax.itheima.net/api/books/${id}`,
                method: 'DELETE'
            }).then(result => {
                // 创建提示框对象
                const toastDom = document.querySelector('.toast')
                const toast = new bootstrap.Toast(toastDom)
                // 显示提示框
                toast.show()
                getBookList()
            })
        } else if (e.target.className === 'edit') {
            const id = e.target.parentNode.dataset.id
            edit(id)
        }
    }
)

/**
 * 编辑图书弹框
 * @param id
 */
function edit(id) {
    axios({
        url: `http://hmajax.itheima.net/api/books/${id}`,
    }).then(result => {
        const book = result.data.data;
        console.log(book)
        const editForm = document.querySelector('.edit-modal')
        const editDialog = new bootstrap.Modal(editForm)
        Object.keys(book).forEach(key => {
            editForm.querySelector(`.${key}`).value=book[key]
        })
        editDialog.show()
        document.querySelector('.edit-btn').addEventListener('click', () => {
            const editForm = document.querySelector('.edit-form')
            const book = serialize(editForm, {hash: true, empty: false})
            book.creator=creator
            console.log(book)
            axios({
                url: `http://hmajax.itheima.net/api/books/${book.id}`,
                method: `PUT`,
                data: {
                    ...book
                }
            }).then(result => {
                // 创建提示框对象
                const toastDom = document.querySelector('.toast')
                const toast = new bootstrap.Toast(toastDom)
                // 显示提示框
                toast.show()
                editForm.reset()
                editDialog.hide()
                getBookList()
            })
        })
    })
}

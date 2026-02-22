const BASE_URL = 'http://localhost:8000'

window.onload = async () => {
    await loadData()
}

const loadData = async () => {
    console.log('on load')
    // Load user ทั้งหมดออกจาก API
    const response = await axios.get(`${BASE_URL}/users`)
    console.log(response.data)

        // render users as a table
        const userDOM = document.getElementById('user')
        let htmlData = `
        <table class="user-table">
            <thead>
                <tr>
                    <th style="width:60px">ID</th>
                    <th>Name</th>
                    <th style="width:160px">Actions</th>
                </tr>
            </thead>
            <tbody>
        `

        for (let index = 0; index < response.data.length; index++) {
                let user = response.data[index]
                htmlData += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.firstname} ${user.lastname}</td>
                        <td class="user-actions-cell">
                            <a href='index.html?id=${user.id}'><button class="btn-edit">Edit</button></a>
                            <button class='delete' data-id='${user.id}'>Delete</button>
                        </td>
                    </tr>`
        }

        htmlData += `
            </tbody>
        </table>`

        userDOM.innerHTML = htmlData

        // attach delete handlers
        const deleteDom = document.getElementsByClassName('delete')
        for (let index = 0; index < deleteDom.length; index++) {
                deleteDom[index].addEventListener('click', async (event) => {
                        const id = event.target.dataset.id
                        try {
                                await axios.delete(`${BASE_URL}/users/${id}`)
                                loadData()
                        } catch (error) {
                                console.log('error', error)
                        }
                })
        }
}

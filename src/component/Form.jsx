import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Form = () => {

    const [data, setdata] = useState([])
    const [user, setuser] = useState({})
    const [view, setview] = useState({})
    const [modal, setmodal] = useState("none")

    //get user
    let get_user = async () => {
        let res = await axios.get("http://localhost:3001/users")
        console.log(res);
        setdata(res.data)
    }
    useEffect(() => {
        get_user()
    }, [])

    //post user
    let handle = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }

    let submit = async (e) => {
        e.preventDefault();
        let res = await axios.post("http://localhost:3001/users", user)
        console.log(res);
        setdata([...data, res.data])
    }

    //delete user

    let remove = async (id) => {
        let res = await axios.delete("http://localhost:3001/users" + `/${id}`)
        console.log(res);

        setdata(data.filter((val) => val.id != id))
    }

    //update
    let update = (val) => {
        setview(val)
        setmodal("block")
    }
    let viewhandle = (e) => {
        setview({ ...view, [e.target.name]: e.target.value })
    }
    let save = async () => {
        let res = await axios.put(`http://localhost:3001/users/${view.id}`, view)
        console.log(res);
        setmodal("none")

        setdata(data.map((val) => val.id == res.data.id ? { ...view } : val))
    }

    return (
        <div>
            <div className="banner">
                <form>
                    <div className="form-data" onSubmit={submit}>
                        <h2>form</h2>
                        <label>name: <input type="text" name='name' onChange={handle} /></label>
                        <label>password :<input type="password" name="password" onChange={handle} /></label>
                        <label>address : <textarea onChange={handle} name='address'></textarea></label>
                        <button onClick={submit} >submit</button>
                    </div>

                </form>
            </div>
            <div className="modal" style={{display:`${modal}`}}>
                <form>
                    <div className="form-data" onSubmit={submit}>
                        <h2>update</h2>
                        <label>name: <input type="text" name='name' value={view.name} onChange={viewhandle} /></label>
                        <label>password :<input type="password" name="password" value={view.password} onChange={viewhandle} /></label>
                        <label>address : <textarea onChange={viewhandle} value={view.address} name='address'></textarea></label>
                        <button onClick={save} >save</button>
                    </div>

                </form>
            </div>
            <table border="1px" cellPadding="10px" >
                <thead>
                    <tr>
                        <th>name</th>
                        <th>password</th>
                        <th>address</th>
                        <th>remove</th>
                        <th>update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((val, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td>{val.name}</td>
                                        <td>{val.password}</td>
                                        <td>{val.address}</td>
                                        <td><button onClick={() => remove(val.id)} >remove</button></td>
                                        <td><button onClick={() => update(val)}>update</button></td>
                                    </tr>
                                </React.Fragment>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Form

import React, {useEffect, useState} from 'react'
import styles from './Users.module.css'
import Input from "../../../common/controls/Input";
import Button from "../../../common/controls/Button";
import user from '../../../../assets/images/user.png'
import {usersAPI} from "../../../../API/API";
import Loading from "../../../common/screens/Loading";
import {NavLink} from "react-router-dom";
import Login from "../../login/Login";
import Hint from "../../../common/hint/Hint";

const Item = (props) => {

    return (
        <NavLink className={styles.link} to={`/user/${props.id}`}>
            <div className={styles.itemWrapper}>
                <div className={styles.imageArea}>
                    <img src={props.image || user} alt={'Profile'}/>
                </div>
                <div className={styles.name}>{props.name}</div>
                <div className={styles.saved}>{props.saved && <i className={'fas fa-star'}/>}</div>
            </div>
        </NavLink>
    )
}

const Users = () => {

    let [users, setUsers] = useState(null)
    let [isLoading, setLoading] = useState(true)
    let [triedToSearch, submitSearching] = useState(true)
    let [currentPage, setCurrentPage] = useState(1)
    let [isButtonActive, toggleButton] = useState(true)
    let [searchString, setSearchString] = useState('')

    useEffect(() => fetchUsers(), [])

    const fetchUsers = () => {
        setLoading(true)
        usersAPI.fetchUsers(1, 10, searchString, searchString === '').then(
            (r) => {
                setUsers(r)
                setLoading(false)
                console.log(searchString)
            }
        )
    }
    const showMoreUsers = () => {
        toggleButton(false)
        usersAPI.fetchUsers(currentPage + 1, 10, searchString, searchString === '').then(
            (r) => {
                let scrolledBy = document.querySelector('#scroller').scrollTop;

                setUsers(
                    {
                        ...users,
                        items: [...users.items, ...r.items]
                    }
                )
                toggleButton(true)
                document.querySelector('#scroller').scrollTop = scrolledBy;
            }
        )
        setCurrentPage(currentPage + 1)
    }

    const onSearchClick=()=>{
        fetchUsers()
        submitSearching(true)
    }

    let UsersComponents = users && [...users.items].map(
        (item) => <Item key={item.id} name={item.name} id={item.id} image={item.photos.small} saved={item.followed}/>
    )

    const onSearchInputChange = (e) => {
        submitSearching(false)
        setSearchString(e.target.value)
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.searchArea}>
                <Input onChange={onSearchInputChange}/>
                <Button onClick={onSearchClick} label={<i className="fas fa-search"/>}/>
            </div>
            {isLoading
                ?
                <Loading/>
                : (users.totalCount === 0)
                    ?
                    <Hint hint={searchString === '' ? triedToSearch && `Your Bookmarks will be here` : triedToSearch && `No users found`}
                          icon={searchString === '' ? triedToSearch && 'fas fa-user-friends' : triedToSearch && 'fas fa-search'}/>
                    :
                    <>
                        <div className={styles.itemsGrid}>
                            {UsersComponents}
                        </div>
                        {users && users.totalCount > currentPage * 10 &&
                        <center style={{marginTop: .6 + 'rem', marginBottom: .6 + 'rem'}}>
                            <Button label='Show more'
                                    onClick={showMoreUsers}
                                    disabled={!isButtonActive}/>
                        </center>}
                    </>
            }

        </div>
    )
}
export default Users
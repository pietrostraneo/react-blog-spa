import styleDrop from './Dropdown.module.scss'

export default function Dropdown() {

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <>
            <div className={`${styleDrop.drop}`}>
                <ul>
                    <li><button>Profile</button></li>
                    <li><button onClick={() => {
                        handleLogout()
                    }}>Logout</button></li>
                </ul>
            </div>
        </>
    )
}
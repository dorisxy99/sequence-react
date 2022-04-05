import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import * as userService from '../../utilities/users-service';


export default function NavBar(props) {
  function handleLogOut() {
    userService.logOut();
    props.setUser(null);
  }

  return (
    <>
      <nav>
      <span>Welcome, {props.user.name}</span>
      &nbsp; | &nbsp;
      <Link onClick={handleLogOut} to="">Log Out</Link>
      </nav>
    </>
  );
}

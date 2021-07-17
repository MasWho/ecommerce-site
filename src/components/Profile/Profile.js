// Global imports
import { useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

// Component imports
import ProfileNav from './ProfileNav';
import Details from './Details';
import PastOrders from './PastOrders';
import EditPassword from './EditPassword';

// Style imports
import styles from './Profile.module.css';

/**
 * Render the profile route.
 * @returns 
 */
const Profile = () => {

  const {path} = useRouteMatch();
  const authState = useSelector(state => state.auth);

  return (
    <div className={styles.container}>
      {/* Banner section */}
			<div className={styles.banner}>
        <h1 width={{width: "100%"}}><span>My Profile</span></h1>
			</div>
      <div className={styles['inner-container']}>

        {/* Description */}
        <div className={styles['description-container']}>
          <p>Hello {authState.username}</p>
          <p>
            Please find your information below. You can find your profile's details, past orders, and 
            manage password.
          </p>
        </div>

        {/* Profile editing area */}
        <div className={styles['profile-edit-container']}>
          {/* Profile nav bar */}
          <ProfileNav />
          {/* Profile related routes */}
          <Switch>
            <Route path={path} exact>
              <Redirect to={`${path}/details`}/>
            </Route>
            <Route path={`${path}/details`} component={Details}/>
            <Route path={`${path}/past-orders`} component={PastOrders}/>
            <Route path={`${path}/password`} component={EditPassword}/>
          </Switch>
        </div>

      </div>
    </div>
  )
};

export default Profile;
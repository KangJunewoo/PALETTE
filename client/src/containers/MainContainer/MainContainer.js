import {connect} from 'react-redux';
import Main from '../../components/Main';

import * as signUpActions from '../../modules/signUp';
import * as signInActions from '../../modules/signIn';

export default connect(
    (state) => ({
        signUpStatus: state.signUp,
        signInStatus: state.signIn,
    }),
    (dispatch) => ({
        onSignUp: (firstName, lastName, email, password) => {
            dispatch(signUpActions.signUp(firstName, lastName, email, password))
        },
        onSignIn: (email, password) => {
            dispatch(signInActions.signIn(email, password));
        }
    })
)(Main);
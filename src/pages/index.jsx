import React from 'react';
import {connect} from 'react-redux';
import Dashboard from '../modules/dashboard/index';
import {actions as dashboardActions} from '../modules/dashboard/ducks/dashboard';

class Application extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.fetchNotesFolders();
  }

  render() {
    return (
      <div className='u-spacer--al'>
        <Dashboard/>
      </div>
    )
  }
}

const dispatchToProps = (dispatch, ownProps) => {
  return {
    fetchNotesFolders: () => {
      dispatch(dashboardActions.fetchNotesFolders());
    }
  }
}
export default connect(null, dispatchToProps)(Application);

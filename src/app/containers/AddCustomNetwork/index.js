import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addCustomNetwork } from '../../actions/config'

import AddCustomNetwork from './AddCustomNetwork'

const actionCreators = {
  addCustomNetwork,
}

const mapStateToProps = state => ({ networks: state.config.networks })

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomNetwork)